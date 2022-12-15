---
title: How I use utility classes to write more efficient CSS
date: 2022-12-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

Today, I wanted to talk about my approach to CSS. It's a strategy I've fine tuned over a decade of working with the web, and helps me create websites and apps that are easier to build and maintain.

Let's dig in!

## Styling elements

I tend to broadly style elements directly whenever I want all elements of that type to look the same.

For example, in my designs, I often want all `input`, `select`, and `textarea` elements to be full-width elements with a slight margin at the bottom. I style those elements directly.

```css
input,
select,
textarea {
	display: block;
	width: 100%;
	margin: 0 0 0.5em;
}
```

Same thing with elements like tables. I want every `table` to have a similar look.

```css
table {
	border-collapse: collapse;
	border-spacing: 0;
	margin-bottom: 1em;
	max-width: 100%;
	width: 100%;
}
```

I _could_ use a class for these things, but why would I? It's extra code in my HTML to achieve the same exact result.

## Classes for components

Where I _do_ use classes is when I have a component that does not have a native element, and instead uses a `div` or `span` styled a specific way.

Grid layouts are a good example of that. Here's what the HTML for a grid with three equally sized columns typically looks like in my sites.

```html
<div class="row">
	<div class="grid-third">1</div>
	<div class="grid-third">2</div>
	<div class="grid-third">3</div>
</div>
```

I favor clear, obvious class names that overtly describe what they do. As my students have heard me say a million times, [readability is more important than brevity](/readability-is-more-important-than-brevity/).

The CSS for that might look something like this.

```css
.row {
	display: flex;
	margin-left: -1.4%;
	margin-right: -1.4%;
	justify-content: space-between;
}

.grid-third {
	margin-left: 1.4%;
	margin-right: 1.4%;
	width: 33.33333%;
}
```

I'm using [flexbox here, but CSS Grid would also be a great choice](/css-grid-vs.-flexbox-for-layout/), depending on what you're trying to do.

## Modifier classes

Sometimes, I have a typical presentation for a component, but occasionally need to modify it slightly. I use _modifier classes_ for that.

For example, perhaps I want the columns in my `.row` to have a specific markup order, but be displayed visually in reverse in the UI. I would create a `.row-reverse` class for that, and use it _with_ my `.row` class.

```html
<div class="row row-reverse">
	<div class="grid-third">1</div>
	<div class="grid-third">2</div>
	<div class="grid-third">3</div>
</div>
```

Here, the columns are displayed as `3 2 1` in the UI, but are written as `1 2 3` in the source code.

The CSS behind the `.row-reverse` class might look like this.

```css
.row-reverse {
	flex-direction: row-reverse;
}
```

I use modifier classes for elements, too, not just components.

For example, I style my `table` elements directly, but have a `.table-striped` class I can use to add zebra stripes to them.

```html
<table class="table-striped">
	<!-- ... -->
</table>
```

The CSS for it looks like this.

```css
/**
 * Adds zebra striping
 */
.table-striped tbody tr:nth-child(odd) {
	background-color: #e5e5e5;
}
```

Modifier classes are designed to work with specific elements or components, and typically wouldn't work if applied to other parts of the design.

## Utility classes

Utility classes are the workhorses of my CSS. I use them to nudge-and-tweak my designs in very general ways for a variety of elements or components.

They typically do things like...

- Modify margin or padding
- Adjust font-size
- Center and align things

For example, the `.margin-bottom` class adds or adjusts the bottom margin on an element.

```html
<div class="row margin-bottom">
	<!-- ... -->
</div>
```

The CSS for it looks like this.

```css
.margin-bottom {
	margin-bottom: 1em;
}
```

This could be used on a wide variety of elements and components, not just my grid layouts.

If I wanted to align my text to the right and display it in all-caps, I might do this.

```html
<p class="text-right text-capitalize">Hello, world!</p>
```

And the utility classes used here look like this.

```css
.text-capitalize {
	text-transform: capitalize;
}

.text-right {
	text-align: right;
}
```

I _could_ create element or component styles to do the same thing, but these are little adjustments that I'd likely make across a wide range of stuff in my design.

Utility classes let me keep my CSS smaller, and my designs for consistent.

## One last little trick!

Using the right heading element is important for accessibility.

If your last heading was an `h2`, and you're using a heading to show some content that's a subsection of it, you should use an `h3`.

```html
<h2>Hip-Hop</h2>
<p>...</p>

<h3>Top 10 best rappers of all time</h3>
<p>...</p>

<h3>Bad rappers who are for some reason popular anyways</h3>
<p>...</p>
```

But sometimes, you want a heading that looks like a different heading level than it should be semantically. For example, I might want headings that look like `h5` level headings, even though semantically they need to be `h3`.

**Heading levels should _never_ be used for style. They always convey semantic meaning.**

I define _heading classes_ alongside my element styles. Every heading level has a matching class. 

```css
h1,
.h1 {
	font-size: 1.5em;
	padding-top: 0.5em;
}

h2,
.h2 {
	font-size: 1.3125em;
	padding-top: 1em;
}

h3,
.h3 {
	font-size: 1.1875em;
}

h4, h5, h6,
.h4, .h5, .h6 {
	font-size: 1em;
}

h4,
.h4 {
	font-size: 0.8125em;
	text-transform: uppercase;
}
```

Because classes have more specificity than elements, I can use them to modify the appearance of a heading element while maintaining it's semantic meaning.

```html
<h2>Hip-Hop</h2>
<p>...</p>

<h3 class="h5">Top 10 best rappers of all time</h3>
<p>...</p>

<h3 class="h5">Bad rappers who are for some reason popular anyways</h3>
<p>...</p>
```

## What is this approach called?

I don't have a cute name for how I write CSS, but I should probably come up with one!