var gulp = require("gulp");
var sync = require('browser-sync').create();
var changed = require("gulp-changed");
var wiredep = require("wiredep");

gulp.task("devserver", ["build-dist"], function () {
    sync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch(["index.html", "style.css"], ["watch-devserver"]);
});

gulp.task("watch-devserver", ["build-dist"], function () {
    return sync.reload();
});


gulp.task("copy-js", function () {
    var dest = "dist/lib/js";
    return gulp.src(wiredep().js)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});

gulp.task("copy-css", function () {
    gulp.src("style.css").pipe(gulp.dest("dist"));
    var dest = "dist/lib/css";
    return gulp.src(wiredep().css)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});

gulp.task("copy-fonts", function () {
    var dest = "dist/lib/fonts";
    return gulp.src("lib/AvenirNextLTPro-Bold.woff")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});

gulp.task("copy-imgs", function () {
    var dest = "dist/img";
    return gulp.src("img/**")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});


gulp.task("build-dist", ["copy-js", "copy-css", "copy-fonts", "copy-imgs"], function () {
    return gulp.src("index.html")
        .pipe(wiredep.stream({
            fileTypes: {
                "html": {
                    "replace": {
                        "js": function (filePath) {
                            return '<script src="lib/js/' + filePath.split('/').pop() + '"></script>';
                        },
                        "css": function (filePath) {
                            return '<link rel="stylesheet" href="lib/css/' + filePath.split('/').pop() + '"/>';
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", function (finished) {
    console.log("def task");
    finished();
});