---
title: "Removing duplicates from an array with vanilla JavaScript"
date: 2018-04-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to use `Array.map()` to create new arrays from existing ones](/the-es6-way-to-create-a-new-array-and-transform-the-content-with-vanilla-javascript/).

Today, I want to show you how a few approaches we can use to remove duplicate items from an array with vanilla JS.

## An example

Remember our list of names and jobs from yesterday?

```js
var data = [
	{
		name: 'Kyle',
		occupation: 'Fashion Designer'
	},
	{
		name: 'Liza',
		occupation: 'Web Developer'
	},
	{
		name: 'Emily',
		occupation: 'Web Designer'
	},
	{
		name: 'Melissa',
		occupation: 'Fashion Designer'
	},
	{
		name: 'Tom',
		occupation: 'Web Developer'
	}
];
```

We can use `Array.map()` to get back a list of jobs from our data set.

One problem, though. Because several people have the same job, there are duplicates in our list.

```js
var jobs = data.map(function (item) {
	return item.occupation;
});

// Logs ["Fashion Designer", "Web Developer", "Web Designer", "Fashion Designer", "Web Developer"]
console.log(jobs);
```

Let's look at two ways to remove them.

## Using the `Array.filter()` method

The `Array.filter()` method [creates a new array with only elements that pass a test you include as a callback function](/find-every-matching-item-in-an-array-with-vanilla-javascript/).

We can use it to remove the duplicates. On each iteration, we'll use `Array.indexOf()` to see if our item already exists. If the returned `index` is smaller than the current `index`, that means an instance of item already exists. Otherwise, we'll `return` it to add it to the new array.

```js
var jobsUnique = jobs.filter(function(item, index){
	return jobs.indexOf(item) >= index;
});

// Logs ["Fashion Designer", "Web Developer", "Web Designer"]
console.log(jobsUnique);
```

We can wrap this in [a helper function](https://vanillajstoolkit.com/helpers/arrayunique/) to make it easier to reuse.

```js
var arrayUnique = function (arr) {
	return arr.filter(function(item, index){
		return arr.indexOf(item) >= index;
	});
};

var jobsUnique = arrayUnique(jobs);
```

### Browser Compatibility

This approach works in all modern browsers, and IE9 and up. You can [push support all the way back to IE6 with a polyfill for `Array.filter()`](https://vanillajstoolkit.com/polyfills/arrayfilter/).


## Using some fancy new ES6 stuff

ES6 introduced a new object type, `Set`, that can be used to store data. When passing data into it, duplicates are removed.

However, a set is not an array, so we also need to pass our new set [through the `Array.from()` method](https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/) to convert it into one.

```js
var jobsUnique = Array.from(new Set(a));

// Logs ["Fashion Designer", "Web Developer", "Web Designer"]
console.log(jobsUnique);
```

This is more performant than our helper function, but also has far less browser support.

### Browser Compatibility

The `Array.from()` method works in all modern browsers, but has no IE support. You can [polyfill it back to at least IE9](https://vanillajstoolkit.com/polyfills/arrayfrom/). The `Set()` object has no IE support for iterables like arrays, but otherwise works in all modern browsers, including Edge.