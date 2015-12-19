/*jshint expr: true*/
'use strict';

var Yadda = require('yadda');
var expect = require('./common/chai.helpers').expect;
var formatHttpError = require('./common/http.helpers').formatHttpError;
var projectService = require('./services/project.service');

var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;
var Promise = require('bluebird');

var dictionary = new Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

module.exports = English.library(dictionary)
    .given('a project called "$name", identified by "$identifier"', function (name, identifier, next) {
        var self = this;
        projectService.createProject({ id: identifier, name: name })
            .then(function (createdProject) {
                self.ctx.project = createdProject;
                next();
            });
    })
    .given('the following projects\n$table',function(table, next){
        var allpromises=[];
        var self = this;
        self.ctx.projects=[];
        for(var i=0;i<table.length;i++){
            var promise = projectService.createProject(table[i]);
            promise.then(function (createdProject) {
                self.ctx.projects.push(createdProject);
            });
            allpromises.push(promise);
        }
         Promise.all(allpromises).then(function(){
             next();
         });
            
    })
    .when('I create a project called "$name", identified by "$identifier"', function (name, identifier, next) {
        var self = this;
        projectService.createProject({ id: identifier, name: name })
            .then(function (createdProject) {
                self.ctx.project = createdProject;
                next();
            });
    })
    .when('I change the name of the project $identifier to "$name"',function(identifier, name,  next){
         var self = this;
        projectService.updateProject(identifier,{name: name })
            .then(function (createdProject) {
                self.ctx.project = createdProject;
                next();
            });
    })
    .when('I remove the project $identifier',function(identifier,  next){
        projectService.deleteProject(identifier)
            .then(function () {                
                next();
            });
    })    
    .when('I ask for the project $identifier', function (identifier, next) {
        var self = this;
        projectService.getProject(identifier)
            .then(function (project) {
                self.ctx.project = project;
                next();
            })
            .catch(function (httpError) {
                self.ctx.error = formatHttpError(httpError);
                next();
            });
    })
    .then('I should get the "$name" project', function (name, next) {
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.project).to.exist;
        expect(this.ctx.project.name).to.equal(name);
        next();
    });