'use strict';


// -----------------------------------------------------------------------------
// Start the HTTP Server and expose the RESTful API
// -----------------------------------------------------------------------------
var port = process.env.PORT || 8080;

var api = require('./rest/api');
var server = require('http').createServer(api);

// Start listening to HTTP requests
server.listen(port, function() {
    console.log('Listening on port ' + port);
});

// -----------------------------------------------------------------------------
// Stop the HTTP server and the database when SIGINT is received
// (i.e. Ctrl-C is pressed)
// -----------------------------------------------------------------------------
process.on('SIGINT', function() {
    console.log('SIGINT received ...');
    server.close(function() {
        console.log('Server stopped ...');
        console.log('Exiting process ...');
        process.exit();
    });
});
