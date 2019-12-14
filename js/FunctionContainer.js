function FunctionContainer() {
    this.get = function(args) {
        // ロードイベント
        if(args === "init") {
            return function() {
                var gnav_elm, click_event;
                gnav_elm = cp.D.querySelector(".gnav");
                for(var i = 0, len_i = gnav_elm.children.length;i < len_i;i++) {
                    click_event = cp.FC.get("contentChange");
                    gnav_elm.children[i].onclick = function(args) {
                        cp.FC.get("readFile")("openOTK.github.io/json/" + args.target.dataset.content + ".json");
                        click_event(args.target.dataset.content);
                    }
                }
            }
        // gnav押下イベント
        } else if(args === "contentChange") {
            return function(args) {
                var main_contents;
                main_contents = document.querySelectorAll(".main-content");
                for(var i = 0, len_i = main_contents.length;i < len_i;i++){
                    if(main_contents[i].dataset.content === args) {
                        if(main_contents[i].classList.contains("disp-close")) {
                            main_contents[i].classList.remove("disp-close");
                        }
                    } else {
                        if(!main_contents[i].classList.contains("disp-close")) {
                            main_contents[i].classList.add("disp-close");
                        }
                    }
                }
            }
        // コンテントエリア生成
        } else if(args === "readText") {
            return function(args) {
                var main_elm = cp.D.querySelector("#main").children[0];
                for(var i = 0, len_i = main_elm.children.length;i < len_i;i++){
                    // コンテントエリアを空にする
                    main_elm.children[i].innerHTML = "";
                    for(var j in args){
                        if(main_elm.children[i].dataset.content === j){
                            for(var k = 0, len_k = args[j].length;k < len_k;k++){
                                var text_block_elm, text_data_elm, text_info_elm, text_tips_elm;
                                // テキストブロック用要素生成
                                text_block_elm = cp.D.createElement("div");
                                text_data_info_elm = cp.D.createElement("p");
                                text_data_elm = cp.D.createElement("span");
                                text_info_elm = cp.D.createElement("span");
                                text_tips_elm = cp.D.createElement("div");
                                // jsonからテキストを設定
                                text_data_elm.innerHTML = args[j][k]["data"];
                                text_info_elm.innerHTML = args[j][k]["info"];
                                text_tips_elm.innerHTML = args[j][k]["tips"];
                                text_tips_elm.setAttribute("class", "indent-em1");
                                // テキストブロックに要素追加
                                text_data_info_elm.appendChild(text_data_elm);
                                text_data_info_elm.appendChild(text_info_elm);
                                text_block_elm.appendChild(text_data_info_elm);
                                text_block_elm.appendChild(text_tips_elm);
                                text_block_elm.setAttribute("class", "content-buttom");
                                // テキストブロックを各コンテンツ要素に設定していく
                                main_elm.children[i].appendChild(text_block_elm);
                            }
                        }
                    }
                }
            }
        // XMLHttpRequest
        } else if(args === "xhr") {
            return function(args){
                var httpObj = new XMLHttpRequest();
                httpObj.open(args["method"],args["url"],args["async"]);
                httpObj.responseType = args["type"];
                if(args["method"] === "POST") {
                    httpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }
                httpObj.onreadystatechange = function() {
                    switch (httpObj.readyState) {
                        case 0:
                            // 未初期化状態.
                            break;
                        case 1: // データ送信中.
                            break;
                        case 2: // 応答待ち.
                            break;
                        case 3: // データ受信中.
                            break;
                        case 4: // データ受信完了.
                            if( httpObj.status == 200 || httpObj.status == 304 ) {
                                args["collback"](httpObj.responseText);
                                httpObj.abort();
                            } else {
                                alert('Failed. HttpStatus:' + httpObj.statusText);
                                httpObj.abort();
                            }
                            break;
                    }
                }
                if(args["method"] === "POST") {
                    httpObj.send(JSON.stringify(args["request"]));
                } else {
                    httpObj.send();
                }
            }
        // xhrでファイル取得
        } else if(args === "readFile") {
            return function(args) {
                cp.FC.get("xhr")({
                    "method":"GET",
                    "url":args,
                    "async":true,
                    "type":"",
                    "collback":function(args) {
                        cp.FC.get("readText")(JSON.parse(args));
                    }
                });
            }
        } else if(args === "deCodeInit") {
            return function(args) {
                // グラフ生成
                var deCode_chart_elm = cp.D.querySelector(".deCode-chart");
                var table_chart_elm = cp.D.createElement("table");
                for(var i = 0, len_i = 8;i < len_i;i++) {
                    var tr_chart_elm = cp.D.createElement("tr");
                    for(var j = 0, len_j = 8;j < len_j;j++) {
                        var td_chart_elm = cp.D.createElement("td");
                        tr_chart_elm.appendChild(td_chart_elm);
                    }
                    table_chart_elm.appendChild(tr_chart_elm);
                }
                deCode_chart_elm.appendChild(table_chart_elm);
                // パネル生成
                var deCode_panel_elm = cp.D.querySelector(".deCode-panel");
                var image_panel_elm = cp.D.createElement("img");
                deCode_panel_elm.appendChild(image_panel_elm);
                // コンテキスト生成
                var deCode_context_elm = cp.D.querySelector(".deCode-context");
                var input_context_elm = cp.D.createElement("input");
                input_context_elm.setAttribute("type", "text");
                deCode_context_elm.appendChild(input_context_elm);
            }
        }
    }
}