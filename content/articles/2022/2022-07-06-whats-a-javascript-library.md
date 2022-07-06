---
title: Whats a JavaScript library?
date: 2022-07-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

A few weeks ago, I rewrote and rerecorded my entire course and book on [writing JavaScript libraries](https://vanillajsguides.com/writing-js-libraries/).

I rewrote the whole thing to better explain its core concepts, added an entire section on JavaScript classes, replaced all of the examples with newer, easier-to-understand ones. This week, I wanted to share some of the chapters from the guide.

Let's dig in!

## So, what's a JS library?

A JavaScript library is code that abstracts commonly used or complicated tasks into a simpler, easier-to-use format.

You might sometimes see a JS library referred to as a plugin, module, or component. There aren't official definitions for these things, and these terms are generally used interchangeably.

JavaScript libraries can be small functions that do just one thing, or big objects with lots of methods and features.

They're generally focused around one theme or task. [jQuery](https://jquery.com/) is a DOM manipulation library. [lodash](https://lodash.com/) is a utility library. [PhotoSwipe](https://photoswipe.com/) is an image gallery library. And even though we often call it a framework, [React](https://reactjs.org/) is a UI library.

## What's the difference between a library and a helper function?

Generally speaking, a helper function is code written for a specific project or code base, while a library is abstracted and can be used in many projects.

For example, a function that calls an API specific to your app and automatically returns parsed JSON data is a helper function.

```javascript
// This is a helper function
function sendData (params) {
	return fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: new URLSearchParams(params).toString(),
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		}
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response.statusText;
	}).then(function (data) {
		return data;
	}).catch(function (error) {
		return error;
	});
}

// You might use it like this
sendData({
	title: 'Going to the beach',
	body: 'We can swim, read, and enjoy the nice weather.',
	userId: 1
}).then(function (data) {
	console.log(data);
});
```

However, a function that lets you call any API and abstracts away some of the repetitive tasks could be considered a library.

```javascript
// This is a super simple library
function sendToAPI (endpoint, params = {}, useJSON = false) {
	return fetch(endpoint, {
		method: 'POST',
		body: useJSON ? JSON.stringify(params) : new URLSearchParams(params).toString(),
		headers: {
			'Content-type': useJSON ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded'
		}
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response.statusText;
	}).then(function (data) {
		return data;
	}).catch(function (error) {
		return error;
	});
}

// You might use it like this
sendToAPI('https://jsonplaceholder.typicode.com/posts', {
	title: 'Going to the beach',
	body: 'We can swim, read, and enjoy the nice weather.',
	userId: 1
}, true).then(function (data) {
	console.log(data);
});
```

The line between them is a bit fuzzy, though, and libraries can be nothing more than a collection of helper functions.

For the rest of the week, we'll be looking at some common JS library patterns. If you can't wait, [you can pick up the course here](https://vanillajsguides.com/writing-js-libraries/).