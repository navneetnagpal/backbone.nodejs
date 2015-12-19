'use strict';

module.exports = {
    createAssignment: createAssignment,
    getAssignment:getAssignment,
    updateAssignment:updateAssignment,
    getAssignmentsByProject: getAssignmentsByProject,
    searchAssignmentsByStaffer:searchAssignmentsByStaffer,
    assignStaffer:assignStaffer,
    assignAssignee:assignAssignee,
    dropData: dropData,
    getAll:getAll,
    getAssignmentT:getAssignmentT,
    getAssignmentsByPerson:getAssignmentsByPerson
};

var _ = require('lodash');
var Promise = require('bluebird');
var Assignment = require('../../domain').Assignment;
var errors = require('../../infrastructure').errors;
var moment=require('moment');

var assignments = [];
var nextAutoId = 1;
function getAll(){
    return Promise.resolve(assignments);
}

function reviveDate(assignment){ 
    assignment.startDate = moment.utc(assignment.startDate); 
    assignment.endDate = moment.utc(assignment.endDate); 
    return assignment;
}
function reviveBackDate(assignment){     
    
    return _.extend({},assignment,{startDate:moment(assignment.startDate).format('YYYY-MM-DD'),
    endDate: moment(assignment.endDate).format('YYYY-MM-DD')});
}

function createAssignment(assignData) {
    var assignment = new Assignment(reviveDate(assignData));
    assignment.autoId = nextAutoId++;  
    assignments.push(assignment);
    return Promise.resolve(reviveBackDate(assignment));

}
function getAssignmentT(projId,assId) {
    var assignment = _.find(assignments,function(item){
        return item.projId==projId && item.id==assId;
    });
    
    return assignment;
}
function getAssignment(projId,assId) {
    var assignment = _.find(assignments,function(item){
        return item.projId==projId && item.id==assId;
    });
    
    return assignment ?
		Promise.resolve(reviveBackDate(assignment)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}
function updateAssignment(projId, assId, assData) {
    var returnObj = _.find(assignments,function(assobj){
        return assobj.id===assId && assobj.projId===projId;
    });
    return returnObj ?
        Promise.resolve(reviveBackDate(_.extend(returnObj, assData))) :
        Promise.reject(new errors.NotFoundError('Not found'));
}
function getAssignmentsByProject(projectId) {
	var result = _.filter(assignments, 'projId', projectId);
    return Promise.resolve(result &&  _.map(result,reviveBackDate)  || []);
}

function searchAssignmentsByStaffer(staffer, start, end){ 
    var rangeStart = start && moment(start);
    var rangeEnd = start && moment(end);
    var result = _.filter(assignments,function(assignment){
        
        return (assignment.owner===staffer
          && (!rangeStart || rangeStart.diff(assignment.startDate,'days')<=0 ) 
          && (!rangeEnd || rangeEnd.diff(assignment.startDate,'days')>=0)); 
    });
    return Promise.resolve(result && _.map(result,reviveBackDate) || []);
}

function assignStaffer(projId, assId, staffId){
     var returnObj = _.find(assignments,function(assobj){
        return assobj.id===assId && assobj.projId===projId;
    });
    return returnObj ?
        Promise.resolve(reviveBackDate(_.extend(returnObj, {owner:staffId}))) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

function assignAssignee(projId, assId, assigneId){
     var returnObj = _.find(assignments,function(assobj){
        return assobj.id===assId && assobj.projId===projId;
    });
    return returnObj ?
        Promise.resolve(reviveBackDate(_.extend(returnObj, {assignee:assigneId,status:"CFRM"}))) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

function getAssignmentsByPerson(personId,confirmed){
    var result = _.filter(assignments, 'assignee', personId);
    return result || [];
}
function dropData() {
    assignments.length = 0;
}
