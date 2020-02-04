---
title: "Converting an object into an array with vanilla JS"
date: 2020-02-04T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to talk about two newish methods for converting an object into an array with vanilla JS (and one old-school approach).

## `Object.keys()`

The `Object.keys()` method accepts an object as an argument, and returns an array of its keys.

```js
var lunch = {
	sandwich: 'turkey',
	chips: 'cape cod',
	drink: 'soda'
};

// returns ['sandwich', 'chips', 'drink']
var keys = Object.keys(lunch);
```

You could then use an array method, like `Array.forEach()` or `Array.map()`, to loop through each item. You can then use bracket notation to get that key's associated value from your object.

```js
keys.forEach(function (key) {

	// The key
	console.log(key);

	// The associated value in the lunch object
	console.log(lunch[key]);

});
```

[Here's a demo](https://codepen.io/cferdinandi/pen/NWqKjGq)

*This works in all modern browsers, and back to IE9.*

## `Object.entries()`

You can use the `Object.entries()` method to get an array of values for an object.

Unlike `Object.keys()`, it returns not just the values, but an array of key/value pairs for each entry.

```js
var lunch = {
	sandwich: 'turkey',
	chips: 'cape cod',
	drink: 'soda'
};

// returns [['sandwich', 'turkey'], ['chips', 'cape code'], ['drink', 'soda']]
var entries = Object.entries(lunch);
```

If you use an array method with the result, you can use bracket notation to get the key and value. The key is at index `0`, and the value is at index `1`.

```js
entries.forEach(function (entry) {

	// The key
	console.log(entry[0]);

	// The value
	console.log(entry[1]);

});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWwgmJm)

*This works in all modern browsers, but has __no__ IE support. [You can push support back to IE6 with a polyfill.](https://vanillajstoolkit.com/polyfills/objectentries/)*

## The old-school way: a `for...in` loop

If you want to go really old-school, you can use [a `for...in` loop](https://vanillajstoolkit.com/reference/loops/for-in/) to manually create an array from an object.

For this method, you create an empty array. Then, you loop through your object and use the `Array.push()` method to add items to it.

Let's recreate the `Object.keys()` and `Object.entries()` outputs with this approach as an example.

```js
var keys = [];
var entries = [];

for (var key in lunch) {
	if (lunch.hasOwnProperty(key)) {

		// Create an array of keys
		keys.push(key);

		// Create an array of entries
		entries.push([key, lunch[key]]);

	}
}
```

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/dyobWqE)

If you *did* go this route, though, you might not need the data in an array anymore. You might be better off manipulating your data in the `for...in` loop directly.

*This works in all modern browsers, and back to at least IE6.*