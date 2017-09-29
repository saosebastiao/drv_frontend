default: integ

clean:
	find bin/ -type f -exec rm {} +
	find dist/ -type f -exec rm {} +
	
staticassets: 
	rsync -avm \
	--include='*.html' \
	--include='*.css' \
	--include='*.png' \
	-f 'hide,! */' src/ dist/

ts:
	./node_modules/.bin/tsc -p tsconfig.json 

scss:
	./node_modules/.bin/node-sass -r src/ -o bin/ \
	--include-path ./node_modules/bootstrap-sass/assets/stylesheets \

dev:
	export BACKEND=local && ./node_modules/.bin/webpack-dev-server --hot --inline

integ: clean staticassets
	export BACKEND=integ && ./node_modules/.bin/webpack-dev-server --hot --inline

prod: clean staticassets
	./node_modules/.bin/webpack -p

test: clean ts
	export NODE_ENV=test && ./node_modules/karma/bin/karma start karma.conf.js
	