'use strict';

module.exports = {
    getRoutes: getRoutes,
    getSearchRoutes:getSearchRoutes
};
var express = require('express');
/**
 * Adds routes to the api.
 */
function getRoutes() {
    var router = require('express').Router({"mergeParams":true});
    router.post("/",createAssignment);
    router.put("/:id",updateAssignment);
    router.get("/:id",getAssignments);
    // api.post('/assignments', createAssignment);
    router.put('/:id/staffing-owner', assignStaffer);
    router.put('/:id/assignee', assignAssignee);
    router.get('/:id/candidates', getMatchingCandidates);
    router.get('/', getAssignments);
    // api.get('/assignments/:projId', getAssignments);
    // api.delete('/assignments/:id', deleteProject);
    return router;
}
function getSearchRoutes(){
     var router = require('express').Router({"mergeParams":true});
      router.get('/', searchAssignments);
      router.get('/magic', getAll);
      return router;
}

var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var assignmentService = require('../../application').assignmentService;

function assignStaffer(req, res){
     var stafferData = req.body;
    var projectId = req.params.projId;
    var assId = req.params.id;  
    assignmentService.assignStaffer(projectId,assId,stafferData.staffId)
        .then(function (assignment) {
            res.send(assignment);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
}

function getAll(req, res){ 
    return assignmentService.searchAll().then(function (assignments) {
            res.send(assignments);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
}
function assignAssignee(req, res){
     var assigneeData = req.body;
    var projectId = req.params.projId;
    var assId = req.params.id;   
    assignmentService.assignAssignee(projectId,assId,assigneeData.assignee)
        .then(function (assignment) {
            res.send(assignment);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
}

function createAssignment(req, res) {
    var assignmentData = req.body; 
    assignmentService.createAssignment(assignmentData)
        .then(function (assignment) {
            res.send(assignment);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
}

function updateAssignment(req, res) {
    var assignmentData = req.body;
    var projectId = req.params.projId;
    var assId = req.params.id;  
    assignmentService.updateAssignment(projectId, assId, assignmentData)
        .then(function (assignment) {
            res.send(assignment);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
}

function searchAssignments(req, res) {
     var owner = req.query.staffingOwner;
     var rangeStart = req.query.rangeStart;  
     var rangeEnd = req.query.rangeEnd; 

    assignmentService.searchAssignmentsByStaffer(owner,rangeStart,rangeEnd)
        .then(function (assignments) {
            res.send(assignments);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
    
}

function getAssignments(req, res) {
     var projectId = req.params.projId;
     var assId = req.params.id;   
    if (!assId) {
        assignmentService.getAssignmentsByProject(projectId)
            .then(function (assignments) {
                res.send(assignments);
            })
            .catch(function (error) {
                log.error(error);
                res.status(500).send({ 'message': error.toString() });
            });
    } else {
        assignmentService.getAssignment(projectId,assId)
            .then(function (assignment) {
                res.send(assignment);
            })
            .catch(function (error) {
                log.error(error);
                res.status(500).send({ 'message': error.toString() });
            });
    }
}
 
function getMatchingCandidates(req, res){
     var projectId = req.params.projId;
     var assId = req.params.id;   
    assignmentService.serarchSuitableCandidates(projectId,assId)
        .then(function (candidates) {
            res.send(candidates);
        })
        .catch(function (error) {
            log.error(error);
            res.status(500).send({ 'message': error.toString() });
        });
    
}
 
 