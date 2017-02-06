# Sidebar

**The sidebar component** provides:

- Sidebar page layouts
- Sidebar transitions
- Sidebar menus: Dropdowns, Collapsibles, Tree views, List groups
- Sidebar elements: Scrollable areas, Tabs, UI elements, Form components, User profiles, Branding

---

## Requirements

#### Dependencies

- [Layout](/reference/layout/index.html)

### JavaScript

To load the sidebar component, from `src/js/themes/$THEME_NAME/app.js`:

	// Sidebar
	require('sidebar/js/main');

This will load `lib/sidebar/js/main.js` into our main application script bundle.

### Less

From `src/less/themes/$THEME_NAME/app.less`:

	// Sidebar
	@import "sidebar/less/sidebar";

Which will load `lib/sidebar/less/sidebar.less` into our main application style bundle.

---

#### RTL Support

Add to `src/less/themes/$THEME_NAME/app.less`, after the main component:

	// Sidebar RTL
	@import "sidebar/less/sidebar-rtl";

---

#### Alternative

If working with Less and Browserify bundles is not your favorite thing, you can alternatively load the pre-built static assets we have included:

	<!-- In the head of the HTML document -->
	<link rel="stylesheet" href="css/app/sidebar.css" />

	<!-- At the bottom of the HTML document -->
	<script src="js/app/sidebar.js"></script>

---

## JavaScript API

You can interact with an initialized sidebar directly from JavaScript.

#### sidebar.open(id, [options])

Opens a sidebar by it's `id` attribute.

`options` (optional):

	{
		// The sidebar transition effect class name.
		effect: "st-effect-1",
		
		// The sidebar transition duration in miliseconds.
		duration: 550,
		
		// Enable the sidebar overlay.
		overlay: false
	}

#### sidebar.close(id, [options])

Closes a sidebar by it's `id` attribute.

`options` (optional):

	{
		// The sidebar transition effect class name.
		effect: "st-effect-1"
	}

#### sidebar.options(sidebar)

Accepts a sidebar argument (jQuery object).
Returns the sidebar options object.

---

## jQuery API

You can initialize and interact with the sidebar component via the jQuery wrappers.

#### $.tkSidebar(options)

Initializes a new sidebar.

	$('#my-sidebar').tkSidebar({
		menuType: 'collapse',
		toggleBar: false
	});
	
#### $.tkSidebarToggleBar()

Adds a toggle bar to a sidebar.

	$('#my-sidebar').tkSidebarToggleBar();
	
You can also enable the toggle bar directly when calling `$.tkSidebar(options)` with the option `toggleBar` set to `true`:

	$('#my-sidebar').tkSidebar({
		menuType: 'collapse',
		toggleBar: true
	});
	
#### $.tkSidebarCollapse()

Initializes a sidebar with collapsible menus.

	$('#my-sidebar').tkSidebarCollapse();

This is the same as calling `$.tkSidebar(options)` with the `menuType` option set to `collapse`.

#### $.tkSidebarDropdown()

Initializes a sidebar with dropdown menus.

	$('#my-sidebar').tkSidebarDropdown();

This is the same as calling `$.tkSidebar(options)` with the `menuType` option set to `dropdown`.

### Change menu type programatically

You can dynamically change the menu type of an already initialized sidebar, by calling `$.tkSidebarDropdown()` on a element that was initialized with collapsible menus and `$.tkSidebarCollapse()` on a element that was initialized with dropdown menus.

---

## Events

#### sidebar.shown

	$(document).on('sidebar.shown', function (event, data) {
  		if (data.target == "#my-sidebar") {
			// do something when #my-sidebar is completely visible
			console.log(data.sidebar);
      	}
	});
	
#### sidebar.hidden

	$(document).on('sidebar.hidden', function (event, data) {
		if (data.target == "#my-sidebar") {
			// do something when #my-sidebar is completely hidden
			console.log(data.sidebar);
		}
	});
	
#### sidebar.show

	$(document).on('sidebar.show', function (event, data) {
  		if (data.target == "#my-sidebar") {
			// do something when #my-sidebar starts to open
			console.log(data.sidebar);
      	}
	});
	
#### sidebar.hide

	$(document).on('sidebar.hide', function (event, data) {
		if (data.target == "#my-sidebar") {
			// do something when #my-sidebar starts to close
			console.log(data.sidebar);
		}
	});
	
---

## Markup API

