/*jshint expr: true*/
'use strict';

var Yadda = require('yadda');
var expect = require('./common/chai.helpers').expect;
var formatHttpError = require('./common/http.helpers').formatHttpError;
var assignmentService = require('./services/assignment.service');

var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;
var Promise = require('bluebird');
var _ = require('lodash');

var dictionary = new Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table)
     .define('list', /([^\u0000]*)/, Yadda.converters.list);

module.exports = English.library(dictionary)
    .when('staffing owner $staffer asks for her assignments starting between $start and $end', function (staffer, start, end, next) {
        var self = this;
        assignmentService.searchAssignmentsByStaff(staffer, start, end)
            .then(function (assignments) {
                self.ctx.assignments = assignments;
                next();
            });
    })
    .when('a staffing owner asks for people matching assignment $projId:$assId', function (projId, assId, next) {
        var self = this;
        assignmentService.getMatchingCandidates(projId, assId)
            .then(function (candidates) {
                self.ctx.candidates = candidates;
                next();
            });
    })
    .then('the following people should be shown\n$list', function (list, next) {
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.candidates).to.exist; 
        expect(list.length).to.equal(this.ctx.candidates.length);
        for (var i = 0; i < list.length; i++) {
            var dataToVerify = _.filter(this.ctx.candidates, 'username', list[i]);
            expect(list[i]).to.equal(dataToVerify[0].username);
        } 
        next();
    })
    .then('the following assignments are shown\n$table', function (table, next) {
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.assignments).to.exist;
        expect(this.ctx.assignments.length).to.equal(table.length);
        for (var i = 0; i < table.length; i++) {
            var dataToVerify = _.filter(this.ctx.assignments, function (assignment) {
                return (assignment.projId == table[i].projId &&
                    assignment.id == table[i].id)
            });
            expect(table[i].startDate).to.equal(dataToVerify[0].startDate);
            expect(table[i].endDate).to.equal(dataToVerify[0].endDate);
            expect(table[i].title).to.equal(dataToVerify[0].title);
            expect(table[i].metro).to.equal(dataToVerify[0].metro);
        } 
        next();
    });
    