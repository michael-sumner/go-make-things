---
title: "The Object.fromEntries() method in vanilla JS"
date: 2021-01-27T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I had a few folks respond to yesterday's article about [how to serialize form data into an object](/how-to-serialize-form-data-with-vanilla-js/) to let me know about the `Object.fromEntries()` method as a simpler alternative to my `serialize()` helper function.

Today, I was going to write about how to submit serialized data to an API. But I'm going to push that until tomorrow so we can first look at the `Object.fromEntries()`, how it works, and whether or not you should use it.

## What the `Object.fromEntries()` method does

The `Object.fromEntries()` method takes an _iterable_ of key/value pairs and converts it into an array. You pass the iterable in as an argument.

Using yesterday's `FormData` object as an example, you can create an object of its values like this.

```js
// Get the FormData
let form = document.querySelector('#post');
let data = new FormData(form);

// Convert it into an object
// returns {title: "Go to the beach", body: "Soak up the sun and swim in the ocean.", userId: "1"}
let formObj = Object.fromEntries(data);
```

It's important to note that the `Object.fromEntries()` method doesn't work on _all_ iterables. The iterable must represent a key/value pair.

That means it will work for `FormData` and `Map()`, but not for arrays or `Set()`.

## Should you use the `Object.fromEntries()` method?

The `Object.fromEntries()` method works in all modern desktop browsers, but _not_ Opera Android or Samsung Internet (a mobile browser on many Samsung devices).

That might not seem like a bit deal, but Samsung Internet represents anywhere from 2.5% to 6.5% of total browser share. That's potentially more than Firefox!

Fortunately, [there's a polyfill you can use](https://vanillajstoolkit.com/polyfills/objectentriesfrom/).

```js
/**
 * Object.entriesFrom() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.entriesFrom) {
	Object.entriesFrom = function (entries){
		if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument'); }
		let obj = {};
		for (let [key, value] of entries) {
			obj[key] = value;
		}
		return obj;
	};
}
```

I had originally responded to a few folks that I would personally _not_ use `Object.fromEntries()` until mobile browser support is better.

But after thinking about it more, I'd recommend using it today with a polyfill. The great thing about polyfills is that when browser support gets better, you can rip them out without having to refactor code.