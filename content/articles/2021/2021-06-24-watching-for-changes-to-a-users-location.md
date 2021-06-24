---
title: "Watching for changes to a user's location"
date: 2021-06-24T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

Yesterday, we learned about [the Geolocation API](/the-geolocation-api/), and how to use the `Geolocation.getCurrentPosition()` to get the user's current location.

Today, we're going to learn how you can watch for changes to the user's position and do things when it changes. Let's dig in!

## Geolocation.watchPosition()

The `navigator.geolocation.watchPosition()` method accepts the same arguments as the `navigator.geolocation.getCurrentPosition()` method.

You can pass in a callback function as an argument that runs when the location is successfully retrieved. If the user denies the request, or something goes wrong, you can also provide an optional callback function to handle errors. As an optional third argument, you can also [provide an object of options](/the-geolocation-api/#geolocation-options).

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

// Request access to watch the user's location
navigator.geolocation.watchPosition(logLocation, logError, {enableHighAccuracy: true});
```

When called, it gets the user's current position just like the `Geolocation.getCurrentPosition()` method.

Any time their position changes (for example, if they're using a mobile device and walking or driving around), the `success` callback function runs again with their updated location details.

## How to stop watching a user's location

I would imagine that the `Geolocation.watchPosition()` can be a bit demanding on a mobile device's battery, so it's a good idea to stop watching when location data is no longer needed.

Similar to [the `requestAnimationFrame()` and `setTimeout()` methods](/how-to-use-requestanimationframe-with-vanilla-js/), the Geolocation API provides a way to clear your watcher function.

The `Geolocation.getCurrentPosition()` returns an ID for the watcher that you can assign to a variable. To stop watching, pass the ID into the the `Geolocation.clearWatch()` method.

```js
// Watch the user's location
let watchLocation = navigator.geolocation.watchPosition(logLocation, logError, {enableHighAccuracy: true});

// ... some time later
// Stop watching the user's location
navigator.geolocation.clearWatch(watchLocation);
```

## When would you need to watch a user's location?

This method in the Geolocation API is useful for building location-aware web apps, like...

- A map application
- A geocaching or scavenger hunt app
- A Pokemon Go! clone

(_I guess technically speaking those are all scavenger hunt apps, huh?_)

This isn't the kind of thing you'll need on all or even many of the things you build. But it's really cool that the web platform exposes deeply integrated APIs like this for when you need them.