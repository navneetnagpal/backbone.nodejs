'use strict';

module.exports = {
    getRoutes: getRoutes
};
var express = require('express');
var router = express.Router();
/**
 * Adds routes to the router.
 */
function getRoutes() {
    router.post('/', createPerson);
    router.put('/:username', updatePerson);
    router.get('/:username', getPerson);
    router.get('/', getPeople);
    router.delete('/:username', releasePerson);
    return router;
}

var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var peopleService = require('../../application').peopleService;

/**
 * Creates a new Person and inserts it in to the database.
 * @param {Object} req - req.body contains PersonData minus the id
 * @param {Object} res - res.body contains the inserted Person (including the id)
 */
function createPerson(req, res) {

    var personData = req.body;

    peopleService.createPerson(personData)
        .then(function(person) {
            res.send(person);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

 
function updatePerson(req, res) {

    var personData = req.body;

    peopleService.updatePerson(req.params.username, personData)
        .then(function(person) {
            res.send(person);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

 
function getPerson(req, res) {
    var username =req.params.username;

    peopleService.getPerson(username)
        .then(function(person) {
            res.send(person);
        })
        .catch(errors.NotFoundError, function() {
            res.status(404).send({'message': 'Person ' + username + ' does not exist'});
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
 
function getPeople(req, res) {
    peopleService.getPeople()
        .then(function(people) {
            res.send(people);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
 
function releasePerson(req, res) {
 

    peopleService.releasePerson(req.params.username)
        .then(function() {
            res.status(204).send();  // No Content
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
