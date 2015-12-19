'use strict';

module.exports = {
    createAssignment: createAssignment,
    updateAssignment:updateAssignment,
    getAssignment:getAssignment,
    getAssignmentsByProject:getAssignmentsByProject,
    assignStaffer:assignStaffer,
    assignAssignee:assignAssignee,
    searchAssignmentsByStaffer:searchAssignmentsByStaffer,
    serarchSuitableCandidates:serarchSuitableCandidates,
    searchAll:searchAll
};

var persistence = require('./persistence');
var Promise = require('bluebird');
var assignmentRepository = persistence.assignmentRepository;
var peopleSearvice = require("./people.service");
  
function createAssignment(assignment) {
    return assignmentRepository.createAssignment(assignment);
}
function updateAssignment(projId, assId, assignment){
    return assignmentRepository.updateAssignment(projId, assId, assignment);
}
function getAssignmentsByProject(projectId) {
    return assignmentRepository.getAssignmentsByProject(projectId);
}
function getAssignment(projId,assId){
    return assignmentRepository.getAssignment(projId,assId);
}
function assignStaffer(projId,assId,staffId){
    return assignmentRepository.assignStaffer(projId,assId,staffId);
}
function assignAssignee(projId,assId,assigneeId){
    return assignmentRepository.assignAssignee(projId,assId,assigneeId);
}
function searchAssignmentsByStaffer(staffer, start, end){
    return assignmentRepository.searchAssignmentsByStaffer(staffer, start, end);
}
function searchAll(){
    return assignmentRepository.getAll();
}
function serarchSuitableCandidates(projId, assId){
     var assignment = assignmentRepository.getAssignmentT(projId,assId); 
     var result =  peopleSearvice.searchAvailabelPeople({
        //  metro:assignment.metro,
         title:assignment.title,
         startDate:assignment.startDate,
         endDate:assignment.endDate
     });
     return Promise.resolve(result);
}