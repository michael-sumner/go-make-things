---
title: "A vanilla JS alternative to HandlebarsJS and MustacheJS"
date: 2018-08-06T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Vanilla Framework Demos
---

[Handlebars](https://handlebarsjs.com/) and [Mustache](https://mustache.github.io/) are JavaScript templating systems. They let you pass in variables (wrapped in double curly brackets: `{{someVariable}}`) that get replaced with real content.

```html
<div class="entry">
	<h1>{{title}}</h1>
	<div class="body">
		{{{body}}}
	</div>
</div>
```

```html
<div class="entry">
	<h1>Hello, world!</h1>
	<div class="body">
		<p>You look nice today!</p>
	</div>
</div>
```

Today, I wanted to show you a lightweight vanilla JS alternative.

## placeholders.js

[Placeholders.js](https://vanillajstoolkit.com/helpers/placeholders/) is a scant 150 bytes (that is, a fraction of a KB) after minification and gzipping.

First, I'm going to show you how to use it, then I'll show you how it works under the hood.

*__Psst...__ placeholder.js pairs quite nicely with [Reef.js](https://github.com/cferdinandi/reef) templates.*

### How to use it

First, provide data as an object of keys and values. You can use nested objects if desired. Then, setup a template as a string (or function that returns a string).

In that template, use variables wrapped in double curly brackets (`{{variable}}`) as placeholders for the key you want to replace it with from your data. Use dot notation for nested objects.

```js
var data = {
	greeting: 'Hello',
	name: 'World',
	time: new Date().toLocaleTimeString(),
	details: {
		mood: 'happy',
		food: 'a turkey sandwich'
	}
};

var template = function () {
	return '{{greeting}}, {{name}}! It is currently {{time}}. {{not.exist}} You are {{details.mood}} to eat {{details.food}}.';
};
```

To replace your placeholders with real content from your data, pass both the template and the data into the `placeholders()` function to get back a new string.

```html
<div id="app"></div>
```

```js
var app = document.querySelector('#app');
app.innerHTML = placeholders(template, data);
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/ejrEGQ)

<p data-height="265" data-theme-id="light" data-slug-hash="ejrEGQ" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Demo of simple placeholderJS template" class="codepen"></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### How it works

First, I check to see if the `template` variable is a string or function.

If it's a function, I convert it into a string. Then I check to make sure there's a valid template, and if not, throw an error.

```js
/**
 * Replaces placeholders with real content
 * @private
 * @param {String} template The template string
 * @param {String} local    A local placeholder to use, if any
 */
var placeholders = function (template, data) {

	'use strict';

	// Check if the template is a string or a function
	template = typeof (template) === 'function' ? template() : template;
	if (['string', 'number'].indexOf(typeof template) === -1) throw 'PlaceholdersJS: please provide a valid template';

};
```

Next, I check to make sure data was provided, and if not, return the template as-is.

```js
/**
 * Replaces placeholders with real content
 * @private
 * @param {String} template The template string
 * @param {String} local    A local placeholder to use, if any
 */
var placeholders = function (template, data) {

	'use strict';

	// Check if the template is a string or a function
	template = typeof (template) === 'function' ? template() : template;
	if (['string', 'number'].indexOf(typeof template) === -1) throw 'PlaceholdersJS: please provide a valid template';

	// If no data, return template as-is
	if (!data) return template;

};
```

Now, we need to replace the placeholders in the template with content from the `data` object.

We'll use the `replace()` method to find our variables, and pass in a callback function to handle replacing them. This pattern will match double curly brackets *only* if they have something between them.

```js
/\{\{([^}]+)\}\}/g
```

The matched item gets passed into the callback function as an argument. We'll look at how to handle that in a second.

Once we're done replacing things, we can return the `template` string.

```js
/**
 * Replaces placeholders with real content
 * @private
 * @param {String} template The template string
 * @param {String} local    A local placeholder to use, if any
 */
var placeholders = function (template, data) {

	'use strict';

	// Check if the template is a string or a function
	template = typeof (template) === 'function' ? template() : template;
	if (['string', 'number'].indexOf(typeof template) === -1) throw 'PlaceholdersJS: please provide a valid template';

	// If no data, return template as-is
	if (!data) return template;

	// Replace our curly braces with data
	template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {
		// Do something with our matched placeholders...
		console.log(match);
	});

	return template;

};
```

### How replacing content works

If you log each matched item in the callback, you'll get the full placeholder item.

```js
// Replace our curly braces with data
template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {
	console.log(match);
});

// logs {{greeting}}, {{name}}, {{time}}, etc...
```

First, we need to remove the leading and trailing curly brackets. We'll assign a new string to `match`, using the `slice()` method to get a substring of the original.

```js
// Replace our curly braces with data
template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {

	// Remove the wrapping curly braces
	match = match.slice(2, -2);

});
```

The way we handle each placeholder will differ depending on whether it's a nested object or not.

We'll split the `match` into an array with the `split()` method, using the dot (`.`) as our delimiter. If there's more than one item, the placeholder is for a nested object. Otherwise, it's a top-level key in the `data` object.

```js
// Replace our curly braces with data
template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {

	// Remove the wrapping curly braces
	match = match.slice(2, -2);

	// Check if the item has sub-properties
	var sub = match.split('.');

	// If the item has a sub-property, loop through until you get it
	if (sub.length > 1) {
		// Do something...
	}

	// Otherwise, return the item
	else {
		// Do something else...
	}

});
```

If it's a top-level key, we'll make sure the item exists in the `data` object. If not, we'll return the placeholder back as-is (with the curly brackets added back on). Otherwise, we'll return it's value in the `data` object.

```js
// Replace our curly braces with data
template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {

	// Remove the wrapping curly braces
	match = match.slice(2, -2);

	// Check if the item has sub-properties
	var sub = match.split('.');

	// If the item has a sub-property, loop through until you get it
	if (sub.length > 1) {
		// Do something...
	}

	// Otherwise, return the item
	else {
		if (!data[match]) return '{{' + match + '}}';
		return data[match];
	}

});
```

If the `match` is a nested object (as in, it used dot notation like `{{details.mood}}`), we need to loop through each item in the `sub` array and find it's match in the `data` object.

We'll create a `temp` variable, and initially assign the `data` object to it.

For each item in `sub`, we'll make sure the `item` exists in `temp`. If not, we'll return back the original match, with curly brackets added back.

Otherwise, set `temp` to the current items value in whatever object `temp` currently is. This approach let's us dig multiple levels deep into a nested object.

Once done looping, we can return `temp`, which will now be the value of the nested object key.

```js
// Replace our curly braces with data
template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {

	// Remove the wrapping curly braces
	match = match.slice(2, -2);

	// Check if the item has sub-properties
	var sub = match.split('.');

	// If the item has a sub-property, loop through until you get it
	if (sub.length > 1) {

		var temp = data;

		sub.forEach(function (item) {

			// Make sure the item exists
			if (!temp[item]) {
				temp = '{{' + match + '}}';
				return;
			}

			// Update temp
			temp = temp[item];
		});

		return temp;

	}

	// Otherwise, return the item
	else {
		if (!data[match]) return '{{' + match + '}}';
		return data[match];
	}

});
```

## Browser Compatibility

Placeholders.js works in all modern browsers, and IE9 and up.