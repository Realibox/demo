Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "H+": this.getHours(),  
        "m+": this.getMinutes(),
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()  
    };
    var year = this.getFullYear();
    var yearstr = year + '';
    yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;
    
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

class Utils {
    constructor(args) {
        this.styles = {
            'bold'          : ['\x1B[1m',  '\x1B[22m'],
            'italic'        : ['\x1B[3m',  '\x1B[23m'],
            'underline'     : ['\x1B[4m',  '\x1B[24m'],
            'inverse'       : ['\x1B[7m',  '\x1B[27m'],
            'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
            'white'         : ['\x1B[37m', '\x1B[39m'],
            'grey'          : ['\x1B[90m', '\x1B[39m'],
            'black'         : ['\x1B[30m', '\x1B[39m'],
            'blue'          : ['\x1B[34m', '\x1B[39m'],
            'cyan'          : ['\x1B[36m', '\x1B[39m'],
            'green'         : ['\x1B[32m', '\x1B[39m'],
            'magenta'       : ['\x1B[35m', '\x1B[39m'],
            'red'           : ['\x1B[31m', '\x1B[39m'],
            'yellow'        : ['\x1B[33m', '\x1B[39m'],
            'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
            'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
            'blackBG'       : ['\x1B[40m', '\x1B[49m'],
            'blueBG'        : ['\x1B[44m', '\x1B[49m'],
            'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
            'greenBG'       : ['\x1B[42m', '\x1B[49m'],
            'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
            'redBG'         : ['\x1B[41m', '\x1B[49m'],
            'yellowBG'      : ['\x1B[43m', '\x1B[49m']
        };

    }

    log(style, ...strs){
        let s = 's%';
        let logps = [];
        strs.forEach((str, index)=>{
            if(Object.prototype.toString.call(str)=='[object String]'){
                if(index==0){
                    s = ' %s '
                }else{
                    s += '%s ';
                }
            }
        });
        s = this.styles[style][0] + s + this.styles[style][1];
        console.log(s,...strs);
    }
}
const u = new Utils();
module.exports = u;
