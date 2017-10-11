const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js',
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].bundle.js',
        // publicPath: "http://cdn.com"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: [
                    path.resolve(__dirname, 'js'),
                    path.resolve(__dirname, 'src')
                ],
                loader: "babel-loader",
                query: {
                    presets: ['latest']
                }
            },
            {
                test: /\.tpl$/,
                loader: "ejs-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!postcss-loader!less-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=1000&name=imgs/[name]-[hash:5].[ext]',
                    'image-webpack'//压缩图片
                ]

            }
            /* {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader',
                query: {
                    limit: 20000,
                    name: 'imgs/[name]-[hash:5].[ext]'
                }
            }*/
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '当当—网上购物中心',
            template: 'index.html',
            inject: 'body',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true,
                // removeComments:true
            },
            //chunks:[]
        })
    ]
};