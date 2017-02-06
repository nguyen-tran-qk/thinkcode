# Bower Overview

[Bower](http://bower.io) is a package management tool optimized for the front-end. Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for. Bower keeps track of these packages in a manifest file, `bower.json`.

---

## Installing packages

You can install packages with:

	bower install <package>
	
With an optional `--save` to update the `bower.json` manifest file to include the new package.

	bower install <package> --save
	
Bower installs packages to `bower_components/`.

---

## Example
	
To exemplify, let's say we want to include jQuery UI into our project - **and by the way, don't do this! jQuery UI is already included.**

1. Install the latest jQuery UI via bower:

		bower install jquery-ui --save

2. Define a copy task in `.build/copy-vendor/copy.core.json`:

		{
			"task": "copy-vendor-jquery-ui-scripts",
			"cwd": "bower_components",
			"src": [
				"jquery-ui/ui/core.js",
				"jquery-ui/ui/widget.js",
				"jquery-ui/ui/mouse.js",
				"jquery-ui/ui/position.js",
				"jquery-ui/ui/draggable.js",
				"jquery-ui/ui/droppable.js",
				"jquery-ui/ui/resizable.js",
				"jquery-ui/ui/selectable.js",
				"jquery-ui/ui/sortable.js"
			],
			"dest": "js/vendor/core/jquery-ui",
			"flatten": true
		}
		
	The `json` file will be picked up automatically and executed when running pt. 5 of the [build process](/workflow/gulp/index.html#build-with-concatenated-files-and-bundles). The task will copy the files defined in the `src` array from `bower_components/jquery-ui/ui/*.js` to `$BUILD_PATH/$THEME_NAME/js/vendor/core/jquery-ui/*.js`. 
	
	At this point we could load any of the files in HTML simply by:
	
		<script src="js/vendor/core/jquery-ui/core.js"></script>
		<script src="js/vendor/core/jquery-ui/widget.js"></script>
		<!-- etc ... -->
		
3. Instead, we go further and concatenate the jQuery UI files from `$BUILD_PATH/$THEME_NAME/js/vendor/core/jquery-ui/*.js` into `$BUILD_PATH/$THEME_NAME/js/vendor/core/jquery-ui.custom.js` which is further concatenated into `$BUILD_PATH/$THEME_NAME/js/vendor/core/all.js` along with many other libraries in the `core` group.
	
	For that, we use the `.build/concat-vendor/concat.core.json` config file:
	
		[
			{
				"build": "js/vendor/core/jquery-ui.custom.js",
				"cwd": "$THEME_DIR/js/vendor/core/jquery-ui",
				"files": [
					"core.js",
					"widget.js",
					"mouse.js",
					"position.js",
					"draggable.js",
					"droppable.js",
					"resizable.js",
					"selectable.js",
					"sortable.js"
				]
			},
			{
				"build": "js/vendor/core/all.js",
				"cwd": "$THEME_DIR/js/vendor/core",
				"files": [
					"...",
					"jquery-ui.custom.js"
				]
			}
		]
		
	The `json` file will be picked up automatically and executed when running pt. 6 of the [build process](/workflow/gulp/index.html#build-with-concatenated-files-and-bundles) and it will first create `$BUILD_PATH/$THEME_NAME/js/vendor/core/jquery-ui.custom.js` and then include the resulting file's content in `$BUILD_PATH/$THEME_NAME/js/vendor/core/all.js`.
	
4. Now, we could load from our HTML only the jQuery UI library:
	
		<script src="js/vendor/core/jquery-ui.custom.js"></script>
		
	Or, along with all the libraries from the `core` directory: 
	
		<script src="js/vendor/core/all.js"></script>
		
	**Note:** you can see exactly what's included in `$BUILD_PATH/$THEME_NAME/js/**/all.js` files by looking at the `concat-*/concat.*.json` and `concat.json` files in the `.build` directory.
	
---
	
## See also

- [The build process](/workflow/gulp/index.html)
- [Include paths](/code/include-paths/index.html)
- [Loading assets](/reference/layout/index.html#loading-assets)