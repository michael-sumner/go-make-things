---
title: "My CSS methodology"
date: 2018-11-13T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- Web Performance
---

Yesterday, I wrote about [my preference for using CSS over JavaScript whenever possible](/when-to-use-css-vs.-javascript/) (and when it's actually a bad idea to do so).

One other question I've gotten a fair bit about how I use CSS is what my methodology or approach to CSS is.

Here's the short version:

1. Utility classes for almost everything.
2. A simplified element/modifier structure for frequently used components.

Let's dig in.

## Object-Oriented CSS

[Object-Oriented CSS (or OOCSS) is the brain-child of Nicole Sullivan.](https://www.slideshare.net/stubbornella/object-oriented-css/)

<iframe src="//www.slideshare.net/slideshow/embed_code/key/EUTjDAdG7npnxS" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

When I first learned about this approach, it completely changed how I write code.

At it's heart, OOCSS is about creating small, modular classes that you can use like Legos. Combine them in different ways to create components.

Nicole rarely gets the credit she deserves for this. OOCSS is the foundation of BEM, SMACSS, Atomic Design, and Utility-First CSS. All of them are just repackaging her original work with some slight modifications.

## Utility-First CSS

The backbone of how I write CSS is utility classes.

When thinking about a component, I try to break it down into it's parts: padding, margins, borders, font sizes, alignment.

I can often construct a component using the core utility classes I include in every project. Sometimes, I need to add one or two more (which can then be reused on other components, too).

Here's an example of some utility classes I typically include in my projects.

```css
/**
 * Margins
 */
.margin-bottom {
	margin-bottom: 1em;
}

.margin-bottom-large {
	margin-bottom: 2em;
}

.margin-bottom-small {
	margin-bottom: 0.25em;
}

/**
 * Padding
 */
.padding {
	padding: 1em;
}

.padding-small {
	padding: 0.5em;
}

/**
 * Borders and Backgrounds
 */
.border {
	border: 1px solid #e5e5e5;
}

.bg-muted {
	background-color: #f7f7f7;
}

.bg-dark {
	background-color: #272727;
	color: #ffffff;
}

/**
 * Text Alignment
 */
.text-center {
	text-align: center;
}

.text-right {
	text-align: right;
}

/**
 * Text Size
 */
.text-small {
	font-size: 0.875em;
}

.text-large {
	font-size: 1.1875em;
}
```

Let's say I needed a container with a light-gray background, a border, and some padding to hold some content. Here's how I might mark that up.

```html
<div class="bg-muted padding border margin-bottom">
	<strong class="text-large">What's the answer to life the universe and everything?</strong>
	<br>
	42.
</div>
```

## Isn't that a lot of classes on an element?

Yes, it is.

A typical stylesheet might have one class to capture all of that stuff.

```css
.callout {
	background-color: #f7f7f7;
	border: 1px solid #e5e5e5;
	margin-bottom: 1em;
	padding: 1em;
}
```

But a typical stylesheet also has one of two problems:

1. The same styles are used on various components.
2. Different values are used for the same properties on different components.

### Keeping CSS DRY

DRY is an acronym for *Don't Repeat Yourself*. In CSS, you'll often see things like this.

```css
.callout {
	background-color: #f7f7f7;
	border: 1px solid #e5e5e5;
	margin-bottom: 1em;
	padding: 1em;
}

.header {
	background-color: #f7f7f7;
	margin-bottom: 1em;
}

.sidebar {
	border: 1px solid #e5e5e5;
	margin-bottom: 1em;
	padding: 1em;
}
```

That's a lot of repeated code!

In JavaScript, we create small, modular functions that can be reused throughout the code base to keep our code DRY. In CSS, for some reason, it's not seen as weird in the slightest to repeat yourself a lot.

Utility classes help keep CSS DRY.

The stylesheet for my website is *so* small that I can inline *all* of my CSS still send most of the page in a single HTTP request.

### Different values for the same properties

Another common problem is that different components end up with different values for the same properties, resulting in visual inconsistency through a site or app.

This is particularly common when teams of developers are all working on different parts of a project.

```css
.callout {
	background-color: #f7f7f7;
	border: 1px solid #e5e5e5;
	margin-bottom: 1em;
	padding: 1em;
}

.header {
	background-color: #f9f9f9;
	margin-bottom: 1.2em;
}

.sidebar {
	border: 1px solid #808080;
	margin-bottom: 1.35em;
	padding: 0.9em;
}
```

Utility classes make it easier to consistently apply the same visual design across an entire website.

## Element/Modifier Components

My approach is *utility-first*, not *utility-only*.

There are times where, for practical reasons, it's not desirable to style things with only utility classes.

Buttons, for example, are used often and would require numerous utility classes to style properly. The opportunity to style them *wrong* by missing a class is too high. And making visual changes would potentially require changing many classes across an entire website.

For things like that, I use a *component* or *element* class.

```css
.btn {
	background-color: #0088cc;
	border: 1px solid #0088cc;
	color: #ffffff;
	display: inline-block;
	font-size: 0.9375em;
	font-weight: normal;
	margin-right: 0.3125em;
	padding: 0.5em 0.6875em;
}
```

Then, I use *modifier classes* to nudge and tweak the design.

Using buttons as an example, I have a classes to...

- Change the color for my primary blue to my secondary color, red.
- Make the buttons bigger or smaller.
- Make them full-width.

```css
.btn-secondary {
	background-color: #f7272f;
	border-color: #f7272f;
}

.btn-small {
	padding: 0.25em 0.5em;
}

.btn-large {
	font-size: 1em;
	padding: 0.875em 1em;
}

.btn-block {
	display: block;
	margin-right: 0;
	width: 100%;
}
```

Like utility classes, modifier classes can be mixed-and-matched like Legos. Unlike utility classes, they're scoped to the element.

```html
<button class="btn btn-large btn-block">A large full-width button</button>
<button class="btn btn-secondary btn-small">A small red button</button>
```

This is more-or-less how BEM works, but I avoid the complicated namespacing rules they use with double dashes and underscores and such.

I tend to use this approach for components that are going to be used often *and* require more than three utility classes.

## Guidelines, not rules

I try not to be too dogmatic about code.

I feel strongly that starting with utility classes makes for both a better developer experience and a more performant and visually consistent site.

But sometimes I use and element/modifier approach even when utility classes would suffice.

Think of these as guidelines to help you make smarter decisions. As you get more comfortable with utility classes, you'll learn when to deviate from the guidelines and do something different.