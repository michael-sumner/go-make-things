---
title: "How to detect changes to nested arrays and objects inside a Proxy"
date: 2020-05-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In my [article on Proxies on Friday](/how-vanilla-js-proxies-work/), I forgot to mention how to handle deleting properties from an object. I just updated the article with info about the `deleteProperty` handler, and added browser support information.

Today, I wanted to talk about how to detect changes to nested arrays and objects inside a Proxy object.

## The problem with nested arrays and objects inside a Proxy

Let's say you have a Proxy object, and inside it is a `todos` property with an array of todo items.

```js
var data = new Proxy({
	todos: ['Eat', 'drink', 'be merry']
}, {
	get: function (obj, prop) {
		console.log('got it!');
		return obj[prop];
	},
	set: function (obj, prop, value) {
		console.log('set it');
		obj[prop] = value;
	}
});
```

If you push a new item to `data.todos.push()`, the *setter* function in the Proxy *doesn't* run.

```js
// This does NOT trigger the get() handler
data.todos.push('Take a nap');
```

Why not?

The Proxy only looks for changes directly in the object. Objects or arrays within those properties aren't proxies themselves, and aren't detected.

If you were to update the entire `data.todos` array, that *would* trigger the *setter* function to run.

```js
// This DOES trigger the get() handler
data.todos = ['New array'];
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/BaomXQQ)

## How can you fix this?

The trick to making this work is is to recursively return a new Proxy whenever someone tries to get a property from your Proxy that's an array or object.

The first step is to move your handler into a function that returns the handler object.

```js
var handler = function () {
	return {
		get: function (obj, prop) {
			console.log('got it!');
			return obj[prop];
		},
		set: function (obj, prop, value) {
			console.log('set it');
			obj[prop] = value;
		}
	};
};

var data = new Proxy({
	todos: ['Eat', 'drink', 'be merry']
}, handler());
```

Next, in the *getter* function, check if the `obj[prop]` is an array or object.

If it is, we'll recursively return a new Proxy instead of the property itself, and pass in `handler()` function as the handler.

(*[Learn more about reliable type checking here.](/true-type-checking-with-vanilla-js/)*)

```js
var handler = function () {
	return {
		get: function (obj, prop) {
			console.log('got it!');
			if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
				return new Proxy(obj[prop], handler());
			}
			return obj[prop];
		},
		set: function (obj, prop, value) {
			console.log('set it');
			obj[prop] = value;
		}
	};
};

var data = new Proxy({
	todos: ['Eat', 'drink', 'be merry']
}, handler());
```

And now it works!

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/pojdMWL)