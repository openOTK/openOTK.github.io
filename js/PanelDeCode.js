function PanelDeCode() {
    this.CONSTANT = {
        "chart_width":8,
        "chart_height":8,
        "panel_names":[
            {"type":"button", "value":"スタート" ,"clickEvent":"context_function"},
            {"type":"button", "value":"条件分岐(if)" ,"clickEvent":"context_if"},
            {"type":"button", "value":"条件分岐(else if)" ,"clickEvent":"context_else_if"},
            {"type":"button", "value":"ループ(for)" ,"clickEvent":"context_for"},
            {"type":"button", "value":"フリー" ,"clickEvent":"context_free"},
            {"type":"button", "value":"次へ" ,"clickEvent":"context_next"}
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
    this.get = function(args) {
        // 初期化
        if(args === "init") {
            return function() {
                cp.D.querySelector("#createNewPDC").disabled = true;
                cp.PDC.get("chart")();
                cp.PDC.get("panel")();
            }
        // グラフ生成
        } else if(args === "chart") {
            return function() {
                var deCodeChart = cp.D.querySelector(".deCode-chart");
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
                deCodeChart.appendChild(chart_table_elm);
            }
        // パネル生成
        } else if(args === "panel") {
            return function() {
                var deCodePanel = cp.D.querySelector(".deCode-panel");
                for(var i = 0, len_i = cp.PDC.is("panel_names").length;i < len_i;i++) {
                    var panel_image_elm = cp.D.createElement("input");
                    panel_image_elm.setAttribute("type", cp.PDC.is("panel_names")[i].type);
                    panel_image_elm.setAttribute("value", cp.PDC.is("panel_names")[i].value);
                    panel_image_elm.setAttribute("onclick", "cp.PDC.get('context')('" + cp.PDC.is("panel_names")[i].clickEvent + "')");
                    deCodePanel.appendChild(panel_image_elm);
                }
                deCodePanel.appendChild(cp.PDC.get("createCloseButton")("panel"));
            }
        // コンテキスト生成
        } else if(args === "context") {
            return function(args) {
                var deCodeContext = cp.D.querySelector(".deCode-context");
                deCodeContext.innerHTML = "";
                var context_setting = cp.PDC.is(args);
                for(var i = 0, len_i = context_setting.length;i < len_i;i++) {
                    var context_p_elm = cp.D.createElement("p");
                    context_p_elm.appendChild(cp.D.createTextNode(context_setting[i].node));
                    if(context_setting.type === "textarea") {
                        var context_input_elm = cp.D.createElement("textarea");
                    } else {
                        var context_input_elm = cp.D.createElement("input");
                        context_input_elm.setAttribute("type", context_setting.type);
                        context_input_elm.setAttribute("value", context_setting.value);
                    }
                    context_p_elm.appendChild(context_input_elm);
                    deCodeContext.appendChild(context_p_elm);
                }
                deCodeContext.appendChild(cp.PDC.get("createCloseButton")("context"));
                cp.PDC.get("close")("panel");
                cp.PDC.get("open")("context");
            }
        // 小窓開くイベント
        } else if(args === "open") {
            return function(args) {
                var open_elm = cp.D.querySelector(".deCode-" + args);
                if(open_elm.classList.contains("disp-close")) {
                    open_elm.classList.remove("disp-close");
                }
            }
        // 小窓閉じるイベント
        } else if(args === "close") {
            return function(args) {
                var close_elm = cp.D.querySelector(".deCode-" + args);
                if(!close_elm.classList.contains("disp-close")) {
                    close_elm.classList.add("disp-close");
                }
            }
        // 閉じるボタン生成
        } else if(args === "createCloseButton") {
            return function(args) {
                var close_p_elm = cp.D.createElement("p");
                var close_input_elm = cp.D.createElement("input");
                close_input_elm.setAttribute("type", "button");
                close_input_elm.setAttribute("value", "閉じる");
                close_input_elm.setAttribute("onclick", "cp.PDC.get('close')('" + args + "')");
                close_p_elm.appendChild(close_input_elm);
                return close_p_elm;
            }
        }
    };
}