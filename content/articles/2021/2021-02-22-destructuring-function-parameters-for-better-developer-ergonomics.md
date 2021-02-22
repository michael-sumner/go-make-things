---
title: "Destructuring function parameters with vanilla JS for better developer ergonomics"
date: 2021-02-22T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last month, we learned about [array and object destructuring in vanilla JS](/destructing-in-vanilla-js/). Today, I want to show you how you can use destructuring with function parameters for a better developer experience.

Let's dig in!

## Creating a simple function

Let's imagine you have a simple function, `greet()`, that you use to create greeting messages.

It accepts a `greeting`, `name`, and `time` of day as parameters, and returns a string with a greeting message.

```js
function greet (greeting, name, time) {
	return `${greeting} ${name}! How are you ${time}?`;
}

// returns "Hello George! How are you this evening?"
let message = greet('Hello', 'George', 'this evening');
```

This works great, but it also requires you to know the correct order for your arguments to work correctly.

For example, if you reversed the `greeting` and `name` by accident, it would return the wrong message.

```js
// returns "George Hello! How are you this evening?"
let message = greet('George', 'Hello', 'this evening');
```

Object destructuring provides us with a way to address this.

## Using object destructuring for function parameters

With this approach, we still pass in the same parameter names. But, we use object destructuring to accept an object of values and _destructure_ them into parameters while assigning them.

```js
function greet ({greeting, name, time}) {
	return `${greeting} ${name}! How are you ${time}?`;
}
```

Now, when we go to use our function, we can pass in an object of values, and the order in which we pass them in doesn't matter.

```js
// returns "Hello George! How are you this evening?"
let message = greet({
	name: 'George',
	greeting: 'Hello',
	time: 'this evening'
});
```

If you prefer, you can also use the ES6 _object property shorthand_ approach (which I haven't written about yet but will soon).

```js
// Arguments
let name = 'George';
let greeting = 'Hello';
let time = 'this evening';

// returns "Hello George! How are you this evening?"
let message = greet({name, greeting, time});
```

## Default parameters with object destructuring

A few weeks ago, we learned about [default function parameters](/default-parameter-values-in-vanilla-js/). You can use them with this approach.

For example, if we wanted to make `time` option, we could do something like this.

```js
function greet ({greeting, name, time = 'today'}) {
	return `${greeting} ${name}! How are you ${time}?`;
}

// returns "Hello George! How are you today?"
let message = greet({
	name: 'George',
	greeting: 'Hello'
});
```