You can initialize a sidebar directly through markup, by adding the `sidebar` class to any element.

	<div class="sidebar" id="sidebar"></div>
	
Any sidebar element must have a unique `id` attribute.

---
	
## Sidebar menus
	
To initialize a sidebar with collapsible menus:

	<div class="sidebar" id="sidebar" data-type="collapse"></div>
	
Or, dropdown menus:

	<div class="sidebar" id="sidebar" data-type="dropdown"></div>

To create a menu, add an unordered list with the class `sidebar-menu`. You can have multiple sidebar menus within the same sidebar.

	<div class="sidebar" id="sidebar">
		
		<!-- A simple sidebar menu -->
		<ul class="sidebar-menu">
			<li><a href="#"><span>My menu item</span></a></li>
		</ul>
		
		<!-- // Arbitrary markup here -->
		
		<!-- Another sidebar menu within the same sidebar -->
		<ul class="sidebar-menu">
			<li><a href="#"><span>Another menu item</span></a></li>
		</ul>
		
	</div>
	
### Sidebar submenus

Whether you're using dropdown or collapsible menus, the HTML markup for submenus will alway be the same:

	<div class="sidebar" id="sidebar" data-type="dropdown">
		<ul class="sidebar-menu">
		
			<!-- Top level menu items -->
			<li><a href="#"><span>My menu item</span></a></li>
			
			<!-- Submenus -->
			<li class="hasSubmenu">
				<a href="#submenu"><span>My submenu trigger</span></a>
				<ul id="submenu">
					<li><a href="#"><span>My submenu item</span></a></li>
				</ul>
			</li>
		</ul>
	</div>
	
Note that when we create a submenu, we always:

- nest another `ul` into a parent top level `li`.
- add the class `hasSubmenu` on the parent top level `li`.
- add a unique id attribute on the nested `ul` submenu.
- reference the submenu id on the `href` attribute of the parent link.

### Active menu items

	<div class="sidebar" id="sidebar" data-type="dropdown">
		<ul class="sidebar-menu">
		
			<!-- Top level menu items -->
			<li class="active"><a href="#"><span>My menu item</span></a></li>
			
			<!-- Submenus -->
			<li class="hasSubmenu open">
				<a href="#submenu"><span>My submenu trigger</span></a>
				<ul id="submenu">
					<li><a href="#"><span>My submenu item</span></a></li>
				</ul>
			</li>
		</ul>
	</div>
	
Note:

- the `active` class can be added to any `li`, top level or submenus;
	
### Open submenus

	<div class="sidebar" id="sidebar" data-type="collapse">
		<ul class="sidebar-menu">
			
			<!-- Submenus -->
			<li class="hasSubmenu open">
				<a href="#submenu"><span>My submenu trigger</span></a>
				<ul id="submenu" class="in">
					<li><a href="#"><span>My submenu item</span></a></li>
				</ul>
			</li>
		</ul>
	</div>
		
Note:

- the `open` class can be added to any `li.hasSubmenu`;
- when using collapsible submenus, we must add an additional `in` class to the submenu `ul` in order to make it open by default.

### Icons

	<div class="sidebar" id="sidebar">
		<ul class="sidebar-menu">
			<li>
				<a href="#">
					<i class="fa fa-bar-chart"></i>
					<span>Charts</span>
				</a>
			</li>
		</ul>
	</div>
	
---

## Sidebar list groups

#### Default

Add the `list-group-menu` class to any `list-group` unordered list within the `sidebar` element to create a simple, but stylish, one level menu.

```html
<div class="sidebar" id="sidebar">

	<h4 class="category"><i class="fa fa-folder-open"></i> Default</h4>
	<div class="sidebar-block">
		<ul class="list-group list-group-menu">
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">120+</span> Design</a>
			</li>
			<li class="list-group-item active">
				<a href="#"><span class="badge pull-right">30+</span> Programming</a>
			</li>
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">40+</span> WordPress</a>
			</li>
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">60+</span> Workflow</a>
			</li>
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">15+</span> HTML</a>
			</li>
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">25+</span> CSS</a>
			</li>
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">35+</span> iOS</a>
			</li>
			<li class="list-group-item">
				<a href="#"><span class="badge pull-right">20+</span> Free</a>
			</li>
		</ul>
	</div>

</div>
```

#### Striped

Additionaly, add the `list-group-striped` class to any `list-group-menu` within the `sidebar` element to enable a striped style type.

