const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/app.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'graphatrix.js',
		publicPath: ""
	},
	devtool: 'inline-source-map',
	resolve: {
		alias: {
			react: path.join(__dirname, 'node_modules')
		}
	},
	module: {
		rules: [
			{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      },
			{
				test: /\.js$/,
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
		new MiniCssExtractPlugin({
			filename: `graphatrix.css`
		})
	]
};
