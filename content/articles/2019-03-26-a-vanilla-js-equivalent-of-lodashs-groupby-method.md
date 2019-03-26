---
title: "A vanilla JS equivalent of lodash's groupBy() method"
date: 2019-03-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

You ever learn something new and wonder how you got by without it all this time? That's how I feel about [the `reduce()` method](/using-array.reduce-in-vanilla-js/).

My friend [Andrew Borstein](https://andrewborstein.com/) recently asked me how I would do something like l[odash's `groupBy()` method](https://lodash.com/docs/#groupBy) with vanilla JS.

Fun challenge. Let's dig in!

## What `groupBy()` does

The `groupBy()` method takes a collection of items as an array and groups them together in an object based on some criteria.

Let's say you two arrays.

```js
var nums = [6.1, 4.2, 6.3];
var words = ['one', 'two', 'three'];
```

If you wanted to group all of the items in `num` together based on their integer value, you would do this.

```js
// returns {'4': [4.2], '6': [6.1, 6.3]}
_.groupBy(nums, Math.floor);
```

If you wanted to group the items in `words` by their length, you would do this.

```js
// returns {'3': ['one', 'two'], '5': ['three']}
_.groupBy(words, 'length');
```

Let's do the same thing with vanilla JS.

## A vanilla JS `groupBy()` method

The `Array.reduce()` method takes an array and returns a single value.

While this is often used for adding numbers, it can return anything, including an object built with the values from an array.

Here's how you would group the `num` items by their integer value.

```js
nums.reduce(function (obj, num) {

	// Get the integer value of the number
	var int = Math.floor(num);

	// If the integer doesn't already exist as a key in the object, create it
	if (!obj.hasOwnProperty(int)) {
		obj[int] = [];
	}

	// Push the number to its integer key
	obj[int].push(num);

	// Pass the object on to the next loop
	return obj;

}, {});
```

We can do something similar to group the items in `words` by their length.

```js
words.reduce(function (obj, word) {

	// Get the length of the world
	var length = word.length;

	// If the length doesn't already exist as a key in the object, create it
	if (!obj.hasOwnProperty(length)) {
		obj[length] = [];
	}

	// Push the number to its integer key
	obj[length].push(word);

	// Pass the object on to the next loop
	return obj;

}, {});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/gEyZde)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js" data-user="cferdinandi" data-slug-hash="gEyZde" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Grouping with reduce()"></p>

## Abstracting this into a helper function

One of my students, [Tom Bremmer](https://tbremer.com/), also took a shot at solving Andrew's question. He took farther than me, abstracting it into a helper function.

I modified it just a touch, removing `let` and `const` for better backwards compatibility. I also added some inline documentation.

```js
/*!
 * Group items from an array together by some criteria or value.
 * (c) 2019 Tom Bremmer (https://tbremer.com/) and Chris Ferdinandi (https://gomakethings.com), MIT License,
 * @param  {Array}           arr      The array to group items from
 * @param  {String|Function} criteria The criteria to group by
 * @return {Object}                   The grouped object
 */
var groupBy = function (arr, criteria) {
	return arr.reduce(function (obj, item) {

		// Check if the criteria is a function to run on the item or a property of it
		var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

		// If the key doesn't exist yet, create it
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	}, {});
};

```

[Here's another demo.](https://codepen.io/cferdinandi/pen/KEYbeE)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js" data-user="cferdinandi" data-slug-hash="KEYbeE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="groupBy()"></p>

You can [find this on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/groupby/).

## Browser Compatibility

This technique works in all modern browsers, and IE9 and above.