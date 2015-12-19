'use strict';

 
var _ = require('lodash');

var Project = function(projectData) {
    if (projectData) {
        _.extend(this, projectData);
    }
};

module.exports = Project;
