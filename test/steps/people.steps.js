/*jshint expr: true*/
'use strict';

var Yadda = require('yadda');
var expect = require('./common/chai.helpers').expect;
var formatHttpError = require('./common/http.helpers').formatHttpError;
var peopleService = require('./services/people.service');

var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;
var Promise = require('bluebird');

var dictionary = new Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

module.exports = English.library(dictionary)
    .given('the following person\n$table', function (table, next) {
        var self = this;
        var person = table[0];
          peopleService.createPerson(person)
            .then(function (createdPerson) {
                self.ctx.person = createdPerson;
                next();
            });
    })
    .given('the following people\n$table',function(table, next){
        var allpromises=[];
        var self = this;
        self.ctx.persons=[];
        for(var i=0;i<table.length;i++){
            var promise = peopleService.createPerson(table[i]);
            promise.then(function (createdPerson) {
                self.ctx.persons.push(createdPerson);
            });
            allpromises.push(promise);
        }
         Promise.all(allpromises).then(function(){
             next();
         });
            
    })
    .when('I create the following person\n$table', function (table, next) {
        var self = this;
        var person = table[0];

        peopleService.createPerson(person)
            .then(function (createdPerson) {
                self.ctx.person = createdPerson;
                next();
            });
    })
    .when('I ask for the person $username', function (username, next) {
        var self = this;
        peopleService.getPerson(username)
            .then(function (person) {
                self.ctx.person = person;
                next();
            })
            .catch(function (httpError) {
                self.ctx.error = formatHttpError(httpError);
                next();
            });
    })
    .when('I change the person $username as follows\n$table', function (username, table, next) {
        var self = this;
        var person = table[0];
        peopleService.updatePerson(username, person)
            .then(function (person) {
                self.ctx.person = person;
                next();
            });
    })
    .when('I release the person $username', function (username, next) {
        var self = this; 
        peopleService.deletePerson(username)
            .then(function (person) {
                self.ctx.person = person;
                next();
            });
    })
    .then('I should get the following person\n$table', function (table, next) {
        var expectedPerson = table[0];
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.person).to.exist;
        expect(this.ctx.person.username).to.equal(expectedPerson.username);
        expect(this.ctx.person.firstName).to.equal(expectedPerson.firstName);
        expect(this.ctx.person.metro).to.equal(expectedPerson.metro); 
        expect(this.ctx.person.title).to.equal(expectedPerson.title);
        next();
    })
    .then('I should get the following message\n$table', function (table, next) {
        var expectedPerson = table[0];
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.person).to.exist;
        expect(this.ctx.person.message).to.equal(expectedPerson.message); 
        next();
    });
 
