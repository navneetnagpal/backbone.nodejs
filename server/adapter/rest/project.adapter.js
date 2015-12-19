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
    router.post('/', createProject);
    router.put('/:projId', updateProject);
    router.get('/:projId', getProject);
    router.get('/', getProjects);
    router.delete('/:projId', deleteProject);
    router.use('/:projId/assignments', require('./assignment.adapter').getRoutes());
    return router;
}

var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var projectService = require('../../application').projectService;
 
function createProject(req, res) {
    var projectData = req.body;
    projectService.createProject(projectData)
        .then(function(project) {
            res.send(project);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

 
function updateProject(req, res) {
    var projectData = req.body;
    projectService.updateProject(req.params.projId, projectData)
        .then(function(project) {
            res.send(project);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

 
function getProject(req, res) {
    var id =req.params.projId;
    projectService.getProject(id)
        .then(function(project) {
            res.send(project);
        })
        .catch(errors.NotFoundError, function() {
            res.status(404).send({'message': 'Project ' + id + ' does not exist'});
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
 
function getProjects(req, res) {
    projectService.getProjects()
        .then(function(people) {
            res.send(people);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
 
function deleteProject(req, res) { 
    projectService.deleteProject(req.params.projId)
        .then(function() {
            res.status(204).send();  // No Content
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
