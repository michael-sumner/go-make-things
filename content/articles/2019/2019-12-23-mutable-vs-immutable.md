---
title: "Mutable vs. Immutable in JavaScript"
date: 2019-12-23T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I've written a bit before about [immutability](/immutability-in-javascript/), and [how to create immutable arrays and objects with vanilla JS](/a-better-way-to-create-an-immutable-copy-of-an-array-or-object-with-vanilla-js/).

One of the things my students often find confusing about immutability is what being *immutable* actually means.

Let's explore that a bit.

## Creating a copy of a variable

Let's say you have some things saved to variables, and you want to create copies.

```js
var num1 = 42;
var str1 = 'Hello';
var arr1 = [1, 2, 3];
var obj1 = {greeting: 'hello', name: 'world'};
```

With numbers and strings, assigning the original variable to a new variable creates a new item.

```js
// Copy items
var num2 = num1;
var str2 = str1;

// Update the copies
num2 = num2 - 10;
str2 += ' world';

// Logs 42
console.log(num1);

// Logos "Hello"
console.log(str1);
```

Objects and arrays work a big differently. Assigning the original variable to a new one creates a *reference* to the original rather than a new item.

```js
// Copy items
var arr2 = arr1;
var obj2 = obj1;

// Update the copies
arr2.push(4, 5, 6);
obj2.name = 'universe';

// Logs [1, 2, 3, 4, 5, 6]
console.log(arr1);

// Logs {greeting: 'hello', name: 'universe'}
console.log(obj1);
```

Even though the copies were the ones that were modified, the original arrays and objects were also updated. The new variables point back to the original.

[Here's a demo with all of these examples.](https://codepen.io/cferdinandi/pen/QWwpRgr)

## So... what does immutable mean?

If an item is *mutable*, modifying the copy also modifies the original. If it's *immutable*, modifying the copy does not affect the original.

It's confusing because immutable sounds like the item can't be changed. What it actually means, though, is that the original is not changed when the copy is.

Hope that clears some things up!