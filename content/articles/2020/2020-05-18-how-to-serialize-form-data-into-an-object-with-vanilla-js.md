---
title: "How to serialize form data into an object with vanilla JS"
date: 2020-05-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [how to serialize form data into an object using the new `FormData()` object](/serializing-form-data-with-the-vanilla-js-formdata-object/). Unfortunately, it does not work in IE and there is no polyfill.

Today, we're going to look at a more backwards compatible way to serialize form data into an object using vanilla JS.

## Creating a helper method

Let's create a `serializeObject()` helper method that will accept the form itself as an argument.

```js
var serializeObject = function (form) {
	// We'll do some awesome stuff here...
};
```

Inside the function, we're going to create an object, push some field values into it, and then return the object.

```js
var serializeObject = function (form) {

	// Create an object
	var obj = {};

	// Add field values to it...

	// Return the object
	return obj;

};
```

## Looping through fields

Every form has an `elements` property that contains all of the fields in the form.

This returns what's called an `HTMLFormControlsCollection`, an array-like collection of form elements.

We want to loop through each of these fields, and I love using the `Array.forEach()` method, so I'm going to [convert the collection into an array](/using-array-methods-with-nodelists-in-vanilla-js/). Because we're aiming for IE support, I'm going to use the more backwards compatible `Array.prototype.call.slice()` trick instead of `Array.from()`.

```js
var serializeObject = function (form) {

	// Create an object
	var obj = {};

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {
		// Do stuff with the field...
	});

	// Return the object
	return obj;

};
```

## Handling fields

First, we want to ignore a few input types.

If the field has no `name` or is `disabled`, we'll skip. Similarly, if it's `type` is `file`, we should ignore it since that value will point to a local file and being meaningless.

We can also skip `submit` and `reset` inputs, as well as buttons.

```js
var serializeObject = function (form) {

	// Create an object
	var obj = {};

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

	});

	// Return the object
	return obj;

};
```

Next, if the field's `type` is `radio` or `checkbox`, we want to make sure it's `checked`. If not, we can also skip it.


```js
var serializeObject = function (form) {

	// Create an object
	var obj = {};

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

		// If it's a checkbox or radio button and it's not checked, skip it
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;

	});

	// Return the object
	return obj;

};
```

Otherwise, we'll add the `field.name` to the object, and use the field's `value` as it's value.

```js
var serializeObject = function (form) {

	// Create an object
	var obj = {};

	// Loop through each field in the form
	Array.prototype.slice.call(form.elements).forEach(function (field) {

		// Skip some fields we don't need
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;

		// If it's a checkbox or radio button and it's not checked, skip it
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;

		// Add the value to the object
		obj[field.name] = field.value;

	});

	// Return the object
	return obj;

};
```

## Handling multi-select fields

There's one edge case where this doesn't work: `select` fields with the `multiple` attribute.

If the field's `type` is `select-multiple`, we want to create an array of selected values. We'll create a new `options` array, then use the `Array.prrototype.slice.call()` trick again to loop through the select field's `options` property.

If the `option` is not `selected`, we'll skip it. Otherwise, we'll push it to the array.

```js
var serializeObject = function (form) {

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

Finally, if there's at least one item in the `options` array (which we can test using `options.length`), we'll push the array to our object with the select field's `name` as the key.

```js
var serializeObject = function (form) {

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

## Putting it all together

[Here's a demo of the whole script.](https://codepen.io/cferdinandi/pen/ExVOWzx) It works in all modern browsers, and back to at least IE9.

You can grab it any time you want [on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/serializeobject/).