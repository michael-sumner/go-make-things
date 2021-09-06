---
title: "Sending credentials with JavaScript"
date: 2021-09-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I’m creating [a new pocket guide and video course on token-based authentication](https://vanillajsguides.com). It’s going to be part of a new expert bundle I’m working on.

Yesterday, I wrote about [what token-based authentication actually is](/what-is-token-based-authentication/). Today, I wanted to share a work-in-progress from the guide on what how to send credentials with JavaScript.

Let’s dig in!

## Query Strings

Some APIs accept a token or other credentials as a query string parameter on the endpoint URL.

```javascript
// Make the API call
fetch('https://my-app.com/wizards?token=1234').then(function (response) {
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

## Basic Auth

Some APIs use a simple username/password combination for authentication using an approach called _basic auth_.

With _basic auth_, you include an `Authorization` property on the `headers` key in the `options` object with the `fetch()` method. For it's value, you use the following pattern: `Basic USERNAME:PASSWORD`.

The username and password need to be base64 encoded, which we can do with the `window.btoa()` method.

```javascript
// The username and password
// DO NOT store credentials in your JS file like this
let username = 'myUsername';
let password = '1234';
let auth = btoa(`${username}:${password}`);

// Authenticate (dummy API)
fetch('https://my-app.com/auth', {
	headers: {
		'Authorization': `Basic ${auth}`
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

With basic auth, you typically make your API call to an authorization endpoint. The returned `data` usually includes the authentication token you can use for any calls you make to other endpoints.

## Bearer Tokens

Once you have a token, you again include an `Authorization` property on the `headers` key in the `options` object. For it's value, you use the following pattern: `Bearer TOKEN`. No encoding is required.

```javascript
fetch('https://my-app.com/wizards', {
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