---
title: Autogrowing textareas
date: 2021-10-29T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Three years ago, I shared [an approach for creating autoexpanding `textarea` elements with vanilla JS](/automatically-expand-a-textarea-as-the-user-types-using-vanilla-javascript/). On a recent project, I decided to search for a more modern way to automatically expand `textarea` elements as the user types, and stumbled upon [this solution from Stephen Shaw](https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/) that I think is far superior.

First, you wrap your `textarea` in a `div`.

```html
<label for="content">Type something</label>
<div class="autogrow">
	<textarea id="content"></textarea>
</div>
```

You use CSS Grid to link the sizing of the parent `div` and the `textarea` together. They'll both have the height of whichever one is biggest.

```css
.autogrow {
	display: grid;
}

.autogrow > textarea,
.autogrow::after {
	/* Add textarea styles here so that the textarea and div look the same */
	grid-area: 1 / 1 / 2 / 2;
}
```

Whenever the user types, you add that text to the a data attribute, `[data-replicated-value]`, on the parent `div`.

You could use an external event listener for this, but a simple `onInput` event works as well.

```html
<label for="content">Type something</label>
<div class="autogrow">
	<textarea id="content" onInput="this.parentNode.setAttribute('data-replicated-value', this.value)"></textarea>
</div>
```

Finally, you use the CSS `content` property and `attr()` function to display a copy of the `textarea` content after the `div`, but you visually hide it with `visibility: hidden`. 

This prevents it from being displayed or read aloud by screen readers, but it will still occupy space in the UI. The `white-space: pre-wrap` property is needed to ensure it wraps properly. We also want to prevent users from resizing the `textarea`, as that will break the link.

```css
.autogrow {
	display: grid;
}

.autogrow::after {
	content: attr(data-replicated-value) " ";
	white-space: pre-wrap;
	visibility: hidden;
}

.autogrow > textarea {
	resize: none;
}

.autogrow > textarea,
.autogrow::after {
	/* Add textarea styles here so that the textarea and div look the same */
	grid-area: 1 / 1 / 2 / 2;
}
```

One little quirk I found is that if the textarea is being preloaded with content, it will not be the expanded height on iOS. I added an `onload` event to fix that.

```html
<label for="content">Type something</label>
<div class="autogrow">
	<textarea id="content" onInput="this.parentNode.setAttribute('data-replicated-value', this.value)" onload="this.parentNode.setAttribute('data-replicated-value', this.value)"></textarea>
</div>
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExvvbaW)