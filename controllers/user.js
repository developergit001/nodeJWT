'use strict'
var axios       =   require( 'axios' );
var Util        =   require( '../utilities/util' );
var auth        =   require( '../controllers/auth' );

/***********************************************************************************
****************** Functions loaded in routes **************************************
************************************************************************************/
const getUserList = async ( req, res ) => {
    /*** Request with token by jsonwebtoken (jwt) ***/
    const params = req.body; //POST VERB
    const token = (params.token !== undefined) ? params.token : '';
    let orders = (params.orders !== undefined) ? params.orders : '';
    orders = orders.split(";");

    let isValidToken = {valid:false};

    if(token !== '') {
        try{
            isValidToken = await auth.verifyToken(token);
        }catch(err){
            //console.log('error eval token jwt',err);
            isValidToken = {valid:false};
        }

        if(isValidToken === undefined || isValidToken.valid === undefined || isValidToken.valid === false)
        res.status( 403 ).send( { cod: 1, msg: 'Error auth' } );

    } else {
        res.status( 403 ).send( { cod: 1, msg: 'Error auth.' } );
    }

    /*** Request with token by jsonwebtoken (jwt) ***/
    if (isValidToken !== undefined && isValidToken.valid !== undefined && isValidToken.valid){
            
        loadUser(orders)
        .then(responseUser => {
            
            const result = loadUserPostAjax(responseUser);
            res.status( 200 ).send( { cod: 0, entity: result });

        })
        .catch(errUser => {
            console.log('Error errUser',errUser);
            res.status( 200 ).send( { cod: 1, msg: `Error errUser` } ); 
        })

    } 
}
/********************************************OTHER FUNCTIONS *************************************/
const loadUser = async (orderUser) => {
    let UserUrl = Util.getPath().domain_url;
    let dataquery = [];

    for (let x=0;x<orderUser.length;x++){
        
        let getUserUrl = UserUrl + orderUser[x];

        let url = axios.get(getUserUrl).then(r => {

          if (r.status === 404 || r.status === 500 || r.status === 400) {
            //Util.consoleLog("ERROR User with error 500");
          } else {
            return r;
          }

        });
        dataquery.push(url);
    }

    /*
      Create theREQUEST to User
      Using a promise all
    */

   const toResultObject = (promise) => {
    return promise
    .then(result => ({ success: true, result: result.data }))
    .catch(error => ({ success: false, error }));
   };

   const output = Promise.all(dataquery.map(toResultObject));
   let data = output
   
   return data;

}
const loadUserPostAjax = (values) =>{
    let miDataUser = [];
  
    for (let i = 0; i < values.length; i++) {
      if (values[i].success && values[i].result.orders !== undefined) {
        miDataUser.push({orders:values[i].result.orders});
      }
      //else { Util.consoleLog("loadUserPostAjax.values.ERR: ",values[i].error); }

    }

    return miDataUser;
}

module.exports = { 
  getUserList
}
