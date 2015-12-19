/**
 * api.js
 * Returns the api that will be used to create the HTTP server
 */
'use strict';

var express = require('express');
var api = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Add middleware to enable CORS
api.use(cors());

// Add middleware to parse the POST data of the body
api.use(bodyParser.urlencoded({extended: true}));

// Add middleware to parse application/json
api.use(bodyParser.json());

// Serve static content from the public directory
api.use('/', express.static(__dirname + '../../../../src'));

// Add API routes 
api.use('/accounts', require('./account.adapter').getRoutes());
api.use('/tests', require('./test.adapter').getRoutes());
api.use('/people', require('./people.adapter').getRoutes());
api.use('/projects', require('./project.adapter').getRoutes());
api.use('/assignments', require('./assignment.adapter').getSearchRoutes());

module.exports = api;