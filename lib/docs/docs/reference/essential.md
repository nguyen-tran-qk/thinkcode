# Essential

The essential package provides a collection of commonly used elements and functionality:

- Buttons
- Icons
- Expandable areas
- Ribbons
- Forms
- Tabs
- Nestable lists
- Tree views
- Tables
- Progress bars
- Modals

**Note**: You can see full examples in the source within the `lib/essential/html/` directory.

---

## Requirements

### JavaScript

To load the entire essential package, from `src/js/themes/$THEME_NAME/app.js`:

	// Essential package
	require('essential/js/main');

This will load `lib/essential/js/main.js` into our main application script bundle.

### Less

From `src/less/themes/$THEME_NAME/app.less`:

	// Essential package
	@import "essential/less/main";

Which will load `lib/essential/less/main.less` into our main application style bundle.

---

#### RTL Support

Add to `src/less/themes/$THEME_NAME/app.less`, after the main component:

	// Essential RTL
	@import "essential/less/main-rtl";

---

#### Alternative

If working with Less and Browserify bundles is not your favorite thing, you can alternatively load the pre-built static assets we have included:

	<!-- In the head of the HTML document -->
	<link rel="stylesheet" href="css/app/essential.css" />

	<!-- At the bottom of the HTML document -->
	<script src="js/app/essential.js"></script>

---

## Expandable areas

The expandable component is a great way to present a large content area with a small preview. Click anywhere on the preview area to show the entire content.

	<div class="expandable expandable-trigger">
		<div class="expandable-content">
			<!-- content goes here -->
		</div>
	</div>
	
This will create an expandable area with a preview of `100px` height. 

Additionaly, you can add on top of `expandable-content`: 

- `expandable-content-medium` to make the preview area `150px`
- `expandable-content-large` to make the preview area `200px`

For example:

	<div class="expandable expandable-trigger">
		<div class="expandable-content expandable-content-medium">
			<!-- creates a 150px preview -->
		</div>
	</div>
	
And:

	<div class="expandable expandable-trigger">
		<div class="expandable-content expandable-content-large">
			<!-- creates a 200px preview -->
		</div>
	</div>
	
By default, the expandable indicator, which is added at the bottom of the preview area, will have a greish background color. You can make it white, by adding `expandable-indicator-white` on top of `expandable`:

	<div class="expandable expandable-indicator-white expandable-trigger">
		<div class="expandable-content">
			<!-- content goes here -->
		</div>
	</div>
	
You can combine the expandable component with other UI elements, such as Bootstrap panels:

	<div class="panel panel-default">
		<div class="panel-body expandable expandable-indicator-white expandable-trigger">
			<div class="expandable-content">
				<!-- content goes here -->
			</div>
		</div>
	</div>
	
### Initialize

The component is self-initialized just by loading the required assets, but you can programatically initialize an expandable area via jQuery:

#### $.tkExpandable()

	$('#my-expandable-area').tkExpandable();
	
---

## Tabbable

The tabbable component includes many positioning and styling options, starting with minimalistic tabs to vertical or horizontal tabs, left, center or right aligned and more. The resulting tabs are responsive and the component automatically displays a horizontal scrolling area when using many tabs on a single tabbable area.

#### Basics

Any tabbable widget starts with a minimal `tabbable` wrapper:

	<!-- Tabbable Widget -->
	<div class="tabbable"></div>

Next, we're using standard tabs functionality included with Bootstrap:

	<!-- Tabbable Widget -->
	<div class="tabbable">

		<!-- Tabs -->
		<ul class="nav nav-tabs">
			<li class="active"><a href="#home" data-toggle="tab">Home</a></li>
			<li><a href="#profile" data-toggle="tab">Profile</a></li>
			<li><a href="#messages" data-toggle="tab">Messages</a></li>
		</ul>
		<!-- // END Tabs -->

		<!-- Panes -->
		<div class="tab-content">
			<div id="home" class="tab-pane active"></div>
			<div id="profile" class="tab-pane"></div>
			<div id="messages" class="tab-pane"></div>
		</div>
		<!-- // END Panes -->

	</div>
	<!-- // END Tabbable Widget -->
	
#### Icons and text

We can add icons to our tabs:

	<ul class="nav nav-tabs">
		<li class="active">
			<a href="#home" data-toggle="tab">
				<i class="fa fa-fw fa-home"></i> Home
			</a>
		</li>
		<li>
			<a href="#profile" data-toggle="tab">
				<i class="fa fa-fw fa-user"></i> Profile
			</a>
		</li>
		<li>
			<a href="#messages" data-toggle="tab">
				<i class="fa fa-fw fa-envelope"></i> Messages
			</a>
		</li>
	</ul>
	
#### Icons only

We can have tabs display only with icons, by adding `tabs-icons` to the `tabbable` element:

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-icons">

		<!-- Tabs -->
		<ul class="nav nav-tabs">
			<li class="active">
				<a href="#home" data-toggle="tab">
					<i class="fa fa-fw fa-home"></i>
				</a>
			</li>
			<li>
				<a href="#profile" data-toggle="tab">
					<i class="fa fa-fw fa-user"></i>
				</a>
			</li>
			<li>
				<a href="#messages" data-toggle="tab">
					<i class="fa fa-fw fa-envelope"></i>
				</a>
			</li>
		</ul>
	
	</div>
	
