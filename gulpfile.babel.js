import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import plumber from 'gulp-plumber';


import del from 'del';
import runSequence from 'run-sequence';

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true,
  }).pipe(gulp.dest('dist'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true,
  },
}));

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js',
        ],
      },
    }))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.if('*.js', $.sourcemaps.init()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.sourcemaps.write('.')))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
  return gulp.src('app/scripts.babel/**/*.js')
    .pipe($.babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['lint', 'babel', 'html'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json',
  ]).on('change', $.livereload.reload);

  gulp.watch('app/scripts.babel/**/*.js', ['lint', 'babel']);
  // gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('package', () => {
  const manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
    .pipe($.zip('test yeoman-' + manifest.version + '.zip'))
    .pipe(gulp.dest('package'));
});

gulp.task('build', cb => {
  runSequence(
    'lint', 'babel', 'chromeManifest',
    ['extras'], 'size', cb);
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});

gulp.task('test', ['pre-test'], cb => {
  let mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', err => {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', () => {
      cb(mochaErr);
    });
});
