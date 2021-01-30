import gulp from 'gulp';
import shell from 'gulp-shell';
import replace from 'gulp-replace';

const compile = () => gulp.src('package.json').pipe(shell('npm run compile', { quiet: true }));

const copy1 = () => gulp.src(['README.md']).pipe(gulp.dest('dist'));

const copy2 = () => gulp.src(['src/resources/ace-manifest.json']).pipe(gulp.dest('dist/resources'));

const update = () =>
  gulp.src('package.json').pipe(replace('"private": true,', '"private": false,')).pipe(gulp.dest('dist'));

const publish = () => gulp.src('package.json').pipe(shell('cd dist && npm publish'));

export default gulp.series(compile, copy1, copy2, update, publish);
