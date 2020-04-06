---
title: "JSONbin: a personal RESTful API service"
date: 2020-04-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

[JSONbin](https://jsonbin.org/) is a free service from Remy Sharp (the person who coined the term *polyfill*) that lets you create your own person RESTful API for use on small projects.

Last week, I mentioned that [I'm working on a new _Advanced_ version of my popular Vanilla JS Academy training program](/how-to-make-the-transition-from-beginner-to-advanced-developer/). The program focuses a lot more heavily on building web apps and API-driven UIs.

JSONbin is going to play a big role in the program. Its perfect for tinkering and small little side-projects.

Today, I wanted to teach you how to use it with vanilla JS.

## Signing Up

This part is super easy.

1. Visit [JSONbin.org](https://jsonbin.org).
2. Click [the signin link](https://jsonbin.org/).
3. Connect JSONbin to your GitHub account.

That's it!

## Making API calls

JSONbin uses an API key to authenticate API calls. Once you're logged in, your key is displayed right on the homepage.

If you're using PHP or NodeJS on the server to make calls, you can use the API key directly in your code. But if you're making API calls from your client-side JavaScript, you'll want to use an OAuth-like session token flow.

### Creating a session token

Let's say you're building a web app and want to sync your data with JSONbin.

In the UI, you'll need a way to manually enter your API key (*probably a sign in form, but even [an old-school `window.prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) works*).

Then, you'll take the API key and use it to get a session token using the `_/bearer` endpoint and a `token` authorization header.

```js
// Get the API key
var apiKey = window.prompt('What is your API key?');

// Request a session token
fetch('https://jsonbin.org/_/bearer', {
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'token ' + apiKey,
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	// This is the response with the session token and how long it's good for
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

By default, session tokens are good for one hour.

You can set them last for more or less time using the `exp` query parameter on your endpoint, with the time you want it to be good for in milliseconds.

### Making calls with the session token

Once you have session token, you'll want to save it to reuse for the duration of the session. The `sessionStorage` API is really handy for this.

```js
// Get the API key
var apiKey = window.prompt('What is your API key?');

// Request a session token
fetch('https://jsonbin.org/_/bearer', {
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'token ' + apiKey,
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {

	// This is the response with the session token and how long it's good for
	console.log(data);

	// Store the session token
	sessionStorage.setItem('myToken', data.token);

}).catch(function (error) {
	console.warn(error);
});
```

When you go to make calls, you can get the token from `sessionStorage` and use it with the `bearer` authorization header.

```js
fetch('https://jsonbin.org/me', {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + sessionStorage.getItem('myToken')
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	return error.json();
});
```

## Endpoints

The `/me` endpoint will return all of the data you have stored in in JSONbin. You can create new endpoints (and data to go with it) using the `POST` or `PUT` methods.

For example, I could create a `wizards` endpoint like this.

```js
fetch('https://jsonbin.org/me/wizards', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + sessionStorage.getItem('myToken')
	},
	body: JSON.stringify({
		harryPotter: {
			name: 'Harry Potter',
			skill: 'Failing up'
		},
		hermioneGranger: {
			name: 'Hermione Granger',
			skill: 'Literally everything'
		}
	})
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	return error.json();
});
```

Once you have created an endpoint, you can call it directly.

In this example, `data` would be the JSON object with `harryPotter` and `hermioneGranger` that I `POST`ed above.

```js
fetch('https://jsonbin.org/me/wizards', {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + sessionStorage.getItem('myToken')
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	return error.json();
});
```

## Creating public endpoints

My favorite thing about JSONbin is that it allows you to create public endpoints.

A public endpoint still requires authentication to update, modify, or delete, but allows `GET` requests without an API key or session token.

With a public endpoint, you could have an admin view that lets create new data and requires authentication, and a front end that pulls data from the API and renders it into the UI.

To change an endpoint's permissions, use the `/me/:path/_perms` endpoint.

- Use the `PUT` method to make the endpoint public
- Use the `DELETE` method to make the endpoint private
- Use the `GET` method to check the endpoint permissions

**Make the `/me/wizards` endpoint public**

```js
fetch('https://jsonbin.org/me/wizards/_perms', {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + sessionStorage.getItem('myToken')
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	return error.json();
});
```

**Make the `/me/wizards` endpoint private**

```js
fetch('https://jsonbin.org/me/wizards/_perms', {
	method: 'DELETE',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + sessionStorage.getItem('myToken')
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	return error.json();
});
```

### Using a public endpoint

To call a public endpoint without authentication, you *cannot* use the `/me` alias. You instead have to use your username (listed on the JSONbin homepage) in the endpoint path.

```js
fetch('https://jsonbin.org/myusername/wizards/', {
	headers: {
		'Content-Type': 'application/json'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	return error.json();
});
```

## Start tinkering

If you find JSONbin useful, make sure you [let Remy know](https://twitter.com/rem). He built something awesome and gave it away for free.

And if you want to dig deeper into stuff like this, you'll love the [new _Advanced Vanilla JS Academy_ program](https://vanillajsacademy.com) I'm working on. [Sign up here to get notified when it's available](https://vanillajsacademy.com) and get exclusive discounts.