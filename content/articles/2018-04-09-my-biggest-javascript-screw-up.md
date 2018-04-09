---
title: "My biggest JavaScript screw up"
date: 2018-04-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to tell you about my biggest JavaScript screw up, and what you can learn from it.

## The background

ES6 introduced new `forEach()` methods for looping through arrays and NodeLists, but no comparable method for looping through objects.

As a workaround, you could get an array of keys from an object with `Object.keys()` and the loop through those with `Array.forEach()`, but it's not really the same thing. It felt like a big miss to me.

So, [I created a "polyfill" for `Object.forEach()`](https://gomakethings.com/the-es6-way-to-loop-through-objects-with-vanilla-javascript/#and-object-foreach-method) that follows the same conventions as `Array.forEach()` and `NodeList.forEach()`.

It allows you to do something like this.

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
```

## So... what's the problem?

There's a new array method being&mdash;`Array.prototype.flatten()`&mdash;that let's you flatten nested arrays down to a single depth.

```js
var arr = [1, 2, [3, 4]];
arr.flatten();

// Logs [1, 2, 3, 4]
console.log(arr);
```

There's one snag: [MooTools](https://mootools.net/), a JavaScript library that back in the day competed head-to-head against jQuery, defined their own version of `Array.flatten()` many years ago. And while not very popular today, there are still plenty of sites that have MooTools in their source code.

And, it doesn't follow the same convention as the official specification for the new method. This wouldn't be a problem if MooTools has scoped their `flatten()` method to MooTools objects (much like how you can only use jQuery methods on `$()` elements).

Instead, they applied it to the `Array` prototype. Just like I did to the `Object` prototype with my `forEach()` method.

I modeled the method after the array and NodeList versions, and assume if an `Object.forEach()` method is ever added to the specification, it will follow the same convention, but I'm guessing. They could do something different, like what happened with MooTools.

## The lessons

First, *never* add a method to an object's prototype unless you're polyfilling something based on a specification, or scoping it to just custom object types.

Second, no matter how long you've been doing this or how good you are, you will make mistakes, sometimes big ones. Make sure you learn from them.