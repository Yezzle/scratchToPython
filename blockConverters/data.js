export default {
    "data_setvariableto":  (block, stackDepth, convertor) => {
        let code = ''
        code += convertor.getIndent(stackDepth) + block.fields.VARIABLE[0] + ' = ' + convertor.inputsToCode(block, 0);
        return code;
    },

    "data_changevariableby": (block, stackDepth, convertor) => {
        let code = ''
        code += convertor.getIndent(stackDepth) + block.fields.VARIABLE[0] + ' += ' + convertor.inputsToCode(block, 0);
        return code;
    },

    "data_replaceItem_list": (block, stackDepth, convertor) => {
        let code = ''
        code += convertor.getIndent(stackDepth) + block.fields.LIST[0] + '[' + convertor.inputsToCode(block, 0) + '] = ' + convertor.inputsToCode(block, 1);
        return code;
    },

    "data_init_list": (block, stackDepth, convertor) => {
        let code = ''
        code += convertor.getIndent(stackDepth) + block.fields.LIST[0] + ' = []';
        return code;
    }
}