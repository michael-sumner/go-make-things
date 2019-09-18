---
title: "Equals operators in vanilla JS"
date: 2019-04-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

What's the difference between `==` and `===` in vanilla JS? What about `!=` and `!==`? The difference is something called *type coercion*.

Both `==` and `===` check if two items are equal. But `==` will return `true` even if they're not the same type. That's because it *coerces* the two items into the same type.

The version with tree equal signs is called *strict equals*.

```js
if (42 == '42') {
	console.log('this works!');
}

if (42 === '42') {
	console.log('this does NOT...');
}
```

Similarly, both `!=` and `!==` check to see if two items are *not* equal. But `!=` uses type coercion.

The version with two equal signs is called *strict unequals*.

```js
if (42 != '42') {
	console.log('this does not log because they "match"');
}

if (42 !== '42') {
	console.log('this DOES log');
}
```

Generally speaking, you should use always use *strict equals* and *strict unequals*.

There is a *very* narrow situation where it's ok to use type coercion: if both items will always be numbers, but one of them could be in string form.

However, in those situations I still prefer to use strict equals and manually force the strings to numbers.

```js
var num1 = 42;
var num2 = '42';

if (parseFloat(num1) === parseFloat(num2)) {
	console.log('they match!');
}
```