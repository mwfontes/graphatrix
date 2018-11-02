const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'graphatrix.bundle.js',
		publicPath: ""
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader"]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							context: "./src/images",
							outputPath: "images/"
						}
					}
				]
			}
		]
	},
	devServer: {
		hot: true
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				context: "./src",
				from: 'index.html',
				to: './'
			},
			{
				context: "./src/images",
				from: '*',
				to: './images'
			},
		]),
		new ExtractTextPlugin({
			filename: "graphatrix.bundle.css",
			disable: false,
			allChunks: true
		})
	]
};
