var FunctionContainer = function() {
    this.get = function(args) {
        // ロードイベント
        if(args === "init") {
            return function() {
                var gnav_elm, click_event;
                gnav_elm = _d.querySelector(".gnav");
                for(var i = 0, len_i = gnav_elm.children.length;i < len_i;i++) {
                    click_event = _f.get("contentChange");
                    gnav_elm.children[i].onclick = function(args) {
                        _f.get("readFile")("./testText.json");
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
                var main_elm = _d.querySelector("#main").children[0];
                for(var i = 0, len_i = main_elm.children.length;i < len_i;i++){
                    // コンテントエリアを空にする
                    main_elm.children[i].innerHTML = "";
                    for(var j in args){
                        if(main_elm.children[i].dataset.content === j){
                            for(var k = 0, len_k = args[j].length;k < len_k;k++){
                                var text_block_elm, text_data_elm, text_info_elm, text_tips_elm;
                                // テキストブロック用要素生成
                                text_block_elm = _d.createElement("div");
                                text_data_elm = _d.createElement("p");
                                text_info_elm = _d.createElement("h4");
                                text_tips_elm = _d.createElement("p");
                                // jsonからテキストを設定
                                text_data_elm.textContent = args[j][k]["data"];
                                text_info_elm.textContent = args[j][k]["info"];
                                text_tips_elm.textContent = args[j][k]["tips"];
                                // テキストブロックに要素追加
                                text_block_elm.appendChild(text_data_elm);
                                text_block_elm.appendChild(text_info_elm);
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
                httpObj.send();
            }
        // xhrでファイル取得
        } else if(args === "readFile") {
            return function(args) {
                var xhr = _f.get("xhr");
                var rt = _f.get("readText");
                xhr({
                    "method":"GET",
                    "url":args,
                    "async":true,
                    "type":"",
                    "collback":function(args) {
                        var rt = _f.get("readText");
                        var json = JSON.parse(args);
                        rt(json);
                    }
                });
            }
        }
    }
}