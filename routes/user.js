'use strict'

var express         = require( 'express'             );
var user            = require( '../controllers/user' );
var api             = express.Router();

api.post ( '/list', user.getUserList );

module.exports = api;