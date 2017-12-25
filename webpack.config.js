/*
 * @Author: ranruci 
 * @Date: 2017-12-23 17:01:14 
 * @Last Modified by: ranruci
 * @Last Modified time: 2017-12-24 23:55:22
 */

const path = require('path');
var webpack = require('webpack');
//引入处理css文件的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置 dev/online
var WEBPACK_ENV       = process.env.WEBPACK_ENV ||'dev'

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return{
        template:'./src/view/'+ name +'.html',
        filename:'view/'+ name +'.html',
        title   :title,
        inject  :true,
        hash    :true,
        chunks  :['common',name],
    }
}
//这是webpack config
config = {
    entry: {
        'common'  :['./src/page/common/index.js'],
        'index'   :['./src/page/index/index.js'],
        'login'   :['./src/page/login/index.js'],
        'result'  :['./src/page/result/index.js'],
        'res'     :['./src/page/res/index.js'],
    },
    output: {
        path: './dist',
        publicPath:'/dist',
        filename: 'js/[name].js',
    },
    externals:{
        'jquery':'window.jQuery',
    },
     //处理css的loader
     module:{
        loaders:[
            { test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {//                                          将图片文件放到resource文件中
            test: /\.(png|jpg|gif|svg|woff|woff2|otf|ttf|ttc|eot)\??.*$/,
            loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            { test:/\.string$/,loader : 'html-loader'},

        ]
    },
    //配置别名
    resolve :{
        alias : {
            node_modules :__dirname +'/node_modules',
            util         :__dirname +'/src/util',
            page         :__dirname +'/src/page',
            service      :__dirname +'/src/service',
            image        :__dirname +'/src/image',
        }
    },
    plugins:[
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js',
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        //html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','登录页')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('res','操作什么')),
    ],

};

if('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8009/');
}

module.exports =config;