'use strict';

/**
 * An Person.
 *   {int}     Auto id
 *   {String}  username - username of the Person
 *
 * Example:
 *   {
 *       id: [number],
 *       username: 'edana'
 *   }
 */

var _ = require('lodash');

var Person = function(personData) {
    if (personData) {
        _.extend(this, personData);
    }
};

module.exports = Person;
