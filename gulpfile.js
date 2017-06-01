var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpack_config_dev = require("./webpack.dev.config.js");
var webpack_config_prod = require("./webpack.prod.config.js");
var panini = require('panini');
var browserSync  = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var gulpCopy = require('gulp-copy');
var del = require('del');

var PORT = 8000;
// The development server (the recommended option for development)
// gulp.task("default", ["webpack-dev-server"]);
//
// // Build and watch cycle (another option for development)
// // Advantage: No server required, can run app from filesystem
// // Disadvantage: Requests are not blocked until bundle is available,
// //               can serve an old app on refresh
// gulp.task("build-dev", ["webpack:build-dev"], function() {
// 	gulp.watch(["app/**/*"], ["webpack:build-dev"]);
// });
//
// // Production build
// gulp.task("build", ["webpack:build"]);
//
// gulp.task("webpack:build", function(callback) {
// 	// modify some webpack config options
// 	var myConfig = Object.create(webpackConfig);
// 	myConfig.plugins = myConfig.plugins.concat(
// 		new webpack.DefinePlugin({
// 			"process.env": {
// 				// This has effect on the react lib size
// 				"NODE_ENV": JSON.stringify("production")
// 			}
// 		}),
// 		new webpack.optimize.DedupePlugin(),
// 		new webpack.optimize.UglifyJsPlugin()
// 	);
//
// 	// run webpack
// 	webpack(myConfig, function(err, stats) {
// 		if(err) throw new gutil.PluginError("webpack:build", err);
// 		gutil.log("[webpack:build]", stats.toString({
// 			colors: true
// 		}));
// 		callback();
// 	});
// });

// // modify some webpack config options
// var myDevConfig = Object.create(webpackConfig);
// myDevConfig.devtool = "sourcemap";
// myDevConfig.debug = true;
//
// // create a single instance of the compiler to allow caching
// var devCompiler = webpack(myDevConfig);
//
// gulp.task("webpack:build-dev", function(callback) {
// 	// run webpack
// 	devCompiler.run(function(err, stats) {
// 		if(err) throw new gutil.PluginError("webpack:build-dev", err);
// 		gutil.log("[webpack:build-dev]", stats.toString({
// 			colors: true
// 		}));
// 		callback();
// 	});
// });

//https://stackoverflow.com/questions/34371029/cannot-start-webpack-dev-server-with-gulp
// gulp.task('webpack-dev-server', function (c) {
//     var myConfig = Object.create(webpackConfig);
//
//     //myConfig.devtool = 'eval';
//     //myConfig.debug = true;
//
//     // Start a webpack-dev-server
//     new WebpackDevServer(webpack(myConfig)).listen(myConfig.devServer.port, 'localhost', function (err) {
//         if (err) {
//             throw new gutil.PluginError('webpack-dev-server', err);
//         }
//         gutil.log('[webpack-dev-server]', 'http://localhost:7777/index.html');
//     });
// });




var paths = {
  html: ['src/pages/**/*.html','src/{layouts,partials,helpers,data}/**/*'],
  dirs: { dist:'dist/' },
  scripts:'src/**/*.js',
  sass: 'src/**/*.scss',
}


gulp.task('set-env-dev', function(cb) {
    process.env.NODE_ENV = 'development';
    cb();
});

gulp.task('set-env-prod', function(cb) {
    process.env.NODE_ENV = 'production';
    cb();
});
gulp.task('clean', function (cb) {
  return del(paths.dirs.dist, cb);
});



gulp.task("webpack", function(cb) {
	// modify some webpack config options
	var prod_config = Object.create(webpack_config_prod);
	// myConfig.plugins = myConfig.plugins.concat(
	// 	new webpack.DefinePlugin({
	// 		"process.env": {
	// 			// This has effect on the react lib size
	// 			"NODE_ENV": JSON.stringify("production")
	// 		}
	// 	}),
	// 	new webpack.optimize.DedupePlugin(),
	// 	new webpack.optimize.UglifyJsPlugin()
	// );

	// run webpack
	webpack(prod_config, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true
		}));
		cb();
	});
});





gulp.task('copybin',function(){
    var sources = [ 'bin/main.bundle.js', 'bin/main.css' ];
    var destination = 'dist/';

    return gulp.src(sources).pipe(gulp.dest(paths.dirs.dist));
})

gulp.task('press', function() {
    console.log("press")
    panini.refresh();
    return gulp.src('src/pages/**/*.html')
        .pipe(panini({
            root: 'src/pages',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/'
    }))
    .pipe(gulp.dest('dist'))
    .on('finish', browserSync.reload);
});

gulp.task('press:production', function() {
    console.log("press")
    panini.refresh();
    return gulp.src('src/pages/**/*.html')
        .pipe(panini({
            root: 'src/pages',
            layouts: 'bin/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/'
    }))
    .pipe(gulp.dest('dist'))
    .on('finish', browserSync.reload);
});
//
// gulp.task('press:reset', function(){
//     console.log('ass');
//
// });


var bundler = webpack(webpack_config_dev);


//
gulp.task('server', function(cb) {
  browserSync({
    server: {
      baseDir: paths.dirs.dist,
      middleware: [
          webpackDevMiddleware(bundler, {
              publicPath: webpack_config_dev.output.publicPath,
              stats: { colors: true }
          }),
          webpackHotMiddleware(bundler)
          ]
      },
    port: 8000,
    notify: true,
    open: false
  }, cb);
});




gulp.task('watch:code', function () {
    gulp.watch([
        paths.html,
        // paths.coffee,
        // paths.images,
        // paths.json,
        // paths.vendor.components.all,
        // paths.vendor.bower.js
    ], gulp.series('press'));
});

// gulp.task('watch:scripts', function() {
//     gulp.watch([
//         paths.scripts,
//         paths.sass
//     ], gulp.series('webpack'));
// });


//gulp.task('build', gulp.parallel('html', 'sass', 'json', 'images', 'sass', 'less'));
gulp.task('build', gulp.parallel('press'));

gulp.task('watch', gulp.parallel('watch:code'));

gulp.task('develop', gulp.series('set-env-dev','server', 'build', 'watch'));

gulp.task('production', gulp.series('set-env-prod','clean','webpack', 'press'));



// // Build the site, run the server, and watch for file changes
// gulp.task('develop', ['press', 'server','webpack-dev-server'], function() {
//   //gulp.watch(PATHS.assets, ['copy']);
//   gulp.watch(['src/pages/**/*'], ['press']);
//   gulp.watch(['src/{layouts,partials,helpers,data}/**/*'], ['press:reset']);
//   // gulp.watch(['src/assets/scss/**/{*.scss, *.sass}'], ['sass']);
//   // gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
//   // gulp.watch(['src/assets/img/**/*'], ['images']);
//   // gulp.watch(['src/styleguide/**'], ['styleguide']);
// });

// gulp.task('develop', gulpSequence(["press","webpack-dev-server"]))

// gulp.task('develop', gulp.parallel('press','server'),function(){
//     //gulp.watch(['src/pages/**/*'], 'press');
//     //gulp.watch(['src/{layouts,partials,helpers,data}/**/*'], 'press:reset');
//     var watcher = gulp.watch('src/pages/**/*.html','src/pages/*.html').on('change', gulp.parallel('press'));
//     watcher.on('change', function(path, stats) {
//       console.log('File ' + path + ' was changed');
//     });
//     //gulp.watch('src/{layouts,partials,helpers,data}/**/*').on('change', gulp.series('press:reset'));
// })
