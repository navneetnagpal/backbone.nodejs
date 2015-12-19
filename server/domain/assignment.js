'use strict';

 
var _ = require('lodash');

var Assignment = function(assignmentData) {
    if (assignmentData) {
        _.extend(this, assignmentData);
    }
};

module.exports = Assignment;
