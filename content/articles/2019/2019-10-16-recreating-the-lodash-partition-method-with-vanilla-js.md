---
title: "How to recreate the lodash partition() method with vanilla JS"
date: 2019-10-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to recreate the lodash `_.pull()` method with vanilla JS](/recreating-the-lodash-pull-method-with-vanilla-js/). Today, we're going to look at how to do the same thing with the `_.partition()` method.

The `_.partition()` method splits an array into two group: one for items that match some criteria, and the second for items that don't.

To get started, let's create a `partition()` helper function. We'll accept two arguments: the `array` to split into two, and the `criteria` to split it on.

```js
var partition = function (arr, criteria) {
	// Do stuff here...
};
```

Inside the helper function, we'll return a new array.

```js
var partition = function (arr, criteria) {
	return [];
};
```

With the lodash `_.partition()` method, the first item in the returned array is an array of items that match the criteria, and the second is items that don't.

We'll use the `Array.filter()` method for both of these.

For the `criteria` argument, we'll accept a function to validate against. We'll use it as-is in our first instance of `Array.filter()`, and use a *bang operator* (`!`) to check for falsiness in the second.

```js
var partition = function (arr, criteria) {
	return [
		arr.filter(function (item) {
			return criteria(item);
		}),
		arr.filter(function (item) {
			return !criteria(item);
		}),
	];
};
```

And here's an example from the lodash website, but using our own `partition()` method instead.

```js
var users = [
	{'user': 'barney', 'age': 36, 'active': false},
	{'user': 'fred', 'age': 40, 'active': true},
	{'user': 'pebbles', 'age': 1, 'active': false}
];

// The first array contains "fred"
// The second contains "barney" and "pebbles"
partition(users, function (user) {
	return user.active;
});
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/bGGepzz)