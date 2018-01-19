---
categories:
- Code
- Design &amp; UX
- JavaScript
date: '2018-01-11'
title: Automatically expand a textarea as the user types using vanilla JavaScript
---

[Tommy Hodgins](https://twitter.com/innovati) shared a really neat little helper function with me that automatically expands a textarea as the user types in.

I made a few modifications to simplify it down a bit, and wanted to share it with you and how it works.

## The HTML

All you need in the way of markup for this is a humble `textarea` element.

```html
<textarea></textarea>
```

## The CSS

I give my textarea's just a little bit of styling.

A `min-height` ensures that at least a few lines of text show up to start. A `max-height` of `50vh` ensures the text area will never grow bigger than the viewport. I also like to add a `width` of `100%` so that the text area fills up the full width of the content area.

```css
textarea {
	min-height: 5em;
	max-height: 50vh;
	width: 100%;
}
```

## The JavaScript

Here's the fun part.

### Listening for changes to textareas

First, let's setup an event listener to detect changes to our `textarea` element. We'll use [event delegation](https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) to listen to all `input` events and then filter out ones that aren't on a textarea.

```js
document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
}, false);
```

If the element is a textarea, we'll call a new function we're going to create, `autoExpand()`, and pass in the element as an argument using `event.target`.

```js
document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);
```

### Auto-expanding the textarea

Now, we can setup our `autoExpand()` function.

```js
var autoExpand = function (field) {
    // Do things...
};
```

First, we need to reset the height of the textarea so that we can calculate how tall the content is/should be.

```js
var autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

};
```

To calculate our height, we need to get both the height of the content, and any borders and padding on the textarea that will affect its overall height.

We'll use `window.getComputedStyle()` to get styles for the textarea, and `scrollHeight` to calculate the height of the content itself.

We'll run all of the values through `parseInt()` to convert them to integers, and then add them up to get our total element height.

```js
	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);

	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
```

Finally, we'll set the height of our element using the `style` property.

```js
var autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);

	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

	field.style.height = height + 'px';

};
```

And that's it! [You can view a working demo here.](https://jsfiddle.net/cferdinandi/mqwwpL6u/)

## Browser Compatibility

This will work in all modern browsers, and IE9 and up. Thanks [Tommy](https://twitter.com/innovati)!