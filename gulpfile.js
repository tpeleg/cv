const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const hb = require('gulp-hb');
const browserSync = require('browser-sync').create();

gulp.task('watch', () => {
	browserSync.init({
		server: {
			baseDir: './public',
		},
		port: 7000
	});

	gulp.watch('index.html', ['html:watch']);
	gulp.watch('style.scss', ['css:watch']);
});

gulp.task('html:watch', ['html'], browserSync.reload);
gulp.task('css:watch', ['css'], browserSync.reload)

gulp.task('html', () => {
	return gulp.src('index.html')
		.pipe(hb({
			data: 'resume.json'
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('css', () => {
	return gulp.src('style.scss')
		.pipe(plumber({
			onError: function(err) {
				console.error(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('public'));
})