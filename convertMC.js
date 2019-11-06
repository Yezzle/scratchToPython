import { number } from "format-message";

class ScratchMC extends Model{
    

    constructor(){
        /*
        * Model 相关
        */
        this.table = "works";


        /*
        * ScratchMC + Python 相关
        */
        //
        this.C = ""; // parsed code
        this.globalVarList = [];
        this.globalListsList = [];
        this.varNameMap = [];
        this.varNameIndex = 0;
        this.scriptIndent = 0;

        this.entityMap = [
            {"黑色凋零骷" : "WITHER_SKELETON"},
            {"炸药凋灵骷" : "WITHER_SKULL"},
            {"尸壳" : "HUSK"},
            {"僵尸村民" : "ZOMBIE_VILLAGER"},
            {"骷髅马" : "SKELETON_HORSE"},
            {"僵尸马" : "ZOMBIE_HORSE"},
            {"苦力怕" : "CREEPER"},
            {"骷髅" : "SKELETON"},
            {"蜘蛛" : "SPIDER"},
            {"巨人" : "GIANT"},
            {"僵尸" : "ZOMBIE"},
            {"史莱姆" : "SLIME"},
            {"恶魂" : "GHAST"},
            {"僵尸猪人" : "PIG_ZOMBIE"},
            {"末影人" : "ENDERMAN"},
            {"洞穴蜘蛛" : "CAVE_SPIDER"},
            {"末影龙" : "ENDER_DRAGON"},
            {"凋零" : "WITHER"},
            {"蝙蝠" : "BAT"},
            {"女巫" : "WITCH"},
            {"猪" : "PIG"},
            {"绵羊" : "SHEEP"},
            {"牛" : "COW"},
            {"鸡" : "CHICKEN"},
            {"鱿鱼" : "SQUID"},
            {"狼" : "WOLF"},
            {"蘑菇牛" : "MUSHROOM_COW"},
            {"雪人" : "SNOWMAN"},
            {"豹猫" : "OCELOT"},
            {"铁傀儡" : "IRON_GOLEM"},
            {"马" : "HORSE"},
            {"兔子" : "RABBIT"},
            {"北极熊" : "POLAR_BEAR"},
            {"羊驼" : "LLAMA"},
            {"羊驼的口水" : "LLAMA_SPIT"},
            {"鹦鹉" : "PARROT"},
            {"村民" : "VILLAGER"},
        ];
    }


    checkIsMC(json)
    {
        for(let extKey in json.info.savedExtensions) {
            if (json.info.savedExtensions[extKey].extensionName == '编玩Craft-Scratch') {
                return true;
            }
        }
        return false;
    }

    parseVars(vars)
    {
        for (let v in vars) {
            varName = this.castVarName(vars[v].name);
           this.globalListsList.push(varName);
            this.C += varName + " = " + this.parseBlock(vars[v].value) + "\n";
        }

        // initialize global timer
        this.C += "timer = int(time.time())\n";
        this.globalVarList.push("timer");

        this.C += "\n";
    }

    parseLists(lists)
    {
        for(let k in lists){
            varName = this.castVarName(lists[k].listName);
            this.globalVarList.push(varName);

            this.C +=  varName + " = " + json_encode(lists[l].contents) + "\n";
        }

        this.C += "\n";

    }


    castVarName(name, isFunction = false)
    {
        if (preg_match('/^[_A-Za-z][_A-Za-z0-9]*/', name) // valid python variable name
            && !in_array(name, ['mc', 'player', 'timer']) // and not reserved names
        ) {
            return name;
        }

        //改用编号，不用数字串
        if (!isset(this.varNameMap[name])) {
            this.varNameMap[name] = (isFunction ? '_func' : '_var') + "_" + this.varNameIndex++;
            return this.varNameMap[name];
        }

        newName = isFunction ? '_func' : '_var';

        name = preg_replace('/[\s%]/', "", name);
        for (i = 0; i < strlen(name); i++) {
            newName += "_" + ord(name[i]);
        }
        return newName;

    }

