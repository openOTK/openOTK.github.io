function PanelDeCode() {
    this.CONSTANT = {
        "chart":"",
        "panel":"",
        "context":"",
        "chart_width":8,
        "chart_height":8,
        "panel_names":[
            {"type":"button", "value":"スタート" ,"onclick":"context_function"},
            {"type":"button", "value":"条件分岐(if)" ,"onclick":"context_if"},
            {"type":"button", "value":"条件分岐(else if)" ,"onclick":"context_else_if"},
            {"type":"button", "value":"ループ(for)" ,"onclick":"context_for"},
            {"type":"button", "value":"フリー" ,"onclick":"context_free"},
            {"type":"button", "value":"次へ" ,"onclick":"context_next"}
        ],
        "context_function":[
            {"node":"DOC", "type":"text", "value":""},
            {"node":"名前", "type":"text", "valaue":"newFunction"},
            {"node":"引数", "type":"text", "value":"args"},
            {"node":"コメント", "type":"text", "value":""},
            {"node":"", "type":"button", "value":"設定"}
        ],
        "context_if":[
            {"node":"コメント", "type":"text", "value":""},
            {"node":"条件", "type":"text", "valaue":""},
            {"node":"", "type":"button", "value":"設定"}
        ],
        "context_else_if":[
            {"node":"コメント", "type":"text", "value":""},
            {"node":"条件", "type":"text", "valaue":""},
            {"node":"", "type":"button", "value":"設定"}
        ],
        "context_for":[
            {"node":"コメント", "type":"text", "value":""},
            {"node":"終了条件", "type":"text", "valaue":""},
            {"node":"", "type":"button", "value":"設定"}
        ],
        "context_free":[
            {"node":"コメント", "type":"text", "value":""},
            {"node":"フリー入力<br>", "type":"textarea", "valaue":""},
            {"node":"", "type":"button", "value":"設定"}
        ],
        "context_next":[
            {"node":"コメント", "type":"text", "value":""},
            {"node":"戻り値", "type":"text", "valaue":""},
            {"node":"", "type":"button", "value":"設定"}
        ]
    };
    this.is = function(args){
        return cp.PDC.CONSTANT[args];
    };
    this.set = function(args){
        cp.PDC.CONSTANT[args.key] = args.value;
    };
    this.get = function(args) {
        // 初期化
        if(args === "init") {
            return function() {
                cp.D.querySelector("#createNewPDC").disabled = true;
                cp.PDC.set("chart", cp.D.querySelector(".deCode-chart"));
                cp.PDC.set("panel", cp.D.querySelector(".deCode-panel"));
                cp.PDC.set("context", cp.D.querySelector(".deCode-context"));
                cp.PDC.get("chart")();
                cp.PDC.get("panel")();
            }
        // グラフ生成
        } else if("chart") {
            return function() {
                var chart_table_elm = cp.D.createElement("table");
                for(var i = 0, len_i = cp.PDC.is("chart_height");i < len_i;i++) {
                    var chart_tr_elm = cp.D.createElement("tr");
                    for(var j = 0, len_j = cp.PDC.is("chart_width");j < len_j;j++) {
                        var chart_td_elm = cp.D.createElement("td");
                        chart_td_elm.setAttribute("class", "chart-one");
                        chart_td_elm.setAttribute("onclick", "cp.PDC.get('open')('panel')");
                        chart_td_elm.dataset.posy = i;
                        chart_td_elm.dataset.posx = j;
                        chart_tr_elm.appendChild(chart_td_elm);
                    }
                    chart_table_elm.appendChild(chart_tr_elm);
                }
                cp.PDC.is("chart").appendChild(chart_table_elm);
            }
        // パネル生成
        } else if("panel") {
            return function() {
                for(var i = 0, len_i = cp.PDC.is("panel_names").length;i < len_i;i++) {
                    var panel_image_elm = cp.D.createElement("input");
                    panel_image_elm.setAttribute("type", cp.PDC.is("panel_names")[i].type);
                    panel_image_elm.setAttribute("value", cp.PDC.is("panel_names")[i].value);
                    panel_image_elm.setAttribute("onclock", "cp.PDC.get('context')(" + cp.PDC.is("panel_names")[i].onclock + ")");
                    cp.PDC.is("panel").appendChild(panel_image_elm);
                }
                cp.PDC.is("panel").appendChild(cp.PDC.get("createCloseButton")("panel"));
            }
        // コンテキスト生成
        } else if("context") {
            return function(args) {
                var context_setting = cp.PDC.is(args);
                for(var i = 0, len_i = context_setting.length;i < len_i;i++) {
                    var context_p_elm = cp.D.createElement("p");
                    context_p_elm.appendChild(cp.D.crateTextNode(cp.PDC.is("panel_names")[i].node));
                    if(cp.PDC.is("panel_names")[i].type === "textarea") {
                        var context_input_elm = cp.D.createElement("textarea");
                    } else {
                        var context_input_elm = cp.D.createElement("input");
                        context_input_elm.setAttribute("type", cp.PDC.is("panel_names")[i].type);
                        context_input_elm.setAttribute("value", cp.PDC.is("panel_names")[i].value);
                    }
                    context_p_elm.appendChild(context_input_elm);
                    cp.PDC.is("context").appendChild(context_p_elm);
                }
                cp.PDC.is("context").appendChild(cp.PDC.get("createCloseButton")("context"));
                cp.PDC.get("close")("panel");
                cp.PDC.get("open")("context");
            }
        // 小窓開くイベント
        } else if("open") {
            return function(args) {
                if(cp.PDC.is(args).classList.contains("disp-close")) {
                    cp.PDC.is(args).classList.remove("disp-close");
                }
            }
        // 小窓閉じるイベント
        } else if("close") {
            return function(args) {
                if(!cp.PDC.is(args).classList.contains("disp-close")) {
                    cp.PDC.is(args).classList.add("disp-close");
                }
            }
        // 閉じるボタン生成
        } else if("createCloseButton") {
            return function(args) {
                var close_p_elm = cp.D.createElement("p");
                var close_input_elm = cp.D.createElement("input");
                close_input_elm.setAttribute("type", "button");
                close_input_elm.setAttribute("value", "閉じる");
                close_input_elm.setAttribute("onclock", "cp.PDC.get('close')(" + args + ")");
                return close_p_elm.appendChild(close_input_elm);
            }
        }
    }
}