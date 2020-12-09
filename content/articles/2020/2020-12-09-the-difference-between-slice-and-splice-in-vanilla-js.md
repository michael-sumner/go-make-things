---
title: "The difference between the Array.slice() and Array.splice() methods in vanilla JS"
date: 2020-12-09T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The vanilla JS `Array.slice()` and `Array.splice()` methods are both used manipulate items in an array. Because their names are so similar, and because they do similar things, a lot of my students get confused about how they're different, and when to choose one over the other.

Today, I'm going to demystify them a bit.

## A sample array

For today's lesson, we'll use an array of wizards from _Lord of the Rings_.

```js
var wizards = ['Gandalf', 'Radagast', 'Saruman', 'Alatar'];
```

Let's manipulate this a bit.

## The `Array.slice()` method

The `Array.slice()` method _creates a new array_ from an existing one, optionally using the starting and ending indexes you provide as arguments.

By calling `slice()` with no arguments, I can create a complete copy of the `wizards` array.

```js
// returns ["Gandalf", "Radagast", "Saruman", "Alatar"]
wizards.slice();
```

I can create a copy that includes just a subset of items by passing in a starting index and ending index.

If I skip the ending index, it will start with my starting index, and run to the end of the array. If you pass in a negative number, it will start from the end of the array.

```js
// returns ["Radagast", "Saruman", "Alatar"]
wizards.slice(1);

// returns ["Radagast", "Saruman"]
wizards.slice(1, 3);

// returns ["Saruman", "Alatar"]
wizards.slice(-2);
```

The `slice()` method always creates a new array, so the original array remains intact.

```js
// logs ["Gandalf", "Radagast", "Saruman", "Alatar"]
console.log(wizards);
```

## The `Array.splice()` method

The `Array.splice()` method, on the other hand, is used to add, remove, and replace items in an array. When using the method, the original array _is_ modified.

The first argument is the index of the item you want to modify in the array, and is the only required argument. The second argument is the number of items to delete from the array. It can be a number from `0` through the length of the array.

If you omit the second argument, the `Array.splice()` method will delete every item in the array from the start index on.

```js
// This removes 1 item at index 2: "Saruman"
// wizards is now ["Gandalf", "Radagast", "Alatar"]
wizards.splice(2, 1);
```

If you want to add any items to the array at the specific index, you can pass them in as additional arguments.

Use `0` as the second argument to add your items, and `1` or more as the second argument to delete the existing item at that index and replace it.

```js
// This adds "Dumbledore" at index 2, and removes 0 items at that index
// wizards is now ["Gandalf", "Radagast", "Dumbledore", "Alatar"]
wizards.splice(2, 0, 'Dumbledore');

// This replaces "Dumbledore" with "Hermione"
// wizards is now ["Gandalf", "Radagast", "Hermione", "Alatar"]
wizards.splice(2, 1, 'Hermione');
```

## How to remember: slicing and splicing

I use analog references to help me remember the difference between these two.

With the `slice()` method, you're taking a slice of an array. If an array were a film reel, the `splice()` method behaves like physically splicing that reel would. You can cut the array up; add, remove or replace things; and then tape it all back together.

Super nerdy, and may not work for you, but that's how I keep them sorted in my head.

And if you'd like to hear Steve Griffith's soothing voice explain this, [you can watch his video on these methods here](https://www.youtube.com/watch?v=u1ZCQfXQprE).