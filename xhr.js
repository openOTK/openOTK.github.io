var XHR = function(){
return function(args){
var httpObj = new XMLHttpRequest();
httpObj.open(args["method"],args["url"],args["type"]);
httpObj.onload = args["collback"](args);
}
};
