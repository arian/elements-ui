"use strict";

var Slider = require('../lib/slider')

require('elements/lib/domready')(function(){

    var element1 = document.getElementById('slider1')
    var element2 = document.getElementById('slider2')
    var element3 = document.getElementById('slider3')

    // slider 1: default options

    var slider1 = new Slider(element1)

    var test = document.createElement('test')
    element1.parentNode.insertBefore(test, element1.nextSibling)

    slider1.on('start', function(){
        test.innerHTML = 'start'
    }).on('stop', function(){
        test.innerHTML = 'stop'
    }).on('change', function(x){
        test.innerHTML = x
    })

    // slider 2: with click on slide bar

    var slider2 = new Slider(element2, {
        click: true
    })

    // slider 3: all options

    var slider3 = new Slider(element3, {
        click: true,
        initial: 0.5,
        min: 0.2,
        max: 0.8
    })

})
