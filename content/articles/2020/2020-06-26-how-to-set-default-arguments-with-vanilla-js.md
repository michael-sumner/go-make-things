---
title: "How to set default function arguments with vanilla JS"
date: 2020-06-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this week, we looked at [how function arguments work](/how-arguments-work-in-javascript-functions/), and I shared [an approach for setting default arguments](/how-arguments-work-in-javascript-functions/#default-values) if none are provided.

Today, I want to share an even easier approach using default parameters.

## The old-school approach

Here's the approach we looked at the other day.

```js
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};
```

It works, and has great browser compatibility, but it's kind of annoying to do.

## Default parameters

Modern JavaScript lets you set default values when defining parameters.

When you define your function parameters, add `= 'default value'` for any one that you want to have a default if not defined.

```js
var add = function (num1 = 0, num2 = 0) {

	// Add the numbers
	return num1 + num2;

};
```

Now, if you try to run the function without one or both parameters, they'll default to `0`.

```js
// returns 3
add(3);

// returns 0
add();
```

## Browser Compatibility

This works in all modern browsers, but has no IE support. And unfortunately, it cannot be polyfilled. If you want to use it, you need to either be ok with no supporting IE, or [run it through BabelJS to convert it into ES5](https://babeljs.io/).