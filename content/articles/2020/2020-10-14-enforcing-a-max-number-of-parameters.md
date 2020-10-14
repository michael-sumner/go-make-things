---
title: "Enforcing a maximum number of parameters for a function in vanilla JS"
date: 2020-10-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier today, [Carlos Caballero shared a trick for enforcing a maximum number of parameters for a function](https://twitter.com/Carlillo/status/1316266471404843009) using the ES6 rest parameter.

Carlos' trick is cool, but they have no IE support. Today, I want to show you a similar, more backwards compatible way to do the same thing.

## Carlos's trick

For example, let's say you wanted to find the largest number in a set using the `Math.max()` method, but you wanted to limit it to a maximum of three numbers.

Spread parameters let you define a parameter with a leading ellipsis (`...`). Any number of arguments passed in at that spot will be applied to that parameter as an array.

```js
var maxOfThree = function (...params) {

	// This will be an array of all parameters passed in
	console.log(params);

	// Run the Math.max() method, with the params passed in as arguments
	return Math.max.apply(null, params);

};
```

Now, someone can do this.

```js
// Returns 7
maxOfThree(4, 2, 7);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWeKYEY)

But, what if someone passed in more than three arguments? Here's where Carlos's trick comes into play.

You can call the `length` property on the rest parameter to see how many arguments it contains. If there's too many, you could trim it or throw an error.

```js
var maxOfThree = function (...params) {

	// If there's more than three arguments
	if (params.length > 3) {
		throw new Error('A max of three parameters are allowed.');
	}

	// Run the Math.max() method, with the params passed in as arguments
	return Math.max.apply(null, params);

};
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/jOrWEzg)

Neat, right? So how can we do this in IE?

## The `arguments` object

The `arguments` object returns an array-like list of the arguments that are passed into a function.

It goes all the way back to IE3 (yes, IE3!), and is automatically available inside of functions. You don't need to declare any parameters for it to work. It's just *there*.

_**One thing worth noting:** the `arguments` object does not exist inside arrow functions, only traditional ones._

Going back to our `maxOfThree()` function, we could rewrite it to use the `arguments` object like this.

```js
var maxOfThree = function () {

	// If there's more than three arguments
	if (arguments.length > 3) {
		throw new Error('A max of three parameters are allowed.');
	}

	// Run the Math.max() method, with the arguments passed in
	return Math.max.apply(null, arguments);

};
```

[Here's one more demo for you.](https://codepen.io/cferdinandi/pen/VwjeYEX)

## Which one should you use?

I lean hard on the `arguments` object because of it's backwards compatibility. Unfortunately, the rest parameters object can't be polyfilled.

The rest parameter object does have a bit more utility. It doesn't have to be the only argument on a function. You could have two or three declare parameters, followed by a rest parameter to catch "everything else."

```js
var sayHi = function (firstName, ...msgs) {
	console.log(msgs);
};

// Logs ["Hi.", "Hello.", "Nice to see you!"]
sayHi('Chris', 'Hi.', 'Hello.', 'Nice to see you!');
```

I suspect by the summer of 2021 when Microsoft drops browser support for IE on their web apps, I'll be a lot more comfortable doing the same.