#### Stacked icons and text
	
We can stack the icon on top of the text so they're no longer next to each other, but on two lines and text centered, by adding `tabs-blocks` to the `tabbable` element:

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-blocks">

		<!-- Tabs -->
		<ul class="nav nav-tabs">
			<li class="active">
				<a href="#home" data-toggle="tab">
					<i class="fa fa-fw fa-home"></i> Home
				</a>
			</li>
			<li>
				<a href="#profile" data-toggle="tab">
					<i class="fa fa-fw fa-user"></i> Profile
				</a>
			</li>
			<li>
				<a href="#messages" data-toggle="tab">
					<i class="fa fa-fw fa-envelope"></i> Messages
				</a>
			</li>
		</ul>
	
	</div>
	
#### Tabs centered horizontally

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-center-h"></div>
	
#### Active tab filled with the primary color

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-primary"></div>
	
#### Left vertical tabs

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-vertical tabs-left"></div>
	
#### Right vertical tabs

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-vertical tabs-right"></div>

#### Advanced combo

We can combine some or all of the options to create more complex tabbable widgets, for example a tabbable widget having the active tab filled with the primary color, with stacked icons and text, and also centered horizontally:

	<!-- Tabbable Widget -->
	<div class="tabbable tabs-blocks tabs-center-h tabs-primary"></div>

---

## Wizard

The wizard component can split up large forms into multiple smaller logical sections and convert them into multi-step forms with cool progress bars.

### Requirements

