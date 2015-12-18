'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        
        this.root =  './';
        this.server = './server/';
        this.test   = './test/';
        
        this.alljs= [
            this.root + '*.js',
            this.server + '**/*.js',
            this.test + '**/*.js'
        ];
        this.testDependencies= [
            this.server + '**/*',
            this.test + '**/*'
        ];
        this.features= this.test + 'features/';
        this.steps= this.test + 'steps/';
        
        this.source = './src/';
      
        this.port = '8080';
        this.nodeServer= this.server + 'server.js';
        this.sourceApp = this.source + 'lib/';

        this.allLessFiles = this.source + 'assets/**/*.less';
        this.lessToCssOutput = this.source + 'dist/css';
        this.bundleCssOutput = this.source + 'assets';
        this.bundleCssOutputFile = 'bundle.css';
        this.cssDebugOutput = this.source + 'assets/bundle-debug.css';
        this.cssBase = this.source + 'assets/';
        this.tsOutputPath = this.source + '/js/bin';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';
        this.appTypeScriptReferences = './tools/typings/typescriptApp.d.ts';
        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;