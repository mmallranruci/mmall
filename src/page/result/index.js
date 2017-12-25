/*
 * @Author: ranruci 
 * @Date: 2017-12-24 22:11:25 
 * @Last Modified by: ranruci
 * @Last Modified time: 2017-12-25 21:12:18
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        //显示对应的显示
        $element = $('.' + type + '-success').show();
});