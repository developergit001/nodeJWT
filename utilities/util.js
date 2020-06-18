let CONSOLELOG = (process.env.CONSOLELOG)?process.env.CONSOLELOG:true;

var Environment = require( '../utilities/environtment'  );

function isValidParam( paramName, paramValue ) {
    if( paramValue == null ) {
        throw `Parametro ${paramName} no establecido`;
    }
    return true
}
function getEnv(){
    return (process.env.NODE_ENV)?process.env.NODE_ENV:"development";
}
function getPath(pkey){
    return Environment[getEnv()];
}
function consoleLog(msg, ...params){
    if (CONSOLELOG)
    console.log(msg,params);
}
function getCookie(req){ 
        let cookiemanual = (req && req.headers !== undefined && req.headers['authorization']) ? req.headers['authorization'] : '';    
        if (cookiemanual === ''){
            let params = req.body;
            cookiemanual = (params.authtoken !== undefined)?params.authtoken:'';
        }
        return cookiemanual;
}
function getTokensPair(){
    return {
        "x-corp-api-appkey":"corpappkey-xx",
        "x-corp-api-apptoken":"myhash"
    }
}
//Return the param x with trim regex applied.
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
module.exports = { 
    isValidParam,getEnv,getPath,consoleLog,getCookie,getTokensPair,myTrim
}