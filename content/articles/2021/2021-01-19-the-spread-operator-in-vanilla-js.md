---
title: "The spread syntax operator in vanilla JS"
date: 2021-01-19T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

One modern JS feature that I found super confusing a long time is the spread syntax operator. It's one of those things that's really simple, really powerful, and definitely overused.

Today, let's take a look at what it is, how it works, and when you might want to use it.

## How the spread operator works

The spread syntax operator (`...`) takes an array or object (or other iterable) and expands its items into their own individual values.

```js
let sandwiches = ['tuna', 'turkey', 'pb&j'];

// logs ["tuna", "turkey", "pb&j"]
console.log(sandwiches);

// logs tuna turkey pb&j
console.log(...sandwiches);
```

The spread operator can only be used inside of functions, arrays and objects. You _cannot_ use it on its own.

This, for example, would throw an error.

```js
// Uncaught SyntaxError: Unexpected token '...'
...sandwiches;
```

The spread operator can be really useful for some specific situations.

## Passing an array of arguments into a function as individual arguments

Imagine you have a function, `add()`, that accepts two numbers as arguments and adds them together.

```js
// Add two numbers together
function add (num1, num2) {
	return num1 + num2;
}
```

And, you have an array of numbers.

```js
let numbers = [4, 2];
```

Instead of using bracket notation to get each number and pass it in individually, you can use the spread operator to break the `numbers` array into individual items.

```js
// Instead of this...
// returns 6
add(numbers[0], numbers[1]);

// You can do this...
// returns 6
add(...numbers);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/vYXPLPW)

## Combine or copy an array or object

You can also use the spread operator to combine or copy arrays or objects.

```js
// Some arrays
let sandwiches1 = ['tuna', 'turkey', 'pb&j'];
let sandwiches2 = ['chicken', 'pb&j'];

// Some objects
let radagast1 = {
	color: 'brown',
	druid: true
};
let radagast2 = {
	skills: 'Talks with animals'
};

// Copy an array
// Works like Array.from(sandwiches)
let sandwichesCopy = [...sandwiches1];

// Copy an object
// Works like Object.assign({}, radagst1);
let radagastCopy = {...radagast1};

// Combine two arrays
// Works like sandwiches1.concat(sandwiches2)
let moreSandwiches = [...sandwiches1, ...sandwiches2];

// Combine two objects
// Works like Object.assign({}, radagast1, radagast2);
let moreRadagast = {...radagast1, ...radagast2};
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/zYKbrQq)

I personally prefer to use methods like `Array.from()`, `Array.concat()`, and `Object.assign()` over the spread operator for things like this. I find that it makes the intent of your code more clear and obvious.

But you will see this approach used in code, so it's worth understanding how it works.

## Browser Compatibility

The spread syntax works in all modern browsers, but not IE. It cannot be polyfilled.

However, with [Microsoft dropping support for IE in their own web apps this summer](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666), I'm ready to do that same.