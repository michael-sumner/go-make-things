---
title: "How to polyfill the browser-native datalist autocomplete functionality"
date: 2018-06-22T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Vanilla Framework Demos
---

Yesterday, I showed you [a 100% browser-native, JavaScript-free way to add autocomplete functionality](/how-to-create-a-form-input-autocomplete-without-a-library-or-framework/) to your site.

Unfortunately, it only works in Chrome, Firefox, and IE11 and up. No support for Safari or Opera.

Today, let's look at how to polyfill support back to IE9.

## Prepping for older browsers

Some browsers, like Safari, don't support `datalist` but keep it hidden. Others, like IE9, remove the `option` elements and display all of the text inside them below your field.

Let's do two things to fix this. First, we'll use some CSS to make sure the `datalist` stays hidden.

```css
datalist {
	display: none;
}
```

Next, if we wrap our `option` elements in a `select` element, IE9 won't strip them out, *and* the `datalist` will still work as expected in modern, supporting browsers.

```html
<datalist>
	<select>
		<option>Alabama</option>
		<option>Alaska</option>
		<option>Arizona</option>
		...
	</select>
</datalist>
```

## Checking for browser support

Now we're ready to start coding. Let's first setup a function to hold our polyfill.

```js
var autocomplete = function () {

	'use strict';

};
```

The very first thing we want to do is check if the browser supports `datalist` natively. If so, we won't run our polyfill.

We'll test this by checking to see if `list` exists on `input` elements, and if `datalist` an element in the `window` (shoutout to [Thodoris Greasidis](https://github.com/thgreasi/datalist-polyfill) for this).

```js
var autocomplete = function () {

	'use strict';

	// Check if datalist is supported
	var supportsDatalist = function () {
		return 'list' in document.createElement('input') && !!(document.createElement('datalist') && window.HTMLDataListElement);
	};

	// Don't run if datalist is supported natively
	if (supportsDatalist()) return;

};
```

Cool, now we're ready to really do this.

## Creating a map of options

Now, let's grab all of the `input` elements on the page that have a `[list]` attribute. If there aren't any on the page, we'll quit.

```js
var autocomplete = function () {

	'use strict';

	// Check if datalist is supported
	var supportsDatalist = function () {
		return 'list' in document.createElement('input') && !!(document.createElement('datalist') && window.HTMLDataListElement);
	};

	// Don't run if datalist is supported natively
	if (supportsDatalist()) return;

	// Get all autocomplete fields
	var autocompletes = document.querySelectorAll('input[list]');
	if (autocompletes.length < 1) return;

};
```

Now we're ready to create that map of options. We'll pass our `autocompletes` fields into a `setup()` function.

```js
var autocomplete = function () {

	'use strict';

	// Check if datalist is supported
	var supportsDatalist = function () {
		return 'list' in document.createElement('input') && !!(document.createElement('datalist') && window.HTMLDataListElement);
	};

	// Don't run if datalist is supported natively
	if (supportsDatalist()) return;

	// Get all autocomplete fields
	var autocompletes = document.querySelectorAll('input[list]');
	if (autocompletes.length < 1) return;

	// Setup the DOM
	setup(autocompletes);

};
```

For each autocomplete field, we want to get the corresponding `datalist`.

To do that, we'll get the `list` attribute from the field, and pass it into `getElementById()`. Then, we'll use `querySelectorAll()` to search for `option` elements *just* within that element.

```js
var setup = function (autocompletes) {

	autocompletes.forEach(function (autocomplete) {

		var datalist = document.getElementById(autocomplete.getAttribute('list'));
		if (!datalist) return;

		// Get datalist options
		var options = datalist.querySelectorAll('option');
		if (options.length < 1) return;

	});

};
```

Now we want to create an array with our option values. We'll pass the NodeList of `option` elements through `Array.from()` to convert it to an array, and then use the `Array.map()` method to create a new array.

Each item in the new `optionsMap` array will contain the text from the corresponding `option` element.

```js
var setup = function (autocompletes) {

	autocompletes.forEach(function (autocomplete) {

		var datalist = document.getElementById(autocomplete.getAttribute('list'));
		if (!datalist) return;

		// Get datalist options
		var options = datalist.querySelectorAll('option');
		if (options.length < 1) return;

		// Create an array of available options
		var optionsMap = Array.from(options).map(function (option) {
			return option.textContent;
		});

	});

};
```

Finally, we'll add a new attribute to our `input`&mdash;`[data-list-map]`&mdash;with a stringified version of the `optionsMap` array as it's value.

This will let us quickly and easily get a list of options that we can parse with JavaScript.

