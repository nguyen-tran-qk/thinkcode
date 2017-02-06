# Right-to-Left

This document describes how to add RTL or Right-to-Left script support to your application, where the writing starts from the right of the page and continues to the left, for languages like Arabic, Hebrew, Syriac, Samaritan or Thaana.

---

## Bootstrap RTL

Because the template is largely based on [Bootstrap](http://getbootstrap.com), we'll need to add RTL support for the Bootstrap framework first.

### Installation

You can check if it's already installed by simply looking for the `bower_components/bootstrap-rtl` directory.

Using [Bower](/code/bower/index.html):

	bower install bootstrap-rtl --save
	
### Loading
	
Update `src/less/themes/$THEME_NAME/vendor/bootstrap.less`, to include after the main bootstrap import:

	// Load Bootstrap
	@import "../../../vendor/bootstrap/bootstrap";

	// Load Bootstrap RTL
	@import "../../../vendor/bootstrap-rtl/bootstrap-rtl";
	
Now, when running [the build process](/workflow/gulp/index.html), `$BUILD_PATH/$THEME_NAME/css/vendor/bootstrap.css` will include the regular Bootstrap, plus the newly added Bootstrap RTL package.

---

## Basic usage

### flip

The `bootstrap-rtl` package pretty much handles automatically most of the elements provided by the Bootstrap framework and additionally includes a new CSS class `flip` which you can add on all HTML elements using the following classes:

- `pull-left`
- `pull-right`
- `media-left`
- `media-right`
- `text-left`
- `text-right`
- `navbar-left`
- `navbar-right`

**Example**:

```html
<div class="pull-left flip">
	...
</div>
```

---

## Swig templates

Some of the [Swig templates](/code/swig/index.html) included with our libraries, already provide support for RTL and can automatically add the `flip` class when required. To enable this, update `src/html/themes/$THEME_NAME/swig.json` or create the file if it doesn't exist already, with the following content:

	{
		"rtl": true
	}
	
Now, within any Swig template that ends up being used in `src/html/themes/$THEME_NAME/**/*.html`, you can conditionally apply the `flip` class on any element:

```html
<div class="pull-left{% if rtl %} flip{% endif %}">
	...
</div>
```

---

## Components

Most of our proprietary assets include RTL support.

- [Essential](/reference/essential/index.html#rtl-support)
- [Navbar](/reference/navbar/index.html#rtl-support)
- [Sidebar](/reference/sidebar/index.html#rtl-support)