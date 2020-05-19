---
title: "How to serialize form data into a search parameter string with vanilla JS"
date: 2020-05-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to serialize form data into an object with vanilla JS](/how-to-serialize-form-data-into-an-object-with-vanilla-js/).

Today, we're going to look at how to serialize it into a search parameter string.

## What's a search parameter string?

Yesterday's helper function resulted in an object, like this:

```js
var formData = {
	name: 'Harry Potter',
	password: 'Quidditch4lyfe'
};
```

A search parameter string would look like this:

```js
var formData = 'name=Harry%20Potter&password=Quidditch4lyfe';
```

## Creating a helper function

For this one, let's actually take yesterday's finished helper function and modify it.

This is our starting point. We'll rename it to `serializeSearch()`.

```js
var serializeSearch = function (form) {

	// Create an object
	var obj = {};

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

		// Handle multi-select fields
		if (field.type === 'select-multiple') {

			// Create an array of selected values
			var options = [];

			// Loop through the options and add selected ones
			Array.prototype.slice.call(field.options).forEach(function (option) {
				if (!option.selected) return;
				options.push(option.value);
			});

			// If there are any selection options, add them to the object
			if (options.length) {
				obj[field.name] = options;
			}

			return;

		}

		// If it's a checkbox or radio button and it's not checked, skip it
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;

		// Add the value to the object
		obj[field.name] = field.value;

	});

	// Return the object
	return obj;

};
```

## Creating an array of items

Instead of object, we want to return a string of parameters, each separated by an ampersand (`&`).

A simple way to do that is to create an array, push our items to it, and then use the `Array.join()` method with `&` as the separator.

```js
var serializeSearch = function (form) {

	// Create an array
	var arr = [];

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {
		// Do stuff with the fields...
	});

	// Return the array items as a string
	return arr.join('&');

};
```

## Add items to the array

Now we're ready to add items to our array.

Just like last time, we'll skip fields without a `name`, that are `disabled`, or that are of a field type we can ignore.

We'll also skip checkboxes and radio buttons that aren't `checked`.

```js
var serializeSearch = function (form) {

	// Create an array
	var arr = [];

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

		// Handle multi-select fields
		if (field.type === 'select-multiple') {
			// Do stuff with multi-select fields...
		}

		// If it's a checkbox or radio button and it's not checked, skip it
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;

		// Add the value to the object...

	});

	// Return the array items as a string
	return arr.join('&');

};
```

Otherwise, we'll create a string, with the `field.name` and `field.value` joined by an equals sign (`=`).

We'll pass both the `name` and `value` into the `encodeURIComponent()` method to encode any special characters, and we'll push the result into our array.

```js
var serializeSearch = function (form) {

	// Create an array
	var arr = [];

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

		// Handle multi-select fields
		if (field.type === 'select-multiple') {
			// Do stuff with multi-select fields...
		}

		// If it's a checkbox or radio button and it's not checked, skip it
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;

		// Add the field name and value to the array
		arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));

	});

	// Return the array items as a string
	return arr.join('&');

};
```

## Handling multi-select fields

Once again, `select` fields with the `multiple` attribute need special handling.

We _don't_ need to create an array of `options` this time.

Instead, we'll loop through each of the `field.options`. If it's `selected`, we'll combine its `value` with the `field.name` (again encoding both and joining them with an equals sign), and push it to the array.

```js
var serializeSearch = function (form) {

	// Create an array
	var arr = [];

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

		// Handle multi-select fields
		if (field.type === 'select-multiple') {

			// Loop through the options and add selected ones
			Array.prototype.slice.call(field.options).forEach(function (option) {
				if (!option.selected) return;
				options.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(option.value));
			});

		}

		// If it's a checkbox or radio button and it's not checked, skip it
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;

		// Add the field name and value to the array
		arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));

	});

	// Return the array items as a string
	return arr.join('&');

};
```

## Putting it all together

And without, we've got a working script to create a search parameter string from form data.

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/ExVGxOE) You can also [download the finished script on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/serialize/).

This will work in all modern browsers, and back to at least IE9.