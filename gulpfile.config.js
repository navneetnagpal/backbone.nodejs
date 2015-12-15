'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';
        this.server = './server/';
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