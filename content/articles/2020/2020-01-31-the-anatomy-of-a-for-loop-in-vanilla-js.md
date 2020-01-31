---
title: "The anatomy of a for loop in vanilla JS (and when you would want to use it instead of Array.forEach())"
date: 2020-01-31T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to go back to basics and take a look at the humble `for` loop.

## What a `for` loop does

A `for` loop runs code over and over again until a condition is met.

It's broken up into three parts, each separated by a semicolon (`;`):

1. Before the first semicolon, you can declare or assign variables.
2. Between the first and second semicolon, you define a condition to check after each loop. As long as this condition is `true`, the loop keeps running. Once the condition is `false`, the loop stops.
3. After the second semicolon, you can specify a statement to run after each loop.

For example, let's say you wanted to log the numbers `1` through `10` into the console. Once you get to `10`, you want to stop.

You would defined an initial *index variable* called `i` (this can be anything you want, but `i` is commonly used), and give it a value of `1`. For your conditional check, you'll make sure that `i` is less than `11`. As long as that's true, the loop will keep running.

After each loop, you'll add `1` to `i` using the *increment operator* (`++`). In between the curly brackets, you'll log `i` to the console.

```js
for (var i = 1; i < 11; i++) {
	console.log(i);
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKwjBKx)

## Looping through array items

Let's say you had an array of wizard names, and wanted to loop through each name and log it to the console.

```js
var wizards = ['Harry', 'Hermione', 'Neville', 'Ron', 'Dumbledore'];
```

To do this, you would define a variable `i` and give it a value of `0`. For your conditional check, you would check to make sure `i` is less than the `length` of the `wizards` array. After each loop, you'll add `1` to `i`.

Inside the loop, you can use `i` to get the item at that index in the `wizards` array and log it to the console.

```js
for (var i = 0; i < wizards.length; i++) {
	console.log(wizards[i]);
}
```

[See it in action here.](https://codepen.io/cferdinandi/pen/abzgjOb)

## Ending and skipping `for` loops

Inside the loop, you can use the `continue` operator to skip the current item in the loop and move on to the next one. You can use the `break` operator to end the loop early.

Looking at our `wizards` array again, let's imagine you wanted to log every wizard *except* Harry.

You would check to see if `wizards[i]` is `"Harry"`, and if so, use the `continue` operator.

```js
for (var i = 0; i < wizards.length; i++) {
	if (wizards[i] === 'Harry') continue;
	console.log(wizards[i]);
}
```

If you wanted to end the loop if the wizard is Ron, you would use `break`.

```js
for (var i = 0; i < wizards.length; i++) {
	if (wizards[i] === 'Harry') continue;
	if (wizards[i] === 'Ron') break;
	console.log(wizards[i]);
}
```

[Play with skipping and ending loops here.](https://codepen.io/cferdinandi/pen/LYEKBGN)

## When and why would you use a `for` loop instead of `Array.forEach()`?

For looping over arrays, `Array.forEach()` provides a much nicer syntax. But sometimes, a `for` loop is still a better choice.

If you want to end a loop early if a certain condition is met, there's no way to do that with `Array.forEach()`. In that case, `for` is a better option.

The `for` loop is also for more than just looping over arrays. If you need to run a loop a certain number of times (for example, to automatically generate an array of items), use a `for` loop.

## Browser Compatibility

The `for` loop has been around forever. It works in all modern browsers, and back to IE 3 (yes, that's right, 3!).