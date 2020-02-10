---
title: "What is type coercion in vanilla JavaScript?"
date: 2020-02-10T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Under-the-hood, JavaScript uses something called *type coercion* to automatically convert a value from one data type to another when using some sort of *operator* with it. Huh?

Let's step away from the buzzwords for a second and demystify this shit!

## Comparing and manipulating values

JavaScript *operators* are used to compare and manipulate values.

They include things like `+`, `-`, `*`, and `/` (to add, subtract, multiply, and divide numbers respectively), and `==` and `===` (to do comparisons). It also includes `++` and `--` (to increment and decrement numbers), and [a bunch of others, too](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators).

In the statement below, `+` is the `operator`.

```js
var sum = 2 + 3;
```

## Type coercion when comparing and manipulating values

In JavaScript, you can use `+` to add two numbers together. You can also use it to join two strings.

```js
// returns 5
var sum = 2 + 3;

// returns "Hello, world. How are you?"
var greeting = 'Hello, world.' + ' How are you?';
```

But what if you used it with a number *and* a string?

```js
var hmm1 = 2 + ' Hello, world.';

var hmm2 = '2' + 3;
```

JavaScript *coerces* the number into a string, and joins.

```js
// returns "2 Hello, world."
var hmm1 = 2 + ' Hello, world.';

// returns "23"
var hmm2 = '2' + 3;
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/LYVVZKK)

## Comparison operators

[JavaScript has two ways to check if two values are equal](/equals-vs-strict-equals-in-javascript/): `==` (equals) and `===` (strict equals).

Strict equals (`===`) check that items have both the same value and the same data type. In the example below, the items are not equal because one is a string and the other is a number.

```js
// returns false
'42' === 42;
```

Regular equals (`==`) uses *type coercion* to compare the values of the items, ignoring their data type. In this example, the items *are* considered equal.

```js
// returns true
'42' == 42;
```

Similarly, greater than/less than operators will *coerce* strings into numbers to check their relative value.

```js
// returns true
'5' > 2;

// returns false
'2' > 5;
```

[See it in action here.](https://codepen.io/cferdinandi/pen/mdJJrPE)

## Weird examples

*Type coercion* can result in some weird ass shit in JavaScript.

What would you expect the result of `num` to be in this example?

```js
var num = '5';
num++;
```

It's `6`. JavaScript *coerces* the string into a number and increments it by `1`.

[Here's a demo.](https://codepen.io/cferdinandi/pen/mdJJrRO)

What about these?

```js
var increment = [];
increment++;
var sum = [] + 3;
var compare1 = [] > 3;
var compare2 = 3 > [];
```

JavaScript *coerces* the array into a string, and then the mathematical operators *coerce* the string into a number. Since the array is empty, its value is `0`.

```js
// increment equals 1
var increment = [];
increment++;

// returns 3
var sum = [] + 3;

// returns false
var compare1 = [] > 3;

// returns true
var compare2 = 3 > [];
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWwwjmP)

What about this?

```js
var sum = [1, 2, 3] + 4;
```

JavaScript again *coerces* the array into a string, `1,2,3`. It then treats the `+` as a *join operator*, and *coerces* the `4` into a string.

```js
// returns "1,2,34"
var sum = [1, 2, 3] + 4;
```

[Here's one more demo for you.](https://codepen.io/cferdinandi/pen/LYVVRzV)

If this sort of stuff is interesting to you, you can find a whole ton of examples on [JavaScript WTF](https://javascriptwtf.com/).

## What does this mean for you, practically speaking?

*Type coercion* can be useful, but it's also really dangerous. It can cause your code to behave in unexpected ways.

Personally, I wish strict type checking was the default in JavaScript.

(*This is why some people love TypeScript, by the way. It forces strict type in your code. I still think it's overcomplicated, though!*)

As a best practice, I recommend that you use the JavaScript's native type conversion methods to force values into their desired format if you've ever not sure what the value might be.

For example, if you're adding numbers that came from an API or a user-submitted form, [run them through `parseFloat()` to convert any strings into numbers first](/converting-strings-to-numbers-with-vanilla-javascript/).

```js
var num1 = '42';
var num2 = 8;

// returns "428"
var sum1 = num1 + num2;

// returns 50
var sum2 = parseFloat(num1) + parseFloat(num2);
```

Similarly, if you're trying to create a string and there's a possibility the values are actually numbers, [use the `toString()` method to explicitly convert them to strings](https://vanillajstoolkit.com/reference/numbers/number-tostring/).

```js
var val1 = 42;
var val2 = 8;

// returns 50
var str1 = val1 + val2;

// returns "428"
var str2 = val1.toString() + val2.toString();
```

This is a less common edge case, since *type coercion* usually converts numbers to strings, but I like to be explicit about my intent in my code.