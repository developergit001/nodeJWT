'use strict'

var express         = require( 'express'             );
var auth           = require( '../controllers/auth' );
var api             = express.Router();

api.post ( '/login', auth.getIsUserAuthenticated );

module.exports = api;