    buildFuncParams(params)
    {
        return "(" + params.join(", ") + ")";
    }

    strStartsWith(str, start)
    {
        return strpos(str, start) === 0;
    }

    parseMCScript(blk)
    {
        opcode = str_replace("编玩Craft-Scratch.", "", blk[0]);

        switch (opcode) {
            case "postToChat":
                code = "mc.postToChat(" + this.parseBlock(blk[1]) + ")\n";
                break;
            case "postToMe":
                code = "mc.player.chatToMe(" + this.parseBlock(blk[1]) + ")\n";
                break;
            case "playerPosToChat":
                code = "mc.player.postPosToChat()\n";
                break;
            case "getPlayerPos":
                code = "mc.player.getTilePos()." + blk[1];
                break;
            case "setPlayerPos":
                code = sprintf("mc.player.setPos(%s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]));
                break;
            case "getPlayerRotation":
                code = "mc.player.getRotation()";
                break;
            case "setPlayerRotation":
                code = sprintf("mc.player.setRotation(%s)\n", this.parseBlock(blk[1]));
                break;
            case "getPlayerPitch":
                code = "mc.player.getPitch()";
                break;
            case "setPlayerPitch":
                code = sprintf("mc.player.setPitch(%s)\n", this.parseBlock(blk[1]));
                break;
            case "setBlock":
                code = sprintf("mc.setBlock(%s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    this.parseBlock(blk[4]),
                    this.parseBlock(blk[5]));
                break;
            case "spawnEntity":
                code = sprintf("mc.spawnEntity(%s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    "entity." + this.entityMap[blk[4]] + ".id",
                    this.parseBlock(blk[5]));
                break;
            case "getBlock":
                code = sprintf("mc.getBlock(%s, %s, %s)",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]));
                break;
            case "setBlocks":
                code = sprintf("mc.setBlocks(%s, %s, %s, %s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    this.parseBlock(blk[4]),
                    this.parseBlock(blk[5]),
                    this.parseBlock(blk[6]),
                    this.parseBlock(blk[7]),
                    this.parseBlock(blk[8]));
                break;
            case "setLine":
                code = sprintf("mc.drawLine(%s, %s, %s, %s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    this.parseBlock(blk[4]),
                    this.parseBlock(blk[5]),
                    this.parseBlock(blk[6]),
                    this.parseBlock(blk[7]),
                    this.parseBlock(blk[8]));
                break;
            case "setCircle":
                code = sprintf("mc.drawCircle(%s, %s, %s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    this.parseBlock(blk[4]),
                    this.parseBlock(blk[5]),
                    this.parseBlock(blk[6]),
                    this.parseBlock(blk[7]));
                break;
                // set circle to just one block
//            case "setHCircle":
//                code = sprintf("mc.drawHorizontalCircle(%s, %s, %s, %s, %s, %s)\n",
//                    this.parseBlock(blk[1]),
//                    this.parseBlock(blk[2]),
//                    this.parseBlock(blk[3]),
//                    this.parseBlock(blk[4]),
//                    this.parseBlock(blk[5]),
//                    this.parseBlock(blk[6]));
//                break;
            case "setSphere":
                code = sprintf("mc.drawSphere(%s, %s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    this.parseBlock(blk[4]),
                    this.parseBlock(blk[5]),
                    this.parseBlock(blk[6]));
                break;
            case "setText":
                code = sprintf("mc.setText(%s, %s, %s, %s, %s, %s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]),
                    this.parseBlock(blk[4]),
                    this.parseBlock(blk[5]),
                    this.parseBlock(blk[6]),
                    this.parseBlock(blk[7]),
                    this.parseBlock(blk[8]));
                break;
            case "strikeLightning":
                code = sprintf("mc.strikeLightning(%s, %s, %s)\n",
                    this.parseBlock(blk[1]),
                    this.parseBlock(blk[2]),
                    this.parseBlock(blk[3]));
                break;
            default:
                code = "mc." + opcode + "()\n";
        }

