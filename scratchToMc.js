import BlockConverters from './blockConverters';

class ScratchMcConverter {

    constructor(){
        this.C = "";
        this.getBlocks();
    }

    getBlocks(jsonObj){
        this.jsonObj = jsonObj;
        if(!this.jsonObj||!this.jsonObj.targets) return null;
        let stage = jsonObj.targets.filter(t => t.isStage)[0];
        this.variables = stage.variables;
        this.lists = stage.lists;
        this.blocks = Object.assign({}, stage.blocks, this.variables);
        return this.blocks;
    }

    treeObj(blocks, topBlock, topNode){
        topNode.childNodes.push(topBlock);
        if(topBlock.next){
            this.treeObj(blocks, blocks[topBlock.next], topNode )
        }
        if(topBlock.inputs.SUBSTACK&&topBlock.inputs.SUBSTACK[0] == 2){
            let subTree = {
                childNodes: []
            }
            this.treeObj(blocks, blocks[topBlock.inputs.SUBSTACK[1]], subTree);
            topBlock.subTrees = [subTree];
        }
        if(topBlock.inputs.SUBSTACK2&&topBlock.inputs.SUBSTACK2[0] == 2){
            let subTree = {
                childNodes: []
            }
            this.treeObj(blocks, blocks[topBlock.inputs.SUBSTACK2[1]], subTree);
            topBlock.subTrees = topBlock.subTrees[0]?[topBlock.subTrees[0], subTree]:[subTree];
        }
        return topNode;
    }

    parseToTrees(jsonObj){
        let blocks = this.blocks;
        this.trees = [];
        this.minecraftCount = 0;
        Object.keys(blocks).filter(blockKey => blocks[blockKey].topLevel)
            .forEach(blockKey => {

                let treeNode = {
                    childNodes:[]
                }
                treeNode = this.treeObj(blocks, blocks[blockKey], treeNode)
                treeNode.isTopLevel = true;
                if(blocks[blockKey].opcode == 'minecraft_minecraft'){
                    treeNode.ismain = true;
                }else{
                    treeNode.ismain = false;
                }
                this.trees.push(treeNode);
        });
        return this.trees;
    }

    getIndent(depth, intentSize = 4){
        return ' '.repeat(intentSize* depth);
    }

    treeToCode( treeObj, stackDepth=0 ){
        let code = '';
        treeObj.childNodes.map(block => {
            code += this.parseBlockToCode(block, stackDepth);
        })
        // code+='\n'
        if(this.trees.length>1&&!treeObj.ismain&&treeObj.isTopLevel) return '';
        return code;
    }

    inputsToCode(block, inputsIndex, strType){
        let inputkey = typeof inputsIndex == 'string'? inputsIndex : Object.keys(block.inputs)[inputsIndex];
        if(!block.inputs[inputkey]) return ' ';
        if(block.inputs[inputkey][0]==1){
            if(Array.isArray(block.inputs[inputkey][1])){
                if(strType == 'string') return `\"${block.inputs[inputkey][1][1] || " "}\"`
                return block.inputs[inputkey][1][1] || " ";
            }else{
                return this.parseBlockToCode(this.blocks[block.inputs[inputkey][1]]);
            }
        }else if(block.inputs[inputkey][0]==2){
            let inputValue1 = block.inputs[inputkey][1];
            return this.parseBlockToCode(this.blocks[Array.isArray(inputValue1)? inputValue1[1]: inputValue1]||this.blocks[Array.isArray(inputValue1)? inputValue1[2]: inputValue1]) //this.getInputs(block)[inputsIndex]
        }else if(block.inputs[inputkey][0]==3){
            let inputValue = block.inputs[inputkey][1];
            return this.parseBlockToCode(this.blocks[Array.isArray(inputValue)? inputValue[1]: inputValue]||this.blocks[Array.isArray(inputValue)? inputValue[2]: inputValue]);//this.getInputs(block)[inputArray]
        }
    }

    parseBlockToCode(block, stackDepth = 0){
        console.log('blocktoparse:', block)
        if(!block) return '';
        if(Array.isArray(block)) return block[0]
        let code = '';
        if(block.opcode == 'minecraft_minecraft' && this.minecraftCount != 0) return code;
        if(BlockConverters[block.opcode]){
            if(block.opcode == 'minecraft_minecraft') this.minecraftCount++;
            code = BlockConverters[block.opcode](block, stackDepth, this)
        }
        this.temp +=code;
        return code;
    }

    checkVariableAndInit(variableName, type){
        if(!this.temp.includes(`${variableName} = ${type == 'list'?'[]': 0 }`)){
            let code = `${variableName} = ${type == 'list'?'[]': 0 }\n`
            this.variablesInit += code;
            this.temp += code;
        }
    }

    convert(jsonObj){
        this.getBlocks(jsonObj);
        this.temp = "";
        this.C = "";
        this.variablesInit = "";
        let trees = this.parseToTrees(this.jsonObj);
        if(trees.length==0) return this.C;
        this.C = trees.map(tree => this.treeToCode(tree))
            .reduce((tree1, tree2)=>{
            return tree1 + (tree1?'\n':'') + tree2
        }, "");
        return this.variablesInit + '\n' + this.C;
    }
}

export default ScratchMcConverter