```html
<div class="sidebar" id="sidebar">

	<h4 class="category"><i class="fa fa-folder-open"></i> Striped</h4>
	<ul class="sidebar-block list-group list-group-menu list-group-striped">
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">120+</span> Design</a>
		</li>
		<li class="list-group-item active">
			<a href="#"><span class="badge pull-right">30+</span> Programming</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">40+</span> WordPress</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">60+</span> Workflow</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">15+</span> HTML</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">25+</span> CSS</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">35+</span> iOS</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">20+</span> Free</a>
		</li>
	</ul>

</div>
```

#### Minimal

Add the `list-group-minimal` class to any `list-group-menu` unordered list within the `sidebar` element to remove borders.

```html
<div class="sidebar" id="sidebar">

	<h4 class="category"><i class="fa fa-folder-open"></i> Minimal</h4>
	<ul class="sidebar-block list-group list-group-menu list-group-minimal">
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">120+</span> Design</a>
		</li>
		<li class="list-group-item active">
			<a href="#"><span class="badge pull-right">30+</span> Programming</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">40+</span> WordPress</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">60+</span> Workflow</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">15+</span> HTML</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">25+</span> CSS</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">35+</span> iOS</a>
		</li>
		<li class="list-group-item">
			<a href="#"><span class="badge pull-right">20+</span> Free</a>
		</li>
	</ul>

</div>
```

---

## Sidebar tree views

