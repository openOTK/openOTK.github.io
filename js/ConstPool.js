export function ConstPool() {
    this.d = document;
    this.f = new FunctionContainer;
    this.w = new Xworker;
    this.get = function(args){
        var result;
        switch (args) {
            case "d":
                result = this.d;
                break;
            case "f":
                result = this.d;
                break;
            case "w":
                result = this.d;
                break;
        }
        return result;
    }
}