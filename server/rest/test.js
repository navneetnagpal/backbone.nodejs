'use strict';

module.exports = {
    addRoutes: addRoutes
};

/**
 * Adds routes to the api.
 */
function addRoutes(api) {
    api.get('/tests/hello', dropHelloData);
    api.get('/tests/json', dropJsonData);
    api.get('/tests/error', dropErrorData);
}


function dropHelloData(req, res) {

    res.status(200).send("Hello World"); // string
}

function dropJsonData(req, res) {

    res.status(200).send({
        firstName: "Wayne",
        lastName: "Bruce",
        organization: "Wayne Enterprise"
    });
}

function dropErrorData(req, res) {

    res.status(500).send("Internal Server error");
}