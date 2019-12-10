var XHR = function(){
return function(args){
var httpObj = new XMLHttpRequest();
httpObj.open(args["method"],args["url"],args["async"]);
httpObj.responseType = args["type"];
httpObj.onload = args["collback"](args);
}
httpObj.send();
};
