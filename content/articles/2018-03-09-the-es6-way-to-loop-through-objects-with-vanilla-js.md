---
title: "The ES6 way to loop through objects with vanilla JavaScript"
date: 2018-03-09T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Tuesday, we look at [how to use `for...in` loops to iterate through JavaScript objects](/the-for...in-loop-with-vanilla-javascript/). And yesterday, we looked at the [ES6 way to loop through arrays and NodeLists](/es6-foreach-loops-with-vanilla-javascript/).

Today, let's look at the ES6 approach to looping through objects.

## `Object.keys()` and `Array.forEach()`

Strangely, there is no `Object.forEach()` method.

To achieve something similar, we can use the `Object.keys()` method, which returns an array of the keys in an object. Then we run that through an `Array.forEach()` method.

```js
var lunch = {
	sandwich: 'ham',
	snack: 'chips',
	drink: 'soda',
	desert: 'cookie',
	guests: 3,
	alcohol: false,
};

Object.keys(lunch).forEach(function (item) {
	console.log(item); // key
	console.log(lunch[item]); // value
});

// returns "sandwich", "ham", "snack", "chips", "drink", "soda", "desert", "cookie", "guests", 3, "alcohol", false
```

### Browser Compatibility

The `Object.keys()` method works in all modern browsers and IE9 and above. You can [push support back to IE6 with this polyfill](https://vanillajstoolkit.com/polyfills/objectkeys/). If you do, you should [also use the polyfill for `Array.forEach()`](https://vanillajstoolkit.com/polyfills/arrayforeach/).

## And `Object.forEach()` method

The lack of an `Object.forEach()` method feels like a big miss to me, so I wrote [a "polyfill" for it](https://vanillajstoolkit.com/polyfills/objectforeach/) (it's not really a polyfill because it doesn't follow a documented standard).

```js
/**
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.prototype.forEach) {
	Object.defineProperty(Object.prototype, 'forEach', {
		value: function (callback, thisArg) {
			if (this == null) {
				throw new TypeError('Not an object');
			}
			thisArg = thisArg || window;
			for (var key in this) {
				if (this.hasOwnProperty(key)) {
					callback.call(thisArg, this[key], key, this);
				}
			}
		}
	});
}
```

This works the same way `Array.forEach()` and `NodeList.forEach()`. You would use it like this.

```js
var lunch = {
	sandwich: 'ham',
	snack: 'chips',
	drink: 'soda',
	desert: 'cookie',
	guests: 3,
	alcohol: false,
};

lunch.forEach(function (item, key) {
	console.log(key);
	console.log(item);
});

// returns "sandwich", "ham", "snack", "chips", "drink", "soda", "desert", "cookie", "guests", 3, "alcohol", false
```

### Browser Compatibility

This method works in all modern browsers, and IE9 and up.

And that wraps back-to-basics week on loops with JavaScripts!