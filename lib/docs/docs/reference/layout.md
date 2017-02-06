# Layout

We rely heavily on various Bootstrap components such as the Bootstrap Grid System to create our layouts, so if you haven't done so already, we encourage you to continue by familiarizing yourself with Bootstrap.

**The layout component**:

- Customizes Bootstrap's grid system spacings;
- Provides Swig partials for composing HTML pages in the `lib/layout/html/` directory.
- Provides examples of HTML pages composed from Swig partials in `lib/layout/html/samples/` directory.
- Provides elements:

	1. A basic footer copyright line.
	2. A sticky footer.
	3. An application layout.
	4. Split areas.
	5. Scrollable areas.

---

## Requirements

### JavaScript

To load the layout component, from `src/js/themes/$THEME_NAME/app.js`:

	// Layout
	require('layout/js/main');
	
This will load `lib/layout/js/main.js` into our main application script bundle.

### Less

From `src/less/themes/$THEME_NAME/app.less`:

	// Layout
	@import "layout/less/layout";
	
Which will load `lib/layout/less/layout.less` into our main application style bundle.

---

#### Alternative

If working with Less and Browserify bundles is not your favorite thing, you can alternatively load the pre-built static assets we have included:

	<!-- In the head of the HTML document -->
	<link rel="stylesheet" href="css/app/layout.css" />
	
	<!-- At the bottom of the HTML document -->
	<script src="js/app/layout.js"></script>

---

## Getting started

