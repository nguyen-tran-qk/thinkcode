# Navbar

The navbar package provides a large range of elements compatible with the Bootstrap Navbar component, starting from simple menus and dropdowns, to form elements, toggle buttons and other custom widget areas such as notifications, messages, files and more.

---

## Requirements

### JavaScript

To load the navbar package, from `src/js/themes/$THEME_NAME/app.js`:

	// Navbar package
	require('navbar/js/main');

This will load `lib/navbar/js/main.js` into our main application script bundle.

### Less

From `src/less/themes/$THEME_NAME/app.less`:

	// Navbar package
	@import "navbar/less/navbar";

Which will load `lib/navbar/less/navbar.less` into our main application style bundle.

---

#### RTL Support

Add to `src/less/themes/$THEME_NAME/app.less`, after the main component:

	// Navbar RTL
	@import "navbar/less/navbar-rtl";

---

#### Alternative

If working with Less and Browserify bundles is not your favorite thing, you can alternatively load the pre-built static assets we have included:

	<!-- In the head of the HTML document -->
	<link rel="stylesheet" href="css/app/navbar.css" />

	<!-- At the bottom of the HTML document -->
	<script src="js/app/navbar.js"></script>

---

## Basic usage

We'll be using standard navbars included with Bootstrap, with some additional options. For the basic usage, see the official [Bootstrap documentation](http://getbootstrap.com/components/#navbar). Additionally, see the official [Bootstrap navbar examples](http://getbootstrap.com/getting-started/#examples-navbars).

Here's a basic example of the main navbar structure. You can use it along with most of the following navbar examples.

```html
<nav class="navbar navbar-default">
	<div class="container-fluid">
	
		<!-- Group brand and toggle for better mobile display -->
		<div class="navbar-header">
			<a class="navbar-brand" href="#">Brand</a>
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-example-default">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
		
		<!-- Group nav links, menus, forms, and other content for toggling -->
		<div class="navbar-collapse collapse" id="collapse-example-default">
			<!-- ... -->
		</div>
		
	</div>
</nav>
```

---

## Navbar skins

### Default skin

To enable the default light skin, add the `navbar-default` class to any `navbar` element.

	<div class="navbar navbar-default"></div>
	
### Primary skin

To use the primary skin, simply apply the `navbar-primary` class on the main `navbar` container. 

	<div class="navbar navbar-primary"></div>
	
### Inverse skin

To use the darker inverse skin, simply apply the `navbar-inverse` class on the main `navbar` container. 

	<div class="navbar navbar-inverse"></div>

---

## Navbar size

The default navbar is `50px` tall.

### Small

To use the small navbar, `42px` tall, simply apply the `navbar-size-small` class on the main navbar container.

	<div class="navbar navbar-default navbar-size-small"></div>
	
### Large

To use the large navbar, `64px` tall, simply apply the `navbar-size-large` class on the main navbar container. Note that the large navbar applies only for medium to large screens and takes the default size for small and mobile screens.

	<div class="navbar navbar-default navbar-size-large"></div>
	
### Extra large

To use the extra large navbar, `80px` tall, simply apply the `navbar-size-xlarge` class on the main navbar container. Note that the extra large navbar, just like the large navbar, applies only for medium to large screens and takes the default size for small and mobile screens.

	<div class="navbar navbar-default navbar-size-xlarge"></div>

---

## Navbar elements

### Simple dropdown

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">
				
	<!-- simple dropdown -->
	<li class="dropdown">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			Dropdown <span class="caret"></span>
		</a>
		<ul class="dropdown-menu" role="menu">
			<li class="dropdown-header">Heading</li>
			<li><a href="#">Essentials</a></li>
			<li class="active"><a href="#">Active Link</a></li>
			<li><a href="#">Timeline</a></li>
			<li><a href="#">Charts</a></li>
			<li><a href="#">Layouts</a></li>
			<li class="dropdown-header">Heading</li>
			<li><a href="#">Sidebars</a></li>
			<li><a href="#">Maps</a></li>
			<li><a href="#">Media</a></li>
		</ul>
	</li>
	<!-- // END simple dropdown -->
				                        
