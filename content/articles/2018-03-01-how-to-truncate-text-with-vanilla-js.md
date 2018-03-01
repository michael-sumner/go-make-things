---
title: "How to truncate text with vanilla js"
date: 2018-03-01T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

The CSS `text-overflow` property provides [a relatively easy way to truncate content](https://jsfiddle.net/cferdinandi/b46u4vjc/2/).

[It's not without problems, though.](https://medium.com/mofed/css-line-clamp-the-good-the-bad-and-the-straight-up-broken-865413f16e5) It only works for a single line of text (you can't truncate after several lines), and it will truncate in the middle of a word instead of at the end of one.

Today, I want to share a simple JavaScript approach to truncating content.

## Setup our markup

First, let's setup some simple markup to use. I went and grabbed some dummy text from the [Pirate Ipsum website](https://pirateipsum.me/), and added it to a `div` with the `.truncate` class.

You can use any selector you'd like. Just make sure there's a way to target the content to truncate.

```html
<div class="truncate">
	Port tender gun spanker lanyard heave to topmast. Heave down draught piracy loaded to the gunwalls mizzenmast topsail Brethren of the Coast. Lanyard snow Jack Ketch swing the lead maroon spike black jack.
</div>
```

## Creating a `truncate()` function

Let's setup a `truncate()` function, and pass in two arguments.

The first, `elem`, will be the element whose content we want to truncate. The second, `limit`, will be the number of words to truncate the content by. If either of those is missing, we'll end the function.

```js
var truncate = function (elem, limit) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

};
```

If we, for example, wanted to limit our `.truncate` content to just seven words, we would do this.

```js
var elem = document.querySelector('.truncate');
truncate(elem, 7);
```

## Truncating the content

Next, we need a way to get the content from our element.

I often use `innerHTML` for this sort of thing, but we only want the text, not the markup. If we, for example, got content that had an opening `div` element, and split it before the closing element, we could cause layout issues.

For this, we'll use the `textContent` property. Let's also remove any leading or trailing whitespace with the `trim()` method.

```js
var truncate = function (elem, limit) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent.trim();

};
```

Now we're ready to truncate our content.

To do this, we'll convert our string of text into an array, with each word as it's own item. We'll use the `split()` method, passing in a space as the character to split our string by.

```js
var truncate = function (elem, limit) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent.trim();

	// Convert the content into an array of words
	content = content.split(' ');
	console.log(content);

};
```

If you logged `content` into the console, you would get back an array of words. [See it in action here.](https://jsfiddle.net/cferdinandi/47mwvjj6/6/)

The `.slice()` method lets you create a new array, that's a subset of another one. It accepts two arguments. The first is where to start, and the second is where to end.

We'll pass in `0` as the starting point to start with the first word. We'll pass in our `limit` argument as the ending point. We can chain this method to the `split()` method to keep the code smaller.

```js
var truncate = function (elem, limit) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent.trim();

	// Convert the content into an array of words
	// Remove any words above the limit
	content = content.split(' ').slice(0, limit);
	console.log(content);

};
```

If you log `content` to the console now, you'll notice it only has seven items instead of the original 33. [Here's an updated demo.](https://jsfiddle.net/cferdinandi/47mwvjj6/8/)

## Injecting our truncated content back into the DOM

Now that we've truncated our content, we need to add it back into the DOM.

We'll convert it back into a string using the `join()` method, which combines array items into a string. We'll pass in a space as a delimiter (what it will add between each item).

```js
var truncate = function (elem, limit) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent.trim();

	// Convert the content into an array of words
	// Remove any words above the limit
	content = content.split(' ').slice(0, limit);

	// Convert the array of words back into a string
	content = content.join(' ');

};
```

Now we can inject it back into the DOM with the same `textContent` property we used to get our content.

```js
var truncate = function (elem, limit) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent.trim();

	// Convert the content into an array of words
	// Remove any words above the limit
	content = content.split(' ').slice(0, limit);

	// Convert the array of words back into a string
	content = content.join(' ');

	// Inject the content back into the DOM
	elem.textContent = content;

};
```

[Here's a demo with our new truncated content.](https://jsfiddle.net/cferdinandi/47mwvjj6/10/)

## Adding trailing characters

There's on weird thing about our new truncated content: it ends abruptly. Ideally, we would add some characters after it to indicate that it's been truncated, like ellipsis (`...`);

Let's add one more optional argument to our function: `after`.

If it exists, we'll append our newly joined content with. Otherwise, we'll just append an empty string. I'll be using a [ternary operator](/ternary-operators/) to keep the code a bit more compact.

```js
var truncate = function (elem, limit, after) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent.trim();

	// Convert the content into an array of words
	// Remove any words above the limit
	content = content.split(' ').slice(0, limit);

	// Convert the array of words back into a string
	// If there's content to add after it, add it
	content = content.join(' ') + (after ? after : '');

	// Inject the content back into the DOM
	elem.textContent = content;

};
```

Now we can truncate our content like this.

```js
var elem = document.querySelector('.truncate');
truncate(elem, 7, '...');
```

[Here's a demo of the final script in action.](https://jsfiddle.net/cferdinandi/47mwvjj6/13/)

## Browser Compatibility

The `textContent` and `trim()` method both require IE9 or higher.

There's [a polyfill for `trim()`](https://vanillajstoolkit.com/polyfills/stringtrim/) that pushes support back to at least IE6. Older versions of IE use the `innerText` property instead of `textContent`. You can modify the script to support IE6+ by checking which one is supported and using that.

```js
/**
 * String.prototype.trim() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
 */
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

var truncate = function (elem, limit, after) {

	// Make sure an element and number of items to truncate is provided
	if (!elem || !limit) return;

	// Get the inner content of the element
	var content = elem.textContent || elem.innerText;
	content = content.trim();

	// Convert the content into an array of words
	// Remove any words above the limit
	content = content.split(' ').slice(0, limit);

	// Convert the array of words back into a string
	// If there's content to add after it, add it
	content = content.join(' ') + (after ? after : '');

	// Inject the content back into the DOM
	if (elem.textContent) {
		elem.textContent = content;
	} else {
		elem.innerText = content;
	}

};
```