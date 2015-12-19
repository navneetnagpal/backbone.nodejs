'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('tsconfig.json'),
    superstatic = require('superstatic'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    path = require('path'),    
    mocha = require('gulp-mocha'),
    $ = require('gulp-load-plugins')({
        lazy: true
    }),
    child_process = require('child_process'),
    concatCss = require('gulp-concat-css');


var config = new Config();


gulp.task('static-connect', function () {
    connect.server({
        root: 'src',
        livereload: true
    });
});


/**
 * Start the server
 * --debug-brk or --debug
 */
gulp.task('serve-connect', function () {
   var debug = args.debug || args.debugBrk;
    var exec;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': config.port
        },
        watch: [config.server]
    };

    if (debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        nodeOptions.nodeArgs = ['--debug=5858'];
    }

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
        })
        .on('start', function() {
            log('*** nodemon started');
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
});


/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {
        read: false
    });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

gulp.task('less-clean',function(cb){
    var typeScriptGenFiles = [
        config.lessToCssOutput + '/css'];
    // delete the files
    del(typeScriptGenFiles, cb); 
});
gulp.task('less', function () {
    return gulp.src(config.allLessFiles)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(config.lessToCssOutput));
});
gulp.task('css-combine', function () {
  return gulp.src(config.lessToCssOutput + '/**/*.css')
    .pipe(concatCss(config.bundleCssOutputFile))
    .pipe(gulp.dest(config.bundleCssOutput));
});
/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-css-debug', function () {
    var target = gulp.src(config.cssDebugOutput);
    var basepath = "/src/";
    var sources = gulp.src([config.lessToCssOutput + '/**/*.css'], {
        read: false
    });
    return target.pipe(inject(sources, {
        starttag: '/*inject-start*/',
        endtag: '/*inject-end*/',
        transform: function (filepath) {
            return '@import "' + filepath.replace(basepath,"../") + '";';
        }
    })).pipe(gulp.dest(config.cssBase));
});
/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('mocha', function() {
    return gulp.src('test/test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({}));
});
/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript, //path to typescript files
        config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
        config.tsOutputPath + '/**/*.js', // path to all JS files auto gen'd by editor
        config.tsOutputPath + '/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        '!' + config.tsOutputPath + '/lib'];
    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('watch', function () {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
    gulp.watch([config.allLessFiles],['css-all']);
});

gulp.task('serve', ['gen-ts-refs','compile-ts','css-all', 'serve-connect', 'watch'], function () {
    //    process.stdout.write('Starting webserver...\n');

});
gulp.task('css-all', ['less-clean','less','gen-css-debug','css-combine'], function () {
    //    process.stdout.write('Starting webserver...\n');

});
gulp.task('default', ['css-all','gen-ts-refs', 'ts-lint', 'compile-ts']);
/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}