```js
var setup = function (autocompletes) {

	autocompletes.forEach(function (autocomplete) {

		var datalist = document.getElementById(autocomplete.getAttribute('list'));
		if (!datalist) return;

		// Get datalist options
		var options = datalist.querySelectorAll('option');
		if (options.length < 1) return;

		// Create an array of available options
		var optionsMap = Array.from(options).map(function (option) {
			return option.textContent;
		});

		// Save the array to the DOM
		autocomplete.setAttribute('data-list-map', JSON.stringify(optionsMap));

	});

};
```

## Detecting when the user types in a field

Now, we need to show a list of options when the user types. We'll listen for `input` events, which fire whenever an input field changes in value.

Since we may have multiple autocomplete fields, we'll [use event delegation to listen to all events in the document and filter out the ones we don't need](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/). We'll create a `changeHandler()` function to handle this event.

```js
document.addEventListener('input', changeHandler, false);
```

In our `changeHandler()` method, we first need to check if the input has the map of options we created in the `setup()` method. If it doesn't, it's not an autocomplete field and we can bail.

```js
var changeHandler = function (event) {

	// Check if item has an options map
	var optionsMap = input.getAttribute('data-list-map');

	// Only run for inputs that have an associated datalist
	if (!optionsMap) return;

};
```

Next, we want to convert our string of data back into an array using `JSON.parse()`.

Then, we can use that data to render a list of options for the user. We'll pass the input and our data into a `renderAutocomplete()` helper method.

```js
var changeHandler = function (event) {

	// Check if item has an options map
	var optionsMap = event.target.getAttribute('data-list-map');

	// Only run for inputs that have an associated datalist
	if (!optionsMap) return;

	// Convert optionsMap string to an array
	optionsMap = JSON.parse(optionsMap);

	renderAutocomplete(event.target, optionsMap);

};
```

## Rendering the autocomplete options

Our `optionsMap` contains a full list of options, but based on what the user typed, only some of them will be viable choices.

Let's create a new array that only contains potential matches. To do this, we'll use the `Array.filter()` method on our `options`.

We want to do a case-insensitive comparison, so we'll convert each `option` *and* the `input` value itself to lower case with `toLowerCase()`. Next, we'll use `indexOf()` to check if the `input.value` exists in part or full in the `option`.

The `indexOf()` method returns `-1` if the item isn't found. Otherwise, it returns the index for where in the string the item starts. As long as it's not `-1`, we'll return the `option` to our new array.

```js
var renderAutocomplete = function (input, options) {

	// Get potential options
	var potentialOptions = options.filter(function (option) {
		return option.toLowerCase().indexOf(input.value.toLowerCase()) !== -1;
	});

	// If there are no options, quit
	if (potentialOptions.length < 1) return;

};
```

Next, we're going to create a list of items.

We'll setup our unordered list using `document.createElement()`. We'll give it a class of `autocomplete` and an `id` of `autocomplete-{datalist ID}`, using `getAttribute()` to get the input's `list` attribute.

Then, we'll through each potential option, create a list item with a button inside it (so that users can tab through the list with a keyboard), and our option as the value.

```js
var renderAutocomplete = function (input, options) {

	// Get potential options
	var potentialOptions = options.filter(function (option) {
		return option.toLowerCase().indexOf(input.value.toLowerCase()) !== -1;
	});

	// If there are no options, quit
	if (potentialOptions.length < 1) return;

	// Create list of options
	var select = document.createElement('ul');
	select.className = 'autocomplete';
	select.id = 'autocomplete-' + input.getAttribute('list');
	potentialOptions.forEach(function (option) {
		select.innerHTML += '<li><button>' + option + '</button></li>';
	});

};
```

Now we can add our list to the DOM.

We'll look for an existing list in the DOM, and if one exists, remove it using the `Element.remove()` method. Then we'll use the `Element.after()` method to inject the element into the DOM after our input.

```js
var renderAutocomplete = function (input, options) {

	// Get potential options
	var potentialOptions = options.filter(function (option) {
		return option.toLowerCase().indexOf(input.value.toLowerCase()) !== -1;
	});

	// If there are no options, quit
	if (potentialOptions.length < 1) return;

	// Create list of options
	var select = document.createElement('ul');
	var listID = input.getAttribute('list');
	select.className = 'autocomplete';
	select.id = 'autocomplete-' + listID;
	potentialOptions.forEach(function (option) {
		select.innerHTML += '<li><button>' + option + '</button></li>';
	});

	// Inject into the DOM
	var existing = document.getElementById('autocomplete-' + listID);
	if (existing) {
		existing.remove();
	}
	input.after(select);

};
```

Things are working, but this looks really ugly. Let's add some light styling to make it look nicer.