Depends on the [Slick.js](https://github.com/kenwheeler/slick) library.

You can check if it's already installed by simply looking for the directory `bower_components/slick.js`.
	
Install with bower:
	
	bower install slick.js --save
	
Add the library to your theme via the [build process](/workflow/gulp/index.html):
	
1. Create `.build/copy-vendor/copy.media.json` (or modify existing):

		[
			{
				"task": "copy-vendor-media-scripts",
				"cwd": "bower_components",
				"src": ["slick.js/slick/slick.js"],
				"dest": "js/vendor/media",
				"flatten": true
			},
			{
				"task": "slick-fonts",
				"cwd": "bower_components/slick.js/slick",
				"src": ["fonts/*"],
				"dest": "css/vendor/fonts",
				"flatten": true
			},
			{
				"task": "slick-images",
				"cwd": "bower_components/slick.js/slick",
				"src": ["*.gif"],
				"dest": "css/vendor"
			}
		]
		
2. Enable the library in `src/swig.json`:

		{
			"css_vendor": [
				"vendor/slick"
			],
			"js_vendor": [
				"vendor/media/slick"
			]
		}
		
3. Optionally, you can add the library to the `js/vendor/all.js` bundle, if you're using it.

	Within `.build/concat.json`, add the library to the bundle `files` array:

		{
			"build": "js/vendor/all.js",
			"files": [
				"...",
				"media/slick.js"
			]
		}
		
4. Run the [build task](/workflow/gulp/index.html#build)
5. You're done! 

	The library should be available in your [theme's build path](/workflow/gulp/index.html#build-paths):
	
	- `$BUILD_PATH/$THEME_NAME/js/vendor/media/slick.js`
	- `$BUILD_PATH/$THEME_NAME/js/vendor/all.js` should also include the new library.
	- `$BUILD_PATH/$THEME_NAME/css/vendor/slick.css`
	- `$BUILD_PATH/$THEME_NAME/css/vendor/all.css` should also include the library styling.

### Basic usage

The wizard markup, at it's minimum:

	<!-- The wizard container -->
	<div class="wizard-container">
	
		<!-- Progress -->
		<ul class="wiz-progress">
			<li class="active">Step 1</li>
			<li>Step 2</li>
			<li>Step 3</li>
		</ul>
	
		<!-- The form -->
		<form data-toggle="wizard">
		
			<!-- Wizard step -->
			<fieldset class="step">
			
				<!-- Previous step -->
				<button type="button" class="wiz-prev">Previous</button>
				
				<!-- Next step -->
				<button type="button" class="wiz-next">Next</button>
				
				<!-- Go to step index (0 === first) -->
				<button type="button" class="wiz-step" data-target="0">Go</button>
			
			</fieldset>
			
			<!-- Other steps go here -->
			
		</form>
		
	</div>
	
### Custom style and functionality

Behind the scene, the wizard component uses [slick.js](http://kenwheeler.github.io/slick/) to create the basic functionality and provides much flexibility in styling. The markup above for example will be pretty much unstyled, allowing you to create your own, but you can use a predefined wizard style by adding `wizard-1` on top of `wizard-container`:

	<!-- The wizard container -->
	<div class="wizard-container wizard-1"></div>
	
You can see a complete example of a wizard using the `wizard-1` predefined style:

- `lib/essential/html/essential-wizards.html` for the markup
- `lib/essential/less/_wizard.less` for the style
- `lib/essential/js/_wizard.js` for an example of adding custom JavaScript functionality to the wizard which updates the progress bar after the wizard step changes

### Events

#### after.wizard.step

	$(document).on('after.wizard.step', function (event, data) {
	
		// do something after a wizard has changed the active step
		
		// you have access to the wizard container's jQuery object
		console.log(data.container);
		
		// you can get the index of the target step
		console.log(data.target);
		
		if (data.container.is('#my-wizard')) {
			// do something only when the event was triggered by a specific wizard
		}
		
	});
	
---

## Nestable lists

Nestable is a component for nesting hierarchical lists with drag & drop capabilities, compatible with both mouse events and touch enabled devices.

### Requirements

Depends on the [Nestable](https://github.com/dbushell/Nestable) library.

You can check if it's already installed by simply looking for the directory `bower_components/nestable`.
	
Install with bower:
	
	bower install dbushell/Nestable --save
	
Add the library to your theme via the [build process](/workflow/gulp/index.html):
	
1. Create `.build/copy-vendor/copy.nestable.json`:

		{
			"task": "copy-vendor-nestable-library",
			"cwd": "bower_components",
			"src": ["nestable/jquery.nestable.js"],
			"dest": "js/vendor/nestable",
			"flatten": true
		}
		
2. Enable the library in `src/swig.json`:

		{
			"js_vendor": [
				"vendor/nestable/jquery.nestable"
			]
		}
		
3. Optionally, you can add the library to the `js/vendor/all.js` bundle, if you're using it.

	Within `.build/concat.json`, add the library to the bundle `files` array:

		{
			"build": "js/vendor/all.js",
			"files": [
				"...",
				"nestable/jquery.nestable.js"
			]
		}
		
4. Run the [build task](/workflow/gulp/index.html#build)
5. You're done! 

	The library should be available in your [theme's build path](/workflow/gulp/index.html#build-paths):
	
	- `$BUILD_PATH/$THEME_NAME/js/vendor/nestable/jquery.nestable.js`
	- `$BUILD_PATH/$THEME_NAME/js/vendor/all.js` should also include the new library.

### Basic usage

Any nestable element has the base class `nestable`:

	<div class="nestable"></div>
	
Within this wrapper, we can add unordered lists with the base class `nestable-list` and with it's list items having the `nestable-item` class. 

#### Draggable Items

There are two possible drag & drop scenarios. In this scenario, the list item is also the drag handle and for this we must wrap the item content with a `nestable-handle` container:
	
	<div class="nestable" id="nestable">

		<!-- Top level list -->
		<ul class="nestable-list">

			<!-- List item -->
			<li class="nestable-item" data-id="1">

				<!-- Wrap item content with the drag handle -->
				<div class="nestable-handle">Item 1</div>

			</li>

			<!-- List item -->
			<li class="nestable-item" data-id="2">

				<!-- Drag handle -->
				<div class="nestable-handle">Item 2</div>

				<!-- Nested list -->
				<ul class="nestable-list">
				
					<!-- List item -->
					<li class="nestable-item" data-id="2.1">
						
						<!-- Drag handle -->
						<div class="nestable-handle">Item 2.1</div>
						
					</li>
					
					<!-- List item -->
					<li class="nestable-item" data-id="2.2">
					
						<!-- Drag handle -->
						<div class="nestable-handle">Item 2.2</div>

						<!-- Nested list -->
						<ul class="nestable-list">
						
							<!-- List Items -->
							
						</ul>

					</li>
					<!-- // END .nestable-item -->
					
				</ul>
				<!-- // END .nestable-list -->

			</li>
			<!-- // END .nestable-item -->
			
		</ul>
		<!-- // END .nestable-list -->
		
	</div>
	<!-- // END .nestable -->
	
#### Draggable Handles

In this scenario, we have item drag handles separated from the item's content. For this, we must add `nestable-item-handle` on top of each `nestable-item` and use `nestable-handle` and `nestable-content` within the item to separate the handle and the content:

	<div class="nestable" id="nestable-handles">
		<ul class="nestable-list">
		
			<!-- Note the additional .nestable-item-handle -->
			<li class="nestable-item nestable-item-handle" data-id="1">
			
				<!-- Separate the nestable item drag handle -->
				<div class="nestable-handle"><i class="md md-menu"></i></div>
				
				<!-- From the item content -->
				<div class="nestable-content">Item 1</div>
				
			</li>
			<!-- // END .nestable-item -->
			
			<li class="nestable-item nestable-item-handle" data-id="2">
				<div class="nestable-handle"><i class="md md-menu"></i></div>
				<div class="nestable-content">Item 2</div>
			</li>
			
			<li class="nestable-item nestable-item-handle" data-id="3">
				<div class="nestable-handle"><i class="md md-menu"></i></div>
				<div class="nestable-content">Item 3</div>
				<ul class="nestable-list">
					<li class="nestable-item nestable-item-handle" data-id="3.1">
						<div class="nestable-handle"><i class="md md-menu"></i></div>
						<div class="nestable-content">Item 3.1</div>
					</li>
					<li class="nestable-item nestable-item-handle" data-id="3.2">
						<div class="nestable-handle"><i class="md md-menu"></i></div>
						<div class="nestable-content">Item 3.2</div>
					</li>
					<li class="nestable-item nestable-item-handle" data-id="3.3">
						<div class="nestable-handle"><i class="md md-menu"></i></div>
						<div class="nestable-content">Item 3.3</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	
#### Draggable Handles filled with the primary color

	<div class="nestable nestable-handle-primary" id="nestable-handles"></div>

### Initialize

The `.nestable` elements are self-initialized, but you can programatically initialize a nestable element via jQuery:

	$('#my-nestable').tkNestable();
	
### Events

The `change` event is fired when items are reordered.

	$('#nestable').on('change', function() {
	    // do something when items are reordered
	});
	
### Methods

You probably noticed in the examples we've used the `data-id` attribute on every list item. You can get a serialized object with all `data-*` attributes for each item.

	$('#nestable').nestable('serialize');
	
For the first example with the Draggable Items, the serialized data would be:

	[
		{
			"id": 1
		}, 
		{
			"id": 2, 
			"children": [
				{
					"id": "2.1"
				},
				{
					"id": "2.2"
				}
			]
		}
	]

---

## Tree views

Fancytree is a JavaScript dynamic tree view plugin for jQuery with support for persistence, keyboard, checkboxes, tables, drag and drop, and lazy loading. Fancytree is a sequel of the popular DynaTree plugin.

### Requirements

Depends on the [Fancytree](https://github.com/mar10/fancytree) library.

You can check if it's already installed by simply looking for the directory `bower_components/fancytree`.
	
Install with bower:
	
	bower install fancytree --save
	
Add the library to your theme via the [build process](/workflow/gulp/index.html):
	
1. Create `.build/copy-vendor/copy.tree.json`:

		[
			{
				"task": "copy-vendor-tree-library",
				"cwd": "bower_components",
				"src": ["fancytree/dist/jquery.fancytree.js"],
				"dest": "js/vendor/tree",
				"flatten": true
			},
			{
				"task": "copy-vendor-tree-css",
				"cwd": "$ROOT_DIR",
				"src": [
					"bower_components/fancytree/dist/skin-bootstrap/ui.fancytree.css"
				],
				"dest": "css/vendor",
				"flatten": true
			}
		]
		
2. Enable the library in `src/swig.json`:

		{
			"css_vendor": [
				"vendor/ui.fancytree"
			],
			"js_vendor": [
				"vendor/tree/jquery.fancytree"
			]
		}
		
3. Optionally, you can add the library to the `js/vendor/all.js` bundle, if you're using it.

	Within `.build/concat.json`, add the library to the bundle `files` array:

		{
			"build": "js/vendor/all.js",
			"files": [
				"...",
				"tree/jquery.fancytree.js"
			]
		}
		
4. Run the [build task](/workflow/gulp/index.html#build)
5. You're done! 

	The library should be available in your [theme's build path](/workflow/gulp/index.html#build-paths):
	
	- `$BUILD_PATH/$THEME_NAME/js/vendor/tree/jquery.fancytree.js`
	- `$BUILD_PATH/$THEME_NAME/js/vendor/all.js` should also include the new library.
	- `$BUILD_PATH/$THEME_NAME/css/vendor/ui.fancytree.css`
	- `$BUILD_PATH/$THEME_NAME/css/vendor/all.css` should also include the library styling.

### Basic usage

A tree is a nested list of unordered list items. The first unordered list must have `display: none;` and has to be wrapped by a container with the `data-toggle` attribute set to `tree`:

	<div data-toggle="tree">
		<ul style="display: none;">
			<li>item1</li>
			<li>item2</li>
			<li class="folder">
				Folder <em>with some</em> children
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
				Document with some children (expanded on init)
				<ul>
					<li class="active focused expanded">
						Sub-item 4.1 (expanded, active and focused on init)
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
		</ul>
	</div>

### Drag & Drop

To enable drag & drop, add the `data-tree-dnd` attribute:

	<div data-toggle="tree" data-tree-dnd></div>
	
### Single selection

	<div data-toggle="tree" data-tree-checkbox data-tree-select="1"></div>
	
### Multiple selection

	<div data-toggle="tree" data-tree-checkbox data-tree-select="2 or 3"></div>
	
### Selection mode

When using `data-tree-checkbox`, we can specify the selection mode with `data-tree-select` set to one of the following:

- `1`: single 
- `2`: multi *(default)*
- `3`: multi-hier

---

## Modals

Streamlined and flexible modals & dialog prompts with the minimum required functionality and smart options.

### Basic usage

We'll be using standard modals included with Bootstrap, with some additional options. For basic usage, see the official [Bootstrap documentation](http://getbootstrap.com/javascript/#modals).

	<!-- Standard Bootstrap markup -->
	<div class="modal fade" id="modal-basic">
		<div class="modal-dialog">
		
			<!-- Additionally, wrap the .modal-content into a .v-cell container --> 
			<!-- to center the content vertically -->
			
			<!-- This works because we've modified the .modal-overlay -->
			<!-- class to have display: table; -->
			<div class="v-cell">
			
				<!-- Standard Bootstrap markup -->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span>
							<span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title">Modal title</h4>
					</div>
					<div class="modal-body">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam atque consequuntur dolore fugiat fugit hic in ipsam iure magnam maxime quaerat, quam qui repellat repellendus temporibus vel vitae voluptate!
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
					</div>
				</div>
				
			</div>
			<!-- // END .v-cell -->
			
		</div>
	</div>

### Animations

#### Slide down

	<div class="modal fade slide-down" id="modal-slide-down"></div>
	
#### Slide up

	<div class="modal fade slide-up" id="modal-slide-up"></div>
	
#### Slide from left

	<div class="modal fade slide-left" id="modal-slide-left"></div>
	
#### Slide from right

	<div class="modal fade slide-right" id="modal-slide-right"></div>
	
#### Grow

	<div class="modal fade grow" id="modal-grow"></div>
	
### Overlay

Adding the `modal-overlay` class on top of `modal` removes the boxed style, by clearing the `border`, `box-shadow` and `background-color` CSS properties for the `modal-content` element.

	<div class="modal fade modal-overlay" id="modal-overlay"></div>
	
### White Backdrop

You can replace the default (dark) backdrop with a white backdrop by adding the `modal-backdrop-white` class on top of `modal`.

	<div class="modal fade modal-backdrop-white" id="modal-backdrop-white"></div>
	
### Size

#### Small

You can make the modal `300px` wide by adding `modal-sm` and `h-center` classes on the `modal-content` element.

	<div class="modal-content modal-sm h-center"></div>
	
#### Large

You can also make it larger by adding `modal-lg` class to the `modal-content` element. Note that this doesn't require the additional `h-center` class like it does for `modal-sm`.

	<div class="modal-content modal-lg"></div>
	
### Combine styles

You can combine several styles and options to create unique dialogs. For example, a modal with Overlay, White Backdrop and Grow at the same time:

	<div class="modal fade grow modal-overlay modal-backdrop-white" id="modal-combo"></div>
	
### Toggle controls

	<button data-toggle="modal" data-target="#modal-basic">Open the modal</button>
	
	<!-- Or -->
	<a data-toggle="modal" href="#modal-basic">Open the modal</a>
	
	<!-- Or -->
	<a data-toggle="modal" data-target="#modal-basic" href="#">Open the modal</a>
	
### Modal Sidebars

We can make modals behave and display as sidebars.

#### Requirements

- Requires the [sidebar](/reference/sidebar/index.html) component.

#### Left sidebar modal

You can add sidebar options to the `modal-dialog` element.

	<div class="modal fade slide-left" id="modal-sidebar-left">
		<div class="modal-dialog sidebar sidebar-size-3 sidebar-size-xs-1 sidebar-offset-0 left">
		
			<!-- Standard markup -->
		
		</div>
	</div>
	
#### Right sidebar modal

Similarly, you can create a right sidebar modal.

	<div class="modal fade slide-right" id="modal-sidebar-right">
		<div class="modal-dialog sidebar sidebar-size-3 sidebar-size-xs-1 sidebar-offset-0 right">
		
			<!-- Standard markup -->
		
		</div>
	</div>

---

## Collapsible panels

Standard Bootstrap panels with collapse functionality.

### Basic usage

To enable, add the `data-toggle` attribute with a value of `panel-collapse` to any `panel` element. Also, add the `panel-collapse-trigger` class to the `panel-heading` element.

	<div class="panel panel-default" data-toggle="panel-collapse">
	    <div class="panel-heading panel-collapse-trigger">
	        <h4 class="panel-title">Panel title</h4>
	    </div>
	    <div class="panel-body">
	    	<!-- Collapsible content -->
	    </div>
	</div>
	
### Options

#### Open by default

Add the `data-open` attribute with a value of `true` to the `panel` element.

	<div class="panel panel-default" data-toggle="panel-collapse" data-open="true"></div>

---

## Cover overlays

The cover component helps create complex layered UI elements consisting of:

1. A primary area (for example, an image);
2. An overlay area, positioned on top of the primary area, with different display options and elements of it's own.

So, for example, consider a UI element which displays an image. When a user hovers the image, it can display a call to action on top of the image ("Buy" or "Rate" buttons). But really, you could display anything on the overlay. 

The cover component provides: 

- smart image features like stretch-to-fit functionality with automatic resizing and aspect ratio detection.
- overlay helpers for positioning other elements within the overlay.
- overlay text size & color helpers.
- overlay background color helpers.

### Requirements

Depends on [load_image](https://github.com/mixonic/load_image), a small JavaScript library providing a realiable callback after an image is loaded.

You can check if it's already installed by simply looking for the directory `bower_components/load_image`.
	
Install with bower:
	
	bower install mixonic/load_image --save
	
Add the library to your theme via the [build process](/workflow/gulp/index.html):
	
1. Edit `.build/copy-vendor/copy.core.json` to include the library:

		{
			"task": "copy-vendor-core-scripts",
			"cwd": "bower_components",
			"src": [
				"...",
				"load_image/load_image.js"
			],
			"dest": "js/vendor/core",
			"flatten": true
		}
		
2. Enable the library in `src/swig.json`:

		{
			"js_vendor": [
				"vendor/core/load_image"
			]
		}
		
3. Optionally, you can add the library to the `js/vendor/all.js` and `js/vendor/core/all.js` bundles, if you're using them.

	Within `.build/concat-vendor/concat.core.json`, add the library to the `js/vendor/core/all.js` bundle `files` array:

		{
			"build": "js/vendor/core/all.js",
			"files": [
				"...",
				"load_image.js"
			]
		}

	Note that if you're adding the library to the `js/vendor/core/all.js` bundle, you don't have to do anything else for the library to be included in `js/vendor/all.js` bundle, because the `js/vendor/all.js` bundle is already configured to include the `js/vendor/core/all.js` bundle.
	
	Within `.build/concat.json`, add the library to the `js/vendor/all.js` bundle `files` array:

		{
			"build": "js/vendor/all.js",
			"files": [
				"...",
				"core/load_image.js"
			]
		}
		
4. Run the [build task](/workflow/gulp/index.html#build)
5. You're done! 

	The library should be available in your [theme's build path](/workflow/gulp/index.html#build-paths):
	
	- `$BUILD_PATH/$THEME_NAME/js/vendor/core/load_image.js`
	- `$BUILD_PATH/$THEME_NAME/js/vendor/core/all.js` should also include the new library.
	- `$BUILD_PATH/$THEME_NAME/js/vendor/all.js` should also include the new library.

### Basic usage

	<div class="cover overlay">
		<img src="path/to/image.jpg" alt="image" />
		<div class="overlay">
			<h3 class="text-overlay">Overlay</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</div>
	</div>

### Options

@TODO

---

## Forms

@TODO

---

## Buttons

In addition to standard Bootstrap button classes, we provide a couple of extra options.

#### Regular buttons

	<button class="btn btn-white">White</button>
	<button class="btn btn-default">Default</button>
	<button class="btn btn-primary">Primary</button>
	<button class="btn btn-success">Success</button>
	<button class="btn btn-warning">Warning</button>
	<button class="btn btn-inverse">Inverse</button>
	<button class="btn btn-danger">Danger</button>
	
#### Button sizes

Various buttons sizes for common scenarios, from large buttons, to medium sized, small and very small buttons.

	<button class="btn btn-default btn-lg">Large</button>
	<button class="btn btn-primary">Regular</button>
	<button class="btn btn-success btn-sm">Small</button>
	<button class="btn btn-info btn-xs">Very Small</button>
	
#### Buttons with icons

	<!-- Text and icon -->
	<button class="btn btn-white"><i class="fa fa-home"></i> Home</button>
	<button class="btn btn-primary"><i class="icon-user-1"></i> Profile</button>
	<button class="btn btn-success"><i class="fa fa-check-circle"></i> Confirm</button>
	<button class="btn btn-danger"><i class="fa fa-times"></i> Delete</button>
	
	<!-- Only icon -->
	<button class="btn btn-default btn-lg"><i class="fa fa-picture-o"></i></button>
	<button class="btn btn-inverse"><i class="fa fa-envelope"></i></button>
	<button class="btn btn-primary"><i class="fa fa-pencil"></i></button>
	<button class="btn btn-warning btn-sm"><i class="fa fa-download"></i></button>
	<button class="btn btn-info btn-xs"><i class="fa fa-cloud-upload"></i></button>
	
	<!-- Only icon with circular shape -->
	<button class="btn btn-default btn-circle"><i class="fa fa-user"></i></button>
	<button class="btn btn-inverse btn-circle"><i class="fa fa-home"></i></button>
	<button class="btn btn-primary btn-circle"><i class="fa fa-building"></i></button>
	<button class="btn btn-warning btn-circle"><i class="fa fa-sign-out"></i></button>
	<button class="btn btn-info btn-circle"><i class="fa fa-medkit"></i></button>
	
#### Stroke buttons

Inverse button colors for text, background and border attributes and get a stroked button.

	<!-- Stroke regular buttons -->
	<button class="btn btn-default btn-stroke">Default</button>
	<button class="btn btn-primary btn-stroke">Primary</button>
	<button class="btn btn-success btn-stroke">Success</button>
	<button class="btn btn-warning btn-stroke">Warning</button>
	<button class="btn btn-inverse btn-stroke">Inverse</button>
	<button class="btn btn-danger btn-stroke">Danger</button>
                        
	<!-- Stroke buttons with icons only -->
	<button class="btn btn-default btn-stroke"><i class="fa fa-picture-o"></i></button>
	<button class="btn btn-inverse btn-stroke"><i class="fa fa-envelope"></i></button>
	<button class="btn btn-primary btn-stroke"><i class="fa fa-pencil"></i></button>
	<button class="btn btn-warning btn-stroke"><i class="fa fa-download"></i></button>
	<button class="btn btn-info btn-stroke"><i class="fa fa-cloud-upload"></i></button>
                        
	<!-- Stroke buttons with icons and circular shape -->
	<button class="btn btn-default btn-stroke btn-circle"><i class="fa fa-user"></i></button>
	<button class="btn btn-inverse btn-stroke btn-circle"><i class="fa fa-home"></i></button>
	<button class="btn btn-primary btn-stroke btn-circle"><i class="fa fa-building"></i></button>
	<button class="btn btn-warning btn-stroke btn-circle"><i class="fa fa-sign-out"></i></button>
	<button class="btn btn-info btn-stroke btn-circle"><i class="fa fa-medkit"></i></button>
	
#### Stacked buttons

Stacked Buttons with two lines of text and icon. All regular button styles can be used with stacked buttons.

	<button class="btn btn-primary btn-icon-stacked">
		<i class="fa fa-2x fa-twitter"></i> 
		<span>Join using your<br>Twitter Account</span>
	</button>
	
	<button class="btn btn-inverse btn-icon-stacked">
		<i class="fa fa-2x fa-google-plus"></i> 
		<span>Join using your<br>Google Account</span>
	</button>
	
	<button class="btn btn-info btn-icon-stacked">
		<i class="fa fa-2x fa-dribbble"></i> 
		<span>Join using your<br>Dribble Account</span>
	</button>
	
#### Buttons with dropdowns

Use any button to trigger a dropdown menu by placing it within a `.btn-group` and providing the proper menu markup.

	<div class="btn-group">
		<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
			Dropdown Default
			<span class="caret"></span>
		</button>
		<ul class="dropdown-menu">
			<li><a href="#">Action</a></li>
			<li><a href="#">Another action</a></li>
			<li><a href="#">Something else here</a></li>
			<li class="divider"></li>
			<li><a href="#">Separated link</a></li>
		</ul>
	</div>

	<div class="btn-group">
		<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
			Dropdown Primary
			<span class="caret"></span>
		</button>
		<ul class="dropdown-menu pull-right">
			<li><a href="#">Action</a></li>
			<li><a href="#">Another action</a></li>
			<li><a href="#">Something else here</a></li>
			<li class="divider"></li>
			<li><a href="#">Separated link</a></li>
		</ul>
	</div>

---

## Ribbons

The ribbon UI component is a great way to present additional information or even highlight important content.

### Bookmark ribbons

#### Floating fluid boomark ribbons that span across multiple lines of text

Note the extra `ribbon-wrapper` class on the otherwise standard Bootstrap panel:

```html
<div class="panel panel-default ribbon-wrapper">
	<div class="panel-body">
	
		<!-- The ribbon -->
		<div class="pull-right ribbon-mark ribbon-primary">
			<span class="text">Fluid mark that spans<br/>across multiple lines</span>
		</div>
		<!-- // END .ribbon-mark -->
		
		<h3 class="margin-v-10-15">Floating Bookmark ribbon</h3>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut consectetur consequatur cum cupiditate debitis doloribus, error ex explicabo harum illum minima mollitia nisi nostrum officiis omnis optio qui quisquam saepe sit sunt totam vel velit voluptatibus? Adipisci ducimus expedita id nostrum quas quia!</p>
	</div>
</div>
```

#### Absolute positioned bookmark ribbons

```html
<div class="panel panel-default ribbon-wrapper">

	<!-- Left ribbon -->
	<div class="ribbon-mark ribbon-default absolute left">
		<span class="ribbon">
			<span class="text">Left</span>
		</span>
	</div>
	
	<!-- Right ribbon -->
	<div class="ribbon-mark ribbon-primary absolute right">
		<span class="ribbon">
			<span class="text">Mark</span>
		</span>
	</div>

	<!-- Arbitrary content -->
	<div class="panel-body">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut consectetur consequatur cum cupiditate debitis doloribus, error ex explicabo harum illum minima mollitia nisi nostrum officiis omnis optio qui quisquam saepe sit sunt totam vel velit voluptatibus? Adipisci ducimus expedita id nostrum quas quia!</p>
	</div>
</div>
```

### Heading ribbons

#### Left to right, full ribbon block lines

Bottom corners, left to right:

```html
<h1 class="ribbon-heading ribbon-primary bottom-left-right">Important headings</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut consectetur consequatur cum cupiditate debitis doloribus, error ex explicabo harum illum minima mollitia nisi nostrum officiis omnis optio qui quisquam saepe sit sunt totam vel velit voluptatibus? Adipisci ducimus expedita id nostrum quas quia!</p>
```

Top corners, left to right, appropriate when placing the next heading after a large text area:

```html
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut consectetur consequatur cum cupiditate debitis doloribus, error ex explicabo harum illum minima mollitia nisi nostrum officiis omnis optio qui quisquam saepe sit sunt totam vel velit voluptatibus? Adipisci ducimus expedita id nostrum quas quia!</p>

<h1 class="ribbon-heading ribbon-default top-left-right">Various styles included</h1>
```

#### Inline ribbon

Top corner, on left:

```html
<div class="pull-left">
	<h2 class="ribbon-heading ribbon-primary top-left inline">Top left inline ribbon</h2>
</div>
<div class="clearfix"></div>

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis dignissimos maiores nisi optio quas, quod? Animi fuga inventore laborum nemo quaerat quis quod? Alias, architecto consequuntur corporis deleniti dolor facilis id minima necessitatibus nihil perspiciatis quo repellendus saepe, sunt suscipit velit. Deleniti dolorum id maxime omnis perspiciatis sed, veniam?</p>
```

Bottom corner, on right:

```html
<div class="pull-right">
	<h3 class="ribbon-heading ribbon-primary bottom-right inline">
		Bottom right inline ribbon
	</h3>
</div>
<div class="clearfix"></div>

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis dignissimos maiores nisi optio quas, quod? Animi fuga inventore laborum nemo quaerat quis quod? Alias, architecto consequuntur corporis deleniti dolor facilis id minima necessitatibus nihil perspiciatis quo repellendus saepe, sunt suscipit velit. Deleniti dolorum id maxime omnis perspiciatis sed, veniam?</p>
```

### Corner ribbons

Similar to the "Fork me on Github" button we see all the time:

```html
<!-- Notice the extra .ribbon-corner-wrapper class -->
<div class="panel panel-default ribbon-wrapper ribbon-corner-wrapper">

	<!-- The ribbon -->
	<div class="ribbon-corner left">
		<a href="#">Fork me on GitHub</a>
	</div>
	<!-- // END .ribbon-corner -->
	
	<!-- Arbitrary content -->
	<div class="panel-body">
		<div class="row">
			<h3 class="margin-v-10-15 text-center">Absolute Corner ribbon</h3>
			<div class="col-xs-10 col-xs-offset-2 col-sm-11 col-sm-offset-1 text-right">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut consectetur consequatur cum cupiditate debitis doloribus, error ex explicabo harum illum minima mollitia nisi nostrum officiis omnis optio qui quisquam saepe sit sunt totam vel velit voluptatibus? Adipisci ducimus expedita id nostrum quas quia!</p>
			</div>
		</div>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut consectetur consequatur cum cupiditate debitis doloribus, error ex explicabo harum illum minima mollitia nisi nostrum officiis omnis optio qui quisquam saepe sit sunt totam vel velit voluptatibus? Adipisci ducimus expedita id nostrum quas quia!</p>
	</div>
	<!-- // END content -->
	
</div>
```

Additionally, you can use `right` instead of `left` on the ribbon:

	<!-- The ribbon -->
	<div class="ribbon-corner right">
		<a href="#">Fork me on GitHub</a>
	</div>
	<!-- // END .ribbon-corner -->

---

## Typography

For the basic typographic styles, we have followed the [Material Design](http://www.google.com/design/spec/style/typography.html#typography-styles) guidelines to work across the wider set of supported platforms and to balance content density and reading comfort under typical usage conditions.

### Default size unit

For the `html` we've set a default sizing unit of `13px`, both text size and line height.

From here, we're only using scalable `rem` sizing units relative to the base. Keep in mind the base unit of 1rem = 13px.

The `body` has:

	line-height: 1.53rem;
	font-size: 1rem;

### Usage

#### Display 4

Light text weight of 300, scalable text size and line height of 8.6rem.

	<div class="text-display-4">Display 4</div>
	
#### Display 3

Regular text weight of 400, scalable text size and line height of 4.3rem.

	<div class="text-display-3">Display 3</div>

#### Display 2

Regular text weight of 400, scalable text size of 3.46rem and line height of 3.69rem.

	<div class="text-display-2">Display 2</div>

#### Display 1

Regular text weight of 400, scalable text size of 2.61rem and line height of 3.07rem.

	<div class="text-display-1">Display 1</div>

#### Headline

Regular text weight of 400, scalable text size of 1.84rem and line height of 2.46rem.

	<div class="text-headline">Headline</div>

#### Title

Medium text weight of 500, scalable text size of 1.53rem.

	<div class="text-title">Title</div>

#### Subhead

Regular text weight of 400, scalable text size of 1.15rem and line height of 1.84rem.
	
	<div class="text-subhead">Subhead</div>

#### Subhead 2

Medium text weight of 500, scalable text size of 1.15rem and line height of 2.15rem.

	<div class="text-subhead-2">Subhead 2</div>

#### Caption

Regular text weight of 400, scalable text size of 0.92rem.

	<div class="text-caption">Caption</div>

#### Body 1

Regular text weight of 400, scalable text size of 1rem ***(default)***.

	<p>Regular text body.</p>

#### Body 2

Medium text weight of 500, scalable text size of 1rem and line height of 1.84rem.

	<p class="text-body-2">Medium text body.</p>
	
---

## CSS Helpers

### Positioning helpers

#### relative

The `relative` class adds `position: relative;` to any element.

#### overflow-hidden

The `overflow-hidden` class adds `overflow: hidden;` to any element.

#### absolute

The `absolute` class adds `position: absolute;` to any element. Use in combination with `top`, `bottom`, `left`, `right` classes to set the corresponding CSS properties to `$property: 0;`.

### Text helpers

#### text-underline

The `text-underline` class adds `text-decoration: underline;` to any element.

#### strong

The `strong` class adds `font-weight: bold;` to any element.

#### text-left

The `text-left` class adds `text-align: left !important;` to any element.

### Background helpers

#### bg-transparent

The `bg-transparent` class adds `background: transparent !important;` to any element.

### Display helpers

#### display-none

The `display-none` class adds `display: none;` to any element.

#### inline-block, display-inline-block

The `display-inline-block` and `inline-block` classes adds `display: inline-block;` to any element.

#### block

The `block` class adds `display: block;` to any element.

### Spacing helpers

#### padding-none

The `padding-none` class adds `padding: 0 !important;` to any element.

#### padding-top-none

The `padding-top-none` class adds `padding-top: 0 !important;` to any element.

#### padding-bottom-none

The `padding-bottom-none` class adds `padding-bottom: 0 !important;` to any element.

#### margin-none

The `margin-none` class adds `margin: 0 !important;` to any element.

#### margin-bottom-none

The `margin-bottom-none` class adds `margin-bottom: 0 !important;` to any element.

### Alignment helpers

#### h-center

The `h-center` class adds `margin-left: auto !important;` and `margin-right: auto !important;` to any element.

### Table helpers

#### display-table

The `display-table` class adds `display: table;` to any element.

#### v-middle

The `v-middle` class adds `vertical-align: middle !important;` to any element.

#### v-top

The `v-top` class adds `vertical-align: top !important;` to any element.

#### v-cell

The `v-cell` class adds `display: table-cell;` and `vertical-align: middle;` to any element.

#### table-row

The `table-row` class adds `display: table-row;` to any element.

#### table-cell

The `table-cell` class adds `display: table-cell;` to any element.

### Sizing helpers

#### height-100pc

The `height-100pc` class adds `height: 100%;` to any element.

@TODO