/*jshint expr: true*/
'use strict';

var Yadda = require('yadda');
var expect = require('./common/chai.helpers').expect;
var formatHttpError = require('./common/http.helpers').formatHttpError;
var accountService = require('./services/account.service');

var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;

var dictionary = new Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

module.exports = English.library(dictionary)

     
 
