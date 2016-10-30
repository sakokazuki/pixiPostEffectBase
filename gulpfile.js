"use strict"
const gulp        = require("gulp")
const browserSync = require("browser-sync").create()
const plumber     = require("gulp-plumber")
const runSequence = require('run-sequence')
const minimist    = require('minimist')
const fs          = require('fs');
const sourcemaps  = require('gulp-sourcemaps');

let path = "app/pc/";
let buildPath = "./build/";

var argv = minimist(process.argv.slice(2));
if(argv.t == "sp"){
  console.log("////////////////////////////////////////////////");
  console.log("////////////////////////  SP ///////////////////");
  console.log("////////////////////////////////////////////////");
  path = "app/sp/";
  buildPath = "./build/sp"
}else{
  console.log("////////////////////////////////////////////////");
  console.log("////////////////////////  PC ///////////////////");
  console.log("////////////////////////////////////////////////");
}

//check sp directory
try {
  fs.statSync(path);
} catch(err) {
  if(err.code === 'ENOENT'){
    console.log(path+' is not found');
  } process.exit();
}

//----------------
// TASK
//----------------
gulp.task('default', (callback)=> {
  return runSequence(
    'build',
    'browser-sync',
    'watch',
    callback
  );
});

gulp.task('build', (callback)=> {
  return runSequence(
    'copy',
    ['jade', 'stylus', 'script'],
    callback
  );
});

//----------------
// WATCH
//----------------
gulp.task("watch", ()=>{
  gulp.watch(path+"/**/*.jade",["jade"])
  gulp.watch(path+"/**/*.styl", ["stylus"])
  gulp.watch(path+"/**/*.js",["script"])
  gulp.watch(path+"/**/*.glsl",["script"])
  gulp.watch(path+"/assets/**/*",["copy"])

})

//----------------
//  BROWER
//----------------
gulp.task("browser-sync", ()=>{
  browserSync.init({
    server: {
      baseDir: "build",
    },
    scrollProportionally: false,
    open: false,
    port: 7777
  })
})


//----------------
//  LAYOUT
//----------------
gulp.task("jade", ()=>{
  const jade = require("gulp-jade")
  const yaml = require("js-yaml")
  const fs = require("fs")
  const YOUR_LOCALS = {
    text: yaml.safeLoad(fs.readFileSync("./app/text.yml", "utf8"))
  }

  return gulp.src([path+"layout/**/index.jade", "!"+path+"layout/partials/**/*"])
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(buildPath))
    .pipe(browserSync.stream())
})

//----------------
// CSS
//----------------
gulp.task("stylus", ()=>{
  const stylus = require("gulp-stylus")
  gulp.src(path+"/css/**/!(_)*.styl")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildPath+"/css"))
    .pipe(browserSync.stream())
})

//----------------
// SCRIPT
//----------------
gulp.task("script", ()=>{
  const browserify = require("browserify")
  const source     = require("vinyl-source-stream")
  const compile = (_src)=>{
    browserify({
      "entries": [path+`/js/${_src}.js`],
      "ignore": ["**/vender/*"]
    })
    .transform("babelify", {presets: ["es2015"]})
    .transform('browserify-shader')
    .bundle()
    .on("error", error=>console.error(error.stack))
    .pipe(source(`${_src}.js`))
    .pipe(gulp.dest(buildPath+"/js"))
    .pipe(browserSync.stream())
  }
  compile("main")
});

//----------------
// ASSET
//----------------
gulp.task("copy", ()=>{
  gulp.src(path+"./assets/**/*")
    .pipe(gulp.dest(buildPath))
    .pipe(browserSync.stream())
})

//---------------- 
//  CLEAN
//----------------
gulp.task("clean", ()=>{
  const del = require("del");
  del(["./build/"]).then(e=>{
    console.log("deleted", e);
  })
})

//---------------- 
//  minify
//----------------
gulp.task("minify", ()=>{
  var uglify = require('gulp-uglify');
  var cleanCSS = require('gulp-clean-css');

  gulp.src("./build/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build"));

  gulp.src("./build/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("build"));
})
