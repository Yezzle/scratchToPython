export default {
    control_repeat: (block, stackDepth, convertor) =>{
        let code = '';
        code += convertor.getIndent(stackDepth) + `for _repeatCount in range(0, ${convertor.inputsToCode(block, 'TIMES', 'number')}):\n`
        if(block.subTrees&&block.subTrees[0]) code += convertor.treeToCode(block.subTrees[0], stackDepth + 1)
        return code;   
    },

    control_repeat_until: (block, stackDepth, convertor) =>{
        let code = '';
        code += convertor.getIndent(stackDepth) + 'while not ' + convertor.inputsToCode(block, 'CONDITION', 'bool') + ':\n'
        if(block.subTrees&&block.subTrees[0]) code += convertor.treeToCode(block.subTrees[0], stackDepth + 1)
        return code;   
    },

    control_wait: (block, stackDepth, convertor) =>{
        let code = ''
        code += convertor.getIndent(stackDepth) + 'time.sleep('+ convertor.inputsToCode(block, 0) +')\n';
        return code;   
    },

    control_wait_until: (block, stackDepth, convertor) =>{
        let code = ''
        code += convertor.getIndent(stackDepth) + 'while not ' + convertor.inputsToCode(block, 0) + ':\n';
        code += convertor.getIndent(stackDepth + 1) + 'time.sleep(0.5)';
        return code;   
    },

    control_if: (block, stackDepth, convertor) =>{
        let code = ''
        code += convertor.getIndent(stackDepth) + 'if ' + convertor.inputsToCode(block, 'CONDITION') + ':\n';
        if(block.subTrees&&block.subTrees[0]) code += convertor.treeToCode(block.subTrees[0], stackDepth + 1);
        return code;   
    },

    control_if_else: (block, stackDepth, convertor) =>{
        let code = ''
        code += convertor.getIndent(stackDepth) + 'if ' + convertor.inputsToCode(block, 'CONDITION') + ':\n';
        if(block.subTrees&&block.subTrees[0]) code += convertor.treeToCode(block.subTrees[0], stackDepth + 1);
        code += convertor.getIndent(stackDepth) + 'else:\n'
        if(block.subTrees&&block.subTrees[1]) code += convertor.treeToCode(block.subTrees[1], stackDepth + 1);
        return code;   
    },

    control_return: (block, stackDepth, convertor) =>{
        let code = ''
        code += convertor.getIndent(stackDepth) + 'return\n';
        return code;   
    },
}