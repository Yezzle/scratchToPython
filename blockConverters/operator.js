export default {
    operator_random: (block, stackDepth, convertor) => {
        let code = '';
        code += convertor.getIndent(stackDepth) + `random.randint(${convertor.inputsToCode(block, stackDepth)})`
        return code
    },

    operator_add: (block, stackDepth, convertor) => {
        let code = '';
        code += convertor.getIndent(stackDepth) + `(${convertor.inputsToCode(block, stackDepth)})`
        return code
    },

    operator_subtract: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_multiply: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_divide: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_lt: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_equals: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_gt: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_and: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_or: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_not: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_join: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_letter_of: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_length: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_contains: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_mod: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_round: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

    operator_mathop: (block, stackDepth, convertor) => {
        let code = '';

        return code
    },

}