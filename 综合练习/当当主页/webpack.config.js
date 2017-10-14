const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        // polyfill: [
        //    'es5-shim',
        //    'es5-shim/es5-sham',
        // ],
        index: [
            './js/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'js/[name].[hash].bundle.js',
        filename: 'js/[name].bundle.js',
        // publicPath: "http://cdn.com"
    },
    module: {
        loaders: [
            /*{
                            test: /\.js$/,
                            exclude: path.resolve(__dirname, 'node_modules'),
                            include: [
                                path.resolve(__dirname, 'js'),
                                path.resolve(__dirname, 'src')
                            ],
                            loader: "babel-loader",
                            query: {
                                plugins: [
                                    "transform-es3-property-literals",
                                    "transform-es3-member-expression-literals",
                                    ["transform-es2015-classes", { "loose": true }],
                                    "transform-proto-to-assign",
                                    "transform-runtime",
                                   
                                ],
                                presets: ['es2015']
                            }
             },*/
            {
                test: /\.tpl$/,
                loader: "ejs-loader"
            },
            {
                test: /\.css$/,
                //loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?importLoaders=1&url=false&minimize=true!postcss-loader"
                })
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!postcss-loader!less-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            /* {
            //     test: /\.(png|jpg|gif|svg)$/i,
            //     loaders: [
            //         'url-loader?limit=1000&name=imgs/[name]-[hash:5].[ext]',
            //         'image-webpack' //压缩图片
            //     ]

            // }
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader',
                query: {
                    limit: 20000,
                    name: 'imgs/[name]-[hash:5].[ext]'
                }
            }*/
        ]
    },
    // devServer: {
    //     contentBase: "./",
    //     historyApiFallback: true,
    //     inline: true
    // },
    resolve: {
        extensions: ['.js', '.css']
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("all.css"),
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
        ,/*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: {
                filename: "out.js",
                url: "out.js.map"
            },
            output: {
                comments: false
            },
            ie8: true
        })*/
    ]
};

// cnpm install file-loader css-loader style-loader sass-loader ejs-loader html-loader jsx-loader image-webpack-loader --save-dev

/*
说browserify / webpack ，那还要说到 seajs / requirejs 。这四个都是JS模块化的方案。其中seajs / require 是一种类型，browserify / webpack 是另一种类型。
·-----seajs / require : 是一种在线"编译"模块的方案，相当于在页面上加载一个CMD/AMD解释器。这样浏览器就认识了define、exports、module这些东西。也就实现了模块化。
·-----browserify / webpack : 是一个预编译模块的方案，相比于上面 ，这个方案更加智能。没用过browserify，这里以webpack为例。首先，它是预编译的，不需要在浏览器中加载解释器。另外，你在本地直接写JS，不管是AMD / CMD / ES6 风格的模块化，它都能认识，并且编译成浏览器认识的JS。
这样就知道，Gulp是一个工具，而webpack等等是模块化方案。Gulp也可以配置seajs、requirejs甚至webpack的插件
*/