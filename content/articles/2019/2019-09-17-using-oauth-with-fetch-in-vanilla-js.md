---
title: "Using OAuth with fetch() in vanilla JS"
date: 2019-09-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

When I write about working with APIs, I often get back questions about authenticating with OAuth.

Today, I wanted to show you how to use OAuth with `fetch()` in vanilla jS.

## An example

To help this all click, let's work with a real example: [the Petfinder API](https://www.petfinder.com/developers/v2/docs/). To work along with me, you'll first need to [create an account](https://www.petfinder.com/user/register/) and [get an API key and secret](https://www.petfinder.com/developers/).

The Petfinder API can be used to get a list of adoptable pets for a specific shelter (or by animal type or breed). Shelters and rescue organizations often use this data to show a list of adoptable pets on their site.

It uses OAuth.

## How OAuth works

Making API calls with OAuth is a two step process:

1. You use persistent credentials, like your API key and secret (or sometimes username and password), to get a temporary *OAuth token*. This is a private, short-term password-like string.
2. Instead of your persistent credentials, you pass along your OAuth token to make all of your API calls.

Getting the OAuth token itself requires an API call. OAuth tokens typically expire after a short period of time&mdash;often an hour or a day.

## Getting an OAuth token with the Petfinder API

Let's first [use `fetch()`](/how-to-use-the-fetch-api-with-vanilla-js/) to get an OAuth token from the Petfinder API.

I'm going to create variables to hold my API `key` and `secret`. Replace them with your credentials if you're following along.

```js
// Client credentials
var key = '12345';
var secret = 'abcde';
```

Next, I'll call the `/v2/oauth2/token` endpoint to get my OAuth token.

The specific parameters you'll need to pass in will vary from API to API. For Petfinder, I need to pass in a `grant_type` of `client_credentials`, along with my `client_id` (my `key`) and `client_secret` (my `secret`).

We need to use the `POST` method for this API call (that's true of all OAuth requests). The Petfinder API also uses `application/x-www-form-urlencoded` as it's `Content-type`. This is the default for XHR, but `fetch()` uses JSON as it's default.

```js
// Call the API
// This is a POST request, because we need the API to generate a new token for us
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});
```

If our request is successful, the API will return our OAuth token.

We'll use the `json()` method to convert the Fetch stream into a JSON object, then log it to the console. If there's an error along the way, we'll use the `catch()` method to log it to the console.

```js
// Call the API
// This is a POST request, because we need the API to generate a new token for us
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
```

We should see an object like this logged to the console. The `access_token` is your OAuth token. The `expires_in` key is how long it's good for, in seconds.

```js
var data = {
	access_token: "a1b2c3d4e5",
	expires_in: 3600,
	token_type: "Bearer"
};
```

## Using the OAuth token to make API calls

Now that we have our token, we can make other calls the Petfinder API. For this example, let's use the `/animals` endpoint to get back some adoptable animals.

I'm going to create two new variables, the `org` to get animals from, and the adoptable `status`.

For this example, we can use the Petfinder ID for [PAWS New England](https://pawsnewengland.com), an animal rescue I work with. We only want to get back `adoptable` animals, not ones that have already been adopted.

```js
// Call details
var org = 'RI77';
var status = 'adoptable';
```

In our `then()` method, we'll return another `fetch()` method (this works because the Fetch API returns a Promise).

This time, we'll call the `/animals` endpoint, adding the `organization` and `status` as query string parameters.

In our `headers` object, we'll include the `Authorization` key. For it's value, we'll use the `token_type` and `access_token` (our OAuth details), separated by a space (`' '`), from the `data` object.

```js
// Call the API
// This is a POST request, because we need the API to generate a new token for us
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);

	// Return a second API call
	// This one uses the token we received for authentication
	return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
```

If the call is successful, we'll again use the `json()` method to get a JSON object from the stream. Then, we'll log our pet `data` to the console.

```js
// Call the API
// This is a POST request, because we need the API to generate a new token for us
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);

	// Return a second API call
	// This one uses the token we received for authentication
	return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

}).then(function (resp) {

	// Return the API response as JSON
	return resp.json();

}).then(function (data) {

	// Log the pet data
	console.log('pets', data);

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
```

If the API call worked, you should have an object with an array of adoptable pets, and some information about pagination. If not, the `catch()` method will again catch any errors and log them to the console.

[Here's a demo you can play around with.](https://codepen.io/cferdinandi/pen/ZEzMjRW) Make sure to replace the `key` and `secret` with your Petfinder API credentials.

Tomorrow, we'll look at how to save and reuse the OAuth token.