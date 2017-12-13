var gulp = require("gulp");
var webserver = require('gulp-webserver');
var proxy = require('http-proxy-middleware');

gulp.task('copy-config-files', function() {
    gulp.src('src/env.json')
    .pipe(gulp.dest('dist'));
    gulp.src('src/config.dev.json')
    .pipe(gulp.dest('dist'));
    gulp.src('src/config.prod.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function () {
    gulp.src('dist')
	.pipe(webserver({
	    open: true,
	    fallback: 'index.html',
	    https: {
		key: 'pki/key.pem',
		cert: 'pki/cert.pem'
	    },
	    middleware: [
		proxy('/eureka-webapp', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eureka-services', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eureka-protempa-etl', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/cas-server', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-user-webapp', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-user-service', {
		    target: 'https://localhost:8443',
		    secure: false
		})
	    ]
	}));
});

// default task builds for prod
gulp.task('default',['copy-config-files', 'webserver']);