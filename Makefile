default: integ

clean:
	find bin/ -type f -exec rm {} +
	find dist/ -type f -exec rm {} +
	
static: 
	rsync -avm \
	--include='*.html' \
	--include='*.css' \
	--include='*.svg' \
	--include='*.png' \
	-f 'hide,! */' staticassets/images/ dist/

htmlprod: staticassets/prod.html
	cp staticassets/prod.html dist/index.html

htmlinteg: staticassets/integ.html
	cp staticassets/integ.html dist/index.html

htmldev: staticassets/dev.html
	cp staticassets/integ.html dist/index.html

ts:
	./node_modules/.bin/tsc -p tsconfig.json 

scss:
	./node_modules/.bin/node-sass -r src/ -o bin/ \
	--include-path ./node_modules/bulma 

dev: clean static htmldev
	export BACKEND=local && ./node_modules/.bin/webpack-dev-server --hot --inline

integ: clean staticassets
	export BACKEND=integ && ./node_modules/.bin/webpack-dev-server --hot --inline

prod: clean staticassets
	./node_modules/.bin/webpack -p

test: clean ts
	export NODE_ENV=test && ./node_modules/karma/bin/karma start karma.conf.js
	