</ul>
```

### Hover dropdown

You can trigger the display of dropdown menus on mouse over events instead of the default click, by adding the `navbar-dropdown-hover` class on the `navbar` element.

	<div class="navbar navbar-default navbar-dropdown-hover"></div>

### Login dropdown form

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">
				
	<!-- Login -->
	<li class="dropdown">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			<i class="fa fa-fw fa-lock"></i> Login
		</a>
		<div class="dropdown-menu dropdown-size-280">
			<form>
				<div class="form-group">
					<div class="input-group">
						<span class="input-group-addon"><i class="fa fa-user"></i></span>
						<input type="text" class="form-control" placeholder="Username">
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<span class="input-group-addon"><i class="fa fa-shield"></i></span>
						<input type="password" class="form-control" placeholder="Password">
					</div>
				</div>
				<div class="text-center">
					<button type="submit" class="btn btn-primary">
						Login <i class="fa fa-sign-in"></i>
					</button>
				</div>
			</form>
		</div>
	</li>
	<!-- // END login -->
				                        
</ul>
```

### Sign up dropdown form

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- Sign up -->
	<li class="dropdown">
	    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
	        <i class="fa fa-fw fa-plus"></i> Sign Up
	    </a>
	    <div class="dropdown-menu dropdown-size-280">
	        <form>
	            <div class="row">
	                <div class="col-md-6">
	                    <div class="form-group form-control-default">
	                        <label for="exampleInputFirstName">First name</label>
	                        <input type="text" class="form-control" id="exampleInputFirstName" placeholder="Your first name">
	                    </div>
	                </div>
	                <div class="col-md-6">
	                    <div class="form-group form-control-default">
	                        <label for="exampleInputLastName">Last name</label>
	                        <input type="text" class="form-control" id="exampleInputLastName" placeholder="Your last name">
	                    </div>
	                </div>
	            </div>
	            <div class="form-group form-control-default required">
	                <label for="exampleInputEmail1">Email address</label>
	                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
	            </div>
	            <div class="form-group form-control-default required">
	                <label for="exampleInputPassword1">Password</label>
	                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
	            </div>
	            <button type="submit" class="btn btn-primary">Submit</button>
	        </form>
	    </div>
	</li>
	<!-- // END sign up -->

</ul>
```

### Datepicker

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">
				
	<!-- datepicker -->
	<li class="dropdown notifications">
	    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
	        <i class="fa fa-calendar-o"></i>
	        <span class="badge small floating">4</span>
	    </a>

	    <div class="dropdown-menu" style="width: auto !important">
	        <div class="datepicker"></div>
	    </div>
	</li>
	<!-- // END datepicker -->
					                        
</ul>
```

### Notifications

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- notifications -->
	<li class="dropdown notifications updates">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			<i class="fa fa-bell-o"></i>
			<span class="badge badge-primary">4</span>
		</a>
		<ul class="dropdown-menu" role="notification">
			<li class="dropdown-header">Notifications</li>
			<li class="media">
				<div class="pull-right">
					<span class="label label-success">New</span>
				</div>
				<div class="media-left">
					<img src="images/people/50/guy-2.jpg" alt="people" class="img-circle" width="30">
				</div>
				<div class="media-body">
					<a href="#">Adrian D.</a> posted <a href="#">a photo</a> 
					on his timeline. <br/>
					<span class="text-caption text-muted">5 mins ago</span>
				</div>
			</li>
			<li class="media">
				<div class="pull-right">
					<span class="label label-success">New</span>
				</div>
				<div class="media-left">
					<img src="images/people/50/guy-6.jpg" alt="people" class="img-circle" width="30">
				</div>
				<div class="media-body">
					<a href="#">Bill</a> posted <a href="#">a comment</a> 
					on Adrian's recent <a href="#">post</a>. <br/>
					<span class="text-caption text-muted">3 hrs ago</span>
				</div>
			</li>
			<li class="media">
				<div class="media-left">
					<span class="icon-block s30 bg-grey-200">
						<i class="fa fa-plus"></i>
					</span>
				</div>
				<div class="media-body">
					<a href="#">Mary D.</a> and <a href="#">Michelle</a> are now friends.
					<p><span class="text-caption text-muted">1 day ago</span></p>
					<a href=""><img class="width-30 img-circle" src="images/people/50/woman-6.jpg" alt="people"></a>
					<a href=""><img class="width-30 img-circle" src="images/people/50/woman-3.jpg" alt="people"></a>
				</div>
			</li>
		</ul>
	</li>
	<!-- // END notifications -->
				                        
