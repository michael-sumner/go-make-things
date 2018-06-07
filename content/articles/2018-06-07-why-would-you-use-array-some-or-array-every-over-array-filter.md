---
title: "Why would you use Array.some() or Array.every() over Array.filter()"
date: 2018-06-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, one of my students asked me why you would ever need `Array.some()` or `Array.every()` when `Array.filter()` exists.

If you're not familiar with these methods yet:

1. `Array.some()` returns `true` if at least one item in your array matches some criteria you specify as part of a callback function.
2. `Array.every()` returns `true` if all items in your array matches some criteria you specify as part of a callback function.
3. `Array.filter()` returns a new array of items, removing any from the original array that don't match some criteria you specify as part of a callback function.

In most cases, if I want I'm looking to see if some items meet some criteria, I then want to do something with them.

I wouldn't use `Array.some()`. I'd use `Array.filter()`, check that it has at least one item using the `.length` property, and then do something with those items.

```js
var fruits = ['apples', 'oranges', 'pears', 'apples', 'bananas'];

// Get a new array with only apples
var apples = fruits.filter(function (fruit) {
	return fruit === 'apples';
});

// If there were any apples, count them
if (apples.length > 0) {
	alert('You have ' + apples.length + ' apples!');
}
```

So, when would you ever need `Array.some()` or `Array.every()`?

Let’s say you have an array of items in a cart, and if one item in particular is there, you want to apply a discount. You don’t need to filter down the whole array... just apply a discount if that one item is there. You're still going to use all items in the original array.

This is the perfect use-case for `Array.some()`!

```js
var cart = [
	{
		item: 'apples',
		price: 1
	},
	{
		item: 'pears',
		price: 0.5
	},
	{
		item: 'bread',
		price: 3
	}
];

// Check if the cart has pears in it
var hasPears = cart.some(function (item) {
	return item.item === 'pears';
});

// If it does, set a discount of 20%
var discount = hasPears ? 0.2 : 0;
```