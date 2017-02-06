# AngularJS

[AngularJS](https://angularjs.org) is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs.

**This document aims to provide**:

- a guide for customizing an existing theme from our templates into an AngularJS SPA or *Single Page Application*.
- a basic understanding for the AngularJS setup we are using, should we provide AngularJS versions of our themes.

---

## Requirements

### Packages

We'll create a basic AngularJS setup, using a couple of libraries:

- [angular](https://github.com/angular/angular)
- [angular-resource](https://github.com/angular/bower-angular-resource)
- [angular-ui-router](https://github.com/angular-ui/ui-router)
- [angular-sanitize](https://github.com/angular/bower-angular-sanitize)
- [angular-ui-utils](https://github.com/angular-ui/ui-utils)
- [angular-touch](https://github.com/angular/bower-angular-touch)

### Installation

You can check if the libraries are already installed by simply looking for the following directories:

- `bower_components/angular`
- `bower_components/angular-resource`
- `bower_components/angular-ui-router`
- `bower_components/angular-sanitize`
- `bower_components/angular-ui-utils`
- `bower_components/angular-touch`

Install using [Bower](/code/bower/index.html):

```bash
bower install --save \
	angular \
	angular-resource \
	angular-ui-router \
	angular-sanitize \
	angular-ui-utils \
	angular-touch
```

### Preparing the assets

Before loading the new libraries into our HTML pages, we'll have to copy the libraries into our [theme's build path](/workflow/gulp/index.html#build-paths) when running [the build process](/workflow/gulp/index.html).

Create `.build/copy-vendor/copy.angular.json` with the following content:

```js
{
	"task": "copy-vendor-angular-scripts",
	"cwd": "bower_components",
	"src": [
		"angular/angular.js",
		"angular-resource/angular-resource.js",
		"angular-sanitize/angular-sanitize.js",
		"angular-touch/angular-touch.js",
		"angular-ui-router/release/angular-ui-router.js",
		"angular-ui-utils/ui-utils.js"
	],
	"dest": "js/vendor/angular",
	"flatten": true,
	"themes": ["$THEME_NAME"]
}
```

Don't forget to replace `$THEME_NAME` with a valid theme name. This will ensure the task will be executed only when running the build process for a specific theme.

The json file will be picked up automatically and executed when running pt. 5 of [the build process](/workflow/gulp/index.html#build-with-concatenated-files-and-bundles). The task will copy the files defined in the `src` array from `bower_components` into `$BUILD_PATH/$THEME_NAME/js/vendor/angular/*.js`. 

At this point we could manually load any of the files in HTML simply by:

```html
<script src="js/vendor/angular/angular.js"></script>
<script src="js/vendor/angular/angular-resource.js"></script>
<!-- etc ... -->
```

Instead, we'll create a concatenated file that will include all of the AngularJS libraries. The concatenated file will also be created when running [the build process](/workflow/gulp/index.html).

Create `.build/concat-vendor/concat.angular.json` with the following content:

```js
{
	"build": "js/vendor/angular/all.js",
	"cwd": "$THEME_DIR/js/vendor/angular",
	"files": [
		"angular.js",
		"angular-resource.js",
		"angular-sanitize.js",
		"angular-touch.js",
		"angular-ui-router.js",
		"ui-utils.js"
	],
	"themes": ["$THEME_NAME"]
}
```

Also, don't forget to replace `$THEME_NAME` with a valid theme name. This will ensure the task will be executed only when running the build process for a specific theme. Note that `$THEME_DIR` is a special string that will be replaced automatically by the build process with the full build path to your current theme directory.

The task will create `$BUILD_PATH/$THEME_NAME/js/vendor/angular/all.js` with all the libraries included.

At this point, after running the build process, we could manually load all the AngularJS libraries in HTML simply with one line:

```html
<script src="js/vendor/angular/all.js"></script>
```

### Loading the AngularJS libraries into our HTML

For this setup, we'll be using [Swig templates](/code/swig/index.html) to compose HTML documents, so we'll use the `src/swig.json` configuration file to automatically load our new libraries into the HTML of our application when running the build process. For more details, see [Loading assets](/reference/layout/index.html#loading-assets).

Update `src/swig.json` to include:

```js
{
	"js_vendor": [
		"...",
		{
			"name": "vendor/angular/all",
			"themes": ["$THEME_NAME"]
		}
	]
}
```

This will instruct Swig when running [the build process](/workflow/gulp/index.html) for `$THEME_NAME` to load the `$BUILD_PATH/$THEME_NAME/js/vendor/angular/all.js` script into the footer of our HTML pages.

---

## Basic application setup

### Main application module

`src/js/themes/$THEME_NAME/angular/app.js`:

We declare the `app` module as the main application module, load other dependent modules and write a basic configuration:

```js
(function(){
    'use strict';

    angular.module('app', [
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.utils',
        'ui.jq'
    ]);

    var app = angular.module('app')
        .config(
        [ '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$interpolateProvider',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide, $interpolateProvider) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;

                $interpolateProvider.startSymbol('::');
                $interpolateProvider.endSymbol('::');
            }
        ]);

})();
```

Note the `$interpolateProvider` configuration entries are customizing the symbol used for the interpolation markup from the default `{{ variable }}` to `:: variable ::` in order to prevent conflicts with [Swig](/code/swig/index.html).

### Router

`src/js/themes/$THEME_NAME/angular/config.router.js`:

```js
(function(){
    'use strict';

    angular.module('app')
        .run([ '$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ])
        .config(
        [ '$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

					// We'll add our routing here later
                
            }
        ]
    );

})();
```

### Main application controller

`src/js/themes/$THEME_NAME/angular/main.js`:

We'll use `AppCtrl` to dynamically change `$scope.app.settings.htmlClass` from the router, when we change between pages with different layouts.

```js
(function () {
    "use strict";

    angular.module('app')
        .controller('AppCtrl', [ '$scope', '$state',
            function ($scope, $state) {

                $scope.app = {
                    settings: {
                        htmlClass: ''
                    }
                };

                $scope.$state = $state;

            } ]);

})();
```

### Main application JavaScript bundle

Now that we've declared the main `app` module, the router and the main `AppCtrl` controller, let's load all of them into our main application JavaScript bundle, by using [Browserify](/code/browserify/index.html).

From `src/js/themes/$THEME_NAME/main.js`:

```js
// Angular App
require('./angular/app.js');
require('./angular/config.router.js');
require('./angular/main.js');
```

From `src/js/themes/$THEME_NAME/app.js`:

```js
require('./main');
```

Note that *we could* load all the files directly from `app.js` but instead we separate the AngularJS parts of the application into a new `main.js` file which we'll then load from `app.js`.

Now, after running [the build process](/workflow/gulp/index.html), our custom JavaScript will be included in the [theme's build path](/workflow/gulp/index.html#build-paths) into our main application JavaScript bundle: `$BUILD_PATH/$THEME_NAME/js/app/app.js`.

---

## Main application layout

Since we're essentially building a SPA or *Single Page Application*, we'll need a main HTML document which will load our application assets and the actual pages of the application via the router.

Consider the file `src/html/themes/$THEME_NAME/index.html`:

```html
<!DOCTYPE html>
<html lang="en" data-ng-app="app" data-ng-controller="AppCtrl" class="ng-class:app.settings.htmlClass">
{% include "lib/layout/html/_head.html" %}
<body>

<div data-ui-view class="ui-view-main"></div>

{% include "lib/layout/html/_footer_scripts.html" %}
```

This page will load our application assets and initialize the `app` module and the `AppCtrl` controller.

---

## Basic layouts

### Swig templates

Consider a basic layout in `src/html/themes/$THEME_NAME/basic/_layout.html`:

```html
<div class="container-fluid">

	<!-- The page content -->
	<!-- Define the content block -->
	<!-- This will be used by pages that extend this layout to inject their content here -->
	{% block content %}{% endblock %}
	
	{% include "lib/layout/html/_footer_copyright.html" %}
	
</div>
```

A simple page in `src/html/themes/$THEME_NAME/basic/simple-page.html`:

```html
{% extends "src/html/themes/$THEME_NAME/basic/_layout.html" %}
	
{% block content %}
	
	<p>This is a simple page.</p>
	
{% endblock %}
```

And another simple page in `src/html/themes/$THEME_NAME/basic/another-simple-page.html`:

```html
{% extends "src/html/themes/$THEME_NAME/basic/_layout.html" %}
	
{% block content %}
	
	<p>This is another simple page.</p>
	
{% endblock %}
```

### The router

Update the router file that we've created earlier in `src/js/themes/$THEME_NAME/angular/config.router.js`:

```js
function ($stateProvider, $urlRouterProvider) {

	// Configure a default location for the router
	$urlRouterProvider
		.otherwise('/basic/simple-page');
		
	// Add a 'basic' state group
	$stateProvider
		.state('basic', {
			abstract: true,
			url: '/basic',
			template: '<div ui-view class="ui-view-main" />'
		});
		
	// Add pages in the 'basic' state
	$stateProvider
		.state('basic.simple-page', {
			url: '/simple-page',
			templateUrl: 'basic/simple-page.html',
			controller: ['$scope', function($scope){
				// here we could update $scope.app.settings.htmlClass
				// but for this basic example we won't need custom CSS classes applied to the 'html' tag;
				// set it to an empty string to reset
				$scope.app.settings.htmlClass = '';
			}]
		})
		.state('basic.simple-page', {
			url: '/another-simple-page',
			templateUrl: 'basic/another-simple-page.html',
			controller: ['$scope', function($scope){
				// here we could update $scope.app.settings.htmlClass
				// but for this basic example we won't need custom CSS classes applied to the 'html' tag;
				// set it to an empty string to reset
				$scope.app.settings.htmlClass = '';
			}]
		});

}
```

### Build and preview

Now, after running [the build process](/workflow/gulp/index.html), we should see the compiled HTML files in the [theme's build path](/workflow/gulp/index.html#build-paths):

- `$BUILD_PATH/$THEME_NAME/index.html`
- `$BUILD_PATH/$THEME_NAME/basic/simple-page.html`
- `$BUILD_PATH/$THEME_NAME/basic/another-simple-page.html`

And, after running [the watchers](/workflow/gulp/index.html#watch) we should be able to access the application from the following URLs:

- `/`
- `/#/basic/simple-page`
- `/#/basic/another-simple-page`

---

## Complex layouts

Next, we're going to recreate the example from [Sidebar transitions](/reference/sidebar/index.html#sidebar-transitions) and also use some additional elements in the context of our AngularJS SPA *Single Page Application*.

### Prerequisites

Make sure you're loading the following packages in your theme:

- [Essential](/reference/essential/index.html)
- [Layout](/reference/layout/index.html)
- [Sidebar](/reference/sidebar/index.html)
- [Navbar](/reference/navbar/index.html)

### Swig templates

Consider the slightly more complex layout in `src/html/themes/$THEME_NAME/advanced/_layout.html`:

```html
<!-- Include a simple navbar -->
{% include "src/html/themes/$THEME_NAME/advanced/_navbar.html" %}

<!-- Wrapper required for sidebar transitions -->
<div class="st-container">
	
	<!-- sidebars with the following effects MUST go OUTSIDE of the .st-pusher wrapper: -->
	<!-- st-effect-1, st-effect-2, st-effect-4, st-effect-5, st-effect-9, st-effect-10, st-effect-11, st-effect-12, st-effect-13 -->
		
	<!-- For this example, we'll be using the st-effect-1 transition -->
	<!-- Include a simple sidebar -->
	{% include "src/html/themes/$THEME_NAME/advanced/_sidebar.html" { sidebarOptions: "left sidebar-size-2 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop sidebar-visible-mobile", sidebarData: "id=sidebar-menu data-type=collapse" } %}
	
	<!-- content push wrapper -->
	<div class="st-pusher" id="content">
    
		<!-- sidebars with the following effects MUST go INSIDE the .st-pusher wrapper: -->
      	<!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->
      		
		<!-- this is the wrapper for the content -->
		<div class="st-content">

			<!-- extra div for emulating position:fixed of the menu -->
			<div class="st-content-inner">
				
				<!-- The page content -->
				<div class="container-fluid">
	        
					<!-- Define the content block -->
					<!-- This will be used by pages that extend this layout to inject their content -->
					{% block content %}{% endblock %}

				</div>
				<!-- // END .container-fluid -->
				
			</div>
			<!-- // END .st-content-inner -->

		</div>
		<!-- // END .st-content -->

	</div>
	<!-- // END .st-pusher -->
	
	<!-- Include the footer copyright -->
	{% include "lib/layout/html/_footer_copyright.html" %}
	
</div>
<!-- // END .st-container -->
```

A sidebar element in `src/html/themes/$THEME_NAME/advanced/_sidebar.html`:

```html
<div class="sidebar{% if sidebarOptions %} {{ sidebarOptions }}{% endif %}"{% if sidebarData %} {{ sidebarData }}{% endif %}>
	<div data-scrollable>
		<ul class="sidebar-menu">
			<li class="active"><a href="#"><span>Simple page</span></a></li>
			<li><a href="#"><span>Another simple page</span></a></li>
			<li><a href="#"><span>Sidebar transitions</span></a></li>
		</ul>
	</div>
</div>
```
	
A navbar element in `src/html/themes/$THEME_NAME/advanced/_navbar.html`:

```html
<nav class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		
		<!-- Group brand and toggle for better mobile display -->
		<div class="navbar-header">
			<a class="navbar-brand" href="#">Brand</a>
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-example">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
			
		<!-- Group nav links, menus, forms, and other content for toggling -->
		<div class="navbar-collapse collapse" id="collapse-example">
			<ul class="nav navbar-nav">
				
				<!-- simple dropdown -->
				<li class="dropdown active">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Pages <span class="caret"></span>
					</a>
					<ul class="dropdown-menu" role="menu">
						<li class="dropdown-header">Basic</li>
						<li class="active"><a href="#">Simple page</a></li>
						<li><a href="#">Another simple page</a></li>
						<li class="dropdown-header">Advanced</li>
						<li><a href="#">Sidebar transitions</a></li>
					</ul>
				</li>
				<!-- // END simple dropdown -->
								                        
			</ul>
		</div>
			
	</div>
</nav>
```
	
And a page in `src/html/themes/$THEME_NAME/advanced/page-sidebar-transitions.html`:

```html
{% extends "src/html/themes/$THEME_NAME/advanced/_layout.html" %}
	
{% block content %}
	<p>This is a simple page.</p>
	<p>
		<a href="#sidebar-menu" data-toggle="sidebar-menu" data-effect="st-effect-1" class="btn btn-default">Slide in on top</a>
	</p>
{% endblock %}
```

### Additional styling required

When using layouts with [Sidebar transitions](/reference/sidebar/index.html#sidebar-transitions) add the following extra styling block to `src/less/themes/$THEME_NAME/main.less`:

```
.st-layout .ui-view-main {
	height: 100%;
}
```

### The router

Update the router file in `src/js/themes/$THEME_NAME/angular/config.router.js`:

```js
function ($stateProvider, $urlRouterProvider) {

	// ... code from previous example

	// Add an 'advanced' state group
	$stateProvider
		.state('advanced', {
			abstract: true,
			url: '/advanced',
			template: '<div ui-view class="ui-view-main" />'
		});
		
	// Add pages in the 'advanced' state
	$stateProvider
		.state('advanced.page-sidebar-transitions', {
			url: '/page-sidebar-transitions',
			templateUrl: 'advanced/page-sidebar-transitions.html',
			controller: ['$scope', function($scope){
				// here we can update $scope.app.settings.htmlClass
				// with the required CSS classes for the 'html' tag
				$scope.app.settings.htmlClass = 'ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2 st-layout';
			}]
		});

}
```

### Build and preview

Now, after running [the build process](/workflow/gulp/index.html), we should see the compiled HTML files in the [theme's build path](/workflow/gulp/index.html#build-paths), along with the files from the previous example:

- `$BUILD_PATH/$THEME_NAME/index.html`
- `$BUILD_PATH/$THEME_NAME/basic/simple-page.html`
- `$BUILD_PATH/$THEME_NAME/basic/another-simple-page.html`
- `$BUILD_PATH/$THEME_NAME/advanced/page-sidebar-transitions.html`

And, after running [the watchers](/workflow/gulp/index.html#watch) we should be able to access the application from the following URLs:

- `/`
- `/#/basic/simple-page`
- `/#/basic/another-simple-page`
- `/#/advanced/page-sidebar-transitions`

---

## Navigation directives

You've probably noticed in the previous example from *Complex layouts* that we've created a sidebar and a navbar but none of the links are actually working. Since the router is responsible for changing the *state* or the *page*, any links must interact directly with the router.

For that we can use the `ui-sref` directive from `ui.router.state`. For more details, you can [see the official documentation](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref).

### Sidebar

Let's update the sidebar from the previous example in `src/html/themes/$THEME_NAME/advanced/_sidebar.html` to the following:

```html
<div class="sidebar{% if sidebarOptions %} {{ sidebarOptions }}{% endif %}"{% if sidebarData %} {{ sidebarData }}{% endif %}>
	<div data-scrollable>
		<ul class="sidebar-menu">
			<li ui-sref-active="active">
				<a ui-sref="basic.simple-page">
					<span>Simple page</span>
				</a>
			</li>
			<li ui-sref-active="active">
				<a ui-sref="basic.another-simple-page">
					<span>Another simple page</span>
				</a>
			</li>
			<li ui-sref-active="active">
				<a ui-sref="advanced.page-sidebar-transitions">
					<span>Sidebar transitions</span>
				</a>
			</li>
		</ul>
	</div>
</div>
```

**Notes**:

- we changed the `href` attributes to the `ui-sref` directive, each linking to a route name.
- we removed the `class` attribute along with the `active` class name from the first `li` element and we've added the `ui-sref-active` directive to every `li` element that will change the `class` to `active` dynamically when the current route matches the route name from the link using `ui-sref`.

### Sidebar submenus

Let's go further and update the sidebar from the previous example in `src/html/themes/$THEME_NAME/advanced/_sidebar.html` to use submenus:

```html
<div class="sidebar{% if sidebarOptions %} {{ sidebarOptions }}{% endif %}"{% if sidebarData %} {{ sidebarData }}{% endif %}>
	<div data-scrollable>
		<ul class="sidebar-menu">
			
			<!-- The 'basic' menu -->
			<li class="hasSubmenu" ng-class="{ 'open active': $state.includes('basic') }">
			
				<!-- 'basic' submenu trigger -->
				<a href="#basic-submenu"><span>Basic</span></a>
				
				<!-- 'basic' submenu -->
				<ul id="basic-submenu" ng-class="{ 'in': $state.includes('basic') }">
					<li ui-sref-active="active">
						<a ui-sref="basic.simple-page">
							<span>Simple page</span>
						</a>
					</li>
					<li ui-sref-active="active">
						<a ui-sref="basic.another-simple-page">
							<span>Another simple page</span>
						</a>
					</li>
				</ul>
				<!-- // END 'basic' submenu -->
			
			</li>
			<!-- // END 'basic' menu -->	
			
			<!-- The 'advanced' menu -->
			<li class="hasSubmenu" ng-class="{ 'open active': $state.includes('advanced') }">
			
				<!-- 'advanced' submenu trigger -->
				<a href="#advanced-submenu"><span>Advanced</span></a>
				
				<!-- 'advanced' submenu -->
				<ul id="advanced-submenu" ng-class="{ 'in': $state.includes('advanced') }">
					<li ui-sref-active="active">
						<a ui-sref="advanced.page-sidebar-transitions">
							<span>Sidebar transitions</span>
						</a>
					</li>
				</ul>
				<!-- // END 'advanced' submenu -->
				
			</li>
			<!-- // END 'advanced' menu -->
			
		</ul>
	</div>
</div>
```

**Notes**:

- we replaced the one-level menu with two submenus, one for `basic` pages and one for `advanced` pages.
- we are using standard [sidebar submenus](/reference/sidebar/index.html#sidebar-submenus) markup.
- we are dynamically adding the classes required for [open submenus](/reference/sidebar/index.html#open-submenus) with `ng-class`.

### Navbar

Let's update the navbar from *Complex layouts* example in `src/html/themes/$THEME_NAME/advanced/_navbar.html` to use the navigation directives:

```html
<nav class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		
		<!-- Group brand and toggle for better mobile display -->
		<div class="navbar-header">
		
			<!-- Link to basic/simple-page.html -->
			<a class="navbar-brand" ui-sref="basic.simple-page">Home page</a>
			
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-example">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
			
		<!-- Group nav links, menus, forms, and other content for toggling -->
		<div class="navbar-collapse collapse" id="collapse-example">
			<ul class="nav navbar-nav">
				
				<!-- Simple dropdown for 'basic' pages -->
				<li class="dropdown" ng-class="{ 'active': $state.includes('basic') }">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Basic <span class="caret"></span>
					</a>
					<ul class="dropdown-menu" role="menu">
						<li ui-sref-active="active">
							<a ui-sref="basic.simple-page">Simple page</a>
						</li>
						<li ui-sref-active="active">
							<a ui-sref="basic.another-simple-page">Another simple page</a>
						</li>
					</ul>
				</li>
				<!-- // END 'basic' dropdown -->
				
				<!-- Simple dropdown for 'advanced' pages -->
				<li class="dropdown" ng-class="{ 'active': $state.includes('advanced') }">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						Advanced <span class="caret"></span>
					</a>
					<ul class="dropdown-menu" role="menu">
						<li ui-sref-active="active">
							<a ui-sref="advanced.page-sidebar-transitions">Sidebar transitions</a>
						</li>
					</ul>
				</li>
				<!-- // END 'advanced' dropdown -->

			</ul>
		</div>
			
	</div>
</nav>
```

**Notes**:

- we replaced the sample dropdown with two dropdowns, one for `basic` pages and one for `advanced` pages.
- we are dynamically adding the class required for `active` dropdown menus with `ng-class`.

---

## Component directives

Most of our proprietary assets include AngularJS directives.

### Layout directives

1. Load the [Layout package](/reference/layout/index.html#requirements).
2. Load the Layout directives, from `src/js/themes/$THEME_NAME/main.js`, after the AngularJS application:

```js
// Angular App
// ...
		
// Layout directives
require('layout/js/angular/main');
```

#### scrollable

Type `A` directive, applies on elements with the `data-scrollable` attribute. The directive triggers the jQuery wrapper `$.tkScrollable()` on the element.

#### scrollableH

Type `A` directive, applies on elements with the `data-scrollable-h` attribute. The directive triggers the jQuery wrapper `$.tkScrollable(options)` on the element, with the following options:

```js
{
	horizontal: true
}
```

#### gridalicious

Type `A` directive, applies on elements with the `data-toggle` attribute of `gridalicious`. The directive triggers the jQuery wrapper `$.tkGridalicious()` on the element.

#### isotope

Type `A` directive, applies on elements with the `data-toggle` attribute of `isotope`. The directive triggers the jQuery wrapper `$.tkIsotope()` on the element.

#### parallax

Type `C` directive, applies on elements with the `class` attribute of `parallax`. The directive triggers the jQuery wrapper `$.tkParallax()` on the element.

---

### Sidebar directives

1. Load the [Sidebar package](/reference/sidebar/index.html#requirements).
2. Load the Sidebar directives, from `src/js/themes/$THEME_NAME/main.js`, after the AngularJS application:

```js
// Angular App
// ...
		
// Sidebar directives
require('sidebar/js/angular/main');
```

#### sidebar-collapse

Type `A` directive, applies on `.sidebar` elements with the `data-type` attribute of `collapse`. The directive triggers the jQuery wrapper `$.tkSidebarCollapse()` on the element.

#### sidebar-dropdown

Type `A` directive, applies on `.sidebar` elements with the `data-type` attribute of `dropdown`. The directive triggers the jQuery wrapper `$.tkSidebarDropdown()` on the element.

#### sidebar-toggle-bar

Type `A` directive, applies on elements with the `data-toggle-bar` attribute of `true`, within `.sidebar` elements. The directive triggers the jQuery wrapper `$.tkSidebarToggleBar()` on the element.

---

### Essential directives

1. Load the [Essential package](/reference/essential/index.html#requirements).
2. Load the Essential directives, from `src/js/themes/$THEME_NAME/main.js`, after the AngularJS application:

```js
// Angular App
// ...
		
// Essential directives
require('essential/js/angular/main');
```

#### carousel

Type `C` directive, applies on elements with the `class` attribute of `carousel`. The directive triggers the jQuery wrapper `$.tkCarousel()` on the element.

#### check-all

Type `A` directive, applies on elements with the `data-toggle` attribute of `check-all`. The directive triggers the jQuery wrapper `$.tkCheckAll()` on the element.

#### collapse

Type `A` directive, applies on elements with the `data-toggle` attribute of `collapse`. The directive triggers the jQuery wrapper `$.tkCollapse()` on the element.

#### cover

Type `C` directive, applies on elements with the `class` attribute of `cover`. The directive triggers the jQuery wrapper `$.tkCover()` on the element.

#### datepicker

Type `C` directive, applies on elements with the `class` attribute of `datepicker`. The directive triggers the jQuery wrapper `$.tkDatePicker()` on the element.

#### daterangepicker-report

Type `C` directive, applies on elements with the `class` attribute of `daterangepicker-report`. The directive triggers the jQuery wrapper `$.tkDateRangePickerReport()` on the element. **Used for demo purposes**.

#### daterangepicker-reservation

Type `C` directive, applies on elements with the `class` attribute of `daterangepicker-reservation`. The directive triggers the jQuery wrapper `$.tkDateRangePickerReservation()` on the element. **Used for demo purposes**.

#### expandable

Type `C` directive, applies on elements with the `class` attribute of `expandable`. The directive triggers the jQuery wrapper `$.tkExpandable()` on the element.

#### minicolors

Type `C` directive, applies on elements with the `class` attribute of `minicolors`. The directive triggers the jQuery wrapper `$.tkMiniColors()` on the element.

#### modal

Type `A` directive, applies on elements with the `data-toggle` attribute of `modal`. The directive triggers the jQuery wrapper `$.tkModal()` on the element.

#### nestable

Type `C` directive, applies on elements with the `class` attribute of `nestable`. The directive triggers the jQuery wrapper `$.tkNestable()` on the element.

#### panel-collapse

Type `A` directive, applies on elements with the `data-toggle` attribute of `panel-collapse`.

#### select2

Type `A` directive, applies on elements with the `data-toggle` attribute of `select2` or `select2-tags`. The directive triggers the jQuery wrapper `$.tkSelect2()` on the element.

#### selectpicker

Type `C` directive, applies on elements with the `class` attribute of `selectpicker`. The directive triggers the jQuery wrapper `$.tkSelectPicker()` on the element.

#### slider

Type `A` directive, applies on elements with the `data-slider` attribute. The directive triggers the jQuery wrapper `$.tkSlider()` on the element when the `data-slider` value is `default` and `$.tkSliderFormatter()` when the `data-slider` value is `formatter`.

#### on-slide

Type `A` directive, applies on elements with the `data-on-slide` attribute. The directive triggers the jQuery wrapper `$.tkSliderUpdate()` on the element.

#### summernote

Type `C` directive, applies on elements with the `class` attribute of `summernote`. The directive triggers the jQuery wrapper `$.tkSummernote()` on the element.

#### data-table

Type `A` directive, applies on elements with the `data-toggle` attribute of `data-table`. The directive triggers the jQuery wrapper `$.tkDataTable()` on the element.

#### tab

Type `A` directive, applies on elements with the `data-toggle` attribute of `tab`. The directive prevents the default click event for the element.

#### touch-spin

Type `A` directive, applies on elements with the `data-toggle` attribute of `touch-spin`. The directive triggers the jQuery wrapper `$.tkTouchSpin()` on the element.

#### tree

Type `A` directive, applies on elements with the `data-toggle` attribute of `tree`. The directive triggers the jQuery wrapper `$.tkFancyTree()` on the element.

#### wizard

Type `A` directive, applies on elements with the `data-toggle` attribute of `wizard`. The directive triggers the jQuery wrapper `$.tkWizard()` on the element.

---

### Maps directives

1. Load the [Maps package](/reference/maps/index.html#requirements).
2. Load the Maps directives, from `src/js/themes/$THEME_NAME/main.js`, after the AngularJS application:

```js
// Angular App
// ...
		
// Maps directives
require('maps/js/angular/main');
```

#### google-maps

Type `A` directive, applies on elements with the `data-toggle` attribute of `google-maps`. The directive triggers the jQuery wrapper `$.tkGoogleMap()` on the element.

#### vector-world-map-gdp

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-world-map-gdp`. The directive triggers the jQuery wrapper `$.tkVectorWorldMapGDP()` on the element.

#### vector-world-map-markers

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-world-map-markers`. The directive triggers the jQuery wrapper `$.tkVectorWorldMapMarkers()` on the element.

#### vector-usa-unemployment

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-usa-unemployment`. The directive triggers the jQuery wrapper `$.tkVectorUSAUnemployment()` on the element.

#### vector-region-selection

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-region-selection`. The directive triggers the jQuery wrapper `$.tkVectorRegionSelection()` on the element.

#### vector-france-elections

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-france-elections`. The directive triggers the jQuery wrapper `$.tkVectorFranceElections()` on the element.

#### vector-random-colors

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-random-colors`. The directive triggers the jQuery wrapper `$.tkVectorRandomColors()` on the element.

#### vector-mall-map

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-mall-map`. The directive triggers the jQuery wrapper `$.tkVectorMallMap()` on the element.

#### vector-projection-map

Type `A` directive, applies on elements with the `data-toggle` attribute of `vector-projection-map`. The directive triggers the jQuery wrapper `$.tkVectorProjectionMap()` on the element.