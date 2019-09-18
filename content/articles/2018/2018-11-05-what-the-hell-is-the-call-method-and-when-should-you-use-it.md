---
title: "What the hell is the call() method and when should you use it?"
date: 2018-11-05T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

One of the more confusing methods in JavaScript is `Function.call()`.

What the hell is it, and when do you use it? Today, I want to clear that up.

## What `call()` does

The `Function.call()` methods calls a function on whatever thing you pass in as an argument.

The only time I ever really use this is when I want to apply type-specific methods to objects of a different type.

For example, if I use `querySelectorAll()` to get some elements, it returns a NodeList.

If I wanted to use a function `Array.filter()` on it, I *could* convert the NodeList into an array with `Array.from()`, but browser support isn't great and it would need a polyfill.

With the `call()` method, I can apply the `Array.prototype.filter()` method to something that's not an array.

## How `call()` works

You call the `call()` method on whatever function you want to use.

The function will be called on whatever thing you pass in as the first argument. Any other arguments you provide will be used as arguments on the function call is being run against.

### An example

For example, `Array.filter()` accepts a callback function as an argument. The callback returns a boolean that, if `true`, will push matching items in the original array into a new one.

This snippet will return an array of only numbers whose value is greater than `10`.

```js
var numbers = [1, 4, 5, 7, 12, 19, 21, 42];
var greaterThanTen = numbers.filter(function (num) {
	return num > 10;
});

// Logs [12, 19, 21, 42]
console.log(greaterThanTen);
```

What if you had a NodeList of elements, and you want to filter it so that it only contained elements with the class `.turkey`?

You can't just call `Array.filter()` on it. The object is a NodeList.

```js
var sandwiches = document.querySelector('.sandwiches');

// This WILL NOT work
var turkey = sandwiches.filter(function (sandwich) {
	return sandwich.matches('.turkey');
});
```

But, if you use the `Function.call()` method, you can run `Array.filter()` on a non-array.

You would use the `call()` method on `Array.prototype.filter()`. For the first argument, you would pass in `sandwiches`, the object you want to apply the method to. The second argument would be the callback method you want to pass into the `Array.filter()` method.

```js
// This works!
var turkey = Array.prototype.filter.call(sandwiches, function (sandwich) {
	return sandwich.matches('.turkey');
});
```

I don't use `call()` often, but it's wildly useful in certain situations where you want to keep polyfills to a minimum *and* maximize cross-browser compatibility.