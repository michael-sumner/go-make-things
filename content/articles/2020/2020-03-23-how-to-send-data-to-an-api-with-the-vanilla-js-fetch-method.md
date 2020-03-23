---
title: "How to send data to an API with the vanilla JS fetch() method"
date: 2020-03-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I just completely redesigned my [*APIs & JavaScript* pocket guide](https://vanillajsguides.com/apis/) with modern ES6 approaches, including Promises and `fetch()`.

This is an excerpt.

(*The examples below use the [JSON Placeholder API](https://jsonplaceholder.typicode.com/).*)

## Specifying the HTTP method with `fetch()`

The `fetch()` method accepts an optional second argument: an object of options and settings.

To use an HTTP method other than `GET`, pass in an object with the `method` key, and use your desired HTTP method as the value.

```javascript
// Make a POST request
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST'
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
```

## Sending data with `fetch()`

Another optional property you can include with a `fetch()` request is `body`. The `body` property holds any data you want to send as part of your HTTP (or API) request.

Depending on the endpoint, this data may be sent as a JSON object or a query string. Some APIs allow both types, while some require just one or the other.

API requests are sent with `headers` that include information about the request.

When sending data with `fetch()`, you will need to specify the `Content-type`, which tells the API if the data you sent is JSON or a query string. This is another property you can pass into the options with your `fetch()` method.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: '', // The data
	headers: {
		'Content-type': '' // The type of data you're sending
	}
});
```

### Sending data as a JSON object

To send data as a JSON object, use the `JSON.stringify()` method to convert your data into a string. For your `headers['Content-type']`, use `application/json` as the value.

*__Note:__ the JSON Placeholder API request that you also specify the charset as UTF-8. This is not usually required.*

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({
		title: 'New Pirate Captain',
		body: 'Arrrrrr-ent you excited?',
		userId: 3
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/eYNLMQW)

### Sending data as a query string

To send data as a query string, include the query string as the value of the `body` property. Any query string properties that may have spaces or special characters in them should be passed into the `encodeURIComponent()` to encode it.

For your `headers['Content-type']`, use `application/x-www-form-urlencoded` as the value.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: 'title=' + encodeURIComponent('New Pirate Captain') + '&body=' + encodeURIComponent('Arrrrrr-ent you excited?') + '&userID=3',
	headers: {
		'Content-type': 'application/x-www-form-urlencoded'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/xxGaWQY)

If you want to learn more about using APIs with vanilla JS, checkout [the updated *APIs & JavaScript* pocket guide](https://vanillajsguides.com/apis/).

You'll use what you learn to build a "Twitter for pirates" app.