</ul>
```

### Messages

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- messages -->
	<li class="dropdown notifications">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			<i class="fa fa-envelope-o"></i>
			<span class="badge floating badge-danger">12</span>
		</a>
		<ul class="dropdown-menu">
			<li class="media">
				<div class="media-left">
					<a href="#">
						<img class="media-object thumb" src="images/people/50/guy-2.jpg" alt="people">
					</a>
				</div>
				<div class="media-body">
					<div class="pull-right">
						<span class="label label-default">5 min</span>
					</div>
					<h5 class="media-heading">Adrian D.</h5>
					<p class="margin-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</div>
			</li>
			<li class="media">
				<div class="media-left">
					<a href="#">
						<img class="media-object thumb" src="images/people/50/woman-7.jpg" alt="people">
					</a>
				</div>
				<div class="media-body">
					<div class="pull-right">
						<span class="label label-default">2 days</span>
					</div>
					<h5 class="media-heading">Jane B.</h5>
					<p class="margin-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</div>
			</li>
			<li class="media">
				<div class="media-left">
					<a href="#">
						<img class="media-object thumb" src="images/people/50/guy-8.jpg" alt="people">
					</a>
				</div>
				<div class="media-body">
					<div class="pull-right">
						<span class="label label-default">3 days</span>
					</div>
					<h5 class="media-heading">Andrew M.</h5>
					<p class="margin-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</div>
			</li>
		</ul>
	</li>
	<!-- // END messages -->

</ul>
```

### Files

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- files -->
	<li class="dropdown notifications files">
		<a href="#" class="dropdown-toggle btn" data-toggle="dropdown">
			<i class="fa fa-folder-open"></i>
			<span class="badge floating badge-primary">4</span>
		</a>
		<ul class="dropdown-menu">
			<li class="media">
				<div class="pull-left">
					<img src="images/food1.jpg" alt="food" class="img-rounded"/>
				</div>
				<div class="media-body">
					<h5 class="title margin-none"><a href="#">Screen Shot 2014-11-..</a></h5>
					<small class="text-muted">2 hrs ago</small>
				</div>
			</li>
			<li class="media">
				<div class="pull-left">
					<img src="images/place1.jpg" alt="food" class="img-rounded"/>
				</div>
				<div class="media-body">
					<h5 class="title margin-none"><a href="#">Screen Shot 2014-11-..</a></h5>
					<small class="text-muted">3 days ago</small>
				</div>
			</li>
			<li class="media">
				<div class="pull-left">
					<img src="images/place2.jpg" alt="food" class="img-rounded"/>
				</div>
				<div class="media-body">
					<h5 class="title margin-none"><a href="#">Screen Shot 2014-11-..</a></h5>
					<small class="text-muted">8 days ago</small>
				</div>
			</li>
		</ul>
	</li>
	<!-- // END files -->

</ul>
```

### User

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- user -->
	<li class="dropdown user">
    	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			<img src="images/people/110/guy-6.jpg" alt="people" class="img-circle"/> 
			Bill <span class="caret"></span>
		</a>
		<ul class="dropdown-menu" role="menu">
			<li><a href="#"><i class="fa fa-user"></i>Profile</a></li>
			<li><a href="#"><i class="fa fa-wrench"></i>Settings</a></li>
			<li><a href="#"><i class="fa fa-sign-out"></i>Logout</a></li>
		</ul>
	</li>
	<!-- // END user -->

</ul>
```

### Country flags

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- country flags -->
	<li class="dropdown flags">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			<img src="images/flags/Flag_of_the_United_States.svg" alt="United States" />
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu min-width-none" role="menu">
			<li class="active text-center">
				<a href="#">
					<img src="images/flags/Flag_of_the_United_States.svg" alt="USA" />
				</a>
			</li>
			<li class="text-center">
				<a href="#">
					<img src="images/flags/Flag_of_France.svg" alt="France" />
				</a>
			</li>
			<li class="text-center">
				<a href="#">
					<img src="images/flags/Flag_of_Germany.svg" alt="Germany" />
				</a>
			</li>
			<li class="text-center">
				<a href="#">
					<img src="images/flags/Flag_of_Romania.svg" alt="Romania" />
				</a>
			</li>
			<li class="text-center">
				<a href="#">
					<img src="images/flags/Flag_of_Poland.svg" alt="Poland"/>
				</a>
			</li>
		</ul>
	</li>
	<!-- // END country flags -->

