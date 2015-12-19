'use strict';

module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    getProject: getProject,
    getProjects: getProjects,
    deleteProject: deleteProject
};

var api = require('../common/constants').api;
var request = require('./request');


function createProject(project) {

    return request.post(api + '/projects')
        .send(project)
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
function updateProject(id, project) {

    return request.put(api + '/projects/' + id)
        .send(project)
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
function getProject(id) {

    return request.get(api + '/projects/' + id)
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
function getProjects() {

    return request.get(api + '/projects')
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
function deleteProject(id) {

    return request.del(api + '/projects/' + id)
        .endAsync();
}
