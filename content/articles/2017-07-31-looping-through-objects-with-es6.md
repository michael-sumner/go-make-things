---
categories:
- Code
- JavaScript
date: '2017-07-31'
permalink: /looping-through-objects-with-es6/
title: Looping through objects with ES6
url: /2017/07/31/looping-through-objects-with-es6
---

Last week, we looked at how to loop through [arrays](https://gomakethings.com/looping-through-arrays-the-es6-way/) and [NodeLists](https://gomakethings.com/looping-through-nodelists-with-es6/) with ES6, which provides handy `forEach()` methods.

Because JavaScript is weird, there's no `forEach()` method for objects.

Traditionally, you'd need to use a `for...in` loop.

```lang-javascript
var lunch = {
	sandwich: 'turkey',
	chips: 'Cape Cod',
	snack: 'Cookies',
	drink: 'Pepsi',
	calories: 325,
	picnic: true
};

for (var key in lunch) {
	if (lunch.hasOwnProperty(key)) {
		console.log(key); // key (ex. sandwich)
		console.log(lunch[key]); // value (ex. turkey)
	}
}
```

## Adding an Object.forEach() method

That said, we can add our own `Object.forEach()` method by extending the object prototype.

You normally extend prototypes by doing something like this:

```lang-javascript
Object.prototype.forEach = function () {
	// Our code goes here...
}
```

That works great for things like arrays and elements, but can break a whole bunch of things if you try to do it with objects.

Instead, we need to use the `defineProperty()` method.

```lang-javascript
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

Now you can loop through objects just like you would arrays and NodeLists.

```lang-javascript
var lunch = {
	sandwich: 'turkey',
	chips: 'Cape Cod',
	snack: 'Cookies',
	drink: 'Pepsi',
	calories: 325,
	picnic: true
};

lunch.forEach(function (item, key) {
	console.log(key); // the key (ex. sandwich)
	console.log(item); // the item (ex. turkey)
});
```

This works all the way back to IE9, and if you use [polyfill.io](https://polyfill.io), you can extend that even further back to IE7.