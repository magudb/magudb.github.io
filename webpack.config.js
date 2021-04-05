var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModDir = path.resolve(__dirname, "node_modules/");
module.exports = {
    output: {
        path: path.resolve(__dirname, "assets/js/"),
        filename: "app.js"

    },
    entry: ['@babel/polyfill',"./_src/app.js"],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules\//,
                loader: "babel",
                query: {
                    "presets": [["@babel/preset-env", { "targets": "defaults" }]],
                    compact: true,
                    plugins: ["@babel/transform-runtime"]
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextPlugin.extract("style", "css!sass", "postcss-loader")
            },           
            {
                test: /\.html/,
                loader: "html"
            },
            {
                test: /\.(woff|woff2|eot|ttf|jpe?g|png|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=../../content/dist/[hash].[ext]'
            }
        ]
    },
    postcss: function() {
        return [autoprefixer, precss];
    },
    plugins: [
        new ExtractTextPlugin("../../assets/css/bundle.css"),       
    ]
};
module.exports.devtool = '#source-map'