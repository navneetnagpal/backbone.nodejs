/*jshint expr: true*/
'use strict';

var Yadda = require('yadda');
var expect = require('./common/chai.helpers').expect;
var formatHttpError = require('./common/http.helpers').formatHttpError;
var assignmentService = require('./services/assignment.service');

var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;
var Promise = require('bluebird');

var dictionary = new Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

module.exports = English.library(dictionary)
    .given('the following assignment\n$table', function (table, next) {
        var self = this;
        var assignment = table[0];
        assignmentService.createAssginment(assignment)
            .then(function (createdAssignment) {
                self.ctx.assignment = createdAssignment;
                next();
            });
    })
    .given('the following assignments\n$table', function (table, next) {
        var allpromises = [];
        var self = this;
        self.ctx.assignments = [];
        for (var i = 0; i < table.length; i++) {
            var promise = assignmentService.createAssginment(table[i]);
            promise.then(function (createdAssignment) {
                self.ctx.assignments.push(createdAssignment);
            });
            allpromises.push(promise);
        }
        Promise.all(allpromises).then(function () {
            next();
        });
    })
    .when('I create the following assignment\n$table', function (table, next) {
        var self = this;
        var assignment = table[0];
        assignmentService.createAssginment(assignment)
            .then(function (createdAssignment) {
                self.ctx.assignment = createdAssignment;
                next();
            });
    })
    .when('I change the assignment $projId:$assId as follows\n$table', function (projId, assId, table, next) {
        var self = this;
        var assignment = table[0];
        assignmentService.updateAssignment(projId, assId, assignment)
            .then(function (assignment) {
                self.ctx.assignment = assignment;
                next();
            });
    })
    .when('I ask for the assignment $projId:$assId', function (projId, assId, next) {
        var self = this;
        assignmentService.getAssignment(projId, assId)
            .then(function (assignment) {
                self.ctx.assignment = assignment;
                next();
            });
    })
    
    .when('I assign $staffer as the staffing owner for assignment $projId:$assId', function (staffer,projId, assId, next) {
        var self = this;
        assignmentService.assignOwner(projId, assId, staffer)
            .then(function (assignment) {
                self.ctx.assignment = assignment;
                next();
            });
    })
    .when('I assign $assignee to the assignment $projId:$assId',function(assignee,projId, assId, next){
         var self = this;
        assignmentService.assignAssignee(projId, assId, assignee)
            .then(function (assignment) {
                self.ctx.assignment = assignment;
                next();
            });
    })
    .then('the assignment\'s staffing owner should be $staffer',function(staffer, next){
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.assignment).to.exist;
        expect(this.ctx.assignment.owner).to.equal(staffer);
        next();
    })
    .then('the assignment\'s assignee should be $assignee',function(assignee, next){
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.assignment).to.exist;
        console.log(this.ctx.assignment);
        expect(this.ctx.assignment.assignee).to.equal(assignee);
        next();
    })
    .then('the assignment\'s status should be $status',function(status, next){
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.assignment).to.exist;
        expect(this.ctx.assignment.status).to.equal(status);
        next();
    })
    .then('I should get the following assignment\n$table', function (table, next) {
        var assignment = table[0];
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.assignment).to.exist;
        expect(this.ctx.assignment.id).to.equal(assignment.id);
        expect(this.ctx.assignment.name).to.equal(assignment.name);
        expect(this.ctx.assignment.startDate).to.equal(assignment.startDate);
        expect(this.ctx.assignment.endDate).to.equal(assignment.endDate);
        expect(this.ctx.assignment.status).to.equal(assignment.status);
        expect(this.ctx.assignment.metro).to.equal(assignment.metro);
        expect(this.ctx.assignment.title).to.equal(assignment.title);
        next();
    });