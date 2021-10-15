---
title: Boolean shorthands and truthiness
date: 2021-10-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today in the current session of [Vanilla JS Academy](https://vanillajsacademy.com), my students are working on a character and word count script.

My solution for counting words looks like this.

```js
// Split the text content into an array, using spaces to break words
// Use Array.filter() to remove any words without a length
// (this removes double spaces in the content)
let words = text.value.split(' ').filter(function (word) {
	return word.length;
});
```

One of my students has a solution that looks like this.

```js
// Split the text content into an array, using spaces to break words
// Use Array.filter() to remove any words without a length
// (this removes double spaces in the content)
let words = text.value.split(' ').filter(function (word) {
	return word.length > 0;
});
```

They asked me why `return word.length` works in my `Array.filter()` method even though it's not explicitly checking to see if the `word.length` is greater than `0`.

In JavaScript, a value of `0` is considered `false` for _truthy_ evaluation purposes, and a number higher than that is considered `true`.

Because the `word.length` property returns an integer, starting at `0` and going up, the `Array.filter()` method evaluates it as `true` or `false` automatically.

I like it because it saves me a little typing, but if you find the more explicit comparison more clear, by all means use it.