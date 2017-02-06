# Swig Overview

[Swig](https://github.com/paularmstrong/swig) is one of the best template engines for node.js. Swig allows you to create pages, layouts, extend layouts from pages, include reusable partials in your templates, create macros (think of these as reusable snippets of functionality) and a lot more.

---

In a general way, a template engine is a web publishing tool that uses a template processor to combine web pages to form finished web pages. We can work with templates in various formats, apply any kind of filters and transformations to those templates and process the templates in valid HTML output. By using a template engine, we are still building static HTML pages, but in a productive, organised and efficient way.

---

**Swig Features**

- It's blazing fast.
- Object-Oriented template inheritance.
- Apply filters and transformations to output in your templates.
- Automatically escapes all output for safe HTML rendering.
- Lots of iteration and conditionals supported.
- Robust without the bloat.
- Extendable and customizable.
- [Great documentation](http://paularmstrong.github.io/swig/)

---

## Basic usage

### Layouts

Consider the following Swig template that we could place in `src/html/themes/$THEME_NAME/_layout.html`:

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>{{ site.name }}</title>
	</head>
	<body>

	    <!-- Declare a template block in which you can inject
	         content from a page that is extending this layout -->

	    {% block content %}{% endblock %}

	</body>
	</html>
	
### Pages
	
Consider the following simple example of a Swig template that we could place in `src/html/themes/$THEME_NAME/page.html` and that inherits the `_layout.html` template above:

	{% extends 'src/html/themes/$THEME_NAME/_layout.html' %}

	{% block content %}
	    <p>This is just an awesome page.</p>
	{% endblock %}
	
### Partials

`src/html/themes/$THEME_NAME/_partial.html`:

	<p>I like {{ food }} and {{ drink }}.</p>
	
`src/html/themes/$THEME_NAME/page.html`:

	{% extends 'src/html/themes/$THEME_NAME/_layout.html' %}

	{% block content %}
	    {% set my_obj = { food: 'tacos', drink: 'horchata' } %}
	    {% include "./_partial.html" with my_obj %}
	{% endblock %}
	
When compiled to HTML, `page.html` will output:

	// => I like tacos and horchata.

