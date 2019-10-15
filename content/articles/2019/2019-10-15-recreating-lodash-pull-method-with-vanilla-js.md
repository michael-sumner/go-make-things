---
title: "Recreating the lodash pull() method with vanilla JS"
date: 2019-10-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Just for fun, I started looking at [methods in lodash](https://lodash.com/docs/) and creating vanilla JS equivalents.

Today, we're going to recreate [the lodash `_.pull()` method](https://lodash.com/docs/4.17.15#pull) with vanilla JS.

## What it does

The `_.pull()` method takes an array, and removes any values that match what you pass in.

```js
var array = ['a', 'b', 'c', 'a', 'b', 'c'];
_.pull(array, 'a', 'c');

// logs ['b', 'b']
console.log(array);
```

## A vanilla JS `pull()` method

For this one, we'll use [the `Array.filter()` method](https://vanillajstoolkit.com/reference/arrays/array-filter/).

First, let's create a `pull()` helper method. Unlike the lodash version, we'll pass in an array for `values`.

```js
var pull = function (array, values) {
	// Do stuff...
};
```

Next, we'll call the `Array.filter()` method on the array that's passed in.

```js
var pull = function (arr, values) {
	return arr.filter(function (item) {
		// Do stuff...
	});
};
```

Finally, we'll check if the current item is in the array of `values` to remove using [the `Array.indexOf()` method](https://vanillajstoolkit.com/reference/arrays/array-indexof.md/).

If the method is greater than `0`, we'll return a falsy value. Otherwise, we'll return truthy.

```js
var pull = function (arr, values) {
	return arr.filter(function (item) {
		return values.indexOf(item) < 0;
	});
};
```

Unlike the lodash version, this returns a new immutable array, so we'll need to assign it to a variable.

Now we can do this.

```js
var array = ['a', 'b', 'c', 'a', 'b', 'c'];
var pulled = pull(array, ['a', 'c']);

// logs ['b', 'b']
console.log(pulled);
```

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/gOOrXjY)