</ul>
```

### Toggle buttons

```html
<div class="navbar-header">

	<!-- The left toggle button -->
	<a class="toggle active pull-left" href="#"><i class="fa fa-bars"></i></a>

	<!-- Brand -->
	<a class="navbar-brand" href="#">Brand</a>

	<!-- The toggle buttons must also have the .visible-xs class applied -->
	<!-- So they're visible only on mobile; For demo purposes we left this class unapplied -->
	<!-- Also the button with .pull-right will move the button to the right on mobile -->
	<a class="toggle pull-right" href="#"><i class="fa fa-bars"></i></a>

</div>
```

### Simple menu

Within `navbar-collapse`:

```html
<ul class="nav navbar-nav">

	<!-- simple menus -->
	<li><a href="#"><i class="fa fa-home fa-fw"></i></a></li>
	<li><a href="#">Link</a></li>
	<li><a href="#"><i class="fa fa-graduation-cap fa-fw"></i> Icon</a></li>
	<!-- // END simple menus -->

</ul>
```

### Regular buttons

Within `navbar-collapse`:

```html
<!-- buttons -->
<a href="#" class="btn navbar-btn btn-default">Default</a>
<a href="#" class="btn navbar-btn btn-primary"><i class="fa fa-home"></i> Primary</a>
<!-- // END buttons -->
```

### Text brand

```html
<div class="navbar-header">
	<a class="navbar-brand" href="#">Brand</a>
	<a class="navbar-brand navbar-brand-primary" href="#">Primary</a>
</div>
```

### Brand with image

```html
<div class="navbar-header">
	<div class="navbar-brand navbar-brand-logo">
		<a href="#"><img src="images/logo-grey.png" alt="logo"/> Text</a>
	</div>
	<div class="navbar-brand navbar-brand-logo navbar-brand-primary">
		<a href="#"><img src="images/logo-white.png" alt="logo"/> Text</a>
	</div>
</div>
```

### Search

Within `navbar-collapse`:

```html
<!-- Search #1 -->
<form class="navbar-form margin-none navbar-left">
	<div class="search-1">
		<div class="input-group">
			<span class="input-group-addon"><i class="icon-search"></i></span>
			<input type="text" class="form-control form-control-w-150" placeholder="Search">
		</div>
	</div>
</form>
<!-- // END search #1 -->

<!-- Search #2 -->
<form class="navbar-form navbar-left">
	<div class="search-2">
		<div class="input-group">
			<input type="text" class="form-control form-control-w-150" placeholder="Search">
			<span class="input-group-btn">
				<button class="btn btn-inverse" type="button">
					<i class="fa fa-search"></i>
				</button>
			</span>
		</div>
	</div>
</form>
<!-- // END search #2 -->
```

### Radio buttons

Within `navbar-collapse`:

```html
<!-- Radio buttons -->
<form class="navbar-form navbar-left">
	<div class="btn-group" data-toggle="buttons">
		<label class="btn btn-default active">
			<input type="radio" name="options" id="option1" autocomplete="off" checked> 
			<i class="fa fa-home"></i>
		</label>
		<label class="btn btn-default">
			<input type="radio" name="options" id="option2" autocomplete="off"> 
			<i class="fa fa-envelope"></i>
		</label>
		<label class="btn btn-default">
			<input type="radio" name="options" id="option3" autocomplete="off"> 
			<i class="fa fa-user"></i>
		</label>
	</div>
</form>
<!-- // END radio buttons -->
```

### Checkboxes

Within `navbar-collapse`:

```html
<!-- checkbox -->
<form class="navbar-form navbar-left">
	<div class="checkbox">
		<input type="checkbox" checked id="checkbox-1">
		<label for="checkbox-1">Check me</label>
	</div>
