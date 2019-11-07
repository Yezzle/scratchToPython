import controls from './blockConverters/controls';
import operators from './blockConverters/operator';
import datas from './blockConverters/data';
import mcblocks from './blockConverters/mcblocks';

const converters = Object.assign({}, controls, operators, datas, mcblocks );

export default converters