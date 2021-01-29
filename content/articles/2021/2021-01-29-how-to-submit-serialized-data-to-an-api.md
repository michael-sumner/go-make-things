---
title: "How to submit serialized data to an API"
date: 2021-01-29T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Earlier this week, we looked at how to serialize form data with the `FormData` object. Today, we're going to learn how to submit that data to an API.

Let's dig in!

## A sample form

For today's lesson, let's again use a simple sample form.

```html
<form id="post">

	<label for="title">Title</label>
	<input type="text" name="title" id="title" value="Go to the beach">

	<label for="body">Body</label>
	<textarea id="body" name="body">Soak up the sun and swim in the ocean.</textarea>

	<input type="hidden" name="userId" value="1">

	<button>Submit</button>

</form>
```

## Sending data with the `window.fetch()` method

One of the `options` that you can include with [the `window.fetch()` method](/how-to-use-the-fetch-api-with-vanilla-js/) is `body`. The `body` property holds any data you want to send as part of your HTTP (or API) request.

Depending on the endpoint, this data may be sent as a JSON object or a query string. Some APIs allow both types, while some require just one or the other.

API requests are sent with `headers` that include information about the request.

When sending data with the `window.fetch()` method, you will need to specify the `Content-type` as a property of the `headers` property in the `options` object. This tells the API if the data you sent is JSON or a query string.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: '', // The data
	headers: {
		'Content-type': '' // The type of data you're sending
	}
});
```

## Sending data as a JSON object

To send data as a JSON object, use the `JSON.stringify()` method to convert your data into a string. For your `headers['Content-type']`, use `application/json` as the value.

*__Note:__ the JSON Placeholder API request that you also specify the charset as UTF-8. Most APIs do not need this.*

We'll use the `serialize()` helper function to convert our `FormData` into a plain object.

```javascript
// Serialize form data into an object
function serialize (data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}

// Get the form data
let form = document.querySelector('form');
let data = new FormData(form);

// Submit to the API
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify(serialize(data)),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/BaQawmz)

## Sending data as a query string

To send data as a query string, include the query string as the value of the `body` property. Any properties that may have spaces or special characters in them should be passed into the `encodeURIComponent()` to encode it.

The `new URLSearchParams()` can convert our `FormData` into a search params object for us, and the `URLSearchParams.toString()` method will turn it into an encoded query string.

For your `headers['Content-type']`, use `application/x-www-form-urlencoded` as the value.

```javascript
// Get the form data
let form = document.querySelector('form');
let data = new FormData(form);

// Submit the form data
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: new URLSearchParams(data).toString(),
	headers: {
		'Content-type': 'application/x-www-form-urlencoded'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/eYBYGer)