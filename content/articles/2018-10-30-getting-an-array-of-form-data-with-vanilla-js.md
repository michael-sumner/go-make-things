---
title: "Getting an array of form data with vanilla JS"
date: 2018-10-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to serialize form data into a string with vanilla JS](/how-to-serialize-form-data-with-vanilla-js/). Today, we're going to look at get an array of form data instead.

To do so, we're going to take the `serialize()` helper method we created yesterday and modify to return an array.

## `serialize()`

In case you missed it, here's yesterday's `serialize()` method ([also available on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/serialize/)).

```js
/*!
 * Serialize all form data into a query string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
var serialize = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized.join('&');

};
```

Let's make a few modifications to it to return an array instead of a string.

## `serializeArray()`

We want `serializeArray()` to return an array of objects. Each object will contain two keys---`name` and `value`---that contain the name and value of the field, respectively.

There are two changes we need to make to our `serialize()` helper method:

1. Instead of a string, we'll add an object to the `push()` method.
2. We *won't* use the `join()` method when returning the array.

[Here's the updated method.](https://vanillajstoolkit.com/helpers/serializearray/)

```js
/*!
 * Serialize all form data into an array
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
var serializeArray = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push({
					name: field.name,
					value: field.options[n].value
				});
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push({
				name: field.name,
				value: field.value
			});
		}
	}

	return serialized;

};
```

[And here's a demo for you to play with.](https://codepen.io/cferdinandi/pen/ePoemY)