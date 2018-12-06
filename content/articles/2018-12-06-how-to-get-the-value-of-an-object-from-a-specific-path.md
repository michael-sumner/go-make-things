---
title: "How to get the value of an object from a specific path with vanilla JS"
date: 2018-12-06T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In response to my article on [how to create a new object with only a subset of properties using vanilla JS](/how-to-create-a-new-object-with-only-a-subject-of-properties-using-vanilla-js/), Twitter user [zomar asked](https://twitter.com/zomars/status/1070454954463178753):

> How about an equivalent for lodash's `get`  method?

Challenge accepted!

*__By the way...__ I love getting tweets like this. Keep them coming!*

## What `_.get()` does

[The `get()` method in lodash](https://lodash.com/docs/#get) get's the value of an object at a specific path, and let's you optionally return a default value if one isn't found.

The path can be an array or a string.

```js
var obj = {
	'a': [
		{
			'b': {
				'c': 3
			}
		}
	]
};

// returns 3
_.get(obj, 'a[0].b.c');

// also returns 3
_.get(obj, ['a', '0', 'b', 'c']);

// returns "default"
_.get(obj, 'a.b.c', 'default');
```

## Creating a vanilla JS `get()` method

First, let's setup a `get()` helper function, and accept three arguments: the object (`obj`), the path (`path`), and optionally, a default value (`def`).

```js
var get = function (obj, path, def) {
	// Code will go here...
};
```

### Handling array paths

Parsing a string `path` into something we can use is a bit complicated, so let's first look at how to handle an array.

We want to loop through the array of keys/indexes. On each iteration, we'll check to see if the key/index exists in the object. If it does, we'll cache our current spot in the object to a variable, loop again, and look at the new cached spot for the next key/index.

If at any point the key or index doesn't exist, we can return the default value (if one isn't provided, it will return `undefined`, which is what we want anyways).

If we complete all of the loops, we'll return our match.

```js
var get = function (obj, path, def) {

	// Cache the current object
	var current = obj;

	// For each item in the path, dig into the object
	for (var i = 0; i < path.length; i++) {

		// If the item isn't found, return the default (or null)
		if (!current[path[i]]) return def;

		// Otherwise, update the current  value
		current = current[path[i]];

	}

	return current;

};
```

Now, we can do something like this.

```js
var obj = {
	'a': [
		{
			'b': {
				'c': 3
			}
		}
	]
};

var getPath = get(obj, ['a', '0', 'b', 'c']);

// Logs 3
console.log(getPath);
```

Now let's look at how to handle string paths.

### Handing string paths

We need to convert a string path into an array to work with it.

Let's setup a new helper function (that will live inside `get()`) called `stringToPath()`. It will accept the `path` as an argument.

```js
var stringToPath = function (path) {
	// Code goes here...
};
```

If the `path` isn't a string, we'll return it as is. Otherwise, we'll create a new array called `output` that we'll push stuff from the string into.

```js
var stringToPath = function (path) {

	// If the path isn't a string, return it
	if (typeof path !== 'string') return path;

	// Create new array
	var output = [];

};
```

Next, we'll use the `split()` method to convert our string into an array, using a dot (`.`) as the delimiter.

Each item separated by a `.` is now it's own item in an array. Sounds good, right? The one hiccup here is that the path can also contain bracket notations (for both objects and array indexes).

```js
var stringToPath = function (path) {

	// If the path isn't a string, return it
	if (typeof path !== 'string') return path;

	// Create new array
	var output = [];

	// Split to an array with dot notation
	path.split('.').forEach(function (item) {
		console.log(item);
	});

};
```

The code above would log `'a[0]', 'b', 'c'`. We want that first item, `a[0]`, to be two separate items.

We're going to use `split()` again---this time using a regex pattern to split on items between square brackets (`[]`). If there aren't any square brackets in the string, the whole string will be used.

Finally, we can push each item to our `output` array and return it.

```js
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
```

### Putting it all together

The one last thing we need to do is set our path to the output of `stringToPath()`. And now we're good to go!

[Here's a demo.](https://codepen.io/cferdinandi/pen/ZmgGmz)

```js
var get = function (obj, path, def) {

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

	// Get the path as an array
	path = stringToPath(path);

	// Cache the current object
	var current = obj;

	// For each item in the path, dig into the object
	for (var i = 0; i < path.length; i++) {

		// If the item isn't found, return the default (or null)
		if (!current[path[i]]) return def;

		// Otherwise, update the current  value
		current = current[path[i]];

	}

	return current;

};
```

### Browser Compatibility

This works in all modern browsers, and IE9 and up.