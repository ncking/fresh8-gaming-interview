'use strict';
var gulp = require("gulp");

/*
 * 
 */
function displayError(error) {
    var makeBeep = require('make-beep');
    makeBeep(3);
    var errorString = '[' + error.plugin + ']\
        ' + error.message.replace("\n", '');
    if (error.fileName)
        errorString += ' in ' + error.fileName;
    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber;
    console.error('SASS error', errorString);
}


/*
 * 
 */
var sassConfig = {
    src: './sass/**/*.scss',
    dest: './public/css',
    options: {
        outputStyle: 'compressed',
        // sourceComments: 'map',
        includePaths: ['./bower']
    }
};
/*
 *  
 */
gulp.task("sass", function () {
    var sass = require('gulp-sass');
    return  gulp.src(sassConfig.src)
            .pipe(sass(sassConfig.options || {}))
            // If there is an error, don't stop compiling but use the custom displayError function
            .on('error', function (err) {
                displayError(err);
                this.emit('end');
            }).pipe(gulp.dest(sassConfig.dest));
});

/*
 * 
 */
gulp.task('watch', function () {
    return gulp.watch(sassConfig.src, ['sass']).on('change', function (e) {
        console.log(
                '[watcher] File ' +
                e.path.replace(/.*(?=sass)/, '') +
                ' was ' + e.type + ', compiling...'
                );
    })
});


/*
 * 
 */
gulp.task('default', function () {
    gulp.start('watch');
});
