---
title: "How to serialize form data with vanilla JS"
date: 2018-10-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I'm going to teach you how to get form data as a string of encoded key/value pairs. This is useful when you want to submit a form with Ajax or save the data for use later.

## A helper function

Let's `serialize()` helper function makes this really easy. Pass in the form element, and it spits out a string for you.

```js
var form = document.querySelector('#my-form');
var formData = serialize(form);

// Logs something like this:
// name=Mike%20Wazowski&address=123%20Scare%20Avenue%2C%20Monstropolis&email=mikew%40monstersinc.com
console.log(formData);
```

## How it works

First, I set up an array, `serialized` to push each field and it's value into.

Then, I use a `for` loop to loop through each item in the `form.elements` HTMLCollection. The `Form.elements` property returns all of the elements inside the form.

If a field in the loop doesn't have a name or is disabled, I skip it. I also ignore a few field types, including file uploads, reset and submit inputs, and buttons.

If the field is a multi-select, I loop through each option. If it's selected, push it's name and value as a key/value pair to the `serialize` array. Before doing so, I run both the `field.name` and `field.value` through `encodeURIComponent()` to replace spaces and other special characters with entities.

Otherwise, if the type is a radio or checkbox, and it's checked, or if it's some other type of input, I also push a new key/value pair string to the `serialized` array. I again make sure to encode them before adding them.

Finally, I run the `join()` method on the array, using an ampersand (`&`) as the delimiter, and return the resulting string.

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

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/ePoemY)