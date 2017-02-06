# Browserify Overview

[Browserify](http://browserify.org) is a tool to build modular applications in JavaScript and lets you package and organize scripts in a modern and reusable fashion.

---

## How it works

Browserify starts at the entry point files that you give it and searches for any `require()` calls it finds. For every `require()` call with a string in it, browserify resolves those module strings to file paths and then searches those file paths for `require()` calls recursively until the entire dependency graph is visited. 

Each file is concatenated into a single javascript file with a minimal `require()` definition that maps the statically-resolved names to internal IDs. This means that the bundle you generate is completely self-contained and has everything your application needs to work with a pretty negligible overhead.

---

## Basic usage

Consider the file `src/js/themes/$THEME_NAME/app.js`:

	require('./_self_executing');
	
And `src/js/themes/$THEME_NAME/_self_executing.js`:

	(function(){
		'use strict';
		
		console.log('My custom self executing function was loaded');
		
	})();
	
This way, you can wrap any arbitrary code into a self executing anonymous function and `require` it from anywhere.
	
### Modules

Consider the file `src/js/themes/$THEME_NAME/app.js`:

	(function($){
		'use strict';
		
		var my_module = require('./_module');
	
		var app = new my_module({
			option: 'value',
			some: 'other'
		});
		
		app.init();
		
	})(jQuery);
	
And `src/js/themes/$THEME_NAME/_module.js`:
	
	var my_module = function(options){
		this.options = options || {};
	};
	
	my_module.prototype.init = function(){
		console.log('My application was initialized!');
		console.log(this.options);
	};
	
	module.exports = my_module;
	
But you can export anything, for example a simple function:

`src/js/themes/$THEME_NAME/_foo.js`:

	module.exports = function (n) {
		return n * 111
	};
	
And in `src/js/themes/$THEME_NAME/app.js`:

	var foo = require('./_foo.js');
	console.log(foo(5));
	
The output will be:

	555
	
But you can also export an integer directly:

	module.exports = 555
	
Or an object:

	var config = {
		some: 'value',
		another: 'option'
	};
	
	module.exports = config;