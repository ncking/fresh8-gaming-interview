var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
/*
 * 
 */
module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        main: "./app/main.js"
    },
    resolve: {
        extensions: ['', '.js', '.ejs']
    },
    module: {
        loaders: [
            // load JSON files
            {test: /\.json$/, loader: "json-loader"},
            // load  EJS - JavaScript Templates
            {test: /\.ejs$/, loader: 'ejs-loader'}
        ]
    },
    output: {
        path: __dirname,
        filename: "./public/js/app.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: false})
    ],
};


