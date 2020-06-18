'use strict'
var axios       = require( 'axios' );
var jwt         = require( 'jsonwebtoken' );
var data        = require( '../controllers/data'  );
var Util        = require( '../utilities/util'  );

/***********************************************************************************
****************** Funciones invocadas en las rutas ********************************
************************************************************************************/
function getJWTPrase(){
    return 'your_magic_pass=';
}
const getIsUserAuthenticated = async ( req, res ) => {
    const params = req.body; //POST VERB

    await data.getDataEntities(req, res)
        .then(responseData => {
            
            if(responseData !== undefined && responseData[0] && responseData[0].id === params.id && responseData[0].email === params.email)  {
                const user  = {id: params.id, Email: params.email}
                const token = jwt.sign({user}, getJWTPrase())
                res.json({
                    token
                })
            } else {
                res.status( 403 ).send()
            }

        })
        .catch(error => {
            console.log('Error getIsUserAuthenticated->getDataEntities',error);
            res.status( 403 ).send()
        })
}
const verifyToken = (token) => {

    const isVerifyToken = jwt.verify(
        token, 
        getJWTPrase(),
        function(err, dataUserLogged) {
            if (err) {
                return {valid:false};
            } else {

                if(dataUserLogged !== undefined) {

                    if(dataUserLogged.user.id){                        
                        return {valid:true,Email:dataUserLogged.user.Email};
                    }
                    else {
                        return {valid:false};
                    }
                } else {
                    return {valid:false};
                }
            }
        }
    )
    return isVerifyToken;
}
module.exports = { 
    getIsUserAuthenticated,
    verifyToken
}