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
    router.get('/', dropData);
    router.delete('/:id', dropData);
    return router;
}

var testService = require('../../application').testService; 

/**
 * Deletes all data if the id matches.
 * *** DON'T EXPOSE SUCH A SERVICE IN A PRODUCTION APP ***
 *
 * @param {Object} req - req.params.id contains the magic id = 1234
 * @param {Object} res - res.body contains no content
 */
function dropData(req, res) {

    var id = parseInt(req.params.id);
    if (id !== 1234) {
        res.status(500).send({'message': 'Unauthorized'});
    }

    testService.dropData();
    res.status(204).send();  // No Content
}
