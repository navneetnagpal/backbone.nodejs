'use strict';

module.exports = {
    createAssginment: createAssginment,
    updateAssignment: updateAssignment,
    getAssignment: getAssignment,
    getAssignments: getAssignments,
    deleteAssignement: deleteAssignement,
    searchAssignmentsByStaff: searchAssignmentsByStaff,
    getMatchingCandidates:getMatchingCandidates,
    assignAssignee: assignAssignee,
    assignOwner: assignOwner
};

var api = require('../common/constants').api;
var request = require('./request');


function createAssginment(assignment) {
    return request.post(api + '/projects/' + assignment.projId + '/assignments')
        .send(assignment)
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}

/**
 * Updates an Person.
 *
 * @param {Person} Person
 * @return {Promise<Person>}
 */
function updateAssignment(projId, assId, assignment) {

    return request.put(api + '/projects/' + projId + '/assignments/' + assId)
        .send(assignment)
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}

/**
 * Gets an Person
 *
 * @param {string} PersonId
 * @return {Promise<Person>}
 */
function getAssignment(projId, assId) {
    return request.get(api + '/projects/' + projId + '/assignments/' + assId)
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}

/**
 * Gets all Persons
 *
 * @return {Promise<Person[]>}
 */
function getAssignments(projId, assId) {

    return request.get(api + '/projects/' + projId + '/assignments')
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}
function assignOwner(projId, assId, staffId) {
    return request.put(api + '/projects/' + projId + '/assignments/' + assId + "/staffing-owner")
        .send({ staffId: staffId })
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}
function assignAssignee(projId, assId, assigneeId) {
    return request.put(api + '/projects/' + projId + '/assignments/' + assId + "/assignee")
        .send({ assignee: assigneeId })
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}

function searchAssignmentsByStaff(staffer, start, end) { 
    return request.get(api + '/assignments?staffingOwner=' + staffer + '&rangeStart=' + start + '&rangeEnd=' + end)
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}
function getMatchingCandidates(projId, assId) {
    console.log(api + '/projects/' + projId + '/assignments/' + assId + '/candidates');
    return request.get(api + '/projects/' + projId + '/assignments/' + assId + '/candidates')
        .endAsync()
        .then(function (res) {
            return res.body;
        });
}
/**
 * Deletes an Person.
 *
 * @static
 * @param {string} PersonId
 * @return {Promise<true>}
 */
function deleteAssignement(projId, assId) {

    return request.del(api + '/projects/' + projId + '/assignments/' + assId)
        .endAsync();
}
