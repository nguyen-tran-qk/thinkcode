# Colors

**The colors package** introduces unexpected and vibrant colors, based on Google's [Material Design](http://www.google.ro/design/spec/style/color.html#color-color-palette) Guideline, inspired by bold color statements juxtaposed with muted environments, taking cues from contemporary architecture & many more.

---

## Requirements

### Less

From `src/less/themes/$THEME_NAME/app.less`:
	
	// Color Mixins
	@import "colors/less/mixins/mixins";

	// Colors
	@import "colors/less/ui/ui";
	
Which will load the following into our main application style bundle:

- `lib/colors/less/mixins/mixins.less`
- `lib/colors/less/ui/ui.less`

Or, instead of loading the entire `colors/less/ui` package, you can just pick your requirements one by one:

	// Colors
	@import "colors/less/ui/_helpers"; // required
	@import "colors/less/ui/_background";
	@import "colors/less/ui/_text";
	@import "colors/less/ui/_buttons";
	@import "colors/less/ui/_progress-bars";
	@import "colors/less/ui/_calendar";
	@import "colors/less/ui/_alerts";
	@import "colors/less/ui/_ribbons";

---

#### Alternative

If working with Less is not your favorite thing, you can alternatively load the pre-built static assets we have included:

	<!-- In the head of the HTML document -->
	<link rel="stylesheet" href="css/app/colors-background.css" />
	<link rel="stylesheet" href="css/app/colors-text.css" />
	<link rel="stylesheet" href="css/app/colors-buttons.css" />
	<link rel="stylesheet" href="css/app/colors-progress-bars.css" />
	<link rel="stylesheet" href="css/app/colors-calendar.css" />
	<link rel="stylesheet" href="css/app/colors-alerts.css" />
	<link rel="stylesheet" href="css/app/colors-ribbons.css" />

---

## The color palettes

19 color palettes designed to work harmoniously with each other. Each color palette starts with primary colors and fills in the spectrum to create a complete and usable palette. **Google suggests using the `*-500` colors** as the primary colors in your app and the other colors as accents colors.

---

### Red color palette

![Red color palette](/images/colors/red.png)

Use any of the following Less variables to apply a red color to any CSS property.

**Primary colors**:

- `@red-100` to `@red-900` in `100` increments.
- use `@red-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@red-A100`
- `@red-A200`
- `@red-A400`
- `@red-A700`

**CSS components**:

