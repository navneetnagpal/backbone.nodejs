require.config({
    baseUrl: "/",
//    urlArgs: '_cb=' + new Date().getTime(),
    paths: {
        jquery: 'js/vendor/jquery',
         bootstrap: 'js/vendor/bootstrap.min',
        underscore: 'js/vendor/underscore',
        backbone: 'js/vendor/backbone',
        'backbone.localstorage':'js/vendor/backbone.localStorage',
        'backbone.radio':'js/vendor/backbone.radio',
        marionette: 'js/vendor/backbone.marionette',
        app: 'js/app'
    },
    shim: {
        jquery: {
            exports: "jQuery"
        },
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        app: {
            deps: ['bootstrap','marionette','backbone.localstorage','backbone.radio'],
            exports: 'App'
        }
    }
});
require(['app'], function (App) {
    App.start();
});