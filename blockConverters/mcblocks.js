import { MC_SPRITES_ENTITYS } from "../consts";

export default {
    "minecraft_postToChat":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + "mc.postToChat(" + convertor.inputsToCode(block, 'MESSAGE', 'string') + ")\n";
        return code;
    },

    "minecraft_postToMe":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + "mc.player.chatToMe(" + convertor.inputsToCode(block, 'MESSAGE', 'string') + ")\n";
        return code;
    },
        
    "minecraft_playerPosToChat":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + "mc.player.postPosToChat()\n";
        return code;
    },
        
    "minecraft_getPlayerPos":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + "mc.player.getTilePos()." + convertor.inputsToCode(block, 'AXIS') + '\n';
        return code;
    },
        
    "minecraft_setPlayerPos":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.player.setPos(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')})\n`;
        return code;
    },
        
    "minecraft_getPlayerRotation":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + "mc.player.getRotation()\n";
        return code;
    },
        
    "minecraft_setPlayerRotation":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + `mc.player.setRotation(${convertor.inputsToCode(block, 0)})\n`;
        return code;
    },
        
    "minecraft_getPlayerPitch":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + "mc.player.getPitch()\n";
        return code;
    },
        
    "minecraft_setPlayerPitch":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.player.setPitch(${convertor.inputsToCode(block, 0)})\n`
        return code;
    },
        
    "minecraft_setBlock":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.setBlock(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')}, ${convertor.inputsToCode(block, 'TYPE')}, ${convertor.inputsToCode(block, 'DATA')})\n`;
        return code;
    },
        
    "minecraft_spawnEntity":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.spawnEntity(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')}, ${convertor.inputsToCode(block, 'ENTITY')}, ${convertor.inputsToCode(block, 'DATA')})\n`;
        return code;
    },
        
    "minecraft_getBlock":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.getBlock(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')})`;
        return code;
    },
        
    "minecraft_setBlocks":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.setBlocks(${convertor.inputsToCode(block, 'X_COORDINATE1')}, ${convertor.inputsToCode(block, 'Y_COORDINATE1')}, ${convertor.inputsToCode(block, 'Z_COORDINATE1')}, ${convertor.inputsToCode(block, 'X_COORDINATE2')}, ${convertor.inputsToCode(block, 'Y_COORDINATE2')}, ${convertor.inputsToCode(block, 'Z_COORDINATE2')}, ${convertor.inputsToCode(block, 'TYPE')}, ${convertor.inputsToCode(block, 'DATA')})\n`;
        return code;
    },
        
    "minecraft_setLine":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.drawLine(${convertor.inputsToCode(block, 'X_COORDINATE1')}, ${convertor.inputsToCode(block, 'Y_COORDINATE1')}, ${convertor.inputsToCode(block, 'Z_COORDINATE1')},${convertor.inputsToCode(block, 'X_COORDINATE2')}, ${convertor.inputsToCode(block, 'Y_COORDINATE2')}, ${convertor.inputsToCode(block, 'Z_COORDINATE2')},  ${convertor.inputsToCode(block, 'TYPE')}, ${convertor.inputsToCode(block, 'DATA')})\n`;
        return code;
    },
        
    "minecraft_setCircle":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.drawCircle(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')}, ${convertor.inputsToCode(block, 'RADIUS')}, ${convertor.inputsToCode(block, 'TYPE')}, ${convertor.inputsToCode(block, 'DATA')}, ${convertor.inputsToCode(block, 'PLANE')})\n`;
        return code;
    },
        
    // set circle to just one block
    // "minecraft_setHCircle":(block, stackDepth, convertor) => {
    //     let code = convertor.getIndent(stackDepth) + `mc.drawHorizontalCircle(%s, %s, %s, %s, %s, %s)\n",
    // return code;
    //         convertor.inputsToCode(block, 1),
    //         convertor.inputsToCode(block, 1),
    //         convertor.inputsToCode(block, 1),
    //         convertor.inputsToCode(block, 1),
    //         convertor.inputsToCode(block, 1),
    //         convertor.inputsToCode(block, 1));
    //     },

    "minecraft_setSphere":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.drawSphere(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')}, ${convertor.inputsToCode(block, 'RADIUS')}, ${convertor.inputsToCode(block, 'TYPE')}, ${convertor.inputsToCode(block, 'DATA')})\n`;
        return code;
    },
        
    "minecraft_setText":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + 
            `mc.setText(${convertor.inputsToCode(block, 'TEXT', 'string')}, ${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')}, ${convertor.inputsToCode(block, 'TYPE')}, ${convertor.inputsToCode(block, 'DATA')}, ${convertor.inputsToCode(block, 'PLANE')}, ${convertor.inputsToCode(block, 'PIXEL_SIZE')})\n`;
        return code;
    },
        
    "minecraft_strikeLightning":(block, stackDepth, convertor) => {
        let code = convertor.getIndent(stackDepth) + `mc.strikeLightning(${convertor.inputsToCode(block, 'X_COORDINATE')}, ${convertor.inputsToCode(block, 'Y_COORDINATE')}, ${convertor.inputsToCode(block, 'Z_COORDINATE')})\n`;
        return code;
    },

    "minecraft_menu_pixels": (block, stackDepth, convertor) => {
        let code = `${block.fields.pixels[0]}`;
        return code;
    },

    "minecraft_menu_planes": (block, stackDepth, convertor) => {
        let code = `\"${block.fields.planes[0]}\"`;
        return code;
    },

    "minecraft_menu_entities": (block, stackDepth, convertor) => {
        const joinWords = (str) => str.toUpperCase().split(' ').join('_');
        let code = `entity.${joinWords(block.fields.entities[0].toUpperCase())}.id`;
        return code;
    },

    "minecraft_menu_axes": (block, stackDepth, convertor) => {
        let code = `${block.fields.axes[0]}`;
        return code;
    },

    "minecraft_minecraft": (block, stackDepth, convertor) => {
        // let code = `from mcpi.codecraft import *\n` +
        //     `from mcpi import block, entity\n` + 
        //     `import time, math, random\n` +
        //     `\n` + 
        //     `mc = Codecraft('10.104.87.211', 4711)\n` +
        //     `player = mc.getPlayer('\${user.id}')\n\n`;
        // return code;
        return ''
    },

}