---
title: "The isNaN() and Number.isNaN() methods in vanilla JS"
date: 2021-03-05T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, `NaN` means _Not A Number_.

It's often the output when trying to using number methods or math operators with things that aren't numbers.

```js
// These all return NaN
let zero = 0 / 0;
let money = parseFloat('$$');
let round = Math.round('42abc');
```

However, because JavaScript is often weird, checking if a value is equal to `NaN` _always_ validates as `false`, even if the value is `NaN`.

```js
// This will log "Not NaN", which is absurd
if (NaN === NaN) {
	console.log(`It's NaN!`);
} else {
	console.log('Not NaN');
}
```

JavaScript has two methods, `isNaN()` and `Number.isNaN()`, to deal with this.

## The `isNaN()` method

The `isNaN()` method is the original method for checking if something is _not a number_. It attempts to coerce whatever is passed in as an argument into a number, and then checks the result.

_These examples were taken from MDN._

```js
// These all return true
isNaN(NaN);
isNaN('NaN');
isNaN(undefined);
isNaN({});
isNaN(0 / 0);

// These all return false
isNaN(true);
isNaN(null);
isNaN(37);

// strings
isNaN('37');      // false: "37" is converted to the number 37 which is not NaN
isNaN('37.37');   // false: "37.37" is converted to the number 37.37 which is not NaN
isNaN("37,5");    // true
isNaN('123ABC');  // true:  parseInt("123ABC") is 123 but Number("123ABC") is NaN
isNaN('');        // false: the empty string is converted to 0 which is not NaN
isNaN(' ');       // false: a string with spaces is converted to 0 which is not NaN

// dates
isNaN(new Date());                // false
isNaN(new Date().toString());     // true

// This is a false positive and the reason why isNaN is not entirely reliable
// returns true
// Parsing this as a number fails and returns NaN
isNaN('blabla');
```

MDN describes `isNaN('blabla')` returning `true` as a "false positive." That's odd to me. It's not _literally_ `NaN`, but it's also very much _not a number_.

That said, I think it's a bit confusing the `new Date()` returns `false`, but `new Date.toString()` returns `true`.

## The `Number.isNaN()` method

The `Number.isNaN()` method is a modern JS method that lacks IE support and attempts to address some of the perceived inconsistencies with how the original `isNaN()` method validates values.

```js
// These all return true
Number.isNaN(NaN);
Number.isNaN(0 / 0);

// These would have been true with global isNaN()
// They return false with Number.isNaN()
Number.isNaN('NaN');
Number.isNaN(undefined);
Number.isNaN({});
Number.isNaN('blabla');
Number.isNaN(new Date().toString());

// These all return false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN('37');
Number.isNaN('37.37');
Number.isNaN('');
Number.isNaN(' ');
```

The `Number.isNaN()` method _does not_ coerce values. As a result, things like `blabla` and `undefined`, which previously would have returned a `true` value with `isNaN()` now `return false`.

It is instead checking if the value is _literally_ `NaN`, and nothing else.

## How do you use these methods (and which one should you use)?

You should use `Number.isNaN()`, because it literally checks if the value is `NaN` and does nothing else, which is more consistent.

Use the `Number.isNaN()` method whenever you get a value that _should_ be a number, and are going to do some sort of math or operation with it that would break if its not.

For example, here's a function to convert Fahrenheit to Celsius.

```js
function fToC (t) {
	let temp = parseFloat(t);
	return (temp - 32) * (5 / 9);
}
```

If you passed in `'32'` as a string, `parseFloat()` would convert it to the `32` and the math would work. But, if you passed in `'abc'`, it would break.

Let's add a check using `Number.isNaN()`.

```js
function fToC (t) {
	let temp = parseFloat(t);
	if (Number.isNaN(temp)) {
		throw 'Not a valid temperature';
	}
	return (temp - 32) * (5 / 9);
}
```

Now, we can preemptively catch errors.