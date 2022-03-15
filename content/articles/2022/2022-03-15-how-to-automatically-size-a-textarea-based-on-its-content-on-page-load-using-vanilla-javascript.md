---
title: How to automatically size a textarea based on its using vanilla JavaScript
date: 2022-03-15T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Last year, I wrote an article sharing [Stephen Shaw's awesome trick for simple, autogrowing `textarea` elements](/autogrowing-textareas/).

It uses a wrapper element, CSS grid, and a sprinkling of vanilla JS, and it works wonderfully! _But..._ if your `textarea` has text in it when the page loads, it doesn't work.

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

```html
<label for="content">Type something</label>
<div class="autogrow">
	<textarea id="content" onInput="this.parentNode.setAttribute('data-replicated-value', this.value)"></textarea>
</div>
```

The fix? A function with five lines of JavaScript that assign a default `[data-replicated-value]` value for each `.autogrow` field.

```js
function setAutogrow () {
	let autogrow = document.querySelectorAll('.autogrow');
	for (let field of autogrow) {
		if (!field.value) continue;
		field.setAttribute('data-replicated-value', field.value);
	}
}
```

Run this after your HTML loads, and any `textarea` elements with text in them will automatically resize to match the text size.