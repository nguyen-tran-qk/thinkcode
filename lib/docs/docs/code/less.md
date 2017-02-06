# Less Overview

**[Less](http://lesscss.org) is a CSS pre-processor**, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themable and extendable.

As an extension to CSS, Less is not only backwards compatible with CSS, but the extra features it adds use existing CSS syntax. This makes learning Less a breeze, and if in doubt, lets you fall back to vanilla CSS.

We won't go into details for using the Less language itself, as there are way too many aspects to cover and also many great resources available on the web to quickly get you started.

---

### Language features

**Just a few of the awesome features** Less is adding to vanilla CSS:

- variables
- mixins
- nested rules
- operations
- functions
- namespaces

You can see examples of all the language features on the [Less official website](http://lesscss.org/features/) and you can always refer to the complete [Less function reference](http://lesscss.org/functions/).

---

## CSS vendor prefixes

CSS vendor prefixes or CSS browser prefixes are a way for browser makers to add support for new CSS features in a sort of testing and experimentation period. You've probably used vendor prefixes before in the form of `-webkit-`, `-moz-`, `-ms-` and `-o-` CSS properties.

### The bad news

As you might already know, vendor prefixes are annoying and repetitive and most often you'll have to write the properties 2-5 times to get it working on all browsers. For example, if you want to add a CSS3 transition to your document, you would use the `transition` property with the prefixes listed first:

	-webkit-transition: all 4s ease;
	-moz-transition: all 4s ease;
	-ms-transition: all 4s ease;
	-o-transition: all 4s ease;
	transition: all 4s ease;

### The good news

When working with our templates, you can **simply forget about vendor prefixes**. [The build process](/workflow/gulp/index.html) automatically adds vendor prefixes to the final CSS compiled from the Less source of your application for the last 4 versions of all major browsers, so you can just use the standard CSS3 properties, and the build process will make your CSS work on all browsers:

	transition: all 4s ease;
	
---

## See also

- [The build process](/workflow/gulp/index.html)
- [Structure](/code/structure/index.html)
- [Include paths](/code/include-paths/index.html)