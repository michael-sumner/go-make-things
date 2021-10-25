---
title: The css :not() pseudo-selector
date: 2021-10-25T10:30:00-04:00
draft: false
categories:
- Code
- CSS
---

I don't work with CSS much, but whenever I do, I'm continually blown away by how much easier modern CSS is now than it was five years ago.

I was working on a side-project this weekend, and the `:not()` pseudo-selector made my life a lot easier!

## What the `:not()` pseudo-selector does

The `:not()` pseudo-selector lets you select elements, but exclude ones that match an additional set of selectors. Pass in the selectors to ignore as an argument.

For example, this will make links purple, but not ones with the `.not-purple` class.

```css
a:not(.not-purple) {
	color: rebeccapurple;
}
```

```html
<a href="#">I will be purple</a>
<a class="not-purple" href="#">I will be my normal color</a>
```

## A practical example

For example, my side-project has `.app-logged-in` and `.app-logged-out` classes that show or hide elements depending on whether the parent `html` element has the `.is-logged-in` class on it.

Historically, it looked like this.

```css
.is-logged-in .app-logged-out,
.app-logged-in {
	display: none;
}

.is-logged-in .app-logged-in {
	display: block;
}
```

Here, I'm setting my elements to not display, then forcing them to display again when certain conditions are met.

Using `:not()`, I can simply this pattern. Instead of hiding the `.app-logged-in` element by default, and showing it if `.is-logged-in` is present, I can hide it _only_ if the `.is-logged-in` class is not present on the `html` element.

```css
.is-logged-in .app-logged-out,
html:not(.is-logged-in) .app-logged-in {
	display: none !important;
}
```

Modern CSS continues to amaze me!