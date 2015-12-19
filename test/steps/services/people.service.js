'use strict';

module.exports = {
    createPerson: createPerson,
    updatePerson: updatePerson,
    getPerson: getPerson,
    getPeople: getPeople,
    deletePerson: deletePerson
};

var api = require('../common/constants').api;
var request = require('./request');

 
function createPerson(person) {

    return request.post(api + '/people')
        .send(person)
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Updates an Person.
 *
 * @param {Person} Person
 * @return {Promise<Person>}
 */
function updatePerson(username, person) {

    return request.put(api + '/people/' + username)
        .send(person)
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Gets an Person
 *
 * @param {string} PersonId
 * @return {Promise<Person>}
 */
function getPerson(username) {

    return request.get(api + '/people/' + username)
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Gets all Persons
 *
 * @return {Promise<Person[]>}
 */
function getPeople() {

    return request.get(api + '/people')
        .endAsync()
        .then(function(res) {
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
function deletePerson(username) {

    return request.del(api + '/people/' + username)
        .endAsync();
}
