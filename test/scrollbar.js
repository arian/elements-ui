"use strict";

var Scrollbar = require('../lib/scrollbar')

require('elements/lib/domready')(function(){

    var wrapper = document.getElementById('scroll-wrapper')
    var content = document.getElementById('scroll-content')
    var left = document.getElementById('scroll-left')
    var bar = document.getElementById('scroll-bar')
    var right = document.getElementById('scroll-right')

    var scroll1 = new Scrollbar({
        wrapper: wrapper,
        content: content,
        left: left,
        bar: bar,
        right: right
    })

})
