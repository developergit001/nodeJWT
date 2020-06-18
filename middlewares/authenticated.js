'use strict'

var jwt    = require( '../services/jwt' );
var moment = require( 'moment'     );


function ensureAuth( req, res, next ) {
    if( !req.headers.authorization ) {
        return res.status( 403 ).send( { message: 'Petición no autorizada, cabecera sin token' } );
    }

    var token = req.headers.authorization.replace( /['"]+/g, '' );

    try {
        var payload = jwt.decodeToken( token );

        if( payload.exp <= moment.unix() ) {
            return res.status( 401 ).send( { message: 'Petición no autorizada, token no valido' } );    
        }
    }
    catch( err ) {
        return res.status( 404 ).send( { message: 'Petición no autorizada, token no valido' } );
    }

    req.driver = payload;

    next();
}


module.exports = {
    ensureAuth
}