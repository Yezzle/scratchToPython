export default {
    "data_setvariableto":  (block, stackDepth, convertor) => {
        let code = ''
        code += convertor.getIndent(stackDepth) + block.fields.VARIABLE[0] + ' = ' + convertor.inputsToCode(block, 0) + '\n';
        return code;
    },

    "data_changevariableby": (block, stackDepth, convertor) => {
        let code = '';
        convertor.checkVariableAndInit(block.fields.VARIABLE[0], 'variable');
        code += convertor.getIndent(stackDepth) + block.fields.VARIABLE[0] + ' += ' + convertor.inputsToCode(block, 0) + '\n';
        return code;
    },

    "data_replaceItem_list": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += convertor.getIndent(stackDepth) + block.fields.LIST[0] + '[' + convertor.inputsToCode(block, 0) + '] = ' + convertor.inputsToCode(block, 1) + '\n';
        return code;
    },

    "data_init_list": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += convertor.getIndent(stackDepth) + block.fields.LIST[0] + ' = []\n';
        return code;
    },

    
    "data_itemoflist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += `${block.fields.LIST[0]}[${convertor.inputsToCode(block, 0)}]`;
        return code;
    },

    "data_itemnumoflist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += `${block.fields.LIST[0]}.index(${convertor.inputsToCode(block, 0)})`;
        return code;
    },

    "data_deletealloflist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += convertor.getIndent(stackDepth) + `${block.fields.LIST[0]} = []\n`;
        return code;
    },

    "data_deleteoflist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += `${block.fields.LIST[0]}.pop(${convertor.inputsToCode(block, 0)})\n`;
        return code;
    },

    "data_listcontainsitem": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += `${block.fields.LIST[0]}.index(${convertor.inputsToCode(block, 0, 'string')}) > -1`;
        return code;
    },

    "data_insertatlist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += convertor.getIndent(stackDepth) + `${block.fields.LIST[0]}.insert(${convertor.inputsToCode(block, 'INDEX')},${convertor.inputsToCode(block, 'ITEM', 'string')})\n`;
        return code;
    },

    "data_addtolist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += convertor.getIndent(stackDepth) + `${block.fields.LIST[0]}.append(${convertor.inputsToCode(block, 'ITEM', 'string')})\n`;
        return code;
    },

    "data_lengthoflist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += `len(${block.fields.LIST[0]})`;
        return code;
    },

    "data_replaceitemoflist": (block, stackDepth, convertor) => {
        let code = ''
        convertor.checkVariableAndInit(block.fields.LIST[0], 'list');
        code += convertor.getIndent(stackDepth) + `${block.fields.LIST[0]}[${convertor.inputsToCode(block, 'INDEX')}] = ${convertor.inputsToCode(block, 'ITEM', 'string')}\n`;
        return code;
    },
}