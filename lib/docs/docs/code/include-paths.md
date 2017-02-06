
# Include paths

We can easily include files in our application code, whether they are Less partials used to style out application, Swig templates used to compose HTML documents or JavaScript modules or arbitrary code, and we can do so anywhere from our application code, without having to use and keep track of nested, nasty relative paths.

**The include paths**:

- Less AND Browserify are using `bower_components/` and `lib/` as include paths.
- Swig is using the project root as the include path.

---

## Less

From `src/less/themes/$THEME_NAME/app.less` (or any other `*.less` file from any location) we can do:

	@import "sidebar/less/sidebar";
	
Instead of some relative path such as:

	@import "../../../../lib/sidebar/less/sidebar";
	
The import will first try to load the file from `bower_components/sidebar/less/sidebar.less`, but because the path doesn't exist, it will load `lib/sidebar/less/sidebar.less` which does exist.

Similarly, we can easily load Bootstrap from `bower_components/bootstrap/less/bootstrap.less` (or any other library) within any `*.less` file with:

	@import "bootstrap/less/bootstrap";
	
- See more about [using Less](/code/less/index.html).
	
---

## JavaScript

Via Browserify, from `src/js/themes/$THEME_NAME/app.js`, we can do:

	require("sidebar/js/main");
	
Instead of some relative path such as:

	require("../../../../lib/sidebar/js/main");
	
By using Browserify's `require`, we import `lib/sidebar/js/main.js` into `$BUILD_PATH/$THEME_NAME/js/app/app.js` at build time. This allows us to use partials and organise code in reusable packages and modules and then easily include it anywhere.

- See more about [using Browserify](/code/browserify/index.html).

---

## Swig

The include path for Swig templates is the project root directory, so we have access to both `lib/` and `src/` directories from any Swig template, always referencing files from the root directory.

From any `*.html` file in `src/html/themes/$THEME_NAME`, we can include other HTML files:

	{% include "lib/path/to/file.html" %}
	{% include "src/html/themes/$THEME_NAME/file.html" %}
	
Or, extend from a Swig layout:

	{% extends "lib/path/to/layout.html" %}
	{% extends "src/html/themes/$THEME_NAME/layout.html" %}
	
- See more about [using Swig templates](/code/swig/index.html).

---

## See also

- [The build process](/workflow/gulp/index.html)
- [Structure](/code/structure/index.html)
- [Manage assets](/code/bower/index.html)
- [Loading assets](/reference/layout/index.html#loading-assets)