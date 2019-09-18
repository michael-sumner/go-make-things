---
title: "How to make multiple fetch() calls with the same OAuth token in vanilla JS"
date: 2019-09-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [using OAuth with `fetch()` in vanilla JS](/using-oauth-with-fetch-in-vanilla-js/).

Today, we're going to explore how to use the same OAuth token to make additional API calls.

## An example

We're going to continue working with our Petfinder API example from yesterday.

Let's imagine that we want to immediately get pet data when the page loads, but also want to fetch fresh data when a button with the ID `#refresh` is clicked.

```html
<button id="refresh">Make a Call</button>
```

## Saving OAuth token data

To reuse our token, we need to save it somewhere.

For today's article, I'm going to store it to a variable. For reuse over multiple page views, you could store it to `sessionStorage` or `localStorage` instead.

First, let's create variables for the `token` itself, the `tokenType`, and when it `expires`.

```js
// Token
var token, tokenType, expires;
```

In our OAuth API call, once we get a token back, we'll store the token details to those variables. The `data.access_token` will get assigned to `token`, and the `data.token_type` will get assigned to `tokenType`.

The Petfinder API returns an amount of time the token is good for in seconds: `data.expires_in`.

We'll use `new Date().getTime()` to get a Unix timestamp of the current time. This is in milliseconds. Then, we'll multiply our `data.expires_in` number by `1000` to convert seconds to milliseconds. Finally, we'll add that value to our timestamp, to get a Unix timestamp for when the OAuth token expires, and save it to the `expires` variable.

```js
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

	// Store token data
	token = data.access_token;
	tokenType = data.token_type;
	expires = new Date().getTime() + (data.expires_in * 1000);

});
```

## Splitting up our calls

In [yesterday's article](/using-oauth-with-fetch-in-vanilla-js/), we chained our API calls together with `then()` methods. To reuse our OAuth token, we're going to split them up into two separate parts.

First, let's move our `fetch()` call to get an OAuth token to a helper function named `getOAuth()`. We'll also return the `fetch()` method to expose the Promise outside of the helper function.

```js
/**
 * Get OAuth credentials
 * @return {Promise} The fetch() Promise object
 */
var getOAuth = function () {
	return fetch('https://api.petfinder.com/v2/oauth2/token', {
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

		// Store token data
		token = data.access_token;
		tokenType = data.token_type;
		expires = new Date().getTime() + (data.expires_in * 1000);

	}).catch(function (err) {

		// Log any errors
		console.log('something went wrong', err);

	});
};
```

Next, we'll create another function to get our pet data named `getPets()`. Instead of using our returned `data.access_token` and `data.token_type` properties, we'll use the `token` and `tokenType` variables.

We'll again return the `fetch()` method.

```js
/**
 * Get pet data and render into the UI
 * @return {Promise} The fetch() Promise object
 */
var getPets = function () {
	return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		headers: {
			'Authorization': tokenType + ' ' + token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
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
};
```

## Making our calls

Now, let's create a helper function named `makeCall()` to help make our actual calls for us.

In it, we'll check to see if `expires` has a value. If it does, we'll subtract the current Unix timesteamp (`new Date().getTime()`) from it. If the resulting number is less than `1`, the token has expired.

We'll call our `getOAuth()` method.

```js
/**
 * Get a token and fetch pets
 */
var makeCall = function () {

	// If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getOAuth().then(function () {
			getPets();
		});
	}

};
```

Remember how we returned the `fetch()` method in our `getOAuth()` function? That returned the Promise, allowing us to chain a `then()` method to `getOAuth()` that will fire when `fetch()` resolves.

In it, we'll call our `getPets()` method to get pets after we have an OAuth token. Then we'll `return` to end the function.

```js
/**
 * Get a token and fetch pets
 */
var makeCall = function () {

	// If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getOAuth().then(function () {
			getPets();
		});
		return;
	}

};
```

If the existing token is still valid, we can skip getting a new one and immediately call our `getPets()` helper method.

```js
/**
 * Get a token and fetch pets
 */
var makeCall = function () {

	// If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getOAuth().then(function () {
			getPets();
		});
		return;
	}

	// Otherwise, get pets
	console.log('from cache');
	getPets();

};
```

## Running our helper methods

At the end of our script, we'll immediately call the `makeCall()` method.

We'll also use `document.querySelector()` to get the `#refresh` button. Then, we'll add a `click` event listener on it, and run the `makeCall()` function again whenever it's clicked.

```js
// Get the #refresh button
var btn = document.querySelector('#refresh');

// Make API calls
makeCall();
btn.addEventListener('click', makeCall, false);
```

[Here's a demo on CodePen](https://codepen.io/cferdinandi/pen/BaBqwxZ) that you can play with.