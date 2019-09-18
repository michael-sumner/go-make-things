---
title: "How to manage multiple arguments in a function"
date: 2018-02-15T10:30:00-05:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
---

I had [a really interesting conversation with Sarah Dayan on Twitter](https://twitter.com/frontstuff_io/status/963431791104282625) this week about structuring functions for readability when you have multiple arguments.

> Hey @ChrisFerdinandi what's your take on arguments vs. object of options?
>
> Seems like, unless you have only one argument or all arguments are mandatory, an object of options is always more readable/better to assign default parameters (pre-ES6). Anything I'm not seeing?

Generally speaking, I use the *three-or-less* rule. If a function accepts three arguments or fewer, I just pass them as-is.

```js
// Arguments as-is
var add = function (num1, num2) {
	return num1 + num2
};
```

If a function needs more arguments than that, I'll typically pass them in as an object.

Here's a function that calculates the total cost of two meals and figures out the tip. It can also optionally run a callback method. This is what it looks like just passing in arguments.

```js
// Calculates total and tip of two meals
var addAndCalculateTip = function (meal1, meal2, tip, callback) {
	var subtotal = meal1 + meal2;
	var total = subtotal + (subtotal * tip * 100);
	if (callback & typeof callback === 'function') {
		callback();
	}
	return total;
};

// Example usage
addAndCalculateTip(14,97, 21.24, .20, function () {
	console.log('Tip calculated!');
});
```

And here's what that function looks like accepting an argument.

```js
// Arguments as an object
// Calculates total and tip of two meals
var addAndCalculateTip = function () {
	var subtotal = args.meal1 + args.meal2;
	var total = subtotal + (subtotal * args.tip * 100);
	if (args.callback & typeof args.callback === 'function') {
		args.callback();
	}
	return total;
};

// Example
var args = {
	meal1: 14.97,
	meal2: 21.24,
	tip: .20,
	callback: function () {
		console.log('Tip calculated!')
	}
}
addAndCalculateTip(args);
```

I will violate my three-or-less rule if two or more of those arguments are functions/callbacks.

[Go read the full convo between Sarah and me.](https://twitter.com/frontstuff_io/status/963431791104282625) She brings a slightly different perspective.