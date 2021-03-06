
var path = require('path')

module.exports = function(grunt) {
    return {
        src: {
            // webpack options
            entry: './<%= paths.webclient %>/jsx/main.jsx',
            output: {
                path: './<%= paths.webclient %>/js',
                filename: 'main.js',
                sourceMapFilename: 'main.js.map'
            },
            devtool: 'source-map',
            module: {
                loaders: [{
                    test: /\.(es6|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader?sourceMap',
                    include: [
                        path.resolve(__dirname, "../../<%= paths.webclient %>/jsx"),
                        path.resolve(__dirname, "../../<%= paths.shared %>")
                    ]
                }]
            },
            resolve: {
                // "" allows requiring files with extensions specified
                extensions: [ "", ".js", ".jsx", ".es6" ],
                modulesDirectories: [ "node_modules", "src" ]
            },

            externals: {
                // require('jquery') is external and available
                //  on the global var jQuery
                //'alt': 'Alt',
                'bluebird': 'Promise',
                'underscore': '_',
                'react': 'React',
                'react-dom': 'ReactDOM',
                //'classNames': 'classNames',
                'superagent': 'superagent',
                'events': 'events',
                // 'net' is shimmed to an empty object in the browser
                // this is done so that we can still require in our network code
                // that references some node-specific modules
                'net': 'net'
            },

            stats: {
                // Configure the console output
                colors: true,
                modules: true,
                reasons: true
            },
            // stats: false disables the stats output

            storeStatsTo: 'xyz', // writes the status to a variable named xyz
            // you may use it later in grunt i.e. <%= xyz.hash %>

            progress: false, // Don't show progress
            // Defaults to true

            failOnError: true, // don't report error to grunt if webpack find errors
            // Use this if webpack errors are tolerable and grunt should continue

            watch: false, // use webpacks watcher
            // You need to keep the grunt process alive

            keepalive: false, // don't finish the grunt task
            // Use this in combination with the watch option
        }
    }
}
