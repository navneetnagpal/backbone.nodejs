'use strict';

module.exports = {
    createAccount: createAccount,
    updateAccount: updateAccount,
    getAccount: getAccount,
    getAccounts: getAccounts,
    deleteAccount: deleteAccount,
    dropData: dropData
};

var _ = require('lodash');
var Promise = require('bluebird');
var Account = require('../../domain').Account;
var errors = require('../../infrastructure').errors;

var accounts = [];
var nextAccountId = 1;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} accountData minus the id
 * @return {Promise} A promise that returns the inserted account (including the id)
 */
function createAccount(accountData) {
    var account = new Account(accountData);
    account.id = nextAccountId++;
    accounts.push(account);
    return Promise.resolve(account);
}

/**
 * Updates an existing account.
 * @param {Object} accountData including the id
 * @return {Promise} A promise that returns the updated account (including the id)
 */
function updateAccount(accountData) {
    var account = _.find(accounts, 'id', accountData.id);
    return account ?
        Promise.resolve(_.extend(account, accountData)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

/**
 * Gets an existing account.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired account.
 */
function getAccount(id) {
    var account = _.find(accounts, 'id', id);
    return account ?
        Promise.resolve(account) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

/**
 * Gets all accounts.
 * @return {Promise} A promise that returns an array of all accounts.
 */
function getAccounts() {
    return Promise.resolve(accounts);
}

/**
 * Deletes an account.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the account is deleted.
 */
function deleteAccount(id) {
    var index = _.findIndex(accounts, function(account) {
        return account.id === id;
    });
    return index >= 0 ?
        Promise.resolve(accounts.splice(index, 1)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

/**
 * Drops all account data.
 */
function dropData() {
    accounts.length = 0;
}
