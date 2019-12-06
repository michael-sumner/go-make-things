---
title: "Defining unneeded variables in JavaScript"
date: 2019-12-06T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

One habit I see come up a lot is the tendency to set variables when they're not needed.

For example, let's say you have a `textarea` that looks like this.

```html
<textarea id="text"></textarea>
```

When the value of that `textarea` changes, you want to log the number of characters into the console.

First, you would attach an event listener to the `#text` element for `input` events. When the event listener fires, you would get the element's `value.length` and log it.

I often see students save the `textarea.value.length` to a variable before using it.

```js
var textarea = document.querySelector('#text');
textarea.addEventListener('input', function (event) {

	// Get the length of the textarea's content
	var length = textarea.value.length;

	// Log it into the console
	console.log(length);

});
```

This works, but the variable provides no benefit.

It's only used once. It's not any more clear to read. It takes up additional space in the browser's memory (admittedly a comically small amount). It adds more characters to the code base.

We can instead use that value directly.

```js
var textarea = document.querySelector('#text');
textarea.addEventListener('input', function (event) {
	console.log(textarea.value.length);
});
```