Please refer to the official [Bootstrap documentation](http://getbootstrap.com/getting-started/#template) and [Bootstrap layout examples](http://getbootstrap.com/getting-started/#examples).

---

## Swig templates

Composing HTML pages with Swig partials.

1. `lib/layout/html/_header.html`:

	This is the header and provides the opening `html` and `body` tags of the HTML document.

2. `lib/layout/html/_head.html`: 

	This is included from `_header.html` and provides the `head` part of the HTML document.

3. `lib/layout/html/_head_includes.html`: 

	This is included from `_head.html` and provides dynamic loading of assets required by the application in the `head` section, both CSS and 	JavaScript.

4. `lib/layout/html/_footer_scripts.html`: 

	This provides the closing `body` and `html` tags, but also provides dynamic loading of the JavaScript required by the application, before the 	closing `body` tag.
	
---
	
## Loading assets

The `_head_includes.html` and `_footer_scripts.html` Swig partials both contain logic to dynamically load the required application assets, by reading a JSON configuration file.

#### Configuration

We define which files will be loaded in `src/swig.json`.

The vendor CSS stylesheets with the `css_vendor` key:

	"css_vendor": [
		"vendor/bootstrap",
		"vendor/font-awesome",
		"vendor/slick"
		...
	]
	
Will render in your HTML document as:

	<link rel="stylesheet" href="css/vendor/bootstrap.css" />
	<link rel="stylesheet" href="css/vendor/font-awesome.css" />
	<link rel="stylesheet" href="css/vendor/slick.css" />
	<!-- etc. -->
	
The application CSS stylesheets with the `css_modules` key:

	"css_modules": [
		"app/essentials",
		"app/layout",
		"app/sidebar",
		"app/sidebar-skins"
	],
	
Will render in your HTML document as:

	<link rel="stylesheet" href="css/app/essentials.css" />
	<link rel="stylesheet" href="css/app/layout.css" />
	<link rel="stylesheet" href="css/app/sidebar.css" />
	<!-- etc. -->
	
Similarly, we can configure the `js_vendor` and `js_modules` keys to load vendor and application scripts.

Note that all the entries in this configuration are stored without a file extension (`.css` or `.js`).

You will notice the main application files (`js/app/app.js` and `css/app/app.css`) are not stored in this configuration file, because they are considered special assets required by the application and will always be loaded by default.

#### Minified assets and concatenated or separate libraries

The `_head_includes.html` and `_footer_scripts.html` Swig partials also contain logic to automatically load the minified version of the assets at build time and also toggle between using bundles and concatenated files or separate libraries. See how to **enable minification** and **switch concatenated files to separated libraries** in [the build process](/workflow/gulp/index.html).

---

## Elements

### Footer

#### Basic footer

	<html>
		...
		<body>
			
			<!-- Footer -->
			<div class="footer">
				<strong>Your product name</strong> - Copyright
			</div>
			
		</body>
	</html>
	
#### Sticky footer

Adding the `ls-bottom-footer` class on the `html` element will change the footer's position to `fixed` which will make it stick at the bottom area of the screen to ensure it's always visible at the same position even when the page scroll changes. It will also add the required extra spacing to the `body` element to compensate for the height of the sticky footer.

	<html class="ls-bottom-footer">
		...
	</html>

---

### Split areas

	<div class="split-vertical">
	
		<!-- Split header -->
		<!-- anything can go here -->
		
		<!-- Split body -->
		<!-- The split body will take all the remaining available height -->
		<!-- height = split-vertical container height minus header and footer height -->
		<div class="split-vertical-body">
			<div class="split-vertical-cell">
				
				<!-- scrollable area -->
				<div data-scrollable>
				
					<!-- content -->
					...
					
				</div>
				
			</div>
		</div>
		
		<!-- Split footer -->
		<!-- anything can go here -->
		
	</div>

Note that the parent container of `split-vertical` needs to have the `height` CSS property defined. For example, if we placed `split-vertical` directly under the `body` element, then the `html` and `body` would need to have `height: 100%; position: relative; overflow: hidden;`.

---

### Scrollable areas

Vertical scrollable area via the `data-scrollable` attribute:

	<div data-scrollable>
		...
	</div>

Horizontal scrollable area via the `data-scrollable-h` attribute:

	<div data-scrollable-h>
		...
	</div>

---

### Application layout with sticky footer, split and scrollable areas

To create a basic application layout, add the `app-desktop` or `app-mobile` class to the `html` element. `app-mobile` enables the application layout on both mobile and desktop devices.

This adds `height: 100%; overflow: hidden; position: relative;` to the `html`, `body`, `#content > .container-fluid` and `#content > .container` elements, taking the full height of the browser window.

#### Basic HTML example

	<html lang="en" class="ls-bottom-footer app-desktop">
		...
		<body>
		
			<!-- Main content area -->
			<div id="content">
			
				<!-- Split area -->
				<div class="container-fluid split-vertical">

					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">Content Header</h4>
						</div>
						<div class="panel-body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eos excepturi laboriosam nostrum provident voluptate. At doloremque ea molestias voluptate.
		            </div>
					</div>
				
					<!-- Split body -->
					<!-- The split body will take all the remaining available height -->
					<div class="split-vertical-body">
						<div class="split-vertical-cell">
		            
							<!-- Scrollable area -->
							<div data-scrollable>
								<div class="overflow-hidden">
		                    
									<h4>Scrollable Content Panel</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda cum dolorem eveniet, illo labore mollitia rem totam veritatis voluptas.</p>
									<br/>

									<h4>Scrollable Content Panel</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus facilis quia voluptates! Iure, quibusdam ratione sunt unde ut vero voluptatibus.</p>
									
								</div>
							</div>
							<!-- // END [data-scrollable] -->

						</div>
						<!-- // END .split-vertical-cell -->

					</div>
					<!-- // END .split-vertical-body -->

				</div>
				<!-- // END split area -->
				
			</div>
			
			<!-- Footer -->
			<div class="footer">
				<strong>Your product name</strong> - Copyright
			</div>
		
		</body>
	</html>
	
#### Swig example

For the following example, we'll recontruct the application layout example above, using [Swig templates](/code/swig/index.html) and some of the Swig partials included with the layout package, to compose HTML documents.

Consider a page layout in `src/html/themes/$THEME_NAME/_layout_app.html`:

	<!-- Start the HTML document -->
	{% include "lib/layout/html/_header.html" { htmlClass: 'ls-bottom-footer app-desktop' } %}

	<!-- The page content -->
	<!-- Define the content block -->
	<!-- This will be used by pages that extend this layout to inject their content -->
	{% block content %}{% endblock %}
	
	<!-- Include the footer copyright -->
	{% include "lib/layout/html/_footer_copyright.html" %}
	
	<!-- Complete the HTML document -->
	{% include "lib/layout/html/_footer_scripts.html" %}
	
And a simple page in `src/html/themes/$THEME_NAME/page-simple-app.html`:

	{% extends "src/html/themes/$THEME_NAME/_layout_app.html" %}
	
	{% block content %}
	
		<!-- Main content area -->
		<div id="content">
			
			<!-- Split area -->
			<div class="container-fluid split-vertical">

				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">Content Header</h4>
					</div>
					<div class="panel-body">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eos excepturi laboriosam nostrum provident voluptate. At doloremque ea molestias voluptate.
					</div>
				</div>
				
				<!-- Split body -->
				<!-- The split body will take all the remaining available height -->
				<div class="split-vertical-body">
					<div class="split-vertical-cell">
    
						<!-- Scrollable area -->
						<div data-scrollable>
							<div class="overflow-hidden">
		                    
								<h4>Scrollable Content Panel</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda cum dolorem eveniet, illo labore mollitia rem totam veritatis voluptas.</p>
								<br/>

								<h4>Scrollable Content Panel</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus facilis quia voluptates! Iure, quibusdam ratione sunt unde ut vero voluptatibus.</p>
								
							</div>
						</div>
						<!-- // END [data-scrollable] -->

					</div>
					<!-- // END .split-vertical-cell -->

				</div>
				<!-- // END .split-vertical-body -->

			</div>
			<!-- // END split area -->
				
		</div>
		<!-- // END #content -->
		
	{% endblock %}
	
Now, you can follow through the [build process](/workflow/gulp/index.html) and see the compiled HTML result in your [theme's build path](/workflow/gulp/index.html#build-paths): 

- `$BUILD_PATH/$THEME_NAME/page-simple-app.html`