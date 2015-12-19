'use strict';

module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    getProject: getProject,
    getProjects: getProjects,
    deleteProject: deleteProject,
    dropData: dropData
};

var _ = require('lodash');
var Promise = require('bluebird');
var Project = require('../../domain').Project;
var errors = require('../../infrastructure').errors;

var projects = [];
var nextAutoId = 1;

function createProject(projectData) {
    var project = _.find(projects, 'id', projectData.id);
    if (project) {
        return Promise.resolve({ message: "'" + projectData.id + "' already exists please use another identifier" });
    } else {
        project = new Project(projectData);
        project.autoId = nextAutoId++; 
        projects.push(project);
        return Promise.resolve(project);
    }
}

function updateProject(id, projectData) {
    var project = _.find(projects, 'id', id);
    return project ?
        Promise.resolve(_.extend(project, projectData)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

function getProject(id) {
    var project = _.find(projects, 'id', id);
    
    return project ?
		Promise.resolve(project) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

function getProjects() {
    return Promise.resolve(projects);
}

function deleteProject(id) {
     var index = _.findIndex(projects, function(account) {
        return account.id === id;
    });
    return index >= 0 ?
        Promise.resolve(projects.splice(index, 1)) :
        Promise.reject(new errors.NotFoundError('Not found'));       
}

function dropData() {
    projects.length = 0;
}
