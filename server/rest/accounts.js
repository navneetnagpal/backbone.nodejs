'use strict';
var Backbone = require('backbone');
var fixture = require('../fixtures/accounts/accounts-ALL');
var collection = new Backbone.Collection(fixture);
module.exports = {
    addRoutes: addRoutes
};

/**
 * Adds routes to the api.
 */
function addRoutes(api) {
    api.get('/accounts', dropData);
    api.get('/accounts/:id', dropDataById);
    api.post('/accounts', createData);
    api.put('/accounts/:id', saveData);
}


/**
 * Deletes all data if the id matches.
 * *** DON'T EXPOSE SUCH A SERVICE IN A PRODUCTION APP ***
 *
 * @param {Object} req - req.params.id contains the magic id = 1234
 * @param {Object} res - res.body contains no content
 */
function dropData(req, res) {     
     
    res.send(collection);  // No Content
}
 
function saveData(req, res) {     
      var model = collection.get(req.body.id);
      model.set(req.body);
      res.json(model.toJSON());
}
function createData(req, res) {     
      var accountData=req.body;
      accountData.id=collection.length+1;
      collection.add([accountData]);
      res.json(accountData);
}
function dropDataById(req, res) {     
     var model = collection.get(req.params.id);
      res.json(model);
}
