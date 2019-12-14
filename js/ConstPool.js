function ConstPool() {
    this.D = document;
    this.FC = new FunctionContainer;
    this.PDC = new PanelDeCode;
    //this.w = new Xworker;
    this.get = function(args){
        var result;
        switch (args) {
            case "d":
                result = this.D;
                break;
            case "fc":
                result = this.FC;
                break;
            case "pdc":
                    result = this.PDC;
                    break;
            case "w":
                //result = this.d;
                break;
        }
        return result;
    }
}