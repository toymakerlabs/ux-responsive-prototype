//https://gist.github.com/demisx/beef93591edc1521330a
//http://jsramblings.com/2016/07/16/hot-reloading-gulp-webpack-browsersync.html

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const webpack_config_dev = require("./webpack.dev.config.js");
const webpack_config_prod = require("./webpack.prod.config.js");
const panini = require('panini');
const browserSync = require('browser-sync');
const webpack_dev_middleware = require('webpack-dev-middleware');
const webpack_hot_middleware = require('webpack-hot-middleware');
const del = require('del');
const bundler = webpack(webpack_config_dev);


/*
We're using gulp for panini, and for organizing our prototype html code
and we get hot html reloading and JS reloading
 */

const PORT = 8000;


const paths = {
    html: ['src/pages/**/*.html', 'src/{layouts,partials,helpers,data}/**/*'],
    pages:['src/pages/**/*.html'],
    dirs: {
        dist: 'dist/'
    },
    scripts: 'src/**/*.js',
    sass: 'src/**/*.scss',
}

/**
 * We set the env to conditionally include the Dev or prod css/js
 */
gulp.task('set-env-dev', (cb) => {
    process.env.NODE_ENV = 'development';
    cb();
});

gulp.task('set-env-prod', (cb)=> {
    process.env.NODE_ENV = 'production';
    cb();
});
gulp.task('clean', (cb)=> {
    return del(paths.dirs.dist, cb);
});


/**
 * Production webpack compressor. Runs webpack Production config
 * generating main.bundle.js and main.bundle.css.
 */
gulp.task("webpack", (cb) => {
    // modify some webpack config options
    const prod_config = Object.create(webpack_config_prod);
    // run webpack
    webpack(prod_config, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        cb();
    });
});

/**
 * Press runs panni. it packs up the pages and partials in
 * the src folder into actual HTML files.
 */
gulp.task('press', () => {
    console.log("press")
    panini.refresh();
    return gulp.src(paths.pages)
        .pipe(panini({
            root: 'src/pages',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/'
        }))
        .pipe(gulp.dest(paths.dirs.dist))
        .on('finish', browserSync.reload);
});


/**
 * Starts the gulp dev server. Webpack dev server is started with DevMiddleware using
 * webpack.dev.config.
 */
gulp.task('server', (cb) => {
    browserSync({
        server: {
            baseDir: paths.dirs.dist,
            middleware: [
                webpack_dev_middleware(bundler, {
                    publicPath: webpack_config_dev.output.publicPath,
                    stats: {
                        colors: true
                    }
                }),
                webpack_hot_middleware(bundler)
            ]
        },
        port: 8000,
        notify: true,
        open: false
    }, cb);
});

/**
 * Monitor code changes for html - triggers browsersync for hot code reloading
 */
gulp.task('watch:code', () => {
    gulp.watch([
        paths.html,
        // paths.images,
        // paths.json,
    ], gulp.series('press'));
});


/* scaffold build function for other future stuff*/
gulp.task('build', gulp.parallel('press'));

/* scaffold build function for other future stuff.. images*/
gulp.task('watch', gulp.parallel('watch:code'));

/* start building and watching. set env triggers default.html layout to use the webpack provided dev js and css */
gulp.task('develop', gulp.series('set-env-dev', 'server', 'build', 'watch'));

/* triggers default html layout to use main js and css production bundles provided by webpack. */
gulp.task('production', gulp.series('set-env-prod', 'clean', 'webpack', 'press'));











// gulp.task('press:production', function() {
//     console.log("press")
//     panini.refresh();
//     return gulp.src('src/pages/**/*.html')
//         .pipe(panini({
//             root: 'src/pages',
//             layouts: 'bin/',
//             partials: 'src/partials/',
//             helpers: 'src/helpers/',
//             data: 'src/data/'
//         }))
//         .pipe(gulp.dest(paths.dirs.dist))
//         .on('finish', browserSync.reload);
// });
// gulp.task('copybin', function() {
//     var sources = ['bin/main.bundle.js', 'bin/main.css'];
//     var destination = 'dist/';
//
//     return gulp.src(sources).pipe(gulp.dest(paths.dirs.dist));
// })

// gulp.task('watch:scripts', function() {
//     gulp.watch([
//         paths.scripts,
//         paths.sass
//     ], gulp.series('webpack'));
// });



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
