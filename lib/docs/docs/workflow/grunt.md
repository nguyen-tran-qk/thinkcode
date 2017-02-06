# Grunt Overview

[Grunt](http://gruntjs.com) is the JavaScript task runner with the largest ecosystem. You can use Grunt to automate just about anything with a minimum of effort. We provide Grunt tasks for the most important aspects of customizing our templates.

---

## Prerequisites

Make sure you have followed the [Grunt installation steps](/index.html) for your operating system.

### Linux / Mac OS X

- **create a copy of** `lib/grunt/Gruntfile.js` to the root directory, *if it doesn't exist already*.

### Windows

Additionaly, when running on Windows operating systems, do the following:

1. **remove the provided Gruntfile.js** from the root directory of the project, *if it already exists* - it's a soft linux symlink and chances are the contents of this file is just a pointer to the real file which is located in `lib/grunt/Gruntfile.js`
2. **copy** `lib/grunt/Gruntfile.js` in place of the file you removed at step 1.
3. **When using Windows, make sure all the commands in this documentation are executed from either the Terminal builtin with SourceTree or a MSYS terminal. Don't use cmd.exe, it won't work! See [installation on Windows](/index.html).**
		
### Notes

Substitute `$THEME_NAME` where ever you see it thoughout the documentation instructions with a valid theme name. You can see the available themes by looking at the first level directories within `src/html/themes`.

---

## Build

[Unlike Gulp](/workflow/gulp/index.html), where we have a stream based **build pipeline**, Grunt provides a file based **build system**. Nonetheless, it connects files together across a number of processing steps, defining dependencies and which results in the final assets that get used by the application.

### Build paths

A build path is the destination directory where our final assets are placed after going through the build process. The build path is established with the `--dist path/to/build` CLI option.

- For usage details and examples, see [Build paths from Gulp](/workflow/gulp/index.html#build-paths).
- We'll be referring to the build path throughout the documentation via `$BUILD_PATH`.

---

### Concatenated files and bundles

See [Concatenated files and bundles from Gulp](/workflow/gulp/index.html#concatenated-files-and-bundles).

### Build with concatenated files and bundles
	
```bash
grunt --theme $THEME_NAME build:d
```

**This is the fastest build task and has the following main characteristics:**

1. Cleans the theme's build path (removes everything under `$BUILD_PATH/$THEME_NAME/`).
	
2. Does NOT generate minified assets.

	You can enable minification for both CSS and JavaScript:
	
		grunt --theme $THEME_NAME build:d --minify true
		
	And with source maps:
	
		grunt --theme $THEME_NAME build:d --minify true --debug true

3. Compiles Less files into CSS:
		
	- `src/less/themes/$THEME_NAME/app.less` into `$BUILD_PATH/$THEME_NAME/css/app/app.css` **(required)**
	- `src/less/themes/$THEME_NAME/main.less` into `$BUILD_PATH/$THEME_NAME/css/app/main.css`
	- `src/less/themes/$THEME_NAME/vendor/*.less` into `$BUILD_PATH/$THEME_NAME/css/vendor/*.css`

4. Bundles application JavaScript with Browserify:

	- `src/js/themes/$THEME_NAME/app.js` into `$BUILD_PATH/$THEME_NAME/js/app/app.js` **(required)**
	- `src/js/themes/$THEME_NAME/main.js` into `$BUILD_PATH/$THEME_NAME/js/app/main.js`
	- executes *browserify* tasks defined in `.build/browserify.json`
	- **excluding tasks for which the `build` key starts with `app/*` (which are ignored)**

5. Compiles Swig template files into HTML:

	- `src/html/themes/$THEME_NAME/**/*.html` into `$BUILD_PATH/$THEME_NAME/**/*.html`

6. Copies files, in the following order:

	1. `src/images/common/*` into `$BUILD_PATH/$THEME_NAME/images/*` - **images stored here will end up in every theme**
	- `src/images/themes/$THEME_NAME/*` into `$BUILD_PATH/$THEME_NAME/images/*` - **theme specific images**
	- executes *copy* tasks defined in `.build/copy-*/copy.*.json` *(in path alphabetical order)*
	- executes *copy* tasks defined in `.build/copy.json`

7. Concatenates files, in the following order:

	1. executes *concat* tasks defined in `.build/concat-*/concat.*.json` *(in path alphabetical order)*
	- executes *concat* tasks defined in `.build/concat.json`
	- **excluding tasks for which the `build` key starts with `js/app/*` (which are ignored)**

Note that the execution order of different tasks is important.

---

### Separated libraries

See [Separated libraries from Gulp](/workflow/gulp/index.html#separated-libraries).

### Build with separated libraries

**We definitely don't recommend this**, but we won't stop you either. Here's how you can do it:

```bash
grunt --theme $THEME_NAME build:dm
```

Which is the same as: 
	
```bash
grunt --theme $THEME_NAME build:d
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

Additionally, you can instruct Swig when it compiles into HTML, to automatically load the separated files instead of the bundles (so the final HTML output of your application will look similar to [this example](/workflow/gulp/index.html#separated-libraries)):

```bash
grunt --theme $THEME_NAME build:dm --bundle false
```

---

## Watch

```bash
grunt --theme $THEME_NAME
```

See [Watch from Gulp](/workflow/gulp/index.html#watch).

---

## Tasks

While we already introduced the most important tasks of the grunt workflow, `build:d`, `build:dm` and `watch`, there are several other tasks that are actually used by the build tasks themselves and that you can also use when you see fit.

---

### Browserify tasks

#### browserify

- Creates the main application script bundle from `src/js/themes/$THEME_NAME/app.js` to `$BUILD_PATH/$THEME_NAME/js/app/app.js`.
- Creates a secondary and optional application script bundle from `src/js/themes/$THEME_NAME/main.js` to `$BUILD_PATH/$THEME_NAME/js/app/main.js` *(only if the source file exists)*.

```bash
grunt --theme $THEME_NAME browserify
```

#### browserify-modules

- Executes *browserify* tasks defined in `.build/browserify.json` for which the build key starts with `app/*`

```bash
grunt --theme $THEME_NAME browserify-modules
```

---

### Code validation tasks

#### jshint

- Runs JSHint on all the JavaScript files within `lib/**/*.js` and `src/**/*.js`, a tool to detect errors and potential problems in your JavaScript code.

```bash
grunt --theme $THEME_NAME jshint
```

---

### JavaScript compression tasks

#### uglify:all

- Minifies all JavaScript files from `$BUILD_PATH/$THEME_NAME/js/**/*.js` to `$BUILD_PATH/$THEME_NAME/js/**/*.min.js`.

```bash
grunt --theme $THEME_NAME uglify:all
```

#### uglify:theme

Minifies the following JavaScript files: 

- `$BUILD_PATH/$THEME_NAME/js/app/app.js` to `$BUILD_PATH/$THEME_NAME/js/app/app.min.js`
- `$BUILD_PATH/$THEME_NAME/js/app/main.js` to `$BUILD_PATH/$THEME_NAME/js/app/main.min.js`
- `$BUILD_PATH/$THEME_NAME/js/app/vendor/*.js` to `$BUILD_PATH/$THEME_NAME/js/app/vendor/*.min.js`

```bash
grunt --theme $THEME_NAME uglify:theme
```

#### uglify:modules

Minifies all JavaScript files from `$BUILD_PATH/$THEME_NAME/js/app/*.js` to `$BUILD_PATH/$THEME_NAME/js/app/*.min.js`.

**Except**:

- `$BUILD_PATH/$THEME_NAME/js/app/app.js`
- `$BUILD_PATH/$THEME_NAME/js/app/main.js`

```bash
grunt --theme $THEME_NAME uglify:modules
```

#### uglify:main

Minifies JavaScript from `$BUILD_PATH/$THEME_NAME/js/app/app.js` to `$BUILD_PATH/$THEME_NAME/js/app/app.min.js`.

```bash
grunt --theme $THEME_NAME uglify:main
```

---

### CSS compression tasks

#### cssmin:vendor

- Minifies all CSS files from `$BUILD_PATH/$THEME_NAME/css/vendor/*.css` to `$BUILD_PATH/$THEME_NAME/css/vendor/*.min.css`.

```bash
grunt --theme $THEME_NAME cssmin:vendor
```

#### cssmin:theme

Minifies the following CSS files:

- `$BUILD_PATH/$THEME_NAME/css/app/app.css` to `$BUILD_PATH/$THEME_NAME/css/app/app.min.css`
- `$BUILD_PATH/$THEME_NAME/css/app/main.css` to `$BUILD_PATH/$THEME_NAME/css/app/main.min.css`

```bash
grunt --theme $THEME_NAME cssmin:theme
```

#### cssmin:modules

- Minifies all CSS files from `$BUILD_PATH/$THEME_NAME/css/app/*.css` to `$BUILD_PATH/$THEME_NAME/css/app/*.min.css` **except** `app.css` and `main.css`.

```bash
grunt --theme $THEME_NAME cssmin:modules
```

#### cssmin:skins

- Minifies all CSS files from `$BUILD_PATH/$THEME_NAME/css/skin-*.css` to `$BUILD_PATH/$THEME_NAME/css/skin-*.min.css`

```bash
grunt --theme $THEME_NAME cssmin:skins
```

#### cssmin

Runs the following *cssmin* tasks: 

- `cssmin:vendor`
- `cssmin:theme`
- `cssmin:modules`
- `cssmin:skins`

```bash
grunt --theme $THEME_NAME cssmin
```

---

### Copy tasks

#### copy:images_common

- Copies all files and directories from `src/images/common` to `$BUILD_PATH/$THEME_NAME/images` - **images stored in the `src/images/common` source directory will end up in every theme**.

```bash
grunt --theme $THEME_NAME copy:images_common
```

#### copy:images_theme

- Copies all files and directories from `src/images/themes/$THEME_NAME` to `$BUILD_PATH/$THEME_NAME/images` - **theme specific images**.

```bash
grunt --theme $THEME_NAME copy:images_theme
```

#### copy

Runs the following *copy* tasks: 

- `copy:images_common`
- `copy:images_theme`

```bash
grunt --theme $THEME_NAME copy
```

#### copy-build

Runs the following *copy* tasks:

1. `copy:images_common`
- `copy:images_theme`
- executes *copy* tasks defined in `.build/copy-*/copy.*.json` *(in path alphabetical order)*
- executes *copy* tasks defined in `.build/copy.json`

```bash
grunt --theme $THEME_NAME copy-build
```

---

### Concatenation tasks

#### concat

1. executes *concat* tasks defined in `.build/concat-*/concat.*.json` *(in path alphabetical order)*
- executes *concat* tasks defined in `.build/concat.json`
- **excluding tasks for which the `build` key starts with `js/app/*` or `css/app/*` (which are ignored)**

```bash
grunt --theme $THEME_NAME concat
```

#### concat-modules

1. executes *concat* tasks defined in `.build/concat-*/concat.*.json` *(in path alphabetical order)*
- executes *concat* tasks defined in `.build/concat.json`
- **ONLY tasks for which the `build` key starts with `js/app/*` or `css/app/*`**

```bash
grunt --theme $THEME_NAME concat-modules
```

---

### Clean tasks

#### clean:html

- Removes all HTML files from `$BUILD_PATH/$THEME_NAME/**/*.html`.

```bash
grunt --theme $THEME_NAME clean:html
```

#### clean:dist

- Removes all files and directories from `$BUILD_PATH/$THEME_NAME/**/*`.

```bash
grunt --theme $THEME_NAME clean:dist
```

#### clean:modules

- Removes all CSS files from `$BUILD_PATH/$THEME_NAME/css/app/*.css` **except** `app.css` and `main.css`.
- Removes all JavaScript files from `$BUILD_PATH/$THEME_NAME/js/app/*.js` **except** `app.js` and `main.js`.

```bash
grunt --theme $THEME_NAME clean:modules
```

#### clean:skins

- Removes all CSS files from `$BUILD_PATH/$THEME_NAME/css/skin-*.css`.

```bash
grunt --theme $THEME_NAME clean:skins
```

#### clean

Runs all the following *clean* tasks:

- `clean:html`
- `clean:dist`
- `clean:modules`
- `clean:skins`

```bash
grunt --theme $THEME_NAME clean
```

---

### HTML tasks

#### swig

- Compiles all Swig templates to HTML from `src/html/themes/$THEME_NAME/**/*.html` to `$BUILD_PATH/$THEME_NAME/**/*.html`.

```bash
grunt --theme $THEME_NAME swig
```

#### prettify:theme

- Reformats all HTML files from `$BUILD_PATH/$THEME_NAME/**/*.html`.

```bash
grunt --theme $THEME_NAME prettify:theme
```

---

### Less tasks

#### less:theme

- Compiles all LESS files from `src/less/themes/$THEME_NAME/*.less` to `$BUILD_PATH/$THEME_NAME/css/app/*.css`.
- **Excluding `_*.less`** files which are considered partials.

```bash
grunt --theme $THEME_NAME less:theme
```

#### less:modules

- Compiles all LESS files from `src/less/themes/$THEME_NAME/app/*.less` to `$BUILD_PATH/$THEME_NAME/css/app/*.css`.
- **Excluding `_*.less`** files which are considered partials.

```bash
grunt --theme $THEME_NAME less:modules
```

#### less:vendor

- Compiles all LESS files from `src/less/themes/$THEME_NAME/vendor/*.less` to `$BUILD_PATH/$THEME_NAME/css/vendor/*.css`.
- **Excluding `_*.less`** files which are considered partials.

```bash
grunt --theme $THEME_NAME less:vendor
```

#### less:skins

- Compiles all LESS files from `src/less/skins/$THEME_NAME/*.less` to `$BUILD_PATH/$THEME_NAME/css/skin-*.css`.

```bash
grunt --theme $THEME_NAME less:skins
```

#### less

Runs all the following *less* tasks:

- `less:theme`
- `less:modules`
- `less:vendor`
- `less:skins`

```bash
grunt --theme $THEME_NAME less
```

---

### CSS vendor prefixes

Parse CSS and automatically add vendor prefixes to CSS rules for the last 4 versions of all browsers.

#### autoprefixer:theme

Automatically add vendor prefixes to: 

- `$BUILD_PATH/$THEME_NAME/css/app/app.css`
- `$BUILD_PATH/$THEME_NAME/css/app/main.css`

```bash
grunt --theme $THEME_NAME autoprefixer:theme
```

#### autoprefixer:modules

Automatically add vendor prefixes to `$BUILD_PATH/$THEME_NAME/css/app/*.css`.

**Except**:

- `$BUILD_PATH/$THEME_NAME/css/app/app.css`
- `$BUILD_PATH/$THEME_NAME/css/app/main.css`

```bash
grunt --theme $THEME_NAME autoprefixer:modules
```

#### autoprefixer:skins

- Automatically add vendor prefixes to `$BUILD_PATH/$THEME_NAME/css/skin-*.css`.

```bash
grunt --theme $THEME_NAME autoprefixer:skins
```

#### autoprefixer

Runs all the following *autoprefixer* tasks:

- `autoprefixer:theme`
- `autoprefixer:modules`
- `autoprefixer:skins`

```bash
grunt --theme $THEME_NAME autoprefixer
```

---

## See also

- [Structure](/code/structure/index.html)
- [Manage assets](/code/bower/index.html)
- [Include paths](/code/include-paths/index.html)
- [Loading assets](/reference/layout/index.html#loading-assets)