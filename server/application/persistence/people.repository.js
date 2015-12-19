'use strict';

module.exports = {
    createPerson: createPerson,
    updatePerson: updatePerson,
    getPerson: getPerson,
    getPeople: getPeople,
    releasePerson: releasePerson,
    searchPeople: searchPeople,
    searchAvailabelPeople: searchAvailabelPeople,
    dropData: dropData
};

var _ = require('lodash');
var Promise = require('bluebird');
var Person = require('../../domain').Person;
var errors = require('../../infrastructure').errors;
var assignmentRepository = require('./assignment.repository');
var people = [];
var nextAutoId = 1;

function createPerson(personData) {
    var person = _.find(people, 'username', personData.username);
    if (person) {
        return Promise.resolve({ message: "'" + personData.username + "' as username already exists please use another username" });
    } else {
        person = new Person(personData);
        person.id = nextAutoId++;
        person.released = false;
        people.push(person);
        return Promise.resolve(person);
    }
}

function updatePerson(useraname, personData) {
    var person = _.find(people, 'username', useraname);
    return person ?
        Promise.resolve(_.extend(person, personData)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}
function formatReleaseMessage(person) {
    return person.firstName + ", " + person.lastName + " left the company";
}
function getPerson(username) {
    var person = _.find(people, 'username', username);
    return person ?
        (person.released ?
            Promise.resolve({ message: formatReleaseMessage(person) }) : Promise.resolve(person)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

function getPeople() {
    return Promise.resolve(people);
}

function releasePerson(username) {
    var person = _.find(people, 'username', username);
    return person ?
        Promise.resolve(_.extend(person, { released: true })) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

function searchPeople(criteria) {
    var result = _.filter(people, function (person) {
        if ((!criteria.metro || person.metro === criteria.metro) &&
            person.title === criteria.title) { return person; }
    });
    return Promise.resolve(result || []);
}
function searchAvailabelPeople(criteria) {
    var result = _.filter(people, function (person) {

        if ((!criteria.metro || person.metro === criteria.metro) &&
            person.title === criteria.title) {
            var assignments = assignmentRepository.getAssignmentsByPerson(person.username, true);
            var valid = true;
            for (var count = 0; count < assignments.length; count++) {
                var assignment = assignments[count];
                if (criteria.startDate.diff(assignment.startDate, 'days') > 0 &&
                    criteria.endDate.diff(assignment.endDate, 'days') < 0) {
                    valid = false;
                }
            }
            if (valid)
                return person;
        }
    });
    return result;
}
function dropData() {
    people.length = 0;
}