</form>
<!-- // END checkbox -->
```

### Checkbox switch button

Within `navbar-collapse`:

```html
<!-- Checkbox Switch button -->
<form class="navbar-form navbar-left">
	<div class="form-group">
		<input type="checkbox" data-toggle="switch-checkbox" id="switch-1" name="switch-1" checked>
	</div>
</form>
<!-- // END Checkbox Switch button -->
```

### Slider

Within `navbar-collapse`:

```html
<!-- slider -->
<div class="navbar-left">
	<input type="text" 
		data-slider="formatter" 
		data-slider-min="0" 
		data-slider-max="20" 
		data-slider-step="1" 
		data-slider-value="14" 
		data-slider-handle="square" />
</div>
<!-- // END slider -->
```

---

## Navbar positioning

The examples so far were strictly focused on the navbar element itself, skins, sizes and various elements, but navbars also have a few options for positioning.

### Fixed to top

By default, a navbar element doesn't assume it's placed on the foremost top corner of the page, and because of that it has a few CSS attributes such as top and side borders and rounded corners that are more appropriate when you place something else above the navbar or you have spacing all around it.

Create a full-width navbar without the top and side borders and without rounded corners, that stays visible and fixed in the same position - at the foremost top corner of the screen - when scrolling the page, by adding the `navbar-fixed-top` class on the `navbar` element and include a `container` or `container-fluid` to center and pad navbar content:

	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			...
		</div>
	</nav>
	
#### Layout spacing required

When using `navbar-fixed-top` on the `navbar` element, you must also add one of the following classes to the `html` tag to enable the required layout spacings:

- `ls-top-navbar` when using the default navbar size
- `ls-top-navbar-small` when using `navbar-size-small`
- `ls-top-navbar-large` when using `navbar-size-large`
- `ls-top-navbar-xlarge` when using `navbar-size-xlarge`
	
### Static top

Create a full-width navbar without the top and side borders and without rounded corners, that scrolls away with the page, by adding the `navbar-static-top` class on the `navbar` element and include a `container` or `container-fluid` to center and pad navbar content:

	<nav class="navbar navbar-default navbar-static-top">
		<div class="container">
			...
		</div>
	</nav>
	
---

## Navbar page layout

With the following examples we'll showcase navbars in the context of a page layout. Also, we'll be using [Swig templates](/code/swig/index.html). Note that some of the Swig templates used to construct page layouts in the following examples are explained in the [layout component](/reference/layout/index.html).

**Example**:

In this example, we'll create a layout and navbar and use them in the context of a page in the application.

Consider a page layout in `src/html/themes/$THEME_NAME/_simple_layout.html`:

	<!-- Start the HTML document -->
	{% include "lib/layout/html/_header.html" { htmlClass: 'ls-top-navbar' } %}
	
	<!-- Include a simple navbar -->
	{% include "src/html/themes/$THEME_NAME/_simple_navbar.html" %}

	<!-- The page content -->
	<div class="container">
	        
		<!-- Define the content block -->
		<!-- This will be used by pages that extend this layout to inject their content -->
		{% block content %}{% endblock %}

	</div>
	
	<!-- Complete the HTML document -->
	{% include "lib/layout/html/_footer_scripts.html" %}
	
A simple navbar in `src/html/themes/$THEME_NAME/_simple_navbar.html`:

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
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							Dropdown <span class="caret"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li class="dropdown-header">Heading</li>
							<li><a href="#">Essentials</a></li>
							<li class="active"><a href="#">Active Link</a></li>
							<li><a href="#">Timeline</a></li>
							<li><a href="#">Charts</a></li>
							<li><a href="#">Layouts</a></li>
							<li class="dropdown-header">Heading</li>
							<li><a href="#">Sidebars</a></li>
							<li><a href="#">Maps</a></li>
							<li><a href="#">Media</a></li>
						</ul>
					</li>
					<!-- // END simple dropdown -->
								                        
				</ul>
			</div>
			
		</div>
	</nav>
	
And a simple page in `src/html/themes/$THEME_NAME/simple-page.html`:

	{% extends "src/html/themes/$THEME_NAME/_simple_layout.html" %}
	
	{% block content %}
		<p>This is a simple page.</p>
	{% endblock %}
	
Now, you can follow through the [build process](/workflow/gulp/index.html) and see the compiled HTML result for our `simple-page.html`.