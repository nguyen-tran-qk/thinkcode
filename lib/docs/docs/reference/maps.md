# Maps

---

## Requirements

### Dependencies

Before we can use the Maps component, we must have the [jquery-ui-map](https://code.google.com/p/jquery-ui-map) library installed.

You can check if it's already installed by looking for the `bower_components/jquery-ui-map` directory.

**Install with [Bower](/code/bower/index.html)**:

```bash
bower install jquery-ui-map --save
```

**Copy the library**:

Create a file `.build/copy-vendor/copy.maps.google.json` with the following content:

```js
[
	{
		"task": "jquery-ui-map",
		"cwd": "bower_components/jquery-ui-map/ui",
		"src": "*",
		"dest": "js/vendor/maps/google/jquery-ui-map/ui"
	}
]
```

When running [the build process](/workflow/gulp/index.html), the `json` file will be picked up and executed automatically and it will copy all files and directories from the `bower_components/jquery-ui-map/ui` directory to the [theme's build path](/workflow/gulp/index.html#build-paths) in `$BUILD_PATH/$THEME_NAME/js/vendor/maps/google/jquery-ui-map/ui`.

Note that you don't have to load the `jquery-ui-map` library from HTML, as the Maps component will load it automatically.

### JavaScript

To load the Google maps component, from `src/js/themes/$THEME_NAME/app.js`:

```js
// Maps
window.initGoogleMaps = require('maps/js/google/main');
```
	
This will load `lib/maps/js/google/main.js` into our main application script bundle.
 
Note that we have to expose the global `initGoogleMaps` callback function which will be executed automatically by the Google Maps API when the maps libraries are loaded, which is why we attached it to `window`.

### Less

From `src/less/themes/$THEME_NAME/app.less`:

```less
// Maps
@import "maps/less/maps";
```
	
Which will load `lib/maps/less/maps.less` into our main application style bundle.

---

#### Alternative

If working with Less and Browserify bundles is not your favorite thing, you can alternatively load the pre-built static assets we have included:

```html
<!-- In the head of the HTML document -->
<link rel="stylesheet" href="css/app/maps.css" />
	
<!-- At the bottom of the HTML document -->
<script src="js/app/maps.js"></script>
```

---

## Initialization

We can initialize a new Google Map in HTML purely through the markup API without writing a single line of JavaScript:

```html
<div data-toggle="google-maps"></div>
```
	
---
	
## Options

We can pass various options to interact with the Google Maps component, also through the markup API (data attributes).

#### Zoom controls position

Default: **TOP_LEFT**

```html
<div data-toggle="google-maps" data-zoom-position="TOP_LEFT"></div>
```
	
#### Zoom level

Default: **16**

```html
<div data-toggle="google-maps" data-zoom="16"></div>
```

#### Style

Default: **light-grey**

```html
<div data-toggle="google-maps" data-style="light-grey"></div>
```
	
This actually loads and applies a custom map style from `lib/maps/js/google/styles/_light-grey.js`. To see all the available styles, have a look at the available files in the `lib/maps/js/google/styles/` directory.

#### Map type

Default: **ROADMAP**

```html
<div data-toggle="google-maps" data-type="ROADMAP"></div>
```
	
#### Draggable

Default: **true**

```html
<div data-toggle="google-maps" data-draggable="true"></div>
```
	
#### Pagination

Adds pagination between markers.

Default: **false**

```html
<div data-toggle="google-maps" data-pagination="true"></div>
```

#### Loading markers from a JSON file via AJAX

```html
<div data-toggle="google-maps" data-file="markers.json"></div>
```
	
#### Center map to coordinates

```html
<div data-toggle="google-maps" data-center="latitude,longitude"></div>
```

---

## Events

#### map.init

Triggered when the maps are initialized and available. We can hook into this event to add functionality to our maps and further interact with Google Maps API.

For example, consider `src/js/themes/$THEME_NAME/_maps.js`:

```js
(function($){
	'use strict';

	$(document).on('map.init', function(event, data){
		
		// We now have access to the initialized map(s)
		
		// To isolate custom functionality to a specific map, 
		// give the HTML element a unique ID, e.g:
		// <div data-toggle="google-maps" id="my_map"></div>
		// and to execute code only when #my_map is initialized:
		
		if (data.container.attr('id') == 'my_map') {
			// do something with #my_map
		}
		
		// Otherwise, do something when ANY map is initialized:
		
		// The container element
		console.log(data.container);
		
		// The google map object
		console.log(data.map);
		
		// The options
		console.log(data.options);
		
		// The google maps info window
		console.log(data.iw.window);
		
		// We can get the markers
		var markers = data.container.gmap('get', 'markers');
		console.log(markers);
		
		// We can add new Google Maps API event listeners
		google.maps.event.addListener(data.map, 'click', function (event) {
			// do something when a user clicks on the map
		});
		
		// Attach to the info window
		google.maps.event.addListener(data.iw.window, 'domready', function () {
			// do something with the info window, you have access to it's DOM
		});
		
	});

})(jQuery);
```
	
And we can load our custom functionality from `src/js/themes/$THEME_NAME/app.js`:

```js
// Maps
window.initGoogleMaps = require('maps/js/google/main');
	
// Custom functionality
require('./_maps');
```
	
---

## Marker images

We provide 8 custom marker sets of 10 markers each.

The marker images are located in `lib/maps/images/markers`.

### Requirements

To use the marker images in your theme, you must copy the `lib/maps/images/markers` directory into your [theme's build path](/workflow/gulp/index.html#build-paths) in `$BUILD/$THEME_NAME/images/markers`.

We can automate this when running the [build process](/workflow/gulp/index.html).

Update `.build/copy-vendor/copy.maps.google.json` to include the following:

```js
[
	{
		"task": "lib-maps-images",
		"cwd": "lib/maps/images",
		"src": ["**/*"],
		"dest": "images"
	}
]
```
	
The `json` file will be picked up and executed automatically when running the build process.

### Usage

Now that we have the marker images available in our [theme's build path](/workflow/gulp/index.html#build-paths) in the `$BUILD_PATH/$THEME_NAME/images/markers` directory, we can use them to display markers directly from the JSON data with the `icon` key on each marker object set to the image file name without the extension:

```js
{
	"markers": [
		{
			...
			"icon": "building-02"
		},
		{
			...
			"icon": "house-01"
		}
	]
}
```

---

## Popups

### InfoBox

Our Google Maps component is using `InfoBox`, as an enhanced version of an `InfoWindow`. An `InfoWindow` displays content, usually text or images, in a popup window above the map, at a given location, typically attached to a marker. The `InfoBox` behaves like an `InfoWindow`, but it supports several additional properties for advanced styling. You can see more details on [the official API reference](http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html).

### Requirements

#### Dependencies

We must have the InfoBox library included with [Google Maps utility library](https://code.google.com/p/google-maps-utility-library-v3) installed. You can check if it's already installed by looking for the `bower_components/gmaps-infobox` directory.

**Install with [Bower](/code/bower/index.html)**:

First, update the `bower.json` file to include `gmaps-infobox` in it's `dependencies`:

```js
"dependencies": {
	"gmaps-infobox": "svn+http://google-maps-utility-library-v3.googlecode.com/svn#infobox"
}
```

Then install:

```bash
bower install
```

**Copy the library**:

Update `.build/copy-vendor/copy.maps.google.json` to include the following:

```js
[
	{
		"task": "gmaps-infobox",
		"cwd": "bower_components/gmaps-infobox/1.1.13/src",
		"src": ["*.js"],
		"dest": "js/vendor/maps/google/jquery-ui-map/addons"
	}
]
```
	
The `json` file will be picked up and executed automatically when running the build process. It will copy all `*.js` files from the `bower_components/gmaps-infobox/1.1.13/src` directory into the [theme's build path](/workflow/gulp/index.html#build-paths) in `$BUILD_PATH/$THEME_NAME/js/vendor/maps/google/jquery-ui-map/addons`.

Note that you don't have to load the library from HTML, as the Maps component will load it automatically.

### Templates

To customize the view of the `InfoBox`, we are using Handlebars templates. The Maps package provides several templates in `lib/maps/html/_map_templates.html`.

Before we can use the provided sample templates with the Maps component, we must include the templates from `lib/maps/html/_map_templates.html` in our HTML document. We can easily do that using [Swig](/code/swig/index.html).

Consider a simple page in `src/html/themes/$THEME_NAME/maps.html`:

```html
{% extends "src/html/themes/$THEME_NAME/_layout.html" %}

{% block content %}
	
	<!-- The Maps -->
	<div data-toggle="google-maps" data-file="js/google_maps/data/markers.json"></div>
	
	<!-- Templates -->
	{% include "lib/maps/html/_map_templates.html" %}
	
{% endblock %}
```

After running the [build process](/workflow/gulp/index.html), the templates will be included in your [theme's build path](/workflow/gulp/index.html#build-paths), in `$BUILD_PATH/$THEME_NAME/maps.html`:

```html
<script id="map-infobox-icon" type="text/x-handlebars-template">
    <div>
        <div class="text-center">
            <div class="h1 text-grey-300">
                <i class="{{ inner_icon }}"></i>
            </div>
            <p><a href="#" class="h4 text-primary">{{ name }}</a></p>
            <p>{{ description }}</p>
        </div>
    </div>
</script>

<script id="map-infobox-simple" type="text/x-handlebars-template">
    <div>
        <div class="text-center">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
        </div>
    </div>
</script>
```

### Usage

Note that each template has a unique `id` attribute. We'll use the `id` within the JSON data to instruct the Maps component to use a specific template when displaying the popup window attached to each marker, using the `template` key from the marker object.

Consider the following JSON data file in `js/google_maps/data/markers.json`:

```js
{
	"markers": [
		{
			"latitude": 57.698920689483,
			"longitude": 11.983367179871,
			"title": "A Building",
			"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
			"template": "map-infobox-simple",
			"icon": "building-02",
			"open": true
		},
		{
			"latitude": 57.698656963659,
			"longitude": 11.977981304198,
			"name": "A House",
			"inner_icon": "fa fa-home",
			"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
			"template": "map-infobox-icon",
			"icon": "house-01"
		}
	]
}
```

This will add 2 markers on the map, using different templates for displaying popup windows attached to the markers.

---

## Demo data

Additionally, you can also copy the demo JSON data into your [theme's build path](/workflow/gulp/index.html#build-paths).

Update `.build/copy-vendor/copy.maps.google.json` to include the following:

```js
[
	{
		"task": "lib-maps-data",
		"cwd": "lib/maps/js/data",
		"src": "*.json",
		"dest": "js/data/google_maps"
	}
]
```
	
This will copy all `*.json` files from the `lib/maps/js/data` directory into your [theme's build path](/workflow/gulp/index.html#build-paths) in the `$BUILD_PATH/$THEME_NAME/js/data/google_maps` directory, when running the build process.

Now you can load the demo JSON data:

```html
<div data-toggle="google-maps" data-file="js/data/google_maps/markers.json"></div>
```