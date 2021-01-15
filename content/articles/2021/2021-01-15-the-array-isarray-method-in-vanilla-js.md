---
title: "The Array.isArray() method in vanilla JS"
date: 2021-01-15T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to share a simple but useful vanilla JS method: `Array.isArray()`.

You pass an item into `Array.isArray()` method, and it returns `true` if the item is an array or `false` if it's not. That's it. That's the whole method.

```js
// returns true
Array.isArray(['Gandalf', 'Radagast']);

// returns true
Array.isArray([]);

// returns false
Array.isArray({
	name: 'Radagast',
	profession: 'wizard'
});

// returns false
Array.isArray(null);

// returns false
Array.isArray(42);
```

Situational, but handy!