const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const del = require("del");

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

gulp.task("css", () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("html", () => {
  return gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("delete", () => del(["dist/css", "dist/js", "dist/**/*.html"]));

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", gulp.task("css"));
  gulp.watch("src/js/**/*.js", gulp.task("js"));
  gulp.watch("src/**/*.html", gulp.task("html"));
});

gulp.task(
  "default",
  gulp.series(
    "delete",
    gulp.parallel("html", "css", "js", "browser-sync", "watch")
  )
);
