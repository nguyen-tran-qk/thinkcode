# Structure

This document aims to provide a basic understanding of the file structure and the main directories you'll find in the package.

**It's recommended** that any customization, to any aspect of the template, should be done using the source files rather than the compiled assets and then generate a fresh compiled version of the customized application using the [build process](/workflow/gulp/index.html).

---

## Source

We provide source files for everything from 3rd party libraries and proprietary assets to project specific source files such as Swig templates used to compose HTML pages, all the individual application JavaScript files and the Less files used to create the application styling.

1. **3rd party assets**

	`bower_components/`
	
	All the 3rd party assets, such as jQuery and Bootstrap are [managed with Bower](/code/bower/index.html).
	
2. **Proprietary assets**

	`lib/`

	In addition to 3rd party assets, we also provide our own collection of libraries, and because it's proprietary code (private), these libraries are not managed with bower, but are all included in the `lib/` directory.
	
3. **Project source**

		src/
		├── html				// Source Application HTML
		├── images
		├── js					// Source Application JavaScript
		└── less				// Source Application Styling

---

## Compiled assets

In addition to the source, we also provide compiled project files, such as static HTML, CSS and JavaScript files, resulted from running the [build process](/workflow/gulp/index.html) ourselves. For more details, see [Build paths](/workflow/gulp/index.html#build-paths).

---

## See also

- [The build process](/workflow/gulp/index.html)
- [Manage assets](/code/bower/index.html)
- [Include paths](/code/include-paths/index.html)
- [Loading assets](/reference/layout/index.html#loading-assets)