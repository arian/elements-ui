
lint:
	./node_modules/.bin/jshint ./lib ./test

test-server:
	node ./test/server.js

test: lint
	casperjs ./test/sliderCasper.js

.PHONY: test
