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
                cp.PDC.set("chart", cp.D.querySelector(".deCode-chart"));
                cp.PDC.set("panel", cp.D.querySelector(".deCode-panel"));
                cp.PDC.set("context", cp.D.querySelector(".deCode-context"));
                cp.PDC.get("chart")();
                cp.PDC.get("panel")();
            }
        // グラフ生成
        } else if("chart") {
            return function() {
                var table_chart_elm = cp.D.createElement("table");
                for(var i = 0, len_i = cp.PDC.is("chart_height");i < len_i;i++) {
                    var tr_chart_elm = cp.D.createElement("tr");
                    for(var j = 0, len_j = cp.PDC.is("chart_width");j < len_j;j++) {
                        var td_chart_elm = cp.D.createElement("td");
                        td_chart_elm.setAttribute("class", "chart-one");
                        td_chart_elm.setAttribute("onclick", "cp.PDC.get('open')('panel')");
                        td_chart_elmd.dataset.posy = i;
                        td_chart_elmd.dataset.posx = j;
                        tr_chart_elm.appendChild(td_chart_elm);
                    }
                    table_chart_elm.appendChild(tr_chart_elm);
                }
                cp.PDC.is("chart").appendChild(table_chart_elm);
            }
        // パネル生成
        } else if("panel") {
            return function() {
                for(var i = 0, len_i = cp.PDC.is("panel_names").length;i < len_i;i++) {
                    var image_panel_elm = cp.D.createElement("input");
                    image_panel_elm.setAttribute("type", cp.PDC.is("panel_names")[i].type);
                    image_panel_elm.setAttribute("value", cp.PDC.is("panel_names")[i].value);
                    image_panel_elm.setAttribute("onclock", "cp.PDC.get('context')(" + cp.PDC.is("panel_names")[i].onclock + ")");
                    cp.PDC.is("panel").appendChild(image_panel_elm);
                }
                cp.PDC.is("panel").appendChild(cp.PDC.get("createCloseButton")("panel"));
            }
        // コンテキスト生成
        } else if("context") {
            return function(args) {
                var context_setting = cp.PDC.is(args);
                for(var i = 0, len_i = context_setting.length;i < len_i;i++) {
                    var comment_context_elm = cp.D.createElement("p");
                    comment_context_elm.appendChild(cp.D.crateTextNode(cp.PDC.is("panel_names")[i].node));
                    if(cp.PDC.is("panel_names")[i].type === "textarea") {
                        var input_context_elm = cp.D.createElement("textarea");
                    } else {
                        var input_context_elm = cp.D.createElement("input");
                        input_context_elm.setAttribute("type", cp.PDC.is("panel_names")[i].type);
                        input_context_elm.setAttribute("value", cp.PDC.is("panel_names")[i].value);
                    }
                    comment_context_elm.appendChild(input_context_elm);
                    cp.PDC.is("context").appendChild(comment_context_elm);
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
                var close_panel_elm = cp.D.createElement("p");
                var close_panel_input = cp.D.createElement("input");
                close_panel_input.setAttribute("type", "button");
                close_panel_input.setAttribute("value", "閉じる");
                close_panel_input.setAttribute("onclock", "cp.PDC.get('close')(" + args + ")");
                return close_panel_elm.appendChild(close_panel_input);
            }
        }
    }
}