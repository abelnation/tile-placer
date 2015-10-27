var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry:  './src/client/web/jsx/main.jsx',
  output: {
      path: path.resolve(__dirname, "src/client/web/js"),
      filename: 'main.js',
      publicPath: '/static/'
  },
  module: {
      loaders: [{
          test: /\.(es6|jsx)$/,
          exclude: /node_modules/,
          loader: 'react-hot!babel-loader',
          include: [
              path.resolve(__dirname, "src/client/web/jsx"),
              path.resolve(__dirname, "src/shared")
          ]
      }
    ]
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
      // 'react': 'React',
      // 'react-dom': 'ReactDOM',
      //'classNames': 'classNames',
      'superagent': 'superagent',
      'events': 'events',
      // 'net' is shimmed to an empty object in the browser
      // this is done so that we can still require in our network code
      // that references some node-specific modules
      'net': 'net'
  }
}
