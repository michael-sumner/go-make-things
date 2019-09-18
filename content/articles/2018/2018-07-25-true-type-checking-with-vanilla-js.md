---
title: "True type checking with vanilla js"
date: 2018-07-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

You may already be familiar with the `typeof` operator, which returns a string letting you know the *type* of a JavaScript object.

```js
var num = 123;

// Returns "number"
typeof num;
```

Because [everything is an object in JavaScript](/everything-is-an-object-in-javascript/), it can return some pretty weird results. Here's a set of examples from my buddy [Todd Motto](https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/).

```js
typeof []; // object
typeof {}; // object
typeof ''; // string
typeof new Date() // object
typeof 1; // number
typeof function () {}; // function
typeof /test/i; // object
typeof true; // boolean
typeof null; // object
typeof undefined; // undefined
```

The array, plain object, date, regex, and `null` all return `object`. The only really accurate ones are the string, function, boolean, and `undefined`.

So... how do you accurately check the *true* type of an object with vanilla JS?

## A workaround

Todd provides a neat solution, too.

```js
Object.prototype.toString.call();
```

You pass the thing you want to check the type of into `call()` as an argument. The gets its prototype and converts it to a string, which gives you back something like `[object Array]` or `[object Boolean]`.

```js
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call(''); // [object String]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(function () {}); // [object Function]
Object.prototype.toString.call(/test/i); // [object RegExp]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(); // [object Undefined]
```

## A helper function

That's kind of verbose, though. Here's a helper function that will return a lowercase string of just the type, without the leading `[object` or trailing `]`.

```js
var trueTypeOf = function (obj) {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

// Returns "array"
trueTypeOf([]);

// Returns "date"
trueTypeOf(new Date());
```

I've added this on the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/truetypeof/).

I refer to [Todd's original article](https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/) on this so often, I thought it would be use documenting here, too.