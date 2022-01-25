---
title: Three ways to convert strings to numbers (and modify existing numbers) with vanilla JavaScript
date: 2022-01-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at three techniques you can use convert strings into numbers with JavaScript. These methods can also be used to modify existing numbers.

Let's dig in!

## The `parseInt()` method

You can use the `parseInt()` method to convert a string into an integer (a whole number). The second argument, `10`, is called the `radix`. This is the base number used in mathematical systems. For our use, it should always be `10`.

```js
// returns 42
parseInt('42', 10);

// also returns 42
parseInt('42px', 10);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxPxgam?editors=0011)

## The `parseFloat()` method

You can use the `parseFloat()` method to convert a string into a point number (a number with decimal points).

```js
// returns 3.14
parseFloat('3.14');

// also returns 3.14
parseFloat('3.14someRandomStuff');

// returns 3
parseFloat('3');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/gOXOgBP?editors=0011)

## The `Number()` object

You can use the `Number()` object to convert a string to a number.

Sometimes it returns integer. Other times it returns a float. And if you pass in a string with random text in it, you’ll get `NaN`, an acronym for _Not a Number_.

As a result of this inconsistency, it’s generally safer to use `parseInt()` or `parseFloat()`. If you know the format of the number you’d like, use those instead. If you want the string to fail with `NaN` if it has other characters in it, though, `Number()` may actually be a better choice.

```js
// returns 123
Number('123');

// returns 12.3
Number('12.3');

// returns NaN
Number('3.14someRandomStuff');
```

[Here's yet another demo.](https://codepen.io/cferdinandi/pen/XWzWpoP?editors=0011)

## Modifying existing numbers

The `parseInt()` method can _also_ be used to modify existing numbers. If you have a float number that should be an integer, you can pass it into the `parseInt()` method.

```js
// returns 3
parseInt(3.14);
```

You can also pass existing numbers into the `parseFloat()` method, though it won't add decimals to an integer. It gets returned out as-is.

```js
// returns 42
parseFloat(42);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/ZEaELZR?editors=0011)