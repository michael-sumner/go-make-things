---
title: "How to update localStorage() with vanilla JavaScript"
date: 2018-05-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

You've [saved some data to `localStorage()`](/using-localstorage-to-save-user-data-with-vanilla-javascript/), but now you want to update it. What do you do?

In today's article, we'll look at how to update `localStorage()` values.

## Replacing `localStorage()` values

Let's say the name of your favorite sandwich is saved to `localStorage()`.

```js
// Save "turkey" as my favorite sandwich
localStorage.setItem('myFavoriteSandwich', 'turkey');
```

Your tastes have changed, and you want to change it. You can replace the existing value by using `setItem()` again with the new value.

```js
// Update the value to "tuna"
localStorage.setItem('myFavoriteSandwich', 'tuna');
```

## Appending data to a `localStorage()` string

What if you didn't want to replace the existing value, but add a new item to it?

First, we want to check if an existing item exists. If it does, we'll use string concatenation to add our new item to the end of it. Otherwise, we'll save the item as is.

*__Note:__ In the example below, I'm using a [ternary operator](/ternary-operators/) for brevity.*

```js
// Get the existing data
var existing = localStorage.getItem('myFavoriteSandwich');

// If no existing data, use the value by itself
// Otherwise, add the new value to it
var data = existing ? existing + ' and tuna' : 'tuna';

// Save back to localStorage
localStorage.setItem('myFavoriteSandwich', data);
```

## Appending data to a `localStorage()` array

If you're storing collections of data, it might make more sense to use an array.

Similar to the example above, we'll first check to see if the item already exists. `localStorage()` only stores string values. If there's already saved data, we'll convert it to an array. Otherwise, we'll create one.

Then, we'll push our new value to the array and save it back to `localStorage()`, running it through `toString()` to convert it back to a string.

```js
// Get the existing data
var existing = localStorage.getItem('myFavoriteSandwich');

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ? existing.split(',') : [];

// Add new data to localStorage Array
existing.push('tuna');

// Save back to localStorage
localStorage.setItem('myFavoriteSandwich', existing.toString());
```

## Appending data to a `localStorage()` object

Depending on what you're doing, you might have your data saved as an object instead.

```js
var myLunch = {
	sandwich: 'turkey',
	chips: 'bbq'
};
```

In this example, let's add a drink to the `myLunch` item in `localStorage()`.

We'll again check to see if the item exists already. If it does, we'll use `JSON.parse()` to convert it from a string to an object. Otherwise, we'll create a new object.

Then, we'll push our new key/value pair to the object, and save it back to `localStorage()`, running it through `JSON.stringify()` to convert it back to a string.

```js
// Get the existing data
var existing = localStorage.getItem('myLunch');

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ? JSON.parse(existing) : {};

// Add new data to localStorage Array
existing['drink'] = 'soda';

// Save back to localStorage
localStorage.setItem('myLunch', JSON.stringify(existing));
```

## Helper functions

This time of thing is best handled with a helper function (not because it's hard, but because it's good to abstract this type of functionality out to keep your code more modular).

### Add to a string

```js
/**
 * Add an item to a local storage string
 * @param  {String} name      The localStorage() key
 * @param  {String} value     The localStorage() value
 * @param  {String} delimiter The delimiter to use to separate items
 */
var addToLocalStorageString = function (name, value, delimiter) {

	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, use the value by itself
	// Otherwise, add the new value to it
	var data = existing ? existing + delimiter + value : value;

	// Save back to localStorage
	localStorage.setItem(name, data);

};

// Example
addToLocalStorageString('myFavoriteSandwich', 'tuna', ' and ');
```

### Add to an array

```js
/**
 * Add an item to a localStorage() array
 * @param {String} name  The localStorage() key
 * @param {String} value The localStorage() value
 */
var addToLocalStorageArray = function (name, value) {

	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? existing.split(',') : [];

	// Add new data to localStorage Array
	existing.push(value);

	// Save back to localStorage
	localStorage.setItem(name, existing.toString());

};
```

### Add to an object

```js
/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object key
 * @param {String} value The localStorage() value object value
 */
var addToLocalStorageObject = function (name, key, value) {

	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? JSON.parse(existing) : {};

	// Add new data to localStorage Array
	existing[key] = value;

	// Save back to localStorage
	localStorage.setItem(name, JSON.stringify(existing));

};
```