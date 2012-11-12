"use strict";

var prime   = require('prime')
var $       = require('elements')

// extend $
require('elements/lib/attributes')
require('elements/lib/insertion')
require('elements-util/lib/dimensions')

var mouse   = require('elements-util/lib/event/mouse')
var m       = require('moofx')
var mixin   = require('prime-util/prime/mixin')
var bound   = require('prime-util/prime/bound')
var emitter = require('prime/util/emitter')

function limit(x, min, max){
    return Math.max(min, Math.min(x, max))
}

var Slider = prime({

    constructor: function(slider, options){
        this.slider = $(slider)
        this.doc = $(document)
        this.setOptions(options || {})
        this.create()
        this.attach()
        this.position()
    },

    setOptions: function(options){
        this.min = options.min || 0
        this.max = options.max || 1
        this.now = limit(options.initial || 0, this.min, this.max)
        this.click = options.click
    },

    create: function(){
        var knob = document.createElement('div')
        this.knob = $(knob).addClass('slider-knob').insert(this.slider)
        this.set(this.now)
    },

    attach: function(){
        this.knob.on('mousedown', this.bound('start'))
        if (this.click) this.slider.on('click', this.bound('move'))
    },

    position: function(){
        var pos = this.slider.position()
        var x1 = this.x1 = pos.left
        var x2 = this.x2 = pos.right
        this.x = pos.width
    },

    start: function(event){
        event = mouse(event)
        event.preventDefault()
        this.position()
        this.doc.on('mouseup', this.bound('stop'))
        this.doc.on('mousemove', this.bound('move'))
        this.emit('start')
    },

    stop: function(){
        this.doc.off('mouseup', this.bound('stop'))
        this.doc.off('mousemove', this.bound('move'))
        this.emit('stop')
    },

    move: function(event){
        event = mouse(event)
        var page = event.page()
        this.now = limit((page.x - this.x1) / this.x, this.min, this.max)
        this.set(this.now)
    },

    set: function(x){
        m(this.knob).style('left', (x * 100) + '%')
        this.emit('change', x)
    }

})

mixin(Slider, bound, emitter)

module.exports = Slider
