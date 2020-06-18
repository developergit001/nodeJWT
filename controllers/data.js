'use strict'
var axios    = require( 'axios' );
var Util   = require( '../utilities/util' );

/***********************************************************************************
****************** Funciones invocadas en las rutas ********************************
************************************************************************************/
const getDataEntities = async ( req, res ) => {
    var url     = Util.getPath().searchdata_url;
    var tokenPair = Util.getTokensPair();
    const params = req.body; //POST VERB
    let backurl = url + "?id=" + params.id;

    const output = await axios.get(backurl, {
        headers:{
            "X-corp-API-AppKey": tokenPair["x-corp-api-appkey"],
            "X-corp-API-AppToken": tokenPair["x-corp-api-apptoken"]
        }
    });
    
    let data = output.data
    return data
}
module.exports = { 
    getDataEntities
}