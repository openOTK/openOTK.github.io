function PanelDeCode() {
    this.get = function(args) {
        // ロードイベント
        if(args === "init") {
            return function(args) {
                // グラフ生成
                var deCode_chart_elm = cp.d.querySelector(".deCode-chart");
                var table_chart_elm = cp.d.createElement("table");
                for(var i = 0, len_i = 8;i < len_i;i++) {
                    var tr_chart_elm = cp.d.createElement("tr");
                    for(var j = 0, len_j = 8;j < len_j;j++) {
                        var td_chart_elm = cp.d.createElement("td");
                        tr_chart_elm.appendChild(td_chart_elm);
                    }
                    table_chart_elm.appendChild(tr_chart_elm);
                }
                deCode_chart_elm.appendChild(table_chart_elm);
                // パネル生成
                var deCode_panel_elm = cp.d.querySelector(".deCode-panel");
                var image_panel_elm = cp.d.createElement("img");
                deCode_panel_elm.appendChild(image_panel_elm);
                // コンテキスト生成
                var deCode_context_elm = cp.d.querySelector(".deCode-context");
                var input_context_elm = cp.d.createElement("input");
                input_context_elm.setAttribute("type", "text");
                deCode_context_elm.appendChild(input_context_elm);
            }
        }
    }
}