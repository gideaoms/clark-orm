import gulp from 'gulp';
import shell from 'gulp-shell';
import replace from 'gulp-replace';

const compile = () => gulp.src('package.json').pipe(shell('npm run compile', { quiet: true }));

const destroy = () => gulp.src(['dist']).pipe(shell('cd dist && rm web-app.d.ts'));

const copy = () => gulp.src(['src/Orm.d.ts']).pipe(gulp.dest('dist'));

const update = () =>
  gulp.src('package.json').pipe(replace('"private": true,', '"private": false,')).pipe(gulp.dest('dist'));

const publish = () => gulp.src('package.json').pipe(shell('cd dist && npm publish'));

export default gulp.series(compile, destroy, copy, update, publish);
