'use strict';

var testService = require('./steps/services/test.service');

var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init(); 
new Yadda.FeatureFileSearch('./features').each(function(file) {
    console.log('File:'+file);
    featureFile(file, function(feature) { 
        var libraries = require_feature_libraries(feature);
        var yadda = Yadda.createInstance(libraries);

        scenarios(feature.scenarios, function(scenario) {
            console.log(feature.scenarios);
            // Drop the data before every scenario
            before(dropData);

            var ctx = {};
            steps(scenario.steps, function(step, done) {
                yadda.run(step, { ctx: ctx }, done);
            });
        });
    });
});

function require_feature_libraries(feature) {
    return feature.annotations.libraries.split(', ').reduce(require_library, []);
}

function require_library(libraries, library) {
    return libraries.concat(require('./steps/' + library + '.steps'));
}

function dropData(done) {
    testService.dropData()
        .then(function() {
            done();
        });
}
