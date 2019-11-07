import BlockConverters from './converters';
import inputFormatters from './inputsFomatters'
import {MC_SPRITES_ENTITYS} from './consts';

class ScratchMcConverter {

    constructor(){
        this.C = "";
    }

    static getInputs(block){

    }

    static getBlocks(jsonObj){
        let stage = jsonObj.targets.filter(t => t.isStage)[0];
        this.variables = stage.variables;
        this.lists = stage.lists;
        this.blocks = blocks;
        return jsonObj.targets.filter(t => !t.isStage)[0].blocks;
    }

    static treeObj(blocks, topBlock, topNode){
        topNode.childNodes.push(topBlock);
        if(topBlock.next){
            this.treeObj(blocks, blocks[topBlock.next], topNode )
        }
        if(topBlock.inputs.SUBSTACK&&blocks[topBlock.inputs.SUBSTACK][0] == 2){
            let subTree = {
                childNodes: []
            }
            this.treeObj(blocks, blocks[topBlock.inputs.SUBSTACK][1], subTree);
            topBlock.subTrees = [subTree];
        }
        if(topBlock.inputs.SUBSTACK2&&blocks[topBlock.inputs.SUBSTACK2][0] == 2){
            let subTree = {
                childNodes: []
            }
            this.treeObj(blocks, blocks[topBlock.inputs.SUBSTACK2][1], subTree);
            topBlock.subTrees = topBlock.subTrees[0]?[topBlock.subTrees[0], subTree]:[subTree];
        }
        return topNode;
    }

    static parseToTrees(jsonObj){
        let blocks = this.getBlocks(jsonObj);

        let trees = [];

        Object.keys(blocks).filter(blockKey => blocks[blockKey].topLevel)
            .forEach(blockKey => {

                let treeNode = {
                    childNodes:[]
                }
                treeNode = this.treeObj(blocks, blocks[blockKey], treeNode)
                trees.push(treeNode);
        });
        return trees;
    }

    getIntent(depth, intentSize = 4){
        return ' '.repeat(intentSize* depth);
    }

    static treeToCode( treeObj, stackDepth=0 ){
        let code = '';
        treeObj.childNodes.map(block => {
            code += this.parseBlockToCode(block, stackDepth) + '\n';
        })
        code+='\n'
        return code;
    }

    static inputsToCode(block, inputsIndex){
        let inputArray = Object.keys(block.inputs)[inputsIndex];
        if(inputArray[0]==1){
            return inputArray[1][1] || " ";
        }else if(inputArray[0]==2){
            return this.getInputs(block)[inputsIndex]
        }else if(inputArray[0]==3){
            return this.getInputs(block)[inputArray]
        }
    }

    static parseBlockToCode(block, stackDepth){
        let code = '';
        code = BlockConverters[block.opcode](block, stackDepth, this)
        return code;
    }


}

export default ScratchMcConverter