/*
 * @Author: ranruci 
 * @Date: 2017-12-24 14:47:27 
 * @Last Modified by: ranruci
 * @Last Modified time: 2017-12-24 15:13:15
 */
'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        
        return this;
    },
    onLoad :function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，就回填输入框
        if(keyword){
            $('#search-input').val(keyword);
                }
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，就做搜索提交
        $('#search-input').keyup(function(e){
        //13是回车的code
            if(e.keyCode==13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //有关键字，就正常提交到list.html
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
        //没有，直接返回首页
        }else{
            _mm.goHome();
        }
    }
};
header.init();