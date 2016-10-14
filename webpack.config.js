var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: [path.resolve(ROOT_PATH, 'mycolorpicker.js')],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: path.resolve(ROOT_PATH, 'scripts/rect'),
        filename: 'mycolorpicker.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React ES2015'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
};