- [Red background colors](#red-background-colors)
- [Red text colors](#red-text-colors)
- [Red buttons](#red-buttons)
- [Red progress bars](#red-progress-bars)
- [Red alerts](#red-alerts)

---

### Pink color palette

![Pink color palette](/images/colors/pink.png)

Use any of the following Less variables to apply a pink color to any CSS property.

**Primary colors**:

- `@pink-100` to `@pink-900` in `100` increments.
- use `@pink-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@pink-A100`
- `@pink-A200`
- `@pink-A400`
- `@pink-A700`

**CSS components**:

- [Pink background colors](#pink-background-colors)
- [Pink text colors](#pink-text-colors)
- [Pink buttons](#pink-buttons)
- [Pink progress bars](#pink-progress-bars)
- [Pink alerts](#pink-alerts)

---

### Purple color palette

![Purple color palette](/images/colors/purple.png)

Use any of the following Less variables to apply a purple color to any CSS property.

**Primary colors**:

- `@purple-100` to `@purple-900` in `100` increments.
- use `@purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@purple-A100`
- `@purple-A200`
- `@purple-A400`
- `@purple-A700`

**CSS components**:

- [Purple background colors](#purple-background-colors)
- [Purple text colors](#purple-text-colors)
- [Purple buttons](#purple-buttons)
- [Purple progress bars](#purple-progress-bars)
- [Purple alerts](#purple-alerts)

---

### Deep Purple color palette

![Deep Purple color palette](/images/colors/deep-purple.png)

Use any of the following Less variables to apply a deep purple color to any CSS property.

**Primary colors**:

- `@deep-purple-100` to `@deep-purple-900` in `100` increments.
- use `@deep-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@deep-purple-A100`
- `@deep-purple-A200`
- `@deep-purple-A400`
- `@deep-purple-A700`

**CSS components**:

- [Deep Purple background colors](#deep-purple-background-colors)
- [Deep Purple text colors](#deep-purple-text-colors)
- [Deep Purple buttons](#deep-purple-buttons)
- [Deep Purple progress bars](#deep-purple-progress-bars)
- [Deep Purple alerts](#deep-purple-alerts)

---

### Indigo color palette

![Indigo color palette](/images/colors/indigo.png)

Use any of the following Less variables to apply an indigo color to any CSS property.

**Primary colors**:

- `@indigo-100` to `@indigo-900` in `100` increments.
- use `@indigo-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@indigo-A100`
- `@indigo-A200`
- `@indigo-A400`
- `@indigo-A700`

**CSS components**:

- [Indigo background colors](#indigo-background-colors)
- [Indigo text colors](#indigo-text-colors)
- [Indigo buttons](#indigo-buttons)
- [Indigo progress bars](#indigo-progress-bars)
- [Indigo alerts](#indigo-alerts)

---

### Blue color palette

![Blue color palette](/images/colors/blue.png)

Use any of the following Less variables to apply a blue color to any CSS property.

**Primary colors**:

- `@blue-100` to `@blue-900` in `100` increments.
- use `@blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@blue-A100`
- `@blue-A200`
- `@blue-A400`
- `@blue-A700`

**CSS components**:

- [Blue background colors](#blue-background-colors)
- [Blue text colors](#blue-text-colors)
- [Blue buttons](#blue-buttons)
- [Blue progress bars](#blue-progress-bars)
- [Blue alerts](#blue-alerts)

---

### Light Blue color palette

![Light Blue color palette](/images/colors/light-blue.png)

Use any of the following Less variables to apply a light blue color to any CSS property.

**Primary colors**:

- `@light-blue-100` to `@light-blue-900` in `100` increments.
- use `@light-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@light-blue-A100`
- `@light-blue-A200`
- `@light-blue-A400`
- `@light-blue-A700`

**CSS components**:

- [Light Blue background colors](#light-blue-background-colors)
- [Light Blue text colors](#light-blue-text-colors)
- [Light Blue buttons](#light-blue-buttons)
- [Light Blue progress bars](#light-blue-progress-bars)
- [Light Blue alerts](#light-blue-alerts)

---

### Cyan color palette

![Cyan color palette](/images/colors/cyan.png)

Use any of the following Less variables to apply a cyan color to any CSS property.

**Primary colors**:

- `@cyan-100` to `@cyan-900` in `100` increments.
- use `@cyan-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@cyan-A100`
- `@cyan-A200`
- `@cyan-A400`
- `@cyan-A700`

**CSS components**:

- [Cyan background colors](#cyan-background-colors)
- [Cyan text colors](#cyan-text-colors)
- [Cyan buttons](#cyan-buttons)
- [Cyan progress bars](#cyan-progress-bars)
- [Cyan alerts](#cyan-alerts)

---

### Teal color palette

![Teal color palette](/images/colors/teal.png)

Use any of the following Less variables to apply a teal color to any CSS property.

**Primary colors**:

- `@teal-100` to `@teal-900` in `100` increments.
- use `@teal-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@teal-A100`
- `@teal-A200`
- `@teal-A400`
- `@teal-A700`

**CSS components**:

- [Teal background colors](#teal-background-colors)
- [Teal text colors](#teal-text-colors)
- [Teal buttons](#teal-buttons)
- [Teal progress bars](#teal-progress-bars)
- [Teal alerts](#teal-alerts)

---

### Green color palette

![Green color palette](/images/colors/green.png)

Use any of the following Less variables to apply a green color to any CSS property.

**Primary colors**:

- `@green-100` to `@green-900` in `100` increments.
- use `@green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@green-A100`
- `@green-A200`
- `@green-A400`
- `@green-A700`

**CSS components**:

- [Green background colors](#green-background-colors)
- [Green text colors](#green-text-colors)
- [Green buttons](#green-buttons)
- [Green progress bars](#green-progress-bars)
- [Green alerts](#green-alerts)

---

### Light Green color palette

![Light Green color palette](/images/colors/light-green.png)

Use any of the following Less variables to apply a light green color to any CSS property.

**Primary colors**:

- `@light-green-100` to `@light-green-900` in `100` increments.
- use `@light-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@light-green-A100`
- `@light-green-A200`
- `@light-green-A400`
- `@light-green-A700`

**CSS components**:

- [Light Green background colors](#light-green-background-colors)
- [Light Green text colors](#light-green-text-colors)
- [Light Green buttons](#light-green-buttons)
- [Light Green progress bars](#light-green-progress-bars)
- [Light Green alerts](#light-green-alerts)

---

### Lime color palette

![Lime color palette](/images/colors/lime.png)

Use any of the following Less variables to apply a lime color to any CSS property.

**Primary colors**:

- `@lime-100` to `@lime-900` in `100` increments.
- use `@lime-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@lime-A100`
- `@lime-A200`
- `@lime-A400`
- `@lime-A700`

**CSS components**:

- [Lime background colors](#lime-background-colors)
- [Lime text colors](#lime-text-colors)
- [Lime buttons](#lime-buttons)
- [Lime progress bars](#lime-progress-bars)
- [Lime alerts](#lime-alerts)

---

### Yellow color palette

![Yellow color palette](/images/colors/yellow.png)

Use any of the following Less variables to apply a yellow color to any CSS property.

**Primary colors**:

- `@yellow-100` to `@yellow-900` in `100` increments.
- use `@yellow-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@yellow-A100`
- `@yellow-A200`
- `@yellow-A400`
- `@yellow-A700`

**CSS components**:

- [Yellow background colors](#yellow-background-colors)
- [Yellow text colors](#yellow-text-colors)
- [Yellow buttons](#yellow-buttons)
- [Yellow progress bars](#yellow-progress-bars)
- [Yellow alerts](#yellow-alerts)

---

### Amber color palette

![Amber color palette](/images/colors/amber.png)

Use any of the following Less variables to apply an amber color to any CSS property.

**Primary colors**:

- `@amber-100` to `@amber-900` in `100` increments.
- use `@amber-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@amber-A100`
- `@amber-A200`
- `@amber-A400`
- `@amber-A700`

**CSS components**:

- [Amber background colors](#amber-background-colors)
- [Amber text colors](#amber-text-colors)
- [Amber buttons](#amber-buttons)
- [Amber progress bars](#amber-progress-bars)
- [Amber alerts](#amber-alerts)

---

### Orange color palette

![Orange color palette](/images/colors/orange.png)

Use any of the following Less variables to apply an orange color to any CSS property.

**Primary colors**:

- `@orange-100` to `@orange-900` in `100` increments.
- use `@orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@orange-A100`
- `@orange-A200`
- `@orange-A400`
- `@orange-A700`

**CSS components**:

- [Orange background colors](#orange-background-colors)
- [Orange text colors](#orange-text-colors)
- [Orange buttons](#orange-buttons)
- [Orange progress bars](#orange-progress-bars)
- [Orange alerts](#orange-alerts)

---

### Deep Orange color palette

![Deep Orange color palette](/images/colors/deep-orange.png)

Use any of the following Less variables to apply a deep orange color to any CSS property.

**Primary colors**:

- `@deep-orange-100` to `@deep-orange-900` in `100` increments.
- use `@deep-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `@deep-orange-A100`
- `@deep-orange-A200`
- `@deep-orange-A400`
- `@deep-orange-A700`

**CSS components**:

- [Deep Orange background colors](#deep-orange-background-colors)
- [Deep Orange text colors](#deep-orange-text-colors)
- [Deep Orange buttons](#deep-orange-buttons)
- [Deep Orange progress bars](#deep-orange-progress-bars)
- [Deep Orange alerts](#deep-orange-alerts)

---

### Brown color palette

![Brown color palette](/images/colors/brown.png)

Use any of the following Less variables to apply a brown color to any CSS property.

**Primary colors**:

- `@brown-100` to `@brown-900` in `100` increments.
- use `@brown-500` as the primary color.
- the higher the number, the darker the color.

**CSS components**:

- [Brown background colors](#brown-background-colors)
- [Brown text colors](#brown-text-colors)
- [Brown buttons](#brown-buttons)
- [Brown progress bars](#brown-progress-bars)
- [Brown alerts](#brown-alerts)

---

### Grey color palette

![Grey color palette](/images/colors/grey.png)

Use any of the following Less variables to apply a grey color to any CSS property.

**Primary colors**:

- `@grey-100` to `@grey-900` in `100` increments.
- use `@grey-500` as the primary color.
- the higher the number, the darker the color.

**CSS components**:

- [Grey background colors](#grey-background-colors)
- [Grey text colors](#grey-text-colors)
- [Grey buttons](#grey-buttons)
- [Grey progress bars](#grey-progress-bars)
- [Grey alerts](#grey-alerts)

---

### Blue Grey color palette

![Blue Grey color palette](/images/colors/blue-grey.png)

Use any of the following Less variables to apply a blue grey color to any CSS property.

**Primary colors**:

- `@blue-grey-100` to `@blue-grey-900` in `100` increments.
- use `@blue-grey-500` as the primary color.
- the higher the number, the darker the color.

**CSS components**:

- [Blue Grey background colors](#blue-grey-background-colors)
- [Blue Grey text colors](#blue-grey-text-colors)
- [Blue Grey buttons](#blue-grey-buttons)
- [Blue Grey progress bars](#blue-grey-progress-bars)
- [Blue Grey alerts](#blue-grey-alerts)

---

## Background color

### Red background colors

Use any of the following CSS classes on any element to apply a red background color.

**Primary colors**:

- `bg-red-100` to `bg-red-900` in `100` increments.
- use `bg-red-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-red-A100`
- `bg-red-A200`
- `bg-red-A400`
- `bg-red-A700`

**Example**:

```html
<div class="bg-red-500">
	<!-- Red background block -->
</div>
```

**Less variables**:

- [Red color palette](#red-color-palette)

---

### Pink background colors

Use any of the following CSS classes on any element to apply a pink background color.

**Primary colors**:

- `bg-pink-100` to `bg-pink-900` in `100` increments.
- use `bg-pink-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-pink-A100`
- `bg-pink-A200`
- `bg-pink-A400`
- `bg-pink-A700`

**Example**:

```html
<div class="bg-pink-500">
	<!-- Pink background block -->
</div>
```

**Less variables**:

- [Pink color palette](#pink-color-palette)

---

### Purple background colors

Use any of the following CSS classes on any element to apply a purple background color.

**Primary colors**:

- `bg-purple-100` to `bg-purple-900` in `100` increments.
- use `bg-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-purple-A100`
- `bg-purple-A200`
- `bg-purple-A400`
- `bg-purple-A700`

**Example**:

```html
<div class="bg-purple-500">
	<!-- Purple background block -->
</div>
```

**Less variables**:

- [Purple color palette](#purple-color-palette)

---

### Deep Purple background colors

Use any of the following CSS classes on any element to apply a deep purple background color.

**Primary colors**:

- `bg-deep-purple-100` to `bg-deep-purple-900` in `100` increments.
- use `bg-deep-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-deep-purple-A100`
- `bg-deep-purple-A200`
- `bg-deep-purple-A400`
- `bg-deep-purple-A700`

**Example**:

```html
<div class="bg-deep-purple-500">
	<!-- Deep Purple background block -->
</div>
```

**Less variables**:

- [Deep Purple color palette](#deep-purple-color-palette)

---

### Indigo background colors

Use any of the following CSS classes on any element to apply an indigo background color.

**Primary colors**:

- `bg-indigo-100` to `bg-indigo-900` in `100` increments.
- use `bg-indigo-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-indigo-A100`
- `bg-indigo-A200`
- `bg-indigo-A400`
- `bg-indigo-A700`

**Example**:

```html
<div class="bg-indigo-500">
	<!-- Indigo background block -->
</div>
```

**Less variables**:

- [Indigo color palette](#indigo-color-palette)

---

### Blue background colors

Use any of the following CSS classes on any element to apply a blue background color.

**Primary colors**:

- `bg-blue-100` to `bg-blue-900` in `100` increments.
- use `bg-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-blue-A100`
- `bg-blue-A200`
- `bg-blue-A400`
- `bg-blue-A700`

**Example**:

```html
<div class="bg-blue-500">
	<!-- Blue background block -->
</div>
```

**Less variables**:

- [Blue color palette](#blue-color-palette)

---

### Light Blue background colors

Use any of the following CSS classes on any element to apply a light blue background color.

**Primary colors**:

- `bg-light-blue-100` to `bg-light-blue-900` in `100` increments.
- use `bg-light-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-light-blue-A100`
- `bg-light-blue-A200`
- `bg-light-blue-A400`
- `bg-light-blue-A700`

**Example**:

```html
<div class="bg-light-blue-500">
	<!-- Light Blue background block -->
</div>
```

**Less variables**:

- [Light Blue color palette](#light-blue-color-palette)

---

### Cyan background colors

Use any of the following CSS classes on any element to apply a cyan background color.

**Primary colors**:

- `bg-cyan-100` to `bg-cyan-900` in `100` increments.
- use `bg-cyan-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-cyan-A100`
- `bg-cyan-A200`
- `bg-cyan-A400`
- `bg-cyan-A700`

**Example**:

```html
<div class="bg-cyan-500">
	<!-- Cyan background block -->
</div>
```

**Less variables**:

- [Cyan color palette](#cyan-color-palette)

---

### Teal background colors

Use any of the following CSS classes on any element to apply a teal background color.

**Primary colors**:

- `bg-teal-100` to `bg-teal-900` in `100` increments.
- use `bg-teal-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-teal-A100`
- `bg-teal-A200`
- `bg-teal-A400`
- `bg-teal-A700`

**Example**:

```html
<div class="bg-teal-500">
	<!-- Teal background block -->
</div>
```

**Less variables**:

- [Teal color palette](#teal-color-palette)

---

### Green background colors

Use any of the following CSS classes on any element to apply a green background color.

**Primary colors**:

- `bg-green-100` to `bg-green-900` in `100` increments.
- use `bg-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-green-A100`
- `bg-green-A200`
- `bg-green-A400`
- `bg-green-A700`

**Example**:

```html
<div class="bg-green-500">
	<!-- Green background block -->
</div>
```

**Less variables**:

- [Green color palette](#green-color-palette)

---

### Light Green background colors

Use any of the following CSS classes on any element to apply a light green background color.

**Primary colors**:

- `bg-light-green-100` to `bg-light-green-900` in `100` increments.
- use `bg-light-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-light-green-A100`
- `bg-light-green-A200`
- `bg-light-green-A400`
- `bg-light-green-A700`

**Example**:

```html
<div class="bg-light-green-500">
	<!-- Light Green background block -->
</div>
```

**Less variables**:

- [Light Green color palette](#light-green-color-palette)

---

### Lime background colors

Use any of the following CSS classes on any element to apply a lime background color.

**Primary colors**:

- `bg-lime-100` to `bg-lime-900` in `100` increments.
- use `bg-lime-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-lime-A100`
- `bg-lime-A200`
- `bg-lime-A400`
- `bg-lime-A700`

**Example**:

```html
<div class="bg-lime-500">
	<!-- Lime background block -->
</div>
```

**Less variables**:

- [Lime color palette](#lime-color-palette)

---

### Yellow background colors

Use any of the following CSS classes on any element to apply a yellow background color.

**Primary colors**:

- `bg-yellow-100` to `bg-yellow-900` in `100` increments.
- use `bg-yellow-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-yellow-A100`
- `bg-yellow-A200`
- `bg-yellow-A400`
- `bg-yellow-A700`

**Example**:

```html
<div class="bg-yellow-500">
	<!-- Yellow background block -->
</div>
```

**Less variables**:

- [Yellow color palette](#yellow-color-palette)

---

### Amber background colors

Use any of the following CSS classes on any element to apply an amber background color.

**Primary colors**:

- `bg-amber-100` to `bg-amber-900` in `100` increments.
- use `bg-amber-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-amber-A100`
- `bg-amber-A200`
- `bg-amber-A400`
- `bg-amber-A700`

**Example**:

```html
<div class="bg-amber-500">
	<!-- Amber background block -->
</div>
```

**Less variables**:

- [Amber color palette](#amber-color-palette)

---

### Orange background colors

Use any of the following CSS classes on any element to apply an orange background color.

**Primary colors**:

- `bg-orange-100` to `bg-orange-900` in `100` increments.
- use `bg-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-orange-A100`
- `bg-orange-A200`
- `bg-orange-A400`
- `bg-orange-A700`

**Example**:

```html
<div class="bg-orange-500">
	<!-- Orange background block -->
</div>
```

**Less variables**:

- [Orange color palette](#orange-color-palette)

---

### Deep Orange background colors

Use any of the following CSS classes on any element to apply a deep orange background color.

**Primary colors**:

- `bg-deep-orange-100` to `bg-deep-orange-900` in `100` increments.
- use `bg-deep-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `bg-deep-orange-A100`
- `bg-deep-orange-A200`
- `bg-deep-orange-A400`
- `bg-deep-orange-A700`

**Example**:

```html
<div class="bg-deep-orange-500">
	<!-- Deep Orange background block -->
</div>
```

**Less variables**:

- [Deep Orange color palette](#deep-orange-color-palette)

---

### Brown background colors

Use any of the following CSS classes on any element to apply a brown background color.

**Primary colors**:

- `bg-brown-100` to `bg-brown-900` in `100` increments.
- use `bg-brown-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<div class="bg-brown-500">
	<!-- Brown background block -->
</div>
```

**Less variables**:

- [Brown color palette](#brown-color-palette)

---

### Grey background colors

Use any of the following CSS classes on any element to apply a grey background color.

**Primary colors**:

- `bg-grey-100` to `bg-grey-900` in `100` increments.
- use `bg-grey-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<div class="bg-grey-500">
	<!-- Grey background block -->
</div>
```

**Less variables**:

- [Grey color palette](#grey-color-palette)

---

### Blue Grey background colors

Use any of the following CSS classes on any element to apply a blue grey background color.

**Primary colors**:

- `bg-blue-grey-100` to `bg-blue-grey-900` in `100` increments.
- use `bg-blue-grey-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<div class="bg-blue-grey-500">
	<!-- Blue Grey background block -->
</div>
```

**Less variables**:

- [Blue Grey color palette](#blue-grey-color-palette)

---

## Text color

### Red text colors

Use any of the following CSS classes on any element to apply a red text color.

**Primary colors**:

- `text-red-100` to `text-red-900` in `100` increments.
- use `text-red-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-red-A100`
- `text-red-A200`
- `text-red-A400`
- `text-red-A700`

**Example**:

```html
<p class="text-red-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Red color palette](#red-color-palette)

---

### Pink text colors

Use any of the following CSS classes on any element to apply a pink text color.

**Primary colors**:

- `text-pink-100` to `text-pink-900` in `100` increments.
- use `text-pink-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-pink-A100`
- `text-pink-A200`
- `text-pink-A400`
- `text-pink-A700`

**Example**:

```html
<p class="text-pink-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Pink color palette](#pink-color-palette)

---

### Purple text colors

Use any of the following CSS classes on any element to apply a purple text color.

**Primary colors**:

- `text-purple-100` to `text-purple-900` in `100` increments.
- use `text-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-purple-A100`
- `text-purple-A200`
- `text-purple-A400`
- `text-purple-A700`

**Example**:

```html
<p class="text-purple-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Purple color palette](#purple-color-palette)

---

### Deep Purple text colors

Use any of the following CSS classes on any element to apply a deep purple text color.

**Primary colors**:

- `text-deep-purple-100` to `text-deep-purple-900` in `100` increments.
- use `text-deep-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-deep-purple-A100`
- `text-deep-purple-A200`
- `text-deep-purple-A400`
- `text-deep-purple-A700`

**Example**:

```html
<p class="text-deep-purple-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Deep Purple color palette](#deep-purple-color-palette)

---

### Indigo text colors

Use any of the following CSS classes on any element to apply an indigo text color.

**Primary colors**:

- `text-indigo-100` to `text-indigo-900` in `100` increments.
- use `text-indigo-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-indigo-A100`
- `text-indigo-A200`
- `text-indigo-A400`
- `text-indigo-A700`

**Example**:

```html
<p class="text-indigo-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Indigo color palette](#indigo-color-palette)

---

### Blue text colors

Use any of the following CSS classes on any element to apply a blue text color.

**Primary colors**:

- `text-blue-100` to `text-blue-900` in `100` increments.
- use `text-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-blue-A100`
- `text-blue-A200`
- `text-blue-A400`
- `text-blue-A700`

**Example**:

```html
<p class="text-blue-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Blue color palette](#blue-color-palette)

---

### Light Blue text colors

Use any of the following CSS classes on any element to apply a light blue text color.

**Primary colors**:

- `text-light-blue-100` to `text-light-blue-900` in `100` increments.
- use `text-light-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-light-blue-A100`
- `text-light-blue-A200`
- `text-light-blue-A400`
- `text-light-blue-A700`

**Example**:

```html
<p class="text-light-blue-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Light Blue color palette](#light-blue-color-palette)

---

### Cyan text colors

Use any of the following CSS classes on any element to apply a cyan text color.

**Primary colors**:

- `text-cyan-100` to `text-cyan-900` in `100` increments.
- use `text-cyan-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-cyan-A100`
- `text-cyan-A200`
- `text-cyan-A400`
- `text-cyan-A700`

**Example**:

```html
<p class="text-cyan-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Cyan color palette](#cyan-color-palette)

---

### Teal text colors

Use any of the following CSS classes on any element to apply a teal text color.

**Primary colors**:

- `text-teal-100` to `text-teal-900` in `100` increments.
- use `text-teal-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-teal-A100`
- `text-teal-A200`
- `text-teal-A400`
- `text-teal-A700`

**Example**:

```html
<p class="text-teal-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Teal color palette](#teal-color-palette)

---

### Green text colors

Use any of the following CSS classes on any element to apply a green text color.

**Primary colors**:

- `text-green-100` to `text-green-900` in `100` increments.
- use `text-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-green-A100`
- `text-green-A200`
- `text-green-A400`
- `text-green-A700`

**Example**:

```html
<p class="text-green-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Green color palette](#green-color-palette)

---

### Light Green text colors

Use any of the following CSS classes on any element to apply a light green text color.

**Primary colors**:

- `text-light-green-100` to `text-light-green-900` in `100` increments.
- use `text-light-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-light-green-A100`
- `text-light-green-A200`
- `text-light-green-A400`
- `text-light-green-A700`

**Example**:

```html
<p class="text-light-green-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Light Green color palette](#light-green-color-palette)

---

### Lime text colors

Use any of the following CSS classes on any element to apply a lime text color.

**Primary colors**:

- `text-lime-100` to `text-lime-900` in `100` increments.
- use `text-lime-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-lime-A100`
- `text-lime-A200`
- `text-lime-A400`
- `text-lime-A700`

**Example**:

```html
<p class="text-lime-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Lime color palette](#lime-color-palette)

---

### Yellow text colors

Use any of the following CSS classes on any element to apply a yellow text color.

**Primary colors**:

- `text-yellow-100` to `text-yellow-900` in `100` increments.
- use `text-yellow-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-yellow-A100`
- `text-yellow-A200`
- `text-yellow-A400`
- `text-yellow-A700`

**Example**:

```html
<p class="text-yellow-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Yellow color palette](#yellow-color-palette)

---

### Amber text colors

Use any of the following CSS classes on any element to apply an amber text color.

**Primary colors**:

- `text-amber-100` to `text-amber-900` in `100` increments.
- use `text-amber-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-amber-A100`
- `text-amber-A200`
- `text-amber-A400`
- `text-amber-A700`

**Example**:

```html
<p class="text-amber-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Amber color palette](#amber-color-palette)

---

### Orange text colors

Use any of the following CSS classes on any element to apply an orange text color.

**Primary colors**:

- `text-orange-100` to `text-orange-900` in `100` increments.
- use `text-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-orange-A100`
- `text-orange-A200`
- `text-orange-A400`
- `text-orange-A700`

**Example**:

```html
<p class="text-orange-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Orange color palette](#orange-color-palette)

---

### Deep Orange text colors

Use any of the following CSS classes on any element to apply a deep orange text color.

**Primary colors**:

- `text-deep-orange-100` to `text-deep-orange-900` in `100` increments.
- use `text-deep-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `text-deep-orange-A100`
- `text-deep-orange-A200`
- `text-deep-orange-A400`
- `text-deep-orange-A700`

**Example**:

```html
<p class="text-deep-orange-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Deep Orange color palette](#deep-orange-color-palette)

---

### Brown text colors

Use any of the following CSS classes on any element to apply a brown text color.

**Primary colors**:

- `text-brown-100` to `text-brown-900` in `100` increments.
- use `text-brown-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<p class="text-brown-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Brown color palette](#brown-color-palette)

---

### Grey text colors

Use any of the following CSS classes on any element to apply a grey text color.

**Primary colors**:

- `text-grey-100` to `text-grey-900` in `100` increments.
- use `text-grey-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<p class="text-grey-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Grey color palette](#grey-color-palette)

---

### Blue Grey text colors

Use any of the following CSS classes on any element to apply a blue grey text color.

**Primary colors**:

- `text-blue-grey-100` to `text-blue-grey-900` in `100` increments.
- use `text-blue-grey-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<p class="text-blue-grey-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante porta, finibus neque id, commodo justo.</p>
```

**Less variables**:

- [Blue Grey color palette](#blue-grey-color-palette)

---

## Buttons

### Red buttons

Use any of the following CSS classes on any standard Bootstrap button to get a red button variation.

**Primary colors**:

- `btn-red-500` to `btn-red-900` in `100` increments.
- use `btn-red-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-red-A100`
- `btn-red-A200`
- `btn-red-A400`
- `btn-red-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-red-500">Red</button>

<!-- Stroked, white background, red text and border and filled background on hover -->
<button class="btn btn-red-500 btn-stroke">Red</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-red-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Red
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
```

**Less variables**:

- [Red color palette](#red-color-palette)

---

### Pink buttons

Use any of the following CSS classes on any standard Bootstrap button to get a pink button variation.

**Primary colors**:

- `btn-pink-500` to `btn-pink-900` in `100` increments.
- use `btn-pink-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-pink-A100`
- `btn-pink-A200`
- `btn-pink-A400`
- `btn-pink-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-pink-500">Pink</button>

<!-- Stroked, white background, pink text and border and filled background on hover -->
<button class="btn btn-pink-500 btn-stroke">Pink</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-pink-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Pink
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
```

**Less variables**:

- [Pink color palette](#pink-color-palette)

---

### Purple buttons

Use any of the following CSS classes on any standard Bootstrap button to get a purple button variation.

**Primary colors**:

- `btn-purple-500` to `btn-purple-900` in `100` increments.
- use `btn-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-purple-A100`
- `btn-purple-A200`
- `btn-purple-A400`
- `btn-purple-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-purple-500">Purple</button>

<!-- Stroked, white background, purple text and border and filled background on hover -->
<button class="btn btn-purple-500 btn-stroke">Purple</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-purple-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Purple
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
```

**Less variables**:

- [Purple color palette](#purple-color-palette)

---

### Deep Purple buttons

Use any of the following CSS classes on any standard Bootstrap button to get a deep purple button variation.

**Primary colors**:

- `btn-deep-purple-500` to `btn-deep-purple-900` in `100` increments.
- use `btn-deep-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-deep-purple-A100`
- `btn-deep-purple-A200`
- `btn-deep-purple-A400`
- `btn-deep-purple-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-deep-purple-500">Deep Purple</button>

<!-- Stroked, white background, deep purple text and border and filled background on hover -->
<button class="btn btn-deep-purple-500 btn-stroke">Deep Purple</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-deep-purple-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Deep Purple
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
```

**Less variables**:

- [Deep Purple color palette](#deep-purple-color-palette)

---

### Indigo buttons

Use any of the following CSS classes on any standard Bootstrap button to get an indigo button variation.

**Primary colors**:

- `btn-indigo-500` to `btn-indigo-900` in `100` increments.
- use `btn-indigo-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-indigo-A100`
- `btn-indigo-A200`
- `btn-indigo-A400`
- `btn-indigo-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-indigo-500">Indigo</button>

<!-- Stroked, white background, indigo text and border and filled background on hover -->
<button class="btn btn-indigo-500 btn-stroke">Indigo</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-indigo-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Indigo
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
```

**Less variables**:

- [Indigo color palette](#indigo-color-palette)

---

### Blue buttons

Use any of the following CSS classes on any standard Bootstrap button to get a blue button variation.

**Primary colors**:

- `btn-blue-500` to `btn-blue-900` in `100` increments.
- use `btn-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-blue-A100`
- `btn-blue-A200`
- `btn-blue-A400`
- `btn-blue-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-blue-500">Blue</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-blue-500 btn-stroke">Blue</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-blue-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Blue
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
```

**Less variables**:

- [Blue color palette](#blue-color-palette)

---

### Light Blue buttons

Use any of the following CSS classes on any standard Bootstrap button to get a light blue button variation.

**Primary colors**:

- `btn-light-blue-500` to `btn-light-blue-900` in `100` increments.
- use `btn-light-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-light-blue-A100`
- `btn-light-blue-A200`
- `btn-light-blue-A400`
- `btn-light-blue-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-light-blue-500">Light Blue</button>

<!-- Stroked, white background, light blue text and border and filled background on hover -->
<button class="btn btn-light-blue-500 btn-stroke">Light Blue</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-light-blue-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Light Blue
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
```

**Less variables**:

- [Light Blue color palette](#light-blue-color-palette)

---

### Cyan buttons

Use any of the following CSS classes on any standard Bootstrap button to get a cyan button variation.

**Primary colors**:

- `btn-cyan-500` to `btn-cyan-900` in `100` increments.
- use `btn-cyan-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-cyan-A100`
- `btn-cyan-A200`
- `btn-cyan-A400`
- `btn-cyan-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-cyan-500">Cyan</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-cyan-500 btn-stroke">Cyan</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-cyan-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Cyan
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
```

**Less variables**:

- [Cyan color palette](#cyan-color-palette)

---

### Teal buttons

Use any of the following CSS classes on any standard Bootstrap button to get a teal button variation.

**Primary colors**:

- `btn-teal-500` to `btn-teal-900` in `100` increments.
- use `btn-teal-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-teal-A100`
- `btn-teal-A200`
- `btn-teal-A400`
- `btn-teal-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-teal-500">Teal</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-teal-500 btn-stroke">Teal</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-teal-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Teal
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
```

**Less variables**:

- [Teal color palette](#teal-color-palette)

---

### Green buttons

Use any of the following CSS classes on any standard Bootstrap button to get a green button variation.

**Primary colors**:

- `btn-green-500` to `btn-green-900` in `100` increments.
- use `btn-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-green-A100`
- `btn-green-A200`
- `btn-green-A400`
- `btn-green-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-green-500">Green</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-green-500 btn-stroke">Green</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-green-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Green
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
```

**Less variables**:

- [Green color palette](#green-color-palette)

---

### Light Green buttons

Use any of the following CSS classes on any standard Bootstrap button to get a light green button variation.

**Primary colors**:

- `btn-light-green-500` to `btn-light-green-900` in `100` increments.
- use `btn-light-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-light-green-A100`
- `btn-light-green-A200`
- `btn-light-green-A400`
- `btn-light-green-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-light-green-500">Light Green</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-light-green-500 btn-stroke">Light Green</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-light-green-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Light Green
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
```

**Less variables**:

- [Light Green color palette](#light-green-color-palette)

---

### Lime buttons

Use any of the following CSS classes on any standard Bootstrap button to get a lime button variation.

**Primary colors**:

- `btn-lime-500` to `btn-lime-900` in `100` increments.
- use `btn-lime-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-lime-A100`
- `btn-lime-A200`
- `btn-lime-A400`
- `btn-lime-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-lime-500">Lime</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-lime-500 btn-stroke">Lime</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-lime-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Lime
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
```

**Less variables**:

- [Lime color palette](#lime-color-palette)

---

### Yellow buttons

Use any of the following CSS classes on any standard Bootstrap button to get a yellow button variation.

**Primary colors**:

- `btn-yellow-500` to `btn-yellow-900` in `100` increments.
- use `btn-yellow-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-yellow-A100`
- `btn-yellow-A200`
- `btn-yellow-A400`
- `btn-yellow-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-yellow-500">Yellow</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-yellow-500 btn-stroke">Yellow</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-yellow-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Yellow
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
```

**Less variables**:

- [Yellow color palette](#yellow-color-palette)

---

### Amber buttons

Use any of the following CSS classes on any standard Bootstrap button to get an amber button variation.

**Primary colors**:

- `btn-amber-500` to `btn-amber-900` in `100` increments.
- use `btn-amber-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-amber-A100`
- `btn-amber-A200`
- `btn-amber-A400`
- `btn-amber-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-amber-500">Amber</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-amber-500 btn-stroke">Amber</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-amber-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Amber
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
```

**Less variables**:

- [Amber color palette](#amber-color-palette)

---

### Orange buttons

Use any of the following CSS classes on any standard Bootstrap button to get an orange button variation.

**Primary colors**:

- `btn-orange-500` to `btn-orange-900` in `100` increments.
- use `btn-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-orange-A100`
- `btn-orange-A200`
- `btn-orange-A400`
- `btn-orange-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-orange-500">Orange</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-orange-500 btn-stroke">Orange</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-orange-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Orange
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
```

**Less variables**:

- [Orange color palette](#orange-color-palette)

---

### Deep Orange buttons

Use any of the following CSS classes on any standard Bootstrap button to get a deep orange button variation.

**Primary colors**:

- `btn-deep-orange-500` to `btn-deep-orange-900` in `100` increments.
- use `btn-deep-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `btn-deep-orange-A100`
- `btn-deep-orange-A200`
- `btn-deep-orange-A400`
- `btn-deep-orange-A700`

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-deep-orange-500">Deep Orange</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-deep-orange-500 btn-stroke">Deep Orange</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-deep-orange-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Deep Orange
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
```

**Less variables**:

- [Deep Orange color palette](#deep-orange-color-palette)

---

### Brown buttons

Use any of the following CSS classes on any standard Bootstrap button to get a brown button variation.

**Primary colors**:

- `btn-brown-500` to `btn-brown-900` in `100` increments.
- use `btn-brown-500` as the primary color.
- the higher the number, the darker the color.

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-brown-500">Brown</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-brown-500 btn-stroke">Brown</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-brown-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Brown
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
```

**Less variables**:

- [Brown color palette](#brown-color-palette)

---

### Grey buttons

Use any of the following CSS classes on any standard Bootstrap button to get a grey button variation.

**Primary colors**:

- `btn-grey-500` to `btn-grey-900` in `100` increments.
- use `btn-grey-500` as the primary color.
- the higher the number, the darker the color.

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-grey-500">Grey</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-grey-500 btn-stroke">Grey</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-grey-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Grey
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
```

**Less variables**:

- [Grey color palette](#grey-color-palette)

---

### Blue Grey buttons

Use any of the following CSS classes on any standard Bootstrap button to get a blue grey button variation.

**Primary colors**:

- `btn-blue-grey-500` to `btn-blue-grey-900` in `100` increments.
- use `btn-blue-grey-500` as the primary color.
- the higher the number, the darker the color.

**Examples**:

```html
<!-- Filled background color -->
<button class="btn btn-blue-grey-500">Blue Grey</button>

<!-- Stroked, white background, blue text and border and filled background on hover -->
<button class="btn btn-blue-grey-500 btn-stroke">Blue Grey</button>

<!-- Dropdown -->
<div class="btn-group">
	<button type="button" class="btn btn-blue-grey-500 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
		Dropdown Blue Grey
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
```

**Less variables**:

- [Blue Grey color palette](#blue-grey-color-palette)

---

## Progress bars

### Red progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-red-100` to `progress-bar-red-900` in `100` increments.
- use `progress-bar-red-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-red-A100`
- `progress-bar-red-A200`
- `progress-bar-red-A400`
- `progress-bar-red-A700`

**Example**:

```html
<div class="progress-bar progress-bar-red-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Red color palette](#red-color-palette)

---

### Pink progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-pink-100` to `progress-bar-pink-900` in `100` increments.
- use `progress-bar-pink-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-pink-A100`
- `progress-bar-pink-A200`
- `progress-bar-pink-A400`
- `progress-bar-pink-A700`

**Example**:

```html
<div class="progress-bar progress-bar-pink-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Pink color palette](#pink-color-palette)

---

### Purple progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-purple-100` to `progress-bar-purple-900` in `100` increments.
- use `progress-bar-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-purple-A100`
- `progress-bar-purple-A200`
- `progress-bar-purple-A400`
- `progress-bar-purple-A700`

**Example**:

```html
<div class="progress-bar progress-bar-purple-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Purple color palette](#purple-color-palette)

---

### Deep Purple progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-deep-purple-100` to `progress-bar-deep-purple-900` in `100` increments.
- use `progress-bar-deep-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-deep-purple-A100`
- `progress-bar-deep-purple-A200`
- `progress-bar-deep-purple-A400`
- `progress-bar-deep-purple-A700`

**Example**:

```html
<div class="progress-bar progress-bar-deep-purple-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Deep Purple color palette](#deep-purple-color-palette)

---

### Indigo progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-indigo-100` to `progress-bar-indigo-900` in `100` increments.
- use `progress-bar-indigo-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-indigo-A100`
- `progress-bar-indigo-A200`
- `progress-bar-indigo-A400`
- `progress-bar-indigo-A700`

**Example**:

```html
<div class="progress-bar progress-bar-indigo-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Indigo color palette](#indigo-color-palette)

---

### Blue progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-blue-100` to `progress-bar-blue-900` in `100` increments.
- use `progress-bar-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-blue-A100`
- `progress-bar-blue-A200`
- `progress-bar-blue-A400`
- `progress-bar-blue-A700`

**Example**:

```html
<div class="progress-bar progress-bar-blue-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Blue color palette](#blue-color-palette)

---

### Light Blue progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-light-blue-100` to `progress-bar-light-blue-900` in `100` increments.
- use `progress-bar-light-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-light-blue-A100`
- `progress-bar-light-blue-A200`
- `progress-bar-light-blue-A400`
- `progress-bar-light-blue-A700`

**Example**:

```html
<div class="progress-bar progress-bar-light-blue-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Light Blue color palette](#light-blue-color-palette)

---

### Cyan progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-cyan-100` to `progress-bar-cyan-900` in `100` increments.
- use `progress-bar-cyan-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-cyan-A100`
- `progress-bar-cyan-A200`
- `progress-bar-cyan-A400`
- `progress-bar-cyan-A700`

**Example**:

```html
<div class="progress-bar progress-bar-cyan-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Cyan color palette](#cyan-color-palette)

---

### Teal progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-teal-100` to `progress-bar-teal-900` in `100` increments.
- use `progress-bar-teal-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-teal-A100`
- `progress-bar-teal-A200`
- `progress-bar-teal-A400`
- `progress-bar-teal-A700`

**Example**:

```html
<div class="progress-bar progress-bar-teal-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Teal color palette](#teal-color-palette)

---

### Green progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-green-100` to `progress-bar-green-900` in `100` increments.
- use `progress-bar-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-green-A100`
- `progress-bar-green-A200`
- `progress-bar-green-A400`
- `progress-bar-green-A700`

**Example**:

```html
<div class="progress-bar progress-bar-green-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Green color palette](#green-color-palette)

---

### Light Green progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-light-green-100` to `progress-bar-light-green-900` in `100` increments.
- use `progress-bar-light-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-light-green-A100`
- `progress-bar-light-green-A200`
- `progress-bar-light-green-A400`
- `progress-bar-light-green-A700`

**Example**:

```html
<div class="progress-bar progress-bar-light-green-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Light Green color palette](#light-green-color-palette)

---

### Lime progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-lime-100` to `progress-bar-lime-900` in `100` increments.
- use `progress-bar-lime-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-lime-A100`
- `progress-bar-lime-A200`
- `progress-bar-lime-A400`
- `progress-bar-lime-A700`

**Example**:

```html
<div class="progress-bar progress-bar-lime-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Lime color palette](#lime-color-palette)

---

### Yellow progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-yellow-100` to `progress-bar-yellow-900` in `100` increments.
- use `progress-bar-yellow-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-yellow-A100`
- `progress-bar-yellow-A200`
- `progress-bar-yellow-A400`
- `progress-bar-yellow-A700`

**Example**:

```html
<div class="progress-bar progress-bar-yellow-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Yellow color palette](#yellow-color-palette)

---

### Amber progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-amber-100` to `progress-bar-amber-900` in `100` increments.
- use `progress-bar-amber-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-amber-A100`
- `progress-bar-amber-A200`
- `progress-bar-amber-A400`
- `progress-bar-amber-A700`

**Example**:

```html
<div class="progress-bar progress-bar-amber-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Amber color palette](#amber-color-palette)

---

### Orange progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-orange-100` to `progress-bar-orange-900` in `100` increments.
- use `progress-bar-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-orange-A100`
- `progress-bar-orange-A200`
- `progress-bar-orange-A400`
- `progress-bar-orange-A700`

**Example**:

```html
<div class="progress-bar progress-bar-orange-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Orange color palette](#orange-color-palette)

---

### Deep Orange progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-deep-orange-100` to `progress-bar-deep-orange-900` in `100` increments.
- use `progress-bar-deep-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `progress-bar-deep-orange-A100`
- `progress-bar-deep-orange-A200`
- `progress-bar-deep-orange-A400`
- `progress-bar-deep-orange-A700`

**Example**:

```html
<div class="progress-bar progress-bar-deep-orange-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Deep Orange color palette](#deep-orange-color-palette)

---

### Brown progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-brown-100` to `progress-bar-brown-900` in `100` increments.
- use `progress-bar-brown-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<div class="progress-bar progress-bar-brown-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Brown color palette](#brown-color-palette)

---

### Grey progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-grey-100` to `progress-bar-grey-900` in `100` increments.
- use `progress-bar-grey-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<div class="progress-bar progress-bar-grey-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Grey color palette](#grey-color-palette)

---

### Blue Grey progress bars

Use any of the following CSS classes on a standard Bootstrap progress bar.

**Primary colors**:

- `progress-bar-blue-grey-100` to `progress-bar-blue-grey-900` in `100` increments.
- use `progress-bar-blue-grey-500` as the primary color.
- the higher the number, the darker the color.

**Example**:

```html
<div class="progress-bar progress-bar-blue-grey-500" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	<span class="sr-only">60% Complete</span>
</div>
```

**Less variables**:

- [Blue Grey color palette](#blue-grey-color-palette)

---

## Alerts

### Red alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a red alert variation.

**Primary colors**:

- `alert-red-500` to `alert-red-900` in `100` increments.
- use `alert-red-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-red-A100`
- `alert-red-A200`
- `alert-red-A400`
- `alert-red-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-red-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-red-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Red color palette](#red-color-palette)

---

### Pink alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a pink alert variation.

**Primary colors**:

- `alert-pink-500` to `alert-pink-900` in `100` increments.
- use `alert-pink-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-pink-A100`
- `alert-pink-A200`
- `alert-pink-A400`
- `alert-pink-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-pink-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-pink-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Pink color palette](#pink-color-palette)

---

### Purple alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a purple alert variation.

**Primary colors**:

- `alert-purple-500` to `alert-purple-900` in `100` increments.
- use `alert-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-purple-A100`
- `alert-purple-A200`
- `alert-purple-A400`
- `alert-purple-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-purple-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-purple-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Purple color palette](#purple-color-palette)

---

### Deep Purple alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a deep purple alert variation.

**Primary colors**:

- `alert-deep-purple-500` to `alert-deep-purple-900` in `100` increments.
- use `alert-deep-purple-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-deep-purple-A100`
- `alert-deep-purple-A200`
- `alert-deep-purple-A400`
- `alert-deep-purple-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-deep-purple-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-deep-purple-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Deep Purple color palette](#deep-purple-color-palette)

---

### Indigo alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a indigo alert variation.

**Primary colors**:

- `alert-indigo-500` to `alert-indigo-900` in `100` increments.
- use `alert-indigo-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-indigo-A100`
- `alert-indigo-A200`
- `alert-indigo-A400`
- `alert-indigo-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-indigo-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-indigo-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Indigo color palette](#indigo-color-palette)

---

### Blue alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a blue alert variation.

**Primary colors**:

- `alert-blue-500` to `alert-blue-900` in `100` increments.
- use `alert-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-blue-A100`
- `alert-blue-A200`
- `alert-blue-A400`
- `alert-blue-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-blue-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-blue-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Blue color palette](#blue-color-palette)

---

### Light Blue alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a light blue alert variation.

**Primary colors**:

- `alert-light-blue-500` to `alert-light-blue-900` in `100` increments.
- use `alert-light-blue-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-light-blue-A100`
- `alert-light-blue-A200`
- `alert-light-blue-A400`
- `alert-light-blue-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-light-blue-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-light-blue-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Light Blue color palette](#light-blue-color-palette)

---

### Cyan alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a cyan alert variation.

**Primary colors**:

- `alert-cyan-500` to `alert-cyan-900` in `100` increments.
- use `alert-cyan-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-cyan-A100`
- `alert-cyan-A200`
- `alert-cyan-A400`
- `alert-cyan-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-cyan-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-cyan-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Cyan color palette](#cyan-color-palette)

---

### Teal alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a teal alert variation.

**Primary colors**:

- `alert-teal-500` to `alert-teal-900` in `100` increments.
- use `alert-teal-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-teal-A100`
- `alert-teal-A200`
- `alert-teal-A400`
- `alert-teal-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-teal-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-teal-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Teal color palette](#teal-color-palette)

---

### Green alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a green alert variation.

**Primary colors**:

- `alert-green-500` to `alert-green-900` in `100` increments.
- use `alert-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-green-A100`
- `alert-green-A200`
- `alert-green-A400`
- `alert-green-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-green-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-green-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Green color palette](#green-color-palette)

---

### Light Green alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a light green alert variation.

**Primary colors**:

- `alert-light-green-500` to `alert-light-green-900` in `100` increments.
- use `alert-light-green-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-light-green-A100`
- `alert-light-green-A200`
- `alert-light-green-A400`
- `alert-light-green-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-light-green-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-light-green-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Light Green color palette](#light-green-color-palette)

---

### Lime alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a lime alert variation.

**Primary colors**:

- `alert-lime-500` to `alert-lime-900` in `100` increments.
- use `alert-lime-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-lime-A100`
- `alert-lime-A200`
- `alert-lime-A400`
- `alert-lime-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-lime-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-lime-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Lime color palette](#lime-color-palette)

---

### Yellow alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a yellow alert variation.

**Primary colors**:

- `alert-yellow-500` to `alert-yellow-900` in `100` increments.
- use `alert-yellow-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-yellow-A100`
- `alert-yellow-A200`
- `alert-yellow-A400`
- `alert-yellow-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-yellow-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-yellow-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Yellow color palette](#yellow-color-palette)

---

### Amber alerts

Use any of the following CSS classes on any standard Bootstrap alert to get an amber alert variation.

**Primary colors**:

- `alert-amber-500` to `alert-amber-900` in `100` increments.
- use `alert-amber-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-amber-A100`
- `alert-amber-A200`
- `alert-amber-A400`
- `alert-amber-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-amber-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-amber-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Amber color palette](#amber-color-palette)

---

### Orange alerts

Use any of the following CSS classes on any standard Bootstrap alert to get an orange alert variation.

**Primary colors**:

- `alert-orange-500` to `alert-orange-900` in `100` increments.
- use `alert-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-orange-A100`
- `alert-orange-A200`
- `alert-orange-A400`
- `alert-orange-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-orange-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-orange-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Orange color palette](#orange-color-palette)

---

### Deep Orange alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a deep orange alert variation.

**Primary colors**:

- `alert-deep-orange-500` to `alert-deep-orange-900` in `100` increments.
- use `alert-deep-orange-500` as the primary color.
- the higher the number, the darker the color.

**Accent colors**:

- `alert-deep-orange-A100`
- `alert-deep-orange-A200`
- `alert-deep-orange-A400`
- `alert-deep-orange-A700`

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-deep-orange-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-deep-orange-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Deep Orange color palette](#deep-orange-color-palette)

---

### Brown alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a brown alert variation.

**Primary colors**:

- `alert-brown-500` to `alert-brown-900` in `100` increments.
- use `alert-brown-500` as the primary color.
- the higher the number, the darker the color.

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-brown-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-brown-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Brown color palette](#brown-color-palette)

---

### Grey alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a grey alert variation.

**Primary colors**:

- `alert-grey-500` to `alert-grey-900` in `100` increments.
- use `alert-grey-500` as the primary color.
- the higher the number, the darker the color.

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-grey-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-grey-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Grey color palette](#grey-color-palette)

---

### Blue Grey alerts

Use any of the following CSS classes on any standard Bootstrap alert to get a blue grey alert variation.

**Primary colors**:

- `alert-blue-grey-500` to `alert-grey-900` in `100` increments.
- use `alert-blue-grey-500` as the primary color.
- the higher the number, the darker the color.

**Examples**:

```html
<!-- Filled -->
<div class="alert alert-blue-grey-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>

<!-- Stroked with colored text and lighter background color -->
<div class="alert alert-stroke alert-blue-grey-500" role="alert">
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
```

**Less variables**:

- [Blue Grey color palette](#blue-grey-color-palette)