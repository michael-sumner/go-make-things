---
title: "API authentication with vanilla JS"
date: 2021-04-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

_This is an excerpt from my new and updated [APIs and Asynchronous JS pocket guide](https://vanillajsguides.com/apis/)._

Some APIs&mdash;like the [Ron Swanson Quotes Generator](https://github.com/jamesseanwright/ron-swanson-quotes) and [Random Dog](https://random.dog/woof.json)&mdash;work by simply calling an endpoint.

Others&mdash;like the [New York Times](https://developer.nytimes.com/) and many endpoints for the [GitHub API](https://developer.github.com/v3/#authentication)&mdash;require you to authenticate who you are before you can make API calls.

## How to authenticate an API

To authenticate you, the API may require:

1. Your username and password.
2. A *key* and *secret*.
3. An *API key* or *OAuth token*.

These can be passed along to the API in a variety of ways.

## Credentials as a query string parameter

Some APIs accept an API key or other credentials as a query string parameter on the endpoint URL.

For example, here's the endpoint for the New York Times API.

```javascript
// The API Key
// DO NOT store credentials in your JS file like this
let apiKey = '1234';

// Make the API call
fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	render(data);
}).catch(function (error) {
	console.log(error);
});
```

_**IMPORTANT:** You should not store your API credentials in a JS file like this. More on how to use APIs with this kind of authentication in JavaScript in a future article._

## Credentials with basic auth

Some APIs use a simple username/password combination for authentication using an approach called _basic auth_.

With _basic auth_, you include an `Authorization` property on the `headers` key in the `options` object. For it's value, you use the following pattern: `Basic USERNAME:PASSWORD`.

Both the username and password need to be base64 encoded, which we can do with the `window.btoa()` method.

```javascript
// The username and password
// DO NOT store credentials in your JS file like this
let username = 'myUsername';
let password = '1234';

// Authenticate (dummy API)
fetch('https://some-awesome-api.com/authenticate', {
	headers: {
		'Authorization': `Basic ${btoa(username)}:${btoa(password)}`
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

With basic auth, you typically make your API call to a specific authorization endpoint. The returned `data` usually includes a token that expires after some period of time that you'll use for any call you make to other endpoints.

Again, you don't want to include your username and password in your JavaScript file. These are usually asked for in a login form of some sort, and then passed along to the API without being stored.

## Credentials with an authentication token

API tokens are designed to be short term credentials you can use to authenticate API calls _after_ authenticating yourself some other way (typically with a key and secret or username and password).

They can last as little as a few minutes, as long as months, or in some cases, indefinitely.

With _token-based auth_, you again include an `Authorization` property on the `headers` key in the `options` object. For it's value, you use the following pattern: `Bearer TOKEN`. No encoding is required.

```javascript
fetch('https://some-awesome-api.com/token', {
	headers: {
		'Authorization': `Bearer ${token}`
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

## Authentication and security

Tomorrow, we'll look at some best practices around API authentication security, and some workarounds for APIs that don't provide a token-based authentication workflow.