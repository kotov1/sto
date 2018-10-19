var gulp           = require('gulp'),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		autoprefixer   = require('gulp-autoprefixer'),
		// cache          = require('gulp-cache'),
		// imagemin       = require('gulp-imagemin'),
		// gutil          = require('gulp-util'),
		// ftp            = require('vinyl-ftp'),
		// rsync          = require('gulp-rsync')
		notify         = require("gulp-notify");

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js',
// 		])
// 	.pipe(concat('common.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });

gulp.task('js', function() {
	return gulp.src([
		'app/js/common.js'
		])
	.pipe(concat('scripts.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		// proxy: "domain/index.php", // local server
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	// .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
	// gulp.watch('app/*.php', browserSync.reload); // local server
});


gulp.task('images', function() {
	return gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'images', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/*.php'
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/styles.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.js'
		]).pipe(gulp.dest('dist/js'));

	var buildJquery = gulp.src([
		'app/libs/jquery/dist/jquery.min.js'
		]).pipe(gulp.dest('dist/libs/jquery/dist'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('default', ['watch']);


// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      'hostname.com',
// 		user:      'username',
// 		password:  'userpassword',
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/path/to/folder/on/server'));

// });

// gulp.task('rsync', function() {
// 	return gulp.src('dist/**')
// 	.pipe(rsync({
// 		root: 'dist/',
// 		hostname: 'username@yousite.com',
// 		destination: 'yousite/public_html/',
// 		// include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}));
// });

// gulp.task('clearcache', function () { return cache.clearAll(); });