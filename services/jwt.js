'use strict'

var jwt    = require( 'jwt-simple' );
var moment = require( 'moment'     );
var secret = 'A.S.K#2019$01$30?';

function createToken( driver ) {
    var payload = {
        sub: driver.email,
        name: driver.name,
        lastName: driver.lastName,
        birthDay: driver.birthDay,
        licenseExpiration: driver.licenseExpiration,
        iat: moment().unix(),
        exp: moment().add( 1, 'days' ).unix
    }

    return jwt.encode( payload, secret );
}


function decodeToken( token ) {
    return jwt.decode( token, secret );
}


module.exports = {
    createToken,
    decodeToken
}