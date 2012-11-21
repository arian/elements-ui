"use strict";

var casper = require('casper').create()

casper.start('http://localhost:8080/scrollbar.html')

casper.on('page.error', function(msg, trace){
    this.test.fail(msg)
})

casper.then(function(){
    this.warn("implement slider tests");
})

casper.run(function(){
    this.echo('ready')
    this.exit(this.test.testResults.failed ? 1 : 0)
})
