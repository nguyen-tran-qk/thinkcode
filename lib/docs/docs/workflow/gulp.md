# Gulp Overview

[Gulp](http://gulpjs.com) is a streaming build system that can help automate your workflow. We provide gulp tasks for the most important aspects of customizing our templates.

---

## Prerequisites

Make sure you have followed the [gulp installation steps](/index.html) for your operating system.

### Linux / Mac OS X

- **create a copy of** `lib/gulp/Gulpfile.js` to the root directory, *if it doesn't exist already*.

### Windows

Additionaly, when running on Windows operating systems, do the following:

1. **remove the provided Gulpfile.js** from the root directory of the project, *if it already exists* - it's a soft linux symlink and chances are the contents of this file is just a pointer to the real file which is located in `lib/gulp/Gulpfile.js`
2. **copy** `lib/gulp/Gulpfile.js` in place of the file you removed at step 1.
3. **edit** the following line in `Gulpfile.js`:

		requireDir('./tasks', {recurse: true});
		
	to look like this:
	
		requireDir('./lib/gulp/tasks', {recurse: true});
		
4. **When using Windows, make sure all the commands in this documentation are executed from either the Terminal builtin with SourceTree or a MSYS terminal. Don't use cmd.exe, it won't work! See [installation on Windows](/index.html).**
		
### Notes

Substitute `$THEME_NAME` where ever you see it thoughout the documentation instructions with a valid theme name. You can see the available themes by looking at the first level directories within `src/html/themes`.

---

## Build

Gulp provides a stream based **build pipeline** that connects files together across a number of processing steps, defining dependencies. The files content gets read and piped down a number of processing steps which results in the final assets that get used by the application.

---

### Build paths

A build path is the destination directory where our final assets are placed after going through the build process. The build path is established with the `--dist path/to/build` CLI option.

For example:

```bash
gulp --theme $THEME_NAME build:d --dist build
```
	
Will build the application source into the `build/$THEME_NAME/` destination directory. This path is not mandatory to exist previous to running the `build:d` task, it will be created if necessary.

The default build path without providing the `--dist` CLI option is `dist/themes`, so any build will create `dist/themes/$THEME_NAME` by default.

We can create persistent config overrides so that we don't have to specify a CLI option every time we want to have a custom build path for any specific build in the `.build/dist.json` file. To see the predefined build paths for this setup, please refer to this file.

For example, if we were to have the following `.build/dist.json` file:

	{
		"my_theme": "",
		"my_second_theme": "custom"
	}

When running:

```bash
gulp --theme my_theme build:d
```
	
Will create `my_theme/` directory in the current working directory, at the project root.

And running:

```bash
gulp --theme my_second_theme build:d
```
	
Will similarily create `custom/my_second_theme/` directory.

Note that we'll be referring to the build path throughout the documentation via `$BUILD_PATH`.

---

### Concatenated files and bundles

In order to follow best practices, reduce the HTTP requests on any given page as much as possible and benefit from improved performance, we are using concatenation and bundles for serving our assets. Instead of having to load many files for all of the various libraries we use in our project, we only load a single file for everything with a single line of code in our HTML.

When using concatenated assets and bundles, our HTML pages might look like this:

	<!DOCTYPE html>
	<html lang="en">
	<head>

		<!-- Vendor styling bundle -->
		<link rel="stylesheet" href="css/vendor/all.css" />
		
		<!-- Application styling bundle -->
		<link rel="stylesheet" href="css/app/app.css" />
		
	</head>
	<body>
	
		<!-- Vendor scripts bundle -->
		<script src="js/vendor/all.js"></script>
		
		<!-- Application scripts bundle -->
		<script src="js/app/app.js"></script>
		
	</body>
	</html>
	
### Build with concatenated files and bundles
	
```bash
gulp --theme $THEME_NAME build:d
```
		
**This is the fastest build task and has the following main characteristics:**
	
1. Does NOT generate minified assets.

	You can enable minification for both CSS and JavaScript:
	
		gulp --theme $THEME_NAME build:d --minify true
		
	And with source maps:
	
		gulp --theme $THEME_NAME build:d --minify true --debug true

2. Compiles Less files into CSS:
		
	- `src/less/themes/$THEME_NAME/app.less` into `$BUILD_PATH/$THEME_NAME/css/app/app.css` **(required)**
	- `src/less/themes/$THEME_NAME/main.less` into `$BUILD_PATH/$THEME_NAME/css/app/main.css`
	- `src/less/themes/$THEME_NAME/vendor/*.less` into `$BUILD_PATH/$THEME_NAME/css/vendor/*.css`

3. Bundles application JavaScript with Browserify:

	- `src/js/themes/$THEME_NAME/app.js` into `$BUILD_PATH/$THEME_NAME/js/app/app.js` **(required)**
	- `src/js/themes/$THEME_NAME/main.js` into `$BUILD_PATH/$THEME_NAME/js/app/main.js`
	- executes *browserify* tasks defined in `.build/browserify.json`
	- **excluding tasks for which the `build` key starts with `app/*` (which are ignored)**

4. Compiles Swig template files into HTML:

	- `src/html/themes/$THEME_NAME/**/*.html` into `$BUILD_PATH/$THEME_NAME/**/*.html`

5. Copies files, in the following order:

	1. `src/images/common/*` into `$BUILD_PATH/$THEME_NAME/images/*` - **images stored here will end up in every theme**
	- `src/images/themes/$THEME_NAME/*` into `$BUILD_PATH/$THEME_NAME/images/*` - **theme specific images**
	- executes *copy* tasks defined in `.build/copy-*/copy.*.json` *(in path alphabetical order)*
	- executes *copy* tasks defined in `.build/copy.json`

6. Concatenates files, in the following order:

	1. executes *concat* tasks defined in `.build/concat-*/concat.*.json` *(in path alphabetical order)*
	- executes *concat* tasks defined in `.build/concat.json`
	- **excluding tasks for which the `build` key starts with `js/app/*` (which are ignored)**

Note that the execution order of different tasks is important.

---

### Separated libraries

We've covered concatenation and bundles, but what about separated libraries? There is also an option for those who don't want to use bundles or concatenated files and where our HTML could look like this:

	<!DOCTYPE html>
	<html lang="en">
	<head>

		<!-- Separated vendor styling -->
		<link rel="stylesheet" href="css/vendor/bootstrap.css" />
		<link rel="stylesheet" href="css/vendor/font-awesome.css" />
		<link rel="stylesheet" href="css/vendor/morris.css" />
		<!-- etc. -->
				
		<!-- Separated application styling -->
		<link rel="stylesheet" href="css/app/main.css" />
		<link rel="stylesheet" href="css/app/sidebar.css" />
		<link rel="stylesheet" href="css/app/navbar.css" />
		<!-- etc. -->
		
	</head>
	<body>
		
		<!-- Separated vendor scripts -->
		<script src="js/vendor/core/jquery.js"></script>
		<script src="js/vendor/core/bootstrap.js"></script>
		<script src="js/vendor/core/jquery-ui.custom.js"></script>
		<!-- etc. -->
		
		<!-- Separated application scripts -->
		<script src="js/app/main.js"></script>
		<script src="js/app/essentials.js"></script>
		<script src="js/app/navbar.js"></script>
		<!-- etc. -->
		
	</body>
	</html>
	
### Build with separated libraries

**We definitely don't recommend this**, but we won't stop you either. Here's how you can do it:

```bash
gulp --theme $THEME_NAME build:dm
```
	
Which is the same as: 
	
```bash
gulp --theme $THEME_NAME build:d
```
	
But, with the following additional tasks:

1. Compiles separated Less modules to CSS:

	- `src/less/theme/$THEME_NAME/app/*.less` into `$BUILD_PATH/$THEME_NAME/css/app/*.css`

2. Bundles separated JavaScript modules with Browserify:

	- executes *browserify* tasks defined in `.build/browserify.json`
	- **including tasks for which the `build` key starts with `app/*` (which are ignored with `build:d`)**

3. Concatenates separated JavaScript files which don't make use of Browserify and `require`:

	- executes *concat* tasks defined in `.build/concat-app/concat.*.json`
	- executes *concat* tasks defined in `.build/concat.json`
	- **including tasks for which the `build` key starts with `js/app/*` (which are ignored with `build:d`)**

Additionally, you can instruct Swig when it compiles into HTML, to automatically load the separated files instead of the bundles (so the final HTML output of your application will look similar to our example above):

```bash
gulp --theme $THEME_NAME build:dm --bundle false
```

---

## Watch

```bash
gulp --theme $THEME_NAME
```
	
Starts a local web server and even opens your default browser on localhost on a dynamic free port. The web server is powered by BrowserSync, which means you can simultaneously track changes and synchronize the actions from your desktop browser with multiple devices while you're developing the application. 

You can access the application from a mobile device via your private IP address and then if you refresh the page in your desktop browser, it will automatically refresh the application on your mobile device, but BrowserSync can do much more than a refresh (keeps in sync scoll position, click events, etc).

This also instructs gulp to watch your application files and rebuild when source files change and when it's done building, it will refresh your browser(s).

---

## Tasks

While we already introduced the most important tasks of the gulp workflow, `build:d`, `build:dm` and `watch`, there are several other tasks that are actually used by the build tasks themselves and that you can also use when you see fit.

---

### Browserify tasks

#### browserify:main

- Creates the main application script bundle from `src/js/themes/$THEME_NAME/app.js` to `$BUILD_PATH/$THEME_NAME/js/app/app.js`.
- Creates a secondary and optional application script bundle from `src/js/themes/$THEME_NAME/main.js` to `$BUILD_PATH/$THEME_NAME/js/app/main.js` *(only if the source file exists)*.

```bash
gulp --theme $THEME_NAME browserify:main
```

#### browserify:modules

- Executes *browserify* tasks defined in `.build/browserify.json` for which the build key starts with `app/*`

```bash
gulp --theme $THEME_NAME browserify:modules
```

#### browserify

Runs all *browserify* tasks: 

- `browserify:main`
- `browserify:modules`

```bash
gulp --theme $THEME_NAME browserify
```

---

### Code validation tasks

#### jshint

- Runs JSHint on all the JavaScript files within `lib/**/*.js` and `src/**/*.js`, a tool to detect errors and potential problems in your JavaScript code.

```bash
gulp --theme $THEME_NAME jshint
```

---

### JavaScript compression tasks

#### uglify:all

- Minifies all JavaScript files from `$BUILD_PATH/$THEME_NAME/js/**/*.js` to `$BUILD_PATH/$THEME_NAME/js/**/*.min.js`.

```bash
gulp --theme $THEME_NAME uglify:all
```

#### uglify:theme

Minifies the following JavaScript files: 

- `$BUILD_PATH/$THEME_NAME/js/app/app.js` to `$BUILD_PATH/$THEME_NAME/js/app/app.min.js`
- `$BUILD_PATH/$THEME_NAME/js/app/main.js` to `$BUILD_PATH/$THEME_NAME/js/app/main.min.js`
- `$BUILD_PATH/$THEME_NAME/js/app/vendor/*.js` to `$BUILD_PATH/$THEME_NAME/js/app/vendor/*.min.js`

```bash
gulp --theme $THEME_NAME uglify:theme
```

#### uglify:modules

- Minifies all JavaScript files from `$BUILD_PATH/$THEME_NAME/js/app/**/*.js` to `$BUILD_PATH/$THEME_NAME/js/app/**/*.min.js`.

```bash
gulp --theme $THEME_NAME uglify:modules
```

#### uglify:main

- Minifies `$BUILD_PATH/$THEME_NAME/js/app/app.js` to `$BUILD_PATH/$THEME_NAME/js/app/app.min.js`.

```bash
gulp --theme $THEME_NAME uglify:main
```

---

### CSS compression tasks

#### cssmin:vendor

- Minifies all CSS files from `$BUILD_PATH/$THEME_NAME/css/vendor/*.css` to `$BUILD_PATH/$THEME_NAME/css/vendor/*.min.css`.

```bash
gulp --theme $THEME_NAME cssmin:vendor
```

#### cssmin:theme

Minifies the following CSS files:

- `$BUILD_PATH/$THEME_NAME/css/app/app.css` to `$BUILD_PATH/$THEME_NAME/css/app/app.min.css`
- `$BUILD_PATH/$THEME_NAME/css/app/main.css` to `$BUILD_PATH/$THEME_NAME/css/app/main.min.css`

```bash
gulp --theme $THEME_NAME cssmin:theme
```

#### cssmin:modules

- Minifies all CSS files from `$BUILD_PATH/$THEME_NAME/css/app/*.css` to `$BUILD_PATH/$THEME_NAME/css/app/*.min.css` **except** `app.css` and `main.css`.

```bash
gulp --theme $THEME_NAME cssmin:modules
```

#### cssmin:skins

- Minifies all CSS files from `$BUILD_PATH/$THEME_NAME/css/skin-*.css` to `$BUILD_PATH/$THEME_NAME/css/skin-*.min.css`

```bash
gulp --theme $THEME_NAME cssmin:skins
```

---

### Copy tasks

#### copy:images-common

- Copies all files and directories from `src/images/common` to `$BUILD_PATH/$THEME_NAME/images` - **images stored in the `src/images/common` source directory will end up in every theme**.

```bash
gulp --theme $THEME_NAME copy:images-common
```

#### copy:images-theme

- Copies all files and directories from `src/images/themes/$THEME_NAME` to `$BUILD_PATH/$THEME_NAME/images` - **theme specific images**.

```bash
gulp --theme $THEME_NAME copy:images-theme
```

#### copy:images

Runs the following *copy* tasks: 

- `copy:images-common`
- `copy:images-theme`

```bash
gulp --theme $THEME_NAME copy:images
```

#### copy:build

Runs the following *copy* tasks:

1. `copy:images`
- executes *copy* tasks defined in `.build/copy-*/copy.*.json` *(in path alphabetical order)*
- executes *copy* tasks defined in `.build/copy.json`

```bash
gulp --theme $THEME_NAME copy:build
```

---

### Concatenation tasks

#### concat:dist

1. executes *concat* tasks defined in `.build/concat-*/concat.*.json` *(in path alphabetical order)*
- executes *concat* tasks defined in `.build/concat.json`
- **excluding tasks for which the `build` key starts with `js/app/*` or `css/app/*` (which are ignored)**

```bash
gulp --theme $THEME_NAME concat:dist
```

#### concat:modules

1. executes *concat* tasks defined in `.build/concat-*/concat.*.json` *(in path alphabetical order)*
- executes *concat* tasks defined in `.build/concat.json`
- **ONLY tasks for which the `build` key starts with `js/app/*` or `css/app/*`**

```bash
gulp --theme $THEME_NAME concat:modules
```

---

### Clean tasks

#### clean:html

- Removes all HTML files from `$BUILD_PATH/$THEME_NAME/**/*.html`.

```bash
gulp --theme $THEME_NAME clean:html
```

#### clean:dist

- Removes all files and directories from `$BUILD_PATH/$THEME_NAME/**/*`.

```bash
gulp --theme $THEME_NAME clean:dist
```

#### clean:modules

- Removes all CSS files from `$BUILD_PATH/$THEME_NAME/css/app/*.css` **except** `app.css` and `main.css`.
- Removes all JavaScript files from `$BUILD_PATH/$THEME_NAME/js/app/*.js` **except** `app.js` and `main.js`.

```bash
gulp --theme $THEME_NAME clean:modules
```

#### clean:skins

- Removes all CSS files from `$BUILD_PATH/$THEME_NAME/css/skin-*.css`.

```bash
gulp --theme $THEME_NAME clean:skins
```

---

### HTML tasks

#### swig

- Compiles all Swig templates to HTML from `src/html/themes/$THEME_NAME/**/*.html` to `$BUILD_PATH/$THEME_NAME/**/*.html`.

```bash
gulp --theme $THEME_NAME swig
```

#### prettify:theme

- Reformats all HTML files from `$BUILD_PATH/$THEME_NAME/**/*.html`.

```bash
gulp --theme $THEME_NAME prettify:theme
```

---

### Less tasks

#### less:theme

- Compiles all LESS files from `src/less/themes/$THEME_NAME/*.less` to `$BUILD_PATH/$THEME_NAME/css/app/*.css`.
- **Excluding `_*.less`** files which are considered partials.

```bash
gulp --theme $THEME_NAME less:theme
```

#### less:modules

- Compiles all LESS files from `src/less/themes/$THEME_NAME/app/*.less` to `$BUILD_PATH/$THEME_NAME/css/app/*.css`.
- **Excluding `_*.less`** files which are considered partials.

```bash
gulp --theme $THEME_NAME less:modules
```

#### less:vendor

- Compiles all LESS files from `src/less/themes/$THEME_NAME/vendor/*.less` to `$BUILD_PATH/$THEME_NAME/css/vendor/*.css`.
- **Excluding `_*.less`** files which are considered partials.

```bash
gulp --theme $THEME_NAME less:vendor
```

#### less:skins

- Compiles all LESS files from `src/less/skins/$THEME_NAME/*.less` to `$BUILD_PATH/$THEME_NAME/css/skin-*.css`.

```bash
gulp --theme $THEME_NAME less:skins
```

#### less

Runs all the following *less* tasks:

- `less:theme`
- `less:modules`
- `less:vendor`
- `less:skins`

```bash
gulp --theme $THEME_NAME less
```

---

## See also

- [Structure](/code/structure/index.html)
- [Manage assets](/code/bower/index.html)
- [Include paths](/code/include-paths/index.html)
- [Loading assets](/reference/layout/index.html#loading-assets)