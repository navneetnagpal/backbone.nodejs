'use strict';

module.exports = {
    dropData: dropData
};

var persistence = require('./persistence');
var accountRepository = persistence.accountRepository;

/**
 * Drops all data from all repositories.
 */
function dropData() {
    return accountRepository.dropData();
}
