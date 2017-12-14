default: integ

clean:
	find bin/ -type f -exec rm {} +
	find dist/ -type f -exec rm {} +
	
staticassets:
	rsync -avm \
	--include='*.html' \
	--include='*.css' \
	--include='*.svg' \
	--include='*.png' \
	-f 'hide,! */' static/ dist/

htmlprod:
	cp static/prod.html dist/index.html

htmlinteg:
	cp static/integ.html dist/index.html

htmldev:
	cp static/integ.html dist/index.html

ts:
	./node_modules/.bin/tsc -p tsconfig.json 

scss:
	./node_modules/.bin/node-sass -r src/ -o bin/ \
	--include-path ./node_modules/bulma 

dev: clean staticassets htmldev
	export BACKEND=local && ./node_modules/.bin/webpack-dev-server --hot --inline

integ: clean staticassets
	export BACKEND=integ && ./node_modules/.bin/webpack-dev-server --hot --inline

prod: clean staticassets
	./node_modules/.bin/webpack -p

test: clean ts
	export NODE_ENV=test && ./node_modules/karma/bin/karma start karma.conf.js
	