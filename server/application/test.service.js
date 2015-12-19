'use strict';

module.exports = {
    dropData: dropData
};

var persistence = require('./persistence');
var accountRepository = persistence.accountRepository;
var peopleRepository = persistence.peopleRepository;
var projectRepository = persistence.projectRepository;
var assignmentRepository = persistence.assignmentRepository;

/**
 * Drops all data from all repositories.
 */
function dropData() {
     assignmentRepository.dropData();
     accountRepository.dropData();
     projectRepository.dropData();
    return peopleRepository.dropData();
}
