'use strict';

module.exports = {
    createPerson: createPerson,
    updatePerson: updatePerson,
    getPerson: getPerson,
    getPeople: getPeople,
    releasePerson: releasePerson,
    searchPeople:searchPeople,
    searchAvailabelPeople:searchAvailabelPeople
};

var persistence = require('./persistence');
var peopleRepository = persistence.peopleRepository;
  
function createPerson(person) {
    return peopleRepository.createPerson(person);
}

function updatePerson(username, personData) {
    return peopleRepository.updatePerson(username, personData);
}
 
function getPerson(username) {
    return peopleRepository.getPerson(username);
}
function searchPeople(criteria){
    return peopleRepository.searchPeople(criteria);
}
function searchAvailabelPeople(criteria){
    return peopleRepository.searchAvailabelPeople(criteria);
}
function getPeople() {
    return peopleRepository.getPeople();
} 
function releasePerson(username) {
    return peopleRepository.releasePerson(username);
}
