---
title: "The Geolocation API"
date: 2021-06-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The Geolocation API allows users to share their location with a website.

It's permission-based, and requires the user to approve sharing that data on a site-by-site and request-by-request basis. It also requires an SSL certificate, though it can be used without one when running it locally.

## Geolocation.getCurrentPosition()

The `navigator.geolocation.getCurrentPosition()` method triggers a request for the user's location data.

You can pass in a callback function as an argument that runs when the location is successfully retrieved. If the user denies the request, or something goes wrong, you can also provide an optional callback function to handle errors.

```js
/**
 * Log the user's location details
 * @param  {Object} position The location details
 */
function logLocation (position) {
	console.log(position);
}

/**
 * Log an error message
 * @param  {Object} error The error details
 */
function logError (error) {
	console.warn(error);
}

// Request access to the user's location
navigator.geolocation.getCurrentPosition(logLocation, logError);
```

The `position` data that's passed into the `success` callback function is an object with a `timestamp` for when the location was retrieved, and a `coords` object with the user's `latitude` and `longitude` data, as well as some additional details that vary by device and capabilities.

```js
/**
 * Log the user's location details
 * @param  {Object} position The location details
 */
function logLocation (position) {
	console.log(position);
	console.log('longitude', position.coords.longitude);
	console.log('latitude', position.coords.latitude);
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/NWpZvKb)

## Geolocation options

The `navigator.geolocation.getCurrentPosition()` method accepts a third argument: an object of `options`.

- **`enableHighAccuracy`** is a boolean. If `true` and the user's device supports it, a more accurate position will be provided. This can result in slower response times and increased power consumption for mobile devices. _default: `false`_
- **`timeout`** is an integer representing how long to wait (in milliseconds) for a result to return before timing out. _default: `Infinity`_
- **`maximumAge`** is an integer representing how old (in milliseconds) cached location data can be. If `0`, fresh data is always retrieved. _default: `0`_

```js
// Request access to the user's location
// enableHighAccuracy - indicates the application would like to receive the best possible results
// timeout - how long to wait (in milliseconds) for a result to return
// maximumAge - maximum age (in milliseconds) allowed for cached position data
navigator.geolocation.getCurrentPosition(logLocation, logError, {
	enableHighAccuracy: true, // default: false
	timeout: Infinity,        // default: Infinity
	maximumAge: 0             // default: 0
});
```