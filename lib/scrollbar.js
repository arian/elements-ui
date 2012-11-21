"use strict";

var prime = require('prime')
var $     = require('elements')
var m     = require('moofx')

var mouse   = require('elements-util/lib/event/mouse')
var mixin   = require('prime-util/prime/mixin')
var bound   = require('prime-util/prime/bound')
var emitter = require('prime/util/emitter')

function computeLength(element, property){
	return parseInt(m(element).compute(property), 10)
}

function style(element, property, value){
	return m(element).style(property, value)
}

function animate(element, options){
	return m(element).animate(options)
}

function limit(x, min, max){
    return Math.max(min, Math.min(x, max))
}

var Scrollbar = prime({

	constructor: function(elements, options){
		this.content = $(elements.content)
		this.wrapper = $(elements.wrapper)
		this.bar = $(elements.bar)
		this.left = $(elements.left)
		this.right = $(elements.right)
		this.doc = $(elements.document || document)

		this.setOptions(options || {})

		this.measure()
		this.attach()
		this.set(0)
	},

	setOptions: function(options){
		this.stepSize = options.step || 50
	},

	attach: function(){
		this.left.on('click', this.bound('scrollLeft'))
		this.right.on('click', this.bound('scrollRight'))
		this.bar.on('mousedown', this.bound('dragStart'))
	},

	measure: function(){
		this.wWidth = computeLength(this.wrapper, 'width')
		this.cWidth = computeLength(this.content, 'width')
		this.lWidth = computeLength(this.left, 'width')
		this.rWidth = computeLength(this.right, 'width')
		this.bWidth = computeLength(this.bar, 'width')
		this.scrollSpace = this.cWidth - this.wWidth
		this.barSpace = this.wWidth - this.bWidth - this.lWidth - this.rWidth
	},

	set: function(p){
		p = this.position = limit(p, 0, 1)
		style(this.content, 'left', - p * this.scrollSpace)
		style(this.bar, 'left', p * this.barSpace + this.lWidth)
		this.emit('set', p)
	},

	animate: function(p){
		p = this.position = limit(p, 0, 1)
		animate(this.content, {left: - p * this.scrollSpace})
		animate(this.bar, {left: p * this.barSpace + this.lWidth})
		this.emit('set', p)
	},

	// left/right buttons

	scrollLeft: function(){
		this.animate(this.position - this.stepSize / this.scrollSpace)
	},

	scrollRight: function(){
		this.animate(this.position + this.stepSize / this.scrollSpace)
	},

	// bar dragging

	dragStart: function(event){
		event = mouse(event)
		event.preventDefault()
		this._drag = event.page().x
		this._position = this.position
		$(this.doc)
			.on('mouseup', this.bound('stopDrag'))
			.on('mousemove', this.bound('drag'))
	},

	stopDrag: function(){
		$(this.doc)
			.off('mouseup', this.bound('stopDrag'))
			.off('mousemove', this.bound('drag'))
	},

	drag: function(event){
		var dx = (mouse(event).page().x - this._drag) / this.barSpace
		this.set(this._position + dx)
	}

})

mixin(Scrollbar, bound, emitter)

module.exports = Scrollbar