For the list itself, let's remove the bullets, and give a border and some light margin and padding tweaks. We don't want our buttons to look like buttons, we we'll remove any background or border, make them full width, and align the text to the left.

```css
.autocomplete {
	border: 1px solid #e5e5e5;
	list-style: none;
	margin: 0;
	padding: 5px;
	width: 100%;
}

.autocomplete button {
	background: none;
	border: none;
	display: block;
	text-align: left;
	width: 100%;
}
```

## Update the input when the user selects an option

When the user selects an item from the list, we need to actually update the field

Let's create a `click` event, and pass it into a `clickHandler()` function. This will fire when users hit `enter` or `return` on the button, too.

```js
document.addEventListener('click', clickHandler, false);
```

In the `clickHandler()` method we first want to check if the clicked item is a button in our `.autocomplete` list, and if not, quick.

Then, we'll look for the input that it belongs to. We'll do this by removing `autocomplete-` from the list ID, and using `querySelector()` to find the `input` whose `[list]` attribute value matches it.

```js
var clickHandler = function (event) {

	var list = event.target.closest('.autocomplete');
	if (!list) return;

	// Get input
	var input = document.querySelector('input[list="' + list.id.replace('autocomplete-', '') + '"]');
	if (!input) return;

};
```

If we find an element, we can set its value to the clicked button's `textContent`. Then we'll use `Element.remove()` to remove the list of options from the DOM, and `focus()` to bring focus back to the input.

```js
var clickHandler = function (event) {

	var list = event.target.closest('.autocomplete');
	if (!list) return;

	// Get input
	var input = document.querySelector('input[list="' + list.id.replace('autocomplete-', '') + '"]');
	if (!input) return;

	// Update the input
	input.value = event.target.textContent;

	// Remove the list from the DOM
	list.remove();

	// Return focus to the input
	input.focus();

};
```

## Hiding the list of options on blur

There's one last missing piece. When the user navigates out of the input, or out of the list of options, we want to hide the list.

To do this, we'll listen for `blur` events and pass them into a `blurHandler()` helper. `blur` events don't normally bubble, so we'll need to set `useCapture` to `true` to use event delegation.

```js
document.addEventListener('blur', blurHandler, true);
```

In our `blurHandler()`, we first want to make sure the event was run in either an `input` with the `[list]` attribute, or a button in our `.autocomplete` list. If not, we'll bail.

```js
var blurHandler = function (event) {
	if (!event.target.closest('input[list], .autocomplete')) return;
};
```

Since this gets called if the input blurs, we need to check if the list of autocomplete options is still in focus. If so, we don't have to do anything.

However, at the time the `blur` even fires, nothing has focus yet. So, we're going to wrap the rest of our code in a `setTimeout()` function that will run 1 ms later, after `focus` has changed.

```js
var blurHandler = function (event) {
	if (!event.target.closest('input[list], .autocomplete')) return;
	window.setTimeout(function () {
		// Do something...
	}, 1);
};
```

We're going to see if the item currently in focus (`document.activeElement`) is inside our `.autocomplete` list. If so, we'll bail.

Otherwise, we'll get the currently open `.autocomplete` list and use `remove()` to remove it from the DOM.

```js
var blurHandler = function (event) {
	if (!event.target.closest('input[list], .autocomplete')) return;
	window.setTimeout(function () {
		if (document.activeElement.closest('.autocomplete')) return;
		var autocomplete = document.querySelector('.autocomplete');
		if (!autocomplete) return;
		autocomplete.remove();
	}, 1);
};
```

[Here's a demo you can play with](http://jsfiddle.net/cferdinandi/x5mby01u/1/) in Safari or some other unsupported browsers.

<iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/x5mby01u/2/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Browser Compatibility

This polyfill works back to at least IE9, but does require some additional polyfills of its own.

You'll need to add polyfills for:

- `Array.forEach()` - https://vanillajstoolkit.com/polyfills/arrayforeach/
- `NodeList.forEach()` - https://vanillajstoolkit.com/polyfills/nodelistforeach/
- `Array.from()` - https://vanillajstoolkit.com/polyfills/arrayfrom/
- `Array.map()` - https://vanillajstoolkit.com/polyfills/arraymap/
- `Array.filter()` - https://vanillajstoolkit.com/polyfills/arrayfilter/
- `Element.after()` - https://vanillajstoolkit.com/polyfills/after/
- `Element.remove()` - https://vanillajstoolkit.com/polyfills/remove/

You can make life easier for yourself by using a polyfill service like [https://polyfill.io](https://polyfill.io), though you'll still need to polyfill [`NodeList.forEach()`](https://vanillajstoolkit.com/polyfills/nodelistforeach/) as that's not yet part of their package of polyfills.