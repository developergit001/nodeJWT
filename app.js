'use strict'
var express     = require( 'express'     );
var bodyParser  = require( 'body-parser' );
var app         = express();

var environment = 'development'

if(process.env.NODE_ENV !== undefined) {
    switch(process.env.NODE_ENV) {
        case 'development': 
            environment = process.env.NODE_ENV
            break;
        default:
            environment = 'production'
            break;
    }
}
//Loading routes
var arrRoutes               = []
    arrRoutes['auth']       = '/api/v1/auth'
    arrRoutes['user']       = '/api/v1/user' 

app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json() );

// Config HTTP headers
app.use( ( req, res, next ) => {
    res.header( 'Access-Control-Allow-Origin' , '*' );
    res.header( 'Access-Control-Allow-Headers', 'Cookie, authtoken, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method' );
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
    res.header( 'Allow', 'GET, POST, PUT, DELETE, OPTIONS' );
    next();
} );

// routes
for (var obj in arrRoutes) {    
    var tmp = require('./routes/' + obj) 
    app.use(arrRoutes[obj], tmp)
}
module.exports = app;   