        return code;
    }

    parseCBlock(blk)
    {

    }

    getIndent()
    {
        return "    ".repeat(this.scriptIndent);
    }

    parseBlock(blk)
    {
        //

        if (blk == null || blk == '') {
            return 0;
        } else if (Number.parseFloat(blk).toString() != 'NaN') {
            return "blk";
            //return "float(blk)";
        } else if (typeof blk == 'string') {
            return "\"blk\"";
        } else if (!Array.isArray(blk)) {
            return blk;
        } else if (this.strStartsWith(blk[0], "编玩Craft-Scratch")) {
            return this.parseMCScript(blk);
        } else if (blk[0] == "setVar:to:") {
            return this.castVarName(blk[1]) + " = " + this.parseBlock(blk[2]) + "\n";
        } else if (blk[0] == "getParam") {
            return this.castVarName(blk[1]);
        } else if (blk[0] == "readVariable") {
            return this.castVarName(blk[1]);
        } else if (blk[0] == "stringLength:") {
            return "len(" + this.parseBlock(blk[1]) + ")";
        } else if (blk[0] == 'concatenate:with:') {
            return sprintf("str(%s) + str(%s)", this.parseBlock(blk[1]), this.parseBlock(blk[2]));
        } else if (blk[0] == 'letter:of:') {
            return sprintf("str(%s)[int(%s)-1]", this.parseBlock(blk[2]), this.parseBlock(blk[1]));
        } else if (blk[0] == 'wait:elapsed:from:') {
            return "time.sleep(" + this.parseBlock(blk[1]) + ")\n";
        } else if (blk[0] == 'randomFrom:to:') {
            //@todo to support float range
            return "random.randint(" + this.parseBlock(blk[1]) + ", " + this.parseBlock(blk[2]) + ")";
        } else if (in_array(blk[0], ['+', '-', '*', '/', '%', '>', '<', '=', '|', '&'])) {
            // binary operators (math or logical)
            op_map = {
                '=' : '==',
                '|' : 'or',
                '&' : 'and',
            };
            op = isset(op_map[blk[0]]) ? op_map[blk[0]] : blk[0];
            return "(" + this.parseBlock(blk[1]) + " op " + this.parseBlock(blk[2]) + ")";
        } else if (blk[0] == 'computeFunction:of:') {
            // call math functions
            func_map = {
                'sin' : 'math.sin',
                'cos' : 'math.cos',
                'tan' : 'math.tan',
                'asin' : 'math.asin',
                'acos' : 'math.acos',
                'atan' : 'math.atan',
                'abs' : 'abs',
                'sqrt' : 'math.sqrt',
                'floor' : 'math.floor',
                'ceiling' : 'math.ceil',
            };
            if (blk[1] == 'ln') return "math.log(" + this.parseBlock(blk[2]) + ")";
            if (blk[1] == 'log') return "math.log(" + this.parseBlock(blk[2]) + ", 10)";
            if (blk[1] == 'e ^') return "math.pow(math.e, " + this.parseBlock(blk[2]) + ")";
            if (blk[1] == '10 ^') return "math.pow(10, " + this.parseBlock(blk[2]) + ")";

            // 三角函数，scratch中默认为角度，python中为弧度
            if (in_array(blk[1], ['sin', 'cos', 'tan'])) return func_map[blk[1]] + "(math.pi / 180 * " + this.parseBlock(blk[2]) + ")";
            if (in_array(blk[1], ['asin', 'acos', 'atan'])) return sprintf("(180 / math.pi * %s(%s))", func_map[blk[1]], this.parseBlock(blk[2]));

            //other
            func = isset(func_map[blk[1]]) ? func_map[blk[1]] : blk[1];
            return func + "(" + this.parseBlock(blk[2]) + ")";
        } else if (blk[0] == 'timerReset') {
            return "timer = int(time.time())\n";
        } else if (blk[0] == 'timer') {
            return "(int(time.time()) - timer)";
        }else if(blk[0] == "timeAndDate"){
            dt_map = {
                'year' : 'Y',
                'month' : 'm',
                'date' : 'd',
                'day of week' : 'w', // start from sunday as0
                'hour' : 'H',
                'minute' : 'M',
                'second' : 'S'
            };

            if(blk[1] == 'day of week'){
                return sprintf("(int(time.strftime('%%%s', time.localtime())) + 1)", dt_map[blk[1]]);
            }else{
                return sprintf("int(time.strftime('%%%s', time.localtime()))", dt_map[blk[1]]);
            }
        } else if (blk[0] == 'rounded') {
            return "round(" + this.parseBlock(blk[1]) + ")";
        } else if (blk[0] == 'changeVar:by:') {
            return this.castVarName(blk[1]) + " += " + this.parseBlock(blk[2]) + "\n";
        } else if (blk[0] == 'not') {
            return "not(" + this.parseBlock(blk[1]) + ")";
        } else if (blk[0] == "doRepeat") {
            code = "for _repeatCount in range(0, int(" + this.parseBlock(blk[1]) + ")):\n";
            this.scriptIndent++;
            for(let sb in blk[2]) {
                code += this.getIndent() + this.parseBlock(blk[2][sb]);
            }
            this.scriptIndent--;
            return code + "\n";
        } else if (blk[0] == "doUntil") {
            code = "while not(" + this.parseBlock(blk[1]) + "):\n";
            this.scriptIndent++;
            for(let sb in blk[2]) {
                code += this.getIndent() + this.parseBlock(blk[2][sb]);
            }
            this.scriptIndent--;
            return code + "\n";
        } else if (blk[0] == "doForever") {
            code = "while True:\n";
            this.scriptIndent++;
            for(let sb in blk[1]) {
                code += this.getIndent() + this.parseBlock(blk[1][sb]);
            }
            this.scriptIndent--;
            return code + "\n";
        } else if (blk[0] == "doWaitUntil") {
            code = "while not " + this.parseBlock(blk[1]) + ":\n";
            this.scriptIndent++;
            code += this.getIndent() + "time.sleep(0.5)\n";
            this.scriptIndent--;
            return code + "\n";
        } else if (blk[0] == "doIf") {
            code = "if " + this.parseBlock(blk[1]) + ":\n";
            this.scriptIndent++;
            for(let sb in blk[2]) {
                code += this.getIndent() + this.parseBlock(blk[2][sb]);
            }
            this.scriptIndent--;
            return code + "\n";
        } else if (blk[0] == "doIfElse") {
            code = "if " + this.parseBlock(blk[1]) + ":\n";
            this.scriptIndent++;
            for(let sb in blk[2]) {
                code += this.getIndent() + this.parseBlock(blk[2][sb]);
            }
            this.scriptIndent--;
            code += this.getIndent() + "else:\n";
            this.scriptIndent++;
            for(let sb in blk[3]) {
                code += this.getIndent() + this.parseBlock(blk[3][sb]);
            }
            this.scriptIndent--;
            return code + "\n";
        } else if (blk[0] == 'call') {
            // call custom function
            func = this.castVarName(blk[1]);
            blk.shift(); blk.shift();
            code = func + "(";
            for(let b in blk) {
                code += this.parseBlock(blk[b]) + ", ";
            }
            return rtrim(code, ", ") + ")\n";
        }else if (blk[0] == 'stopScripts') {
            //@todo 停止其他脚本？没有对应的概念
            code = "\n";
            if (blk[1] == "all") {
                code = "exit(0)\n";
            } else if (blk[1] == "this script") {
                code = "return(0)\n";
            }
            return code;
        // 列表相关
        }else if(blk[0] == 'append:toList:') {
            // list.append(el)
            return sprintf("%s.append(%s)\n", blk[2], this.parseBlock(blk[1]));
        }else if(blk[0] == 'deleteLine:ofList:') {
            if (blk[1] == 'last') {
                return sprintf("%s.pop()\n", blk[2]);
            } else if (blk[1] == 'all') {
                return sprintf("%s = []\n", blk[2]);
            } else {
                return sprintf("%s.pop(%s - 1)\n", blk[2], this.parseBlock(blk[1]));
            }
        }else if(blk[0] == 'insert:at:ofList:') {
            if (blk[2] == 'last') {
                return sprintf("%s.append(%s)\n", blk[3], this.parseBlock(blk[1]));
            } else if (blk[2] == 'random') {
                return sprintf("%s.insert(%s, %s)\n", blk[3], "random.randint(0, len({blk[3]}))", this.parseBlock(blk[1]));
            } else {
                return sprintf("%s.insert(%s - 1, %s)\n", blk[3], this.parseBlock(blk[2]), this.parseBlock(blk[1]));
            }
        }else if(blk[0] == 'setLine:ofList:to:') {
            if (blk[1] == 'last') {
                return sprintf("%s[-1] = %s\n", blk[2], this.parseBlock(blk[3]));
            } else if (blk[1] == 'random') {
                return sprintf("%s[%s] = %s\n", blk[2], "random.randint(0, len({blk[2]}) - 1)", this.parseBlock(blk[3]));
            } else {
                return sprintf("%s[%s - 1] = %s\n", blk[2], this.parseBlock(blk[1]), this.parseBlock(blk[3]));
            }
        }else if(blk[0] == 'list:contains:'){
            return sprintf("(%s in %s)", this.parseBlock(blk[2]), blk[1]);
        }else if(blk[0] == 'lineCountOfList:'){
            return sprintf("(len(%s))", blk[1]);
        }else if(blk[0] == 'getLine:ofList:'){
            if (blk[1] == 'last') {
                return sprintf("%s[-1]", blk[2]);
            } else if (blk[1] == 'random') {
                return sprintf("random.choice(%s)", blk[2]);
            }else{
                return sprintf("%s[%s - 1]", blk[2], this.parseBlock(blk[1]));
            }
        } else {
            return json_encode(blk) + "\n";
        }
    }


    /*
     * 解析代码块
     * 目前只考虑了自定义函数和主MC代码块，其他忽略
     */
    parseScript(script, is_main = false)
    {
        blocks = script[2];
        if (blocks[0][0] == 'procDef') {
            // func defination
            this.C += "def " + this.castVarName(blocks[0][1], true) + this.buildFuncParams(blocks[0][2]) + ":\n";
            this.scriptIndent++;
            // 添加全局变量的声明（直接访问，若有先改变值，再设置变量值的语句，会导致变量未定义错误
            if(count(this.globalVarList)){
                this.C += this.getIndent() + "global " + this.globalVarList.join(", ") + "\n";
            }

            unset(blocks[0]);
            for(let block in blocks) {
                this.C += this.getIndent() + this.parseBlock(blocks[block]);
            }
            this.C += "\n";
            this.scriptIndent--;
        }else if(is_main){
            unset(blocks[0]); // unset head block
            for(let block in blocks) {
                this.C += this.getIndent() + this.parseBlock(blocks[block]);
            }
        }
    }

    shiftMainScript(scripts)
    {
        found = null;
        for( let k in scripts) {
            if (strpos(script[2][0][0], '.Minecraft')) {
                found = scripts[k];
                unset(scripts[k]);
            }
        }
        return found;
    }


    toPython()
    {
        // json = json_decode(file_get_contents('mc.json'));
        json = JSON.parse(this.data);

        if (! this.checkIsMC(json)) {
            console.log("not a mc work");
            exit(0);
        }

        if(empty(json.scripts)){
            return ""; // empty code in stage
        }

        // 暂时认为，没有角色，代码写在背景中，只有全局变量
        if(isset(json.variables)){
            variables = json.variables;
            this.parseVars(variables);
        }

        // 列表
        if(isset(json.lists)){
            lists = json.lists;
            this.parseLists(lists);
        }

        scripts = json.scripts;

        // 找到主程序（放在最后解析）
        main = this.shiftMainScript(scripts);

        for(let s in scripts) {
            this.parseScript(scripts[s]);
        }

        this.parseScript(main, true);

        return this.C;
    }

}