In addition to dropdown menus, collapsible menus and list group menus, you can also have sidebars with [tree views](/reference/essential/index.html#tree-views).

```html
<div class="sidebar right sidebar-size-2 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop">
	<div data-scrollable>
		<h4 class="category"><i class="fa fa-folder-open"></i> Tree Views</h4>
		<div class="sidebar-block sidebar-block-full">
        
			<!-- Tree view -->
			<div data-toggle="tree">
				<ul style="display: none;">
					<li class="active">item1</li>
					<li>item2</li>
					<li class="folder expanded">
						Folder <em>1</em>
						<ul>
							<li>Sub-item 3.1
								<ul>
									<li>Sub-item 3.1.1</li>
									<li>Sub-item 3.1.2</li>
								</ul>
							</li>
							<li>Sub-item 3.2
								<ul>
									<li>Sub-item 3.2.1</li>
									<li>Sub-item 3.2.2</li>
								</ul>
							</li>
						</ul>
					</li>
					<li class="expanded">
						Document with children
						<ul>
							<li class="expanded">Sub-item 4.1
								<ul>
									<li>Sub-item 4.1.1</li>
									<li>Sub-item 4.1.2</li>
								</ul>
							</li>
							<li>Sub-item 4.2
								<ul>
									<li>Sub-item 4.2.1</li>
									<li>Sub-item 4.2.2</li>
								</ul>
							</li>
						</ul>
					</li>
					<li class="folder expanded">
						Folder <em>2</em>
						<ul>
							<li>Sub-item 5.1
								<ul>
									<li>Sub-item 5.1.1</li>
									<li>Sub-item 5.1.2</li>
								</ul>
							</li>
							<li>Sub-item 5.2
								<ul>
									<li>Sub-item 5.2.1</li>
									<li>Sub-item 5.2.2</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!-- // END tree view -->
			
		</div>
		<!-- // END .sidebar-block -->

    </div>
    <!-- // END scrollable -->

</div>
```

---
	
## Scrollable sidebar

When we have many menu items or other sidebar elements, it's probably desirable to make use of a scrollable area within the sidebar, which can be useful specially on small screens of mobile devices.

	<div class="sidebar" id="sidebar">
		<div data-scrollable>
			<!-- anything that goes here is scrollable (if necessary) -->
		</div>
	</div>
	
---
	
## Sidebar positioning

To position a sidebar, add the `left` or `right` class to the sidebar element.

	<div class="sidebar left" id="sidebar"></div>
	
---
	
## Sidebar visiblity

By default, all sidebars are hidden on any device screen. To make a sidebar visible by default, add any of the following classes to the sidebar element:

- `sidebar-visible-desktop` for desktop;
- `sidebar-visible-mobile` for mobile screens.

```
<div class="sidebar left sidebar-visible-desktop" id="sidebar"></div>
```

To display the sidebars on the page that have at least one of the `sidebar-visible-*` classes, you must also apply the `show-sidebar` class to the `<html>` tag.

---
	
## Sidebar size

### Fixed size

**Any screen size**:

There are three predefined classes for fixed pixel based sizes that we can apply to a sidebar element:

- `sidebar-size-1`: applies a width of `56px` to the sidebar and hides all content within the sidebar except the main menu icons;
- `sidebar-size-2`: applies a width of `200px` to the sidebar;
- `sidebar-size-3`: applies a width of `250px` to the sidebar;
- `sidebar-offset-$size`: 

	- required for any sidebar element;
	- sets the position of the sidebar in relation to other sidebar elements and the rest of the layout;
	- allows multiple sidebars to be placed in specific placements on each side;
	- `$size` must be one of the predefined sizes (1-3);
	- for example, a sidebar element with `.left` and `.sidebar-offset-2` will leave a gap for another `.sidebar-size-2` element, starting from the left of the screen;
	- for a single sidebar on it's side (left or right), the `$size` needs to be `0`, so add the class `sidebar-offset-0` to the sidebar element;

**Specific screen sizes**:

Additionally, we can control the size of our sidebars on any specific screen size, by adding the follwing classes to the sidebar element:

- `sidebar-size-$screen-$size`: applies the sidebar `$size` on a specific `$screen`;
- `sidebar-offset-$screen-$size`: required when using the class above.

`$screen` can be substituted with any of the following: `xs`, `sm`, `md`, `lg`.

**Examples**:

1. A single sidebar of 200px width, visible on desktop by default and positioned on the left:

		<div class="sidebar left sidebar-visible-desktop sidebar-size-2 sidebar-offset-0" id="sidebar"></div>
	
2. Two sidebars, visible on desktop by default and positioned on the left, next to each other, and additionally:

	The **first sidebar** has a width of 56px;
	
	The **second sidebar** has a width of 200px.

		<!-- First sidebar -->
		<div class="sidebar left sidebar-visible-desktop sidebar-size-1 sidebar-offset-0" id="first-sidebar"></div>
			
		<!-- Second sidebar -->
		<div class="sidebar left sidebar-visible-desktop sidebar-size-2 sidebar-offset-1" id="second-sidebar"></div>
		
2. Two sidebars, visible on desktop by default and positioned on the left, next to each other, and additionally:

	The **first sidebar** has a width of 56px on desktop **and** is visible by default on mobile **and** has a width of 200px on mobile;
	
	The **second sidebar** has a width of 250px.

		<!-- First sidebar -->
		<div class="sidebar left sidebar-visible-desktop sidebar-visible-mobile sidebar-size-1 sidebar-offset-0 sidebar-size-xs-2 sidebar-offset-xs-0" id="first-sidebar"></div>
			
		<!-- Second sidebar -->
		<div class="sidebar left sidebar-visible-desktop sidebar-size-3 sidebar-offset-1" id="second-sidebar"></div>
		
### Percentage size

In addition to the predefined fixed pixel based sizes, the sidebars can also have a percentage based width, between 25% to 100% in 1% increments.

Add the `sidebar-size-$SIZEpc` class to the sidebar element, substituting `$SIZE` with any value from 25 to 100. Additionally, you can condition the `$SIZE` to a specific `$screen` size with `sidebar-size-$screen-$SIZEpc`.

**Limitations**:

Note that you can't use a mix of two sidebars that are positioned on the same size (e.g. both left), when both sidebars have to be visible at once and when one of the sidebars has a fixed pixel based width and the other sidebar has a percentage based width.

**Examples**:

A sidebar visible on desktop, positioned on left, has a width of 200px by default on any screen size, has a width of 25% on large desktop screens and 30% on medium desktop screens:

	<div class="sidebar left sidebar-visible-desktop sidebar-size-2 sidebar-offset-0 sidebar-size-md-30pc sidebar-size-lg-25pc" id="sidebar"></div>

---

## Sidebar skins

There are two core sidebar skins included. Apply one of the following classes to the `sidebar` element.

- `sidebar-skin-dark`
- `sidebar-skin-white`

**Example**:

```html
<div class="sidebar left sidebar-visible-desktop sidebar-size-2 sidebar-offset-0 sidebar-skin-white" id="sidebar"></div>
```

---
	
## Sidebar page layouts

Up to this point we've covered the structure of a sidebar element, creating sidebar menus and the usage for various sidebar options like the size and position. Now, it's time to understand sidebars in the context of a complete page layout.

When using sidebars, we must instruct the layout where the sidebars are positioned on the page in order to accommodate them. The following classes must be added on the `html` element, that will apply the required layout spacings when we display sidebars.

---

### Single sidebar on one side

These classes must be used when there is single sidebar on each side. For example, one sidebar on the left side and/or one sidebar on the right side.

#### When using fixed px based sidebar sizes

Substitute `$size` with any valid sidebar size class suffix: `1`, `2` or `3`:

**Any screen size**:

- `sidebar-l$size` used for a fixed-width left sidebar on any screen size.
- `sidebar-r$size` used for a fixed-width right sidebar on any screen size.

**Specific screen size**:

We can control sidebar page layouts on specific screen sizes. Substitute `$screen` with `xs`, `sm`, `md` or `lg`:

- `sidebar-l$size-$screen`
- `sidebar-r$size-$screen`

#### When using fluid percentage based sidebar sizes

Substitute `$SIZE` with any value between `25` and `100`:

**Any screen size**:

- `sidebar-l-$SIZEpc` used for a fluid-width left sidebar on any screen size.
- `sidebar-r-$SIZEpc` used for a fluid-width right sidebar on any screen size.

**Specific screen size**:

Substitute `$screen` with `xs`, `sm`, `md` or `lg`:

- `sidebar-l-$SIZEpc-$screen`
- `sidebar-r-$SIZEpc-$screen`

---

### Multiple sidebars on one side

These classes must be used when there are multiple sidebars on each side. Substitute `$sizes` with a number formed from concatenating any of the valid sidebar sizes (`1`, `2` or `3`) used for the corresponding side, respecting the order of the sidebars from left to right. 

For example, when there are 2 sidebars on the left next to each other, first sidebar of size `1` and second sidebar of size `2`, we will use `sidebar-l-sum-12`. If there is another sidebar on the same page, on the right side, of size `2`, we will also use the `sidebar-r2` class.

**Any screen size**:

- `sidebar-l-sum-$sizes` used for multiple left sidebars on any screen size.
- `sidebar-r-sum-$sizes` used for multiple right sidebars on any screen size.

**Specific screen size**:

Substitute `$screen` with `xs`, `sm`, `md` or `lg`:

- `sidebar-l-sum-$screen-$sizes`
- `sidebar-r-sum-$screen-$sizes`

---

For the following examples, we'll be using [Swig templates](/code/swig/index.html). Also, note that some of the Swig templates used to construct page layouts in the following examples are explained in the [layout component](/reference/layout/index.html).

**One left sidebar example**:

In this example, we'll create a simple layout with a single left sidebar and use them in context of a page in the application.

Consider a page layout in `src/html/themes/$THEME_NAME/_layout_single_sidebar.html`:

	<!-- Start the HTML document -->
	{% include "lib/layout/html/_header.html" { htmlClass: 'show-sidebar sidebar-l2' } %}
	
	<!-- Include a simple sidebar -->
	{% include "src/html/themes/$THEME_NAME/_simple_sidebar.html" { sidebarOptions: "left sidebar-size-2 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop sidebar-visible-mobile", sidebarData: "id=sidebar-menu data-type=dropdown" } %}

	<!-- The page content -->
	<div id="content">
	    <div class="container-fluid">
	        
	       <!-- Define the content block -->
	       <!-- This will be used by pages that extend this layout to inject their content -->
			{% block content %}{% endblock %}

	    </div>
	</div>
	
	<!-- Complete the HTML document -->
	{% include "lib/layout/html/_footer_scripts.html" %}
	
And a simple sidebar element in `src/html/themes/$THEME_NAME/_simple_sidebar.html`:

	<div class="sidebar{% if sidebarOptions %} {{ sidebarOptions }}{% endif %}"{% if sidebarData %} {{ sidebarData }}{% endif %}>
		<div data-scrollable>
			<ul class="sidebar-menu">
				<li class="active"><a href="#"><span>Sample Menu</span></a></li>
				<li class="hasSubmenu">
             		<a href="#submenu"><span>Submenu</span></a>
                	<ul id="submenu">
                		<li><a href="#"><span>Sample Menu</span></a></li>
                		<li><a href="#"><span>Sample Menu</span></a></li>
					</ul>
				</li>
				<li><a href=""><span>Sample Menu</span></a></li>
				<li><a href=""><span>Sample Menu</span></a></li>
			</ul>
		</div>
	</div>
	
And a simple page in `src/html/themes/$THEME_NAME/page-single-sidebar.html`:

	{% extends "src/html/themes/$THEME_NAME/_layout_single_sidebar.html" %}
	
	{% block content %}
		<p>This is a simple page.</p>
	{% endblock %}
	
**Multiple sidebars example**:

In this example, we'll create a layout with 2 left sidebars and use them in context of a page in the application.

Consider a page layout in `src/html/themes/$THEME_NAME/_layout_multi_sidebars.html`:

	<!-- Start the HTML document -->
	{% include "lib/layout/html/_header.html" { htmlClass: 'show-sidebar sidebar-l-sum-12' } %}
	
	<!-- 1st left sidebar -->
	{% include "src/html/themes/$THEME_NAME/_simple_sidebar.html" { sidebarOptions: "left sidebar-size-1 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop sidebar-visible-mobile", sidebarData: "id=sidebar-menu data-type=dropdown" } %}
	
	<!-- 2nd left sidebar -->
	{% include "src/html/themes/$THEME_NAME/_simple_sidebar.html" { sidebarOptions: "left sidebar-size-2 sidebar-offset-1 sidebar-skin-white sidebar-visible-desktop", sidebarData: "id=sidebar-menu-2 data-type=dropdown" } %}

	<!-- The page content -->
	<div id="content">
	    <div class="container-fluid">
	        
	       <!-- Define the content block -->
	       <!-- This will be used by pages that extend this layout to inject their content -->
			{% block content %}{% endblock %}

	    </div>
	</div>
	
	<!-- Complete the HTML document -->
	{% include "lib/layout/html/_footer_scripts.html" %}
	
And a simple page in `src/html/themes/$THEME_NAME/page-multi-sidebars.html`:

	{% extends "src/html/themes/$THEME_NAME/_layout_multi_sidebars.html" %}
	
	{% block content %}
		<p>This is a simple page.</p>
	{% endblock %}

Note that we're using the same sidebar Swig template we have created from the previous example `src/html/themes/$THEME_NAME/_simple_sidebar.html`.
	
Now, you can follow through the [build process](/workflow/gulp/index.html) and see the compiled HTML result in your [theme's build path](/workflow/gulp/index.html#build-paths): 

- `$BUILD_PATH/$THEME_NAME/page-single-sidebar.html`
- `$BUILD_PATH/$THEME_NAME/page-multi-sidebars.html`

---

## Sidebar transitions

Transition effects for off-canvas views.

To enable sidebar transitions we must do a few things. First, add the `st-layout` class to the `html` document.

Within the `body` element:

	<!-- Wrapper required for sidebar transitions -->
	<div class="st-container">
	
		<!-- sidebars with the following effects MUST go OUTSIDE of the .st-pusher wrapper: -->
		<!-- st-effect-1, st-effect-2, st-effect-4, st-effect-5, st-effect-9, st-effect-10, st-effect-11, st-effect-12, st-effect-13 -->
	
		<!-- content push wrapper -->
		<div class="st-pusher" id="content">
    
			<!-- sidebars with the following effects MUST go INSIDE the .st-pusher wrapper: -->
      		<!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->
      		
      		<!-- this is the wrapper for the content -->
			<div class="st-content">

				<!-- extra div for emulating position:fixed of the menu -->
				<div class="st-content-inner">
				
					<!-- Your page content -->
				
				</div>
				<!-- // END .st-content-inner -->

			</div>
			<!-- // END .st-content -->

		</div>
		<!-- // END .st-pusher -->
	
	</div>
	<!-- // END .st-container -->

### Effects

There are 14 effects that can be used for sidebar transitions. The effect is configured directly on the toggle button that triggers the display of the sidebar. Add the `data-toggle` attribute to any link, anywhere in the document, with a value of `sidebar-menu`, with the `href` attribute value set to the target sidebar id and the `data-effect` attribute with a valid effect class name (`st-effect-1` to `st-effect-14`).

#### Slide in on top

	<a href="#sidebar-menu" data-toggle="sidebar-menu" data-effect="st-effect-1" class="btn btn-default">Slide in on top</a>
	
#### Reveal

	<a href="#st-effect-2" data-toggle="sidebar-menu" data-effect="st-effect-2" class="btn btn-default">Reveal</a>
	
#### Push

	<a href="#st-effect-3" data-toggle="sidebar-menu" data-effect="st-effect-3" class="btn btn-default">Push</a>
	
#### Slide along
	
	<a href="#st-effect-4" data-toggle="sidebar-menu" data-effect="st-effect-4" class="btn btn-default">Slide along</a>
	
#### Reverse slide out

	<a href="#st-effect-5" data-toggle="sidebar-menu" data-effect="st-effect-5" class="btn btn-default">Reverse slide out</a>

#### Rotate pusher	

	<a href="#st-effect-6" data-toggle="sidebar-menu" data-effect="st-effect-6" class="btn btn-default">Rotate Pusher</a>
	
#### 3D rotate in

	<a href="#st-effect-7" data-toggle="sidebar-menu" data-effect="st-effect-7" class="btn btn-default">3D rotate in</a>
	
#### 3D rotate out
	
	<a href="#st-effect-8" data-toggle="sidebar-menu" data-effect="st-effect-8" class="btn btn-default">3D rotate out</a>
	
#### Scale down pusher
	
	<a href="#st-effect-9" data-toggle="sidebar-menu" data-effect="st-effect-9" class="btn btn-default">Scale down pusher</a>

#### Scale up	

	<a href="#st-effect-10" data-toggle="sidebar-menu" data-effect="st-effect-10" class="btn btn-default">Scale up</a>
	
#### Scale and rotate pusher
	
	<a href="#st-effect-11" data-toggle="sidebar-menu" data-effect="st-effect-11" class="btn btn-default">Scale &amp; rotate pusher</a>
	
#### Open door
	
	<a href="#st-effect-12" data-toggle="sidebar-menu" data-effect="st-effect-12" class="btn btn-default">Open door</a>
	
#### Fall down
	
	<a href="#st-effect-13" data-toggle="sidebar-menu" data-effect="st-effect-13" class="btn btn-default">Fall down</a>
	
#### Delayed 3D rotate
	
	<a href="#st-effect-14" data-toggle="sidebar-menu" data-effect="st-effect-14" class="btn btn-default">Delayed 3D rotate</a>
	
### Example

In this example, we'll create a layout configured for sidebar transitions, with a single left sidebar and use them in context of a page in the application.

Consider a page layout in `src/html/themes/$THEME_NAME/_layout_sidebar_transition.html`:

	<!-- Start the HTML document -->
	{% include "lib/layout/html/_header.html" { htmlClass: 'show-sidebar sidebar-l2 st-layout' } %}
	
	<!-- Wrapper required for sidebar transitions -->
	<div class="st-container">
	
		<!-- sidebars with the following effects MUST go OUTSIDE of the .st-pusher wrapper: -->
		<!-- st-effect-1, st-effect-2, st-effect-4, st-effect-5, st-effect-9, st-effect-10, st-effect-11, st-effect-12, st-effect-13 -->
		
		<!-- For this example, we'll be using the st-effect-1 transition -->
		<!-- Include a simple sidebar -->
		{% include "src/html/themes/$THEME_NAME/_simple_sidebar.html" { sidebarOptions: "left sidebar-size-2 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop sidebar-visible-mobile", sidebarData: "id=sidebar-menu data-type=dropdown" } %}
	
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
				
				</div>
				<!-- // END .st-content-inner -->

			</div>
			<!-- // END .st-content -->

		</div>
		<!-- // END .st-pusher -->
	
	</div>
	<!-- // END .st-container -->
	
	<!-- Complete the HTML document -->
	{% include "lib/layout/html/_footer_scripts.html" %}
	
And a simple sidebar element in `src/html/themes/$THEME_NAME/_simple_sidebar.html`:

	<div class="sidebar{% if sidebarOptions %} {{ sidebarOptions }}{% endif %}"{% if sidebarData %} {{ sidebarData }}{% endif %}>
		<div data-scrollable>
			<ul class="sidebar-menu">
				<li class="active"><a href="#"><span>Sample Menu</span></a></li>
				<li class="hasSubmenu">
             		<a href="#submenu"><span>Submenu</span></a>
                	<ul id="submenu">
                		<li><a href="#"><span>Sample Menu</span></a></li>
                		<li><a href="#"><span>Sample Menu</span></a></li>
					</ul>
				</li>
				<li><a href=""><span>Sample Menu</span></a></li>
				<li><a href=""><span>Sample Menu</span></a></li>
			</ul>
		</div>
	</div>
	
And a simple page in `src/html/themes/$THEME_NAME/page-sidebar-transition.html`:

	{% extends "src/html/themes/$THEME_NAME/_layout_sidebar_transition.html" %}
	
	{% block content %}
		<p>This is a simple page.</p>
		<p>
			<a href="#sidebar-menu" data-toggle="sidebar-menu" data-effect="st-effect-1" class="btn btn-default">Slide in on top</a>
		</p>
	{% endblock %}

Now, you can follow through the [build process](/workflow/gulp/index.html) and see the compiled HTML result in your [theme's build path](/workflow/gulp/index.html#build-paths): 

- `$BUILD_PATH/$THEME_NAME/page-sidebar-transition.html`

---

## Sidebar elements

### Sidebar tabs

	<div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop" id="sidebar-menu">
	
		<!-- Split wrapper -->
		<div class="split-vertical">
		
			<!-- Tabbable component -->
			<div class="tabbable tabs-icons tabs-primary">
	        
				<!-- Standard Bootstrap Tab Nav -->
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#sidebar-tabs-l1" data-toggle="tab">
							<i class="fa fa-bar-chart-o"></i>
						</a>
					</li>
					<li>
						<a href="#sidebar-tabs-l2" data-toggle="tab">
							<i class="fa fa-comments"></i>
						</a>
					</li>
				</ul>
				<!-- // END .nav -->
	            
			</div>
			<!-- // END .tabbable -->
	        
			<!-- Split body -->
			<div class="split-vertical-body">
				<div class="split-vertical-cell">
	            
					<!-- Standard Bootstrap Tab Content -->
					<div class="tab-content">
	                
						<!-- Tab pane -->
						<div class="tab-pane active" id="sidebar-tabs-l1">
							<div data-scrollable>
								<h4 class="category">Tab #1</h4>
								<div class="sidebar-block">
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet architecto aspernatur, autem, beatae commodi consequatur dolores ducimus ea eius est ex, expedita neque ratione saepe tempora unde ut. Doloremque!</p>
								</div>
							</div>
						</div>
						<!-- // END .tab-pane -->
							
						<!-- Tab pane -->
						<div class="tab-pane" id="sidebar-tabs-l2">
							<div data-scrollable>
								<h4 class="category">Tab #2</h4>
								<div class="sidebar-block">
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet architecto aspernatur, autem, beatae commodi consequatur dolores ducimus ea eius est ex, expedita neque ratione saepe tempora unde ut. Doloremque!</p>
								</div>
							</div>
						</div>
						<!-- // END .tab-pane -->
							
					</div>
					<!-- // END .tab-content -->
						
				</div>
			</div>
			<!-- // END split body -->
				
		</div>
		<!-- // END split wrapper -->
		
	</div>

### Sidebar buttons

	<div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop" id="sidebar-menu">
		<div data-scrollable>

			<div class="category">Regular Buttons</div>
			<div class="sidebar-block">
				<button class="btn btn-block btn-white">White</button>
				<button class="btn btn-block btn-default">Default</button>
				<button class="btn btn-block btn-success">Success</button>
				<button class="btn btn-block btn-warning">Warning</button>
				<button class="btn btn-block btn-danger">Danger</button>
			</div>

			<div class="category">Stacked Buttons</div>
			<div class="sidebar-block">
				<button class="btn btn-block btn-default btn-icon-stacked">
					<i class="fa fa-2x fa-facebook"></i> 
					<span>Join using <br>Facebook</span>
				</button>
				<button class="btn btn-block btn-primary btn-icon-stacked">
					<i class="fa fa-2x fa-twitter"></i> 
					<span>Join using your<br>Twitter Account</span>
				</button>
				<button class="btn btn-block btn-info btn-icon-stacked">
					<i class="fa fa-2x fa-dribbble"></i> 
					<span>Join using your<br>Dribble Account</span>
				</button>
			</div>

		</div>
	</div>

### Sidebar progress bars

```html
<div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop" id="sidebar-menu">
	<div data-scrollable>

		<div class="category">Progress Bars</div>
		<div class="sidebar-block">
			<div class="progress">
				<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
					<span class="sr-only">60% Complete</span>
				</div>
			</div>
			<div class="progress">
				<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%;">
					<span class="sr-only">40% Complete</span>
				</div>
			</div>
			<div class="progress">
				<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="74" aria-valuemin="0" aria-valuemax="100" style="width: 74%;">
					<span class="sr-only">74% Complete</span>
				</div>
			</div>
			<div class="progress">
				<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100" style="width: 56%;">
					<span class="sr-only">56% Complete</span>
				</div>
			</div>
		</div>

	</div>
</div>
```