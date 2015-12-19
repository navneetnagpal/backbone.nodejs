'use strict';

module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    getProject: getProject,
    getProjects: getProjects,
    deleteProject: deleteProject
};

var persistence = require('./persistence');
var projectRepository = persistence.projectRepository;
  
function createProject(person) {
    return projectRepository.createProject(person);
}

function updateProject(id, personData) {
    return projectRepository.updateProject(id, personData);
}
 
function getProject(id) {
    return projectRepository.getProject(id);
}
 
function getProjects() {
    return projectRepository.getProjects();
} 
function deleteProject(id) {
    return projectRepository.deleteProject(id);
}
