# Material

The Material package provides a collection of elements and functionality inspired from Google's [Material Design](http://www.google.com/design/spec/material-design/introduction.html):

- Dropdown menus
- Form controls
- Ink ripple effect
- Button styles
- Paper shadow

---

## Requirements

### JavaScript

To load the entire Material package, from `src/js/themes/$THEME_NAME/app.js`:

	// Material package
	require('material/js/main');

This will load `lib/material/js/main.js` into our main application script bundle.

### Less

From `src/less/themes/$THEME_NAME/app.less`:

	// Material package
	@import "material/less/main";

Which will load `lib/material/less/main.less` into our main application style bundle.

---

#### Alternative

If working with Less and Browserify bundles is not your favorite thing, you can alternatively load the pre-built static assets we have included:

	<!-- In the head of the HTML document -->
	<link rel="stylesheet" href="css/app/material.css" />

	<!-- At the bottom of the HTML document -->
	<script src="js/app/material.js"></script>

---

## Form controls

### Input

1. Use a standard Bootstrap `form-control` input.
2. Wrap the `form-control` with a `form-control-material` container.
3. Add a label `after` the input (**required**).

```html
<div class="form-group form-control-material">
	<input type="text" class="form-control" id="firstName" placeholder="Your first name" />
	<label for="firstName">First name</label>
</div>
```

### Textarea

1. Use a standard Bootstrap `form-control` textarea.
2. Wrap the `form-control` with a `form-control-material` container.
3. Add a label `after` the textarea (**required**).

```html
<div class="form-group form-control-material">
	<textarea id="textarea" class="form-control"></textarea>
	<label for="textarea">Textarea</label>
</div>
```

### Add-Ons

```html
<div class="form-control-material">
	<div class="input-group">
		<span class="input-group-addon"><i class="fa fa-user"></i></span>
		<input id="addon" type="text" class="form-control" placeholder="Username" />
		<label for="addon">Username</label>
	</div>
</div>
```

```html
<div class="form-control-material">
	<div class="input-group">
		<span class="input-group-addon"><i class="fa fa-envelope"></i></span>
		<input type="email" class="form-control" id="email" placeholder="Email" />
		<label for="email">Email address</label>
	</div>
</div>
```

### Predefined value

When the form control has a predefined value (e.g. when the page loads), you must apply the `used` class on the `form-control` element.

```html
<div class="form-control-material">
	<div class="input-group">
		<span class="input-group-addon"><i class="fa fa-link"></i></span>
		<input type="text" class="form-control used" id="website" value="www.mosaicpro.biz"/>
		<label for="website">Website</label>
	</div>
</div>
```

---

## Buttons

### Uppercase text

All `.btn` elements are transformed to uppercase text.

### Flat buttons

Use the `btn-flat` class with any `.btn` element to remove the `border` property from the button.

---

## Ripple effect

Add the `ripple` class to any element to enable the effect.

Additionally, you can use any of the following classes to control the ripple color:

- `ripple-primary`
- `ripple-light` *(default)*
- `ripple-light-fade`
- `ripple-dark`
- `ripple-dark-fade`

```html
<a href="#" class="btn btn-default ripple ripple-dark">Button</a>
<a href="#" class="btn btn-primary ripple ripple-light">Button</a>
<a href="#" class="btn btn-default ripple ripple-primary">Button</a>
```

### Custom colors

From Less, using variables from the [Colors package](/reference/colors/index.html):

```
@ripple-gradient-red: fade(@red-500, 20%) 0, fade(@red-500, 30%) 40%, fade(@red-500, 40%) 50%, fade(@red-500, 50%) 60%, fade(@red-500, 0%) 70%;

.ripple-red .ink {
	background: radial-gradient(@ripple-gradient-red);
}
```

```html
<a href="#" class="btn btn-default ripple ripple-red">Button</a>
```

## Paper shadow

Add the `paper-shadow` class to any element with `position: relative`. Note that you can use the `relative` class from the [Essential package](/reference/essential/index.html) to add `position: relative` to any element.

### Depth

Add depth with the `data-z` attribute with a value of `0.5`, `1`, `2`, `3`, `4` or `5`.

```html
<div class="panel panel-default paper-shadow" data-z="0.5">
	<div class="panel-body height-300" data-scrollable-h>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet suscipit lorem, sit amet vestibulum lectus. Proin luctus felis vitae velit mollis dictum. Duis id facilisis ex. Nullam eros tortor, convallis eu gravida eget, maximus in turpis. Suspendisse ornare lorem ac enim ultricies, sed volutpat leo volutpat.
	</div>
</div>
```

### Depth on hover

Use a different depth on mouse over with the `data-hover-z` attribute.

```html
<div class="panel panel-default paper-shadow" data-z="0.5" data-hover-z="2">
	<div class="panel-body height-300" data-scrollable-h>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet suscipit lorem, sit amet vestibulum lectus. Proin luctus felis vitae velit mollis dictum. Duis id facilisis ex. Nullam eros tortor, convallis eu gravida eget, maximus in turpis. Suspendisse ornare lorem ac enim ultricies, sed volutpat leo volutpat.
	</div>
</div>
```

### Animated depth

Enable animations for the transition between `data-z` and `data-hover-z` with the `data-animated` attribute.

```html
<div class="panel panel-default paper-shadow" data-z="0.5" data-hover-z="2" data-animated>
	<div class="panel-body height-300" data-scrollable-h>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet suscipit lorem, sit amet vestibulum lectus. Proin luctus felis vitae velit mollis dictum. Duis id facilisis ex. Nullam eros tortor, convallis eu gravida eget, maximus in turpis. Suspendisse ornare lorem ac enim ultricies, sed volutpat leo volutpat.
	</div>
</div>
```