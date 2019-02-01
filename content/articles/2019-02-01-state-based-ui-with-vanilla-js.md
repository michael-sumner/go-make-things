---
title: "State-based UI with vanilla JS"
date: 2019-02-01T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Yesterday, we looked at [the difference between manual DOM manipulation and state-based UI](/state-based-ui-vs.-manual-dom-manipulation/).

Today, let's take [our manual DOM project](https://codepen.io/cferdinandi/pen/yZgQyY) and convert it to state-based UI using some simple vanilla JS techniques.

## The approach

To make this work, we need three things:

1. A data object.
2. A template for how the UI should look based on different data states.
3. A function to render the template into the DOM.

This is, at a high level, how bigger JS frameworks like React and Vue work, too. We'll be pulling out some of their conventions and approaches into small vanilla JS helper functions instead.

## Updating our starting markup

The original starting markup had an empty unordered list that we added list items to.

```html
<ul id="list"></ul>
```

With a state-based UI approach, we'll add the unordered list dynamically only if there are list items to show. Otherwise, we'll display a welcome message to the user.

Let's switch that over to an empty `div`.

```html
<div id="list"></div>
```

## Creating the data object

For our super simple app, we only need on property in our data object: `listItems`. By default, it will be an empty array that will eventually hold our list items.

```js
var data = {
	listItems: []
};
```

## Creating a template

When working with dynamic data, the template should be a function that returns a string. When called it, it will use the `data` object to create a markup string.

In our case, we need two UI states: one for when there are list items, and one for when there are not.

If there *are* list items, we'll [use `Array.map()` to create a new array](/the-es6-way-to-create-a-new-array-and-transform-the-content-with-vanilla-javascript/) with our list items, and then use the `join()` method to merge them all together into one big string.

```js
var template = function () {

	// If there are no list items
	if (data.listItems.length < 1) return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';

	// If there are
	return '<ul>' + data.listItems.map(function (item) {
		return '<li>' + item + '</li>';
	}).join('') + '</ul>';

};
```

## Rendering the DOM

Now, we're ready to render our UI into the DOM.

Inside our `render()` function, we'll find the `#list` element in the DOM. Then we'll set its `innerHTML` to the output of our `template()` function.

```js
var render = function () {
	var list = document.querySelector('#list');
	if (!list) return;
	list.innerHTML = template();
};
```

And we can render our initial UI like this.

```js
render();
```

[Here's a working demo on CodePen.](https://codepen.io/cferdinandi/pen/omZJGO)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="omZJGO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Aburdly limited list-making app with state-based UI"></p>

## Updating the UI when the user adds items

Now we're ready to add some interactivity.

Like with the manual approach, we still need our event listener. But instead of manually injecting elements into the DOM, we'll add items to our `data` object and render the UI again.

```js
document.addEventListener('submit', function (event) {

	// Make sure the submitted form was for our list items
	if (!event.target.matches('#add-to-list')) return;

	// Stop the form from submitting
	event.preventDefault();

	// Get the list item
	var item = event.target.querySelector('#list-item');
	if (!item || item.length < 1) return;

	// Update the data and UI
	data.listItems.push(item.value);
	render();

	// Clear the field and return to focus
	item.value = '';
	item.focus();

}, false);
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/exvbwP)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="exvbwP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Aburdly limited list-making app with state-based UI"></p>

## Making sure screen readers know about the changes

One thing about this approach is that while sighted users can see when things in the UI change, someone using a screen reader might not know about them.

We can tell screen readers to detect and announce these UI changes by adding the `aria-live` attribute to our `#list` element. We'll use the `polite` value, so that announcements happen after the user is done completing their actions.

```html
<div id="list" aria-live="polite"></div>
```

## WARNING! Sanitize your data!

When using `innerHTML` with user-provided or third-party data, [you can expose yourself to cross-siting scripting attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/).

There are two ways to fix this:

1. Strip all HTML out of the user data [using a helper function](https://vanillajstoolkit.com/helpers/sanitizehtml/).
2. Use a library like [DOMPurify](https://github.com/cure53/DOMPurify) to remove malicious code in your template.

If the third-party content can have markup in it, option two is your best bet. You would do something like this.

```js
var template = function () {

	// If there are no list items
	if (data.listItems.length < 1) return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';

	// If there are
	return '<ul>' + DOMPurify.sanitize(data.listItems.map(function (item) {
		return '<li>' + item + '</li>';
	}).join('')) + '</ul>';

};
```

In our case, list items shouldn't have markup around them, so we can use a helper function to strip any out before add them to our `data` object.

```js
/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

document.addEventListener('submit', function (event) {

	// Make sure the submitted form was for our list items
	if (!event.target.matches('#add-to-list')) return;

	// Stop the form from submitting
	event.preventDefault();

	// Get the list item
	var item = event.target.querySelector('#list-item');
	if (!item || item.length < 1) return;

	// Update the data and UI
	data.listItems.push(sanitizeHTML(item.value));
	render();

	// Clear the field and return to focus
	item.value = '';
	item.focus();

}, false);
```

To test this out, use [this new demo with sanitization](https://codepen.io/cferdinandi/pen/ZwewWV).

Try pasting `<img src="#" onerror="alerts('XSS!')">` as a list item. For comparison, also try it with the earlier version above.

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="ZwewWV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Aburdly limited list-making app with state-based UI"></p>

## Bolting in features

The state-based UI approach makes it much easier to bolt in features.

For example, let's say we wanted to save our data to `localStorage`. In the render method, we can save our updated state every time a new render happens.

```js
var render = function () {

	// Render the UI
	var list = document.querySelector('#list');
	if (!list) return;
	list.innerHTML = template();

	// Save to localStorage
	localStorage.setItem('list', JSON.stringify(data));

};
```

Before our initial render, we can check for data in `localStorage` and update the `data` object with it.

```js
// Check for saved list items
var savedData = localStorage.getItem('list');
if (savedData) {
	data = JSON.parse(savedData);
}

// Render the UI
render();
```

[And you can see it in action here.](https://codepen.io/cferdinandi/pen/WPpPRJ) Add some items, reload the page, and watch how they're loaded back into the UI automatically.

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="WPpPRJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Aburdly limited list-making app with state-based UI"></p>