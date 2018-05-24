---
title: "Immutability in JavaScript"
date: 2018-05-24T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to take a quick look at the concept of immutability in JavaScript (or it's lack thereof), and its implication on how you write code.

## What is "immutability"

In JavaScript, things that are *immutable* don't change in value when you use them, and things that are *mutable* do.

Let's look at some examples.

### Strings

First up, strings. Strings are immutable. In the example below, setting a new variable of `str2` by calling `slice()` on `str1` in no way changes the value of `str1`;

```js
var str1 = 'Hello, there!';
var str2 = str1.slice(0, 5);

// logs "Hello, there!"
console.log(str1);

// logs "Hello"
console.log(str2);
```

You can still change the value of `str1`.

```js
str1 = 'Goodbye, friend!';
```

But the value of the the original string itself doesn't change when do things with it.

### Numbers

Numbers are also immutable. Doing some math on the `num1` variable and setting it to a new variable doesn't change the value of `num1`.

```js
var num1 = 42;
var num2 = num1 - 7;

// logs 42
console.log(num1);

// logs 35
console.log(num2);
```

This all seem painfully obvious, right? Then we get to arrays and objects.

### Arrays

Arrays are mutable.

In the example below, we're setting the variable `arr2` to the value of `arr1`, and then pushing a item, `cookie`, into it.

Surprisingly, the value of `arr1` changed, too! In this example, `arr2` isn't a new array the way referencing strings and numbers would be. It's the original array pointed to by another variable.

```js
var arr1 = ['sandwich', 'soda', 'chips'];

var arr2 = arr1;
arr2.push('cookie');

// logs ["sandwich", "soda", "chips", "cookie"]
console.log(arr1);

// logs ["sandwich", "soda", "chips", "cookie"]
console.log(arr2);
```

### Objects

Objects are also mutable.

Here, we're setting the value of `obj2` to `obj1`, and then adding a new item with a key of `cookie` and value of `chocolate chip` to it. But when you log both objects, they have all of the same properties!

```js
var obj1 = {
	sandwich: 'turkey',
	soda: 'Pepsi',
	chips: 'Cape Cod'
};

var obj2 = obj1;
obj2.cookie = 'chocolate chip';

// logs {sandwich: "turkey", soda: "Pepsi", chips: "Cape Cod", cookie: "chocolate chip"}
console.log(obj1);

// logs {sandwich: "turkey", soda: "Pepsi", chips: "Cape Cod", cookie: "chocolate chip"}
console.log(obj2);
```

## The challenge with mutability

Often, when setting a new array or object and referencing the value of an exiting one, you're trying to create a new item and preserve the value of the original.

The mutability of arrays and objects makes it harder to trust the original source of data.

Tomorrow, we'll look at some strategies for dealing with mutability.