---
title: "Checking for an item in a string or array after a specific index with vanilla JS"
date: 2020-03-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've looked at [how to check for text in a string](/how-to-check-for-text-in-a-string-with-vanilla-js/) and [how to check for an item in an array](/how-to-check-for-an-item-in-an-array-with-vanilla-js/).

What if you wanted to do those things, but you wanted to start looking at a certain index?

Let's learn how.

## Specifying a starting position with the `includes()` and `indexOf()` methods

The `includes()` and `indexOf()` methods for both strings and arrays let you specify a starting position as an optional second argument.

If you pass that argument in, the method will start looking for the substring or item at that index.

Here's an example with a string.

```js
var hitchhiker = 'The answer to the ultimate question of life, the universe, and everything';

// returns true
hitchhiker.includes('question');

// returns false, because "question" starts at index 27
hitchhiker.includes('question', 42);

// returns 27
hitchhiker.indexOf('question', 42);

// returns -1 for the same reason
hitchhiker.indexOf('question', 42);
```

And here's one with an array.

```js
var wizards = ['Hermoine', 'Neville', 'Harry Potter', 'Dumbledore'];

// returns true
wizards.includes('Neville');

// returns false, because "Neville" has an index of 1
wizards.includes('Neville', 3);

// returns 1
wizards.indexOf('Neville');

// returns -1 for the same reason
wizards.indexOf('Neville', 3);
```

## When would you need this?

Honestly, I'm not sure. I've never had a need for this one, but in case you might, it's good to have the option.