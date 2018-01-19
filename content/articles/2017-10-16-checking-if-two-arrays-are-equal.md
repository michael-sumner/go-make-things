---
categories:
- Code
- JavaScript
date: '2017-10-16'
permalink: /checking-if-two-arrays-are-equal/
title: Checking if two arrays are equal
url: /2017/10/16/checking-if-two-arrays-are-equal
---

Over the weekend, one of the students my in private Slack channel (included with [my pocket guides](/guides/)) asked me what the best way to check if two arrays are equal is.

If you Google this, you'll find a lot of different answers, and StackOverflow contains a lot of people arguing with each other over what the "right" way is. Confusing, right?

There is no *right* way. There are a few different approaches with pros and cons. Today, let's look at the simplest approach.

## Compare as strings

The simplest and fastest way to compare two arrays is to convert them both to strings using the `JSON.stringify()` method and a comparison operator (`===`).

```lang-js
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [1, 2, 3, 4, 5];

if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    console.log('They are equal!');
}
```

This approach is great for really basic instances when you just need to check if a simple array of items is equal to another.

It can fall apart pretty quickly, though.

## When it doesn't work

Since you're comparing two strings, your arrays are only considered equal if they're in the same exact order. For example, these two arrays would *not* be equal using the `JSON.stringify()` method.

```lang-js
var arr2 = [1, 2, 3, 4, 5];
var arr3 = [5, 4, 3, 2, 1];
```

They're the same exact length and contain the same exact values, but in a different order. Not equal.

Maybe that's ok. After all, arrays are are supposed to be sequentially ordered.

Object aren't, though. If your array contains an object as it's value, the order of the object keys might be different even if the two objects have all the same keys and values. It, too, would fail using the `JSON.stringify()` method.

```lang-js
// These would not be equal
var arrObj1 = [1, 2, {
	a: 1,
	b: 2,
	c: 3
}, 4, 5];

var arrObj2 = [1, 2, {
	c: 3,
	b: 2,
	a: 1
}, 4, 5];
```

Tomorrow, I'm going to show you a more complex, slightly slower, but much more robust method we can use to test if two arrays are equal.