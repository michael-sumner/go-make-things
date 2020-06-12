---
title: "How to check if an object has a property"
date: 2020-06-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Just a quick tip today. When working with object properties, I often checked for *truthiness* before doing something.

```js
if (data.isRunning) {
	// Do something...
	console.log('Yep!');
}
```

This will log `"Yep!"` into the console if `data.isRunning` is any value other than `null`, `undefined`, `false`, or `0`.

But what if you want to run some code as long as the value exists, even if it's *falsy*?

For that, you can use the `in` operator.

```js
if ('isRunning' in data) {
	// Do something...
	console.log('Yep!');
}
```

Now, `"Yep!"` will log into the console as long as `isRunning` is a property of the `data` object... even if it's `null`, `undefined`, `false`, or `0`.