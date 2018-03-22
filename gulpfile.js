var gulp = require("gulp");
var webserver = require('gulp-webserver');
var proxy = require('http-proxy-middleware');

gulp.task('webserver', function () {
    gulp.src('target')
	.pipe(webserver({
	    open: true,
	    fallback: 'index.html',
	    https: {
		key: 'pki/key.pem',
		cert: 'pki/cert.pem'
	    },
	    middleware: [
		proxy('/cas-mock', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-admin-webapp', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-user-service', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-user-agreement-service', {
		    target: 'https://localhost:8443',
		    secure: false
		})
	    ]
	}));
});

// default task builds for prod
gulp.task('default',['webserver']);
