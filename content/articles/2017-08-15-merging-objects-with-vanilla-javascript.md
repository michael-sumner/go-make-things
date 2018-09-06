---
categories:
- Code
- JavaScript
date: '2017-08-15'
url: /merging-objects-with-vanilla-javascript/
title: Merging objects with vanilla JavaScript
---

Vanilla JavaScript doesn't offer any native method to merge objects together.

(*Technically, you could use `Object.assign()`, but it has some limitations and doesn't support deep merging.*)

Today, I'm going to show you how to write a simple helper function for merging objects with vanilla JS.

## The Basic Approach

To make this work, we want to create an empty object, and push the keys and properties of each of the objects we want to merge into it.

```javascript
var obj = {
	sandwich: 'chicken',
	condiment: 'mayo',
	desert: true
};

// Create a new object
var extended = {};

// Loop through our object
for (var prop in obj) {
	if (obj.hasOwnProperty(prop)) {
		// Push each value from `obj` into `extended`
		extended[prop] = obj[prop];
	}
}
```

In the code above, we're looping through `obj` and adding each key/value pair into `extended`. The `extended` object is now identical to `obj1`.

We can do this with multiple objects to merge them together.

```javascript
var obj1 = {
	sandwich: 'chicken',
	condiment: 'mayo',
	desert: true
};

var obj2 = {
	sandwich: 'tuna',
	chips: 'Cape Cod',
	desert: false
}

// Create a new object
var extended = {};

// Loop through obj1
for (var prop1 in obj1) {
	if (obj1.hasOwnProperty(prop1)) {
		// Push each value from `obj1` into `extended`
		extended[prop1] = obj1[prop1];
	}
}

// Loop through obj2
for (var prop2 in obj2) {
	if (obj2.hasOwnProperty(prop2)) {
		// Push each value from `obj2` into `extended`
		extended[prop2] = obj2[prop2];
	}
}
```

The `extended` object is now a merge of our two objects.

```javascript
{
	sandwich: 'tuna',
	condiment: 'mayo',
	chips: 'Cape Cod',
	desert: false
}
```

## Creating a helper method

There's a lot of duplicated code in the example above. Instead of manually looping through each object, let's create a function to handle that for us.

```javascript
var obj1 = {
	sandwich: 'chicken',
	condiment: 'mayo',
	desert: true
};

var obj2 = {
	sandwich: 'tuna',
	chips: 'Cape Cod',
	desert: false
}

// Create a new object
var extended = {};

var merge = function (obj) {
	if (obj.hasOwnProperty(prop)) {
		// Push each value from `obj` into `extended`
		extended[prop] = obj[prop];
	}
};

merge(obj1);
merge(obj2);
```

This is definitely better, but imagine you're merging more than two objects. we don't want to have to call our `merge()` method on each one.

Let's create an `extend()` function to automate the whole thing for us.

```javascript
var extend = function () {

	// Create a new object
	var extended = {};

	// Merge the object into the extended object
	var merge = function (obj) {
		if (obj.hasOwnProperty(prop)) {
			// Push each value from `obj` into `extended`
			extended[prop] = obj[prop];
		}
	};

	// Loop through each object and conduct a merge
	for (var i = 0; i < arguments.length; i++) {
		merge(arguments[i]);
	}

	return extended;

};

var newObj = extend(obj1, obj2);
```

If you don't specify assign variables to arguments on a function (ie. `function (var1, var2) {...}`), you can use the `arguments` variable to access an array of arguments that were passed into your method.

In the method above, `arguments` is each of the objects passed into our `extend()` method.

We loop through the `arguments` array and call the `merge()` method on each one. Then, we return our `extended` object.

You can pass in as many objects as you want. The method will automatically merge them all.

## Deep Merging

Our helper method currently does a shallow merge. Imagine you had two objects with a nested structure.

```javascript
var obj1 = {
	sandwich: 'chicken',
	condiment: 'mayo',
	desert: true,
	days: {
		monday: true,
		wednesday: true,
		friday: true
	}
};

var obj2 = {
	sandwich: 'tuna',
	chips: 'Cape Cod',
	desert: false,
	days: {
		monday: false,
		tuesday: true,
		thursday: true
	}
}
```

In a shallow merge, the `days` key in `obj2` would completely overwrite the value from `obj1`. In a deep merge, the `days` objects from `obj1` and `obj2` would get merged together.

```javascript
// Shallow merge
{
	monday: false,
	tuesday: true,
	thursday: true
}

// Deep merge
{
	monday: false,
	tuesday: true,
	wednesday: true,
	thursday: true,
	friday: true
}
```

Depending on what you're trying to do, a shallow merge might be the desired result. Other times, you might want a deep merge.

Let's add the option to do both.

## Adding a deep merge

In jQuery's `extend()` method, you can pass in the first argument as a boolean. If it's `true`, it will do a deep merge instead of a shallow one. Let's use that same approach.

First, we're going to set up a new variable, `deep`, to store whether or not a merge should be deep. We'll set it to `false` by default. We're also going to predefine `var i = 0` for our `for` loop.

```javascript
var extend = function () {

	// Variables
	var extended = {};
	var deep = false;
	var i = 0;

	// ...

};
```

Then, we're going to check to see if the merge is deep.

If it is, we'll set `deep` to `true`. We'll also advance our `i` variable by 1 so that our loop will start with the first object, and not the boolean indicating a deep merge.

```javascript
var extend = function () {

	// Variables
	var extended = {};
	var deep = false;
	var i = 0;

	// Check if a deep merge
	if (typeof (arguments[0]) === 'boolean]') {
		deep = arguments[0];
		i++;
	}

	// ...

};
```

If it is a deep merge, whenever we encounter a property that's an object, we'll recursively send it back through our `extend()` method.

```javascript
var extend = function () {

	// Variables
	var extended = {};
	var deep = false;
	var i = 0;

	// Check if a deep merge
	if (typeof (arguments[0]) === 'boolean]') {
		deep = arguments[0];
		i++;
	}

	// Merge the object into the extended object
	var merge = function (obj) {
		if (obj.hasOwnProperty(prop)) {
			if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
				// If we're doing a deep merge and the property is an object
				extended[prop] = extend(true, extended[prop], obj[prop]);
			} else {
				// Otherwise, do a regular merge
				extended[prop] = obj[prop];
			}
		}
	};

	// ...

};
```

Finally, we can remove the `var i = 0` from our `for` loop, since we've already set it. Here's the completed function.

```javascript
var extend = function () {

	// Variables
	var extended = {};
	var deep = false;
	var i = 0;

	// Check if a deep merge
	if (typeof (arguments[0]) === 'boolean]') {
		deep = arguments[0];
		i++;
	}

	// Merge the object into the extended object
	var merge = function (obj) {
		if (obj.hasOwnProperty(prop)) {
			if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
				// If we're doing a deep merge and the property is an object
				extended[prop] = extend(true, extended[prop], obj[prop]);
			} else {
				// Otherwise, do a regular merge
				extended[prop] = obj[prop];
			}
		}
	};

	// Loop through each object and conduct a merge
	for (; i < arguments.length; i++) {
		merge(arguments[i]);
	}

	return extended;

};
```

You would use it like this:

```javascript
var shallowMerge = extend(obj1, obj2);
var deepMerge = extend(true, obj1, obj2);
```

You can grab [a copy of this function in the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/extend).