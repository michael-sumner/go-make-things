---
title: "Working with XHR response data in vanilla JS"
date: 2018-05-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to use XHR (`XMLHttpRequest()`'s) to get data from APIs](/ajax-and-apis-with-vanilla-javascript/) with vanilla JavaScript.

The most common response type from API calls is JSON, an acronym for JavaScript Object Notation. It has the same structure and format (for the most part) as a JavaScript object (sometimes it's wrapped in an array).

The response data can be accessed from the `responseText` property on the `XMLHttpRequest` object.

```js
var xhr = new XMLHttpRequest();

// ...

var data = xhr.responseText;
```

Here it is in full context.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();

// Setup our listener to process completed requests
xhr.onload = function () {

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// Runs when the request is successful
		console.log(xhr.responseText);
	} else {
		// Runs when it's not
		console.log(xhr.responseText);
	}

};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();
```

There's a small problem, though: XHR.responseText is returned as a `string`, even though it's in JSON format.

## Converting `xhr.responseText` from a string to an object

If you called the `/posts` endpoint over at [JSON Placeholder](https://jsonplaceholder.typicode.com/), you would get back a list of posts. You might try to loop through them like this.

```js
if (xhr.status >= 200 && xhr.status < 300) {
	xhr.responseText.forEach(function (post) {
		var title = post.title;
		var content = post.content;
	});
}
```

However, you'd get an error. Because the `xhr.responseText` is a string, you can easily manipulate it.

To work with the data, you need to convert it back into an object. You can do this using the `JSON.parse()` method.

```js
// Convert data string to an object
var data = JSON.parse(xhr.responseText);

// Get the first item
var firstPost = data[0];

// Loop through each post
data.forEach(function (post) {
	console.log(post);
});
```

Here it is in full context again.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();

// Setup our listener to process completed requests
xhr.onload = function () {

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// Runs when the request is successful
		console.log(JSON.parse(xhr.responseText));
	} else {
		// Runs when it's not
		console.log(JSON.parse(xhr.responseText));
	}

};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();
```

## Working with your converted data

Going back to our example from before, if you wanted to loop through each post, you would instead do this.

```js
if (xhr.status >= 200 && xhr.status < 300) {
	var posts = JSON.parse(xhr.responseText);
	posts.forEach(function (post) {
		var title = post.title;
		var content = post.content;
	});
}
```