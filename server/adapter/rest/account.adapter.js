'use strict';

module.exports = {
    getRoutes: getRoutes
};
var express = require('express');
var router = express.Router();
/**
 * Adds routes to the api.
 */
function getRoutes() {
    router.post('/', createAccount);
    router.put('/:id', updateAccount);
    router.get('/:id', getAccount);
    router.get('/', getAccounts);
    router.delete('/:id', deleteAccount);
    return router;
}

var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var accountService = require('../../application').accountService;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} req - req.body contains accountData minus the id
 * @param {Object} res - res.body contains the inserted account (including the id)
 */
function createAccount(req, res) {

    var accountData = req.body;

    accountService.createAccount(accountData)
        .then(function(account) {
            res.send(account);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Updates an existing account.
 * @param {Object} req - req.body contains accountData including the id
 * @param {Object} res - res.body contains the updated account (including the id)
 */
function updateAccount(req, res) {

    var accountData = req.body;

    accountService.updateAccount(accountData)
        .then(function(account) {
            res.send(account);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets an existing account.
 * @param {Object} req - req.params.id contains id of the account to get
 * @param {Object} res - res.body contains the requested account
 */
function getAccount(req, res) {

    var id = parseInt(req.params.id);

    accountService.getAccount(id)
        .then(function(account) {
            res.send(account);
        })
        .catch(errors.NotFoundError, function() {
            res.status(404).send({'message': 'Account ' + id + ' does not exist'});
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all accounts.
 * @param {Object} req - no used
 * @param {Object} res - res.body contains an array of all accounts
 */
function getAccounts(req, res) {
    accountService.getAccounts()
        .then(function(accounts) {
            res.send(accounts);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Deletes an account.
 * @param {Object} req - req.params.id contains id of the account to delete
 * @param {Object} res - res.body contains no content
 */
function deleteAccount(req, res) {

    var id = parseInt(req.params.id);

    accountService.deleteAccount(id)
        .then(function() {
            res.status(204).send();  // No Content
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
