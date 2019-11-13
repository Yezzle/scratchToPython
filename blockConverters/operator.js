import { MATH_OPTIONS } from "../consts";

export default {
    operator_random: (block, stackDepth, convertor) => {
        let code = '';
        code += `(random.randint(${convertor.inputsToCode(block, 0)}, ${convertor.inputsToCode(block, 1)}))`
        return code
    },

    operator_add: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} + ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_subtract: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} - ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_multiply: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} * ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_divide: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} / ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_lt: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} < ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_equals: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} == ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_gt: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} > ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_and: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} and ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_or: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0)} or ${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_not: (block, stackDepth, convertor) => {
        let code = '';
        code += `(not ${convertor.inputsToCode(block, 0)})`
        return code
    },

    operator_join: (block, stackDepth, convertor) => {
        let code = '';
        code += `(${convertor.inputsToCode(block, 0, 'string')} + ${convertor.inputsToCode(block, 1, 'string')}))`
        return code
    },

    operator_letter_of: (block, stackDepth, convertor) => {
        let code = '';
        code += `${convertor.inputsToCode(block, 0, 'string')}[${parseInt(convertor.inputsToCode(block, 1))}]`  //按照程序员的思维从0开始
        return code
    },

    operator_length: (block, stackDepth, convertor) => {
        let code = '';
        code += `len(${convertor.inputsToCode(block, 0, 'string')})`
        return code
    },

    operator_contains: (block, stackDepth, convertor) => {
        let code = '';
        code += `${convertor.inputsToCode(block, 0, 'string')}.find(${convertor.inputsToCode(block, 1)})`
        return code
    },

    operator_mod: (block, stackDepth, convertor) => {
        let code = '';
        code += `${convertor.inputsToCode(block, 0)} % ${convertor.inputsToCode(block, 1)}`
        return code
    },

    operator_round: (block, stackDepth, convertor) => {
        let code = '';
        code += `round(${convertor.inputsToCode(block, 0)})`
        return code
    },

    operator_mathop: (block, stackDepth, convertor) => {
        let code = '';
        code += `${MATH_OPTIONS[block.fields.OPERATOR[0]]}(${convertor.inputsToCode(block, 0)})`
        return code
    },

}