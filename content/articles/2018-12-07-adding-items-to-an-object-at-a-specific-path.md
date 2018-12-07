---
title: "Adding items to an object at a specific path with vanilla JS"
date: 2018-12-07T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to get the value of an object from a specific path with vanilla JS](/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/).

But one of my students, Victoria Anne Young, wanted to know how to *add* items to an array at a specific path?

## The challenge

For simple objects, you just assign a value.

```js
var lunch = {};
lunch.sandwich = 'turkey';
```

But for more complex paths, things get complicated pretty quickly.

With nested objects, if every item in a path doesn't already exist, the browser will throw an error.

```js
var lunch = {};

// This throws an error...
// Uncaught TypeError: Cannot set property 'toppings' of undefined
lunch.sandwich.toppings = ['lettuce', 'tomato'];
```

Instead, you have to check each step of the way, or create the object structure ahead of time.

```js
// One approach
var lunch = {};
if (!lunch.sandwich) {
	lunch.sandwich = {
		toppings: ['lettuce', 'tomato']
	};
} else {
	lunch.sandwich.toppings = ['lettuce', 'tomato'];
}

// Another
var lunch = {
	sandwich: {}
};
lunch.sandwich.toppings = ['lettuce', 'tomato'];
```

Today, I wanted to show you a helper method you can use to make this a bit easier to manage.

## Creating a helper method

First, let's setup a helper function called `put()`. It will accept the object (`obj`), path (`path`), and value (`val`) as arguments.

```js
var put = function (obj, path, val) {
	// Code goes here...
};
```

Just like in yesterday's article, we want to accept a path as either a string or array.

Let's pull in [the `stringToPath()` helper function](https://gomakethings.com/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/#handing-string-paths) for this one as well. Then, we'll update the `path` argument by passing it into the function to get back an array.

```js
var put = function (obj, path, val) {

	/**
	 * If the path is a string, convert it to an array
	 * @param  {String|Array} path The path
	 * @return {Array}             The path array
	 */
	var stringToPath = function (path) {

		// If the path isn't a string, return it
		if (typeof path !== 'string') return path;

		// Create new array
		var output = [];

		// Split to an array with dot notation
		path.split('.').forEach(function (item, index) {

			// Split to an array with bracket notation
			item.split(/\[([^}]+)\]/g).forEach(function (key) {

				// Push to the new array
				if (key.length > 0) {
					output.push(key);
				}

			});

		});

		return output;

	};

	// Convert the path to an array if not already
	path = stringToPath(path);

};
```

For this helper function, we're going to loop through each item in our path and work our way into the object. For each loop, we'll store the current place in the object to a `current` variable.

Once we get to the last key in our `path`, we'll assign the `val` to it. If at any point a key doesn't exist, we'll create one.


```js
// Convert the path to an array if not already
path = stringToPath(path);

// Cache the path length and current spot in the object
var length = path.length;
var current = obj;

// Loop through the path
path.forEach(function (key, index) {

	// If this is the last item in the loop, assign the value
	if (index === length -1) {
		current[key] = val;
	}

	// Otherwise, update the current place in the object
	else {

		// If the key doesn't exist, create it
		if (!current[key]) {
			current[key] = {};
		}

		// Update the current place in the objet
		current = current[key];

	}

});
```

We don't need to return the `obj`. Because objects are mutable, this modifies the original.

You can use it like this:

```js
var lunch = {};
put(lunch, 'sandwich.toppings', ['mayo', 'tomato']);
put(lunch, 'sides.chips', 'Cape Cod');
put(lunch, 'sides.cookie', true);
put(lunch, 'sides.drink', 'soda');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KbPgva)

There's a problem though: this doesn't work with arrays.

You can assign items to an existing array at a specific index, but if an array doesn't exist or you want to push data onto the end of one, there's no way to support that.

Let's fix that!

## Adding array support

Right now, we create our `sandwich.toppings` array in one step, like this.

```js
put(lunch, 'sandwich.toppings', ['mayo', 'tomato']);
```

What if you wanted to add items to it one at a time, like this?

```js
put(lunch, 'sandwich.toppings[]', 'mayo');
put(lunch, 'sandwich.toppings[]', 'tomato');
```

In our `forEach()` loop, we first need to check if the `key` ends with empty square brackets (`[]`).

If so, we'll set an `isArray` variable to `true`, because we want the value to be part of an array. We'll also reassign the `key` variable, removing the brackets off the end with the `slice()` method.

```js
// Loop through the path
path.forEach(function (key, index) {

	// Check if the assigned key shoul be an array
	var isArray = key.slice(-2) === '[]';

	// If so, get the true key name by removing the trailing []
	key = isArray ? key.slice(0, -2) : key;

	// ...

});
```

Next, if the value should be part an an array, we need to check if the `key` for it is already an array or not.

The `typeof` operator returns `object` for both objects *and* arrays, so we'll use the [true type-checking technique](/true-type-checking-with-vanilla-js/) to determine if it's an array or not. If it's not, we'll create an array for the `key`.

```js
// Loop through the path
path.forEach(function (key, index) {

	// Check if the assigned key shoul be an array
	var isArray = key.slice(-2) === '[]';

	// If so, get the true key name by removing the trailing []
	key = isArray ? key.slice(0, -2) : key;

	// If the key should be an array and isn't, create an array
	if (isArray && Object.prototype.toString.call(current[key]) !== '[object Array]') {
		current[key] = [];
	}

	// ...

});
```

Finally, we need to change how we assign the value when we're at the last item in the loop.

If the value is part of an array (that is, if `isArray` is `true`), we'll use the `push()` method to add the value to our array. Otherwise, we'll assign it as normal.

```js
// Loop through the path
path.forEach(function (key, index) {

	// Check if the assigned key shoul be an array
	var isArray = key.slice(-2) === '[]';

	// If so, get the true key name by removing the trailing []
	key = isArray ? key.slice(0, -2) : key;

	// If the key should be an array and isn't, create an array
	if (isArray && Object.prototype.toString.call(current[key]) !== '[object Array]') {
		current[key] = [];
	}

	// If this is the last item in the loop, assign the value
	if (index === length -1) {

		// If it's an array, push the value
		// Otherwise, assign it
		if (isArray) {
			current[key].push(val);
		} else {
			current[key] = val;
		}
	}

	// ...

});
```

Now, you can do this:

```js
var lunch = {};
put(lunch, 'sandwich.toppings[]', 'mayo');
put(lunch, 'sandwich.toppings[]', 'tomato');
put(lunch, 'sides.chips', 'Cape Cod');
put(lunch, 'sides.cookie', true);
put(lunch, 'sides.drink', 'soda');
```

[Here's a demo with the updated code.](https://codepen.io/cferdinandi/pen/zyOKqE) You can find [the full helper function at the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/put/).

## Browser Compatibility

The `put()` function works in all modern browsers, and IE9 and above.