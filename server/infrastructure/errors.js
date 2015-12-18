'use strict';

var util = require('util');

function NotFoundError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(NotFoundError, Error);

module.exports = {
    NotFoundError: NotFoundError
};