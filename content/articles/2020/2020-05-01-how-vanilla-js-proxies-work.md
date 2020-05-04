---
title: "How vanilla JS Proxies work"
date: 2020-05-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I've been hearing about Proxies for over a year, but every time I looked into them, I couldn't really figure out what they were or how they were supposed to work.

Yesterday, it finally clicked for me, so today, I want to demystify them for you, too.

Let's dig in.

## What is a JavaScript Proxy?

A Proxy let you detect when someone gets, sets, or updates a property on an object, and run code when they do.

Let's say I have an object with an array of wizards and their respective houses in it.

```js
var wizards = {
	neville: 'Gryffindor',
	malfoy: 'Slitherin',
	cedric: 'Hufflepuff'
};
```

I want to detect whenever a new wizard is added, and save that data to localStorage. And if the wizard someone is trying to get is from Slitherin, I want to return `hiss` instead of the actual house name.

This is the perfect job for Proxies.

## Creating a Proxy

You turn an object into a Proxy with the `new Proxy()` constructor.

The first argument is the object to turn into a Proxy, and the second is a `handler` with *getter* and *setter* functions that should whenever someone tries to get or set data on the object.

We should also add a `deleteProperty` function that will run if a property is ever deleted from the object.

```js
var wizardsProxy= new Proxy(wizards, handler);
```

The `handler` is an object with `get` and `set` properties.

```js
var handler = {
	get: function(obj, prop) {

		// Do stuff when someone gets a property
		console.log('Got your value!');

		// Return the value
		// This is what happens by default when you don't have a Proxy
		return obj[prop];

	},
	set: function(obj, prop, value) {

		// Do stuff when someone sets a property
		console.log('Just set your value, dude');

		// Set a property
		// This is what happens by default when you don't have a Proxy
		obj[prop] = value;

		// Indicate success
		return true;

	},
	deleteProperty: function (obj, prop) {

		// Do stuff when someone deletes a property
		console.log('Deleted a property... bye bye bye!');

		// Delete the property
		delete obj[prop];

		// Indicate success
		return true;

	}
};
```

With this simple setup, we'll log a message in the console whenever a value is retrieved or set in the object.

```js
// Get/Set smoe data
// Both of these would cause messages to get logged in the console
wizardsProxy.gilderoy = 'Ravenclaw';
wizardsProxy.neville;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jObGwJa)

## Making the Proxy useful

Now that we have a proxy setup, let's make our `handler` do some useful stuff.

In our *getter* function, we'll check if the value is `Slitherin`. If it is, we'll return `Hisssssss....` instead. And in our *setter*, we'll save our data to `localStorage` whenever it's updated.

```js
var handler = {
	get: function(obj, prop) {

		// Hiss for Slitherin
		if (obj[prop] === 'Slitherin') {
			return 'Hisssssss....';
		}

		// Return the value
		// This is what happens by default when you don't have a Proxy
		return obj[prop];

	},
	set: function(obj, prop, value) {

		// Save our wizards to localStorage
		localStorage.setItem('wizardsAndSuch', JSON.stringify(obj));

		// Set a property
		// This is what happens by default when you don't have a Proxy
		obj[prop] = value;

		// Indicate success
		return true;

	},
	deleteProperty: function (obj, prop) {

		// Save our wizards to localStorage
		localStorage.setItem('wizardsAndSuch', JSON.stringify(obj));

		// Delete the property
		delete obj[prop];

		// Indicate success
		return true;

	}
};
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/LYpzLvK)

## Data reactivity

Yesterday, I updated the way data reactivity works in [Reef, my lightweight alternative to Vue and React](https://reefjs.com), using this technique.

Previously, you used to have to run a helper function to trigger an updated render.

```js
app.setData({
	myNew: 'data'
});
```

But now, thanks to Proxies, any update to the data updates the UI automatically.

```js
app.data.myNew = 'data';
```

## Browser compatibility

Proxies work in all modern browsers, but have no IE support. [You can push support back to IE9 with this polyfill from the Google Chrome team.](https://github.com/GoogleChrome/proxy-polyfill)