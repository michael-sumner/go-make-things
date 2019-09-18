---
title: "Getting HTML with fetch() in vanilla JS"
date: 2019-09-11T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to use the Fetch API with vanilla JS](/how-to-use-the-fetch-api-with-vanilla-js/). The article focused on making API calls and working with JSON data.

Today, I want to show you how to use `fetch()` to get HTML instead.

## The Fetch API returns a stream

To recap, the response we get back from `fetch()` is a `ReadableStream`.

With a typical API request, we use the `json()` method to get a JSON object from the stream that was returned.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

But what if we want to fetch HTML instead?

## The Fetch `text()` method

For example, what if I wanted to get [the `/about` page from my site](/about), and grab my profile photo from it?

The trick is to use the `text()` method instead of the `json()` method on the stream. This will return a text string of the HTML.

```js
fetch('/about').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	console.log(html);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

*__Note:__ this will only work if run at https://gomakethings.com. You'll get a CORS error if you try to run it anywhere else.*

## Getting HTML from the text string

Now that we have our HTML as a text string, we can do a couple of different things with it.

1. Inject it directly into an element [with `innerHTML`](https://vanillajstoolkit.com/reference/html/innerhtml/).
2. [Convert it to HTML](/converting-a-string-into-markup-with-vanilla-js/) and manipulate it.

Since I want to get my profile image from the page, let's go with option 2.

For simplicity, I'm going to use DOMParser. But you should read [this full article on DOMParser](/converting-a-string-into-markup-with-vanilla-js/) to learn about browser support and a fallback approach.

```js
fetch('/about').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

Once our HTML string is converted into a document object, we can use DOM methods and APIs on it. Specifically, we can use `querySelector()` to get the `img` element from the page.

```js
fetch('/about').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

	// Get the image file
	var img = doc.querySelector('img');
	console.log(img);

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

And with that, we've successfully gotten HTML with the Fetch API, converted it into DOM nodes, and manipulated it.