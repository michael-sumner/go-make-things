---
categories:
- Code
- JavaScript
date: '2017-11-03'
title: Smarter polyfill loading with polyfill.io
---

Yesterday, I showed you [how to use polyfill.io to conditionally load polyfills](/should-you-conditionally-load-polyfills/) only for the browsers that need them.

What JavaScript methods and browser APIs does [polyfill.io](https://polyfill.io) support? [Quite a few!](https://polyfill.io/v2/docs/features/)

## Two small issues with how polyfill.io works

If you browse through the list on their website, you'll notice many of the features have a star (★) next to them. These are the methods and APIs that are supported by default, and automatically sent to browsers that don't support them natively.

It's a great list of commonly used and lightweight features, but probably includes a bunch of stuff you don't need on a project.

Polyfill.io also needs two round trips to the server to get your polyfills. On the first pass, it detects the visitor's browser, then sends that info back to the server, which generates and sends along the correct set of polyfills (the second trip).

## Detecting features and skipping a trip

[Polyfill.io has an API](https://polyfill.io/v2/docs/api) that let's you control how it works with a few query string values.

You can use the API to skip the first round trip and serve up a smaller file.

To do this, we'll use feature tests to check for support for just the polyfills you need, and tell polyfill.io to send along just those. Here's how it works...

### 1. Create a list of the features this browser needs

First, we'll set up an array, `features`, to hold the list of features we need polyfills for. Then, we'll create a few quick browser tests to check if those features are supported.

For example, let's check for the CustomEvent API, `Array.forEach()`, `matches()`, and `classList()`.

```js
/**
 * Create a list of the features this browser needs
 */

// Setup our features array
var features = [];

// CustomEvent API
if (typeof window.CustomEvent !== 'function') { features.push('CustomEvent'); }

// Array.forEach()
if (window.Array && !Array.prototype.forEach) { features.push('Array.prototype.forEach'); }

// Element.matches()
if (!Element.prototype.matches) { features.push('Element.prototype.matches'); }

// Element.classList()
if (!('classList' in document.createElement('_'))) { features.push('Element.prototype.classList'); }
```

With each check, if the feature is *not* supported natively, we use `push()` to add that feature to our `features` array.

How do you know what the feature name is? [Polyfill.io has a long feature list.](https://polyfill.io/v2/docs/features/#feature-list)

### 2. Add the `loadJS()` helper method.

Yesterday, I mentioned [loadJS](https://github.com/filamentgroup/loadJS/), a super useful helper method from the [Filament Group](https://www.filamentgroup.com/) to lets you asynchronously load a JS file and run a callback once it's ready.

We'll use that to load polyfill.io and our scripts.

```js
/**
 * loadJS by Filament Group
 * Async load JS files
 * https://github.com/filamentgroup/loadJS/
 */
var loadJS = function (src, cb) {
	// ...
};
```

### 3. Load polyfill.io and our scripts

Finally, we'll load polyfill.io and our scripts.

We'll check the length of the `features` array to see if any features need to be polyfilled. If it has at least one item, we'll call polyfill.io. Otherwise, we'll immediately load our main scripts file.

```js
// If any features need a polyfill, load Polyfill.io, then our scripts
// Otherwise, just load our scripts
if (features.length > 0) {
	// load polyfill.io
} else {
	// No polyfills needed, so just load the main.js file
}
```

We'll use a few query string values with polyfill.io.

First, we'll set `features` to our features list, separated with a comma. We'll use the `join()` method to turn our array into a string.

```js
'https://cdn.polyfill.io/v2/polyfill.min.js?features=' + features.join(',');
```

Next, we'll add what polyfill.io calls flags: `always` and `gated`.

The `always` flag tells polyfill.io to include the requested features whether polyfill.io thinks your browser needs them or not (more on why we need that in a second). The `gated` flag tells the polyfills to include their own feature test before executing, in case our simple feature tests got it wrong.

```js
'https://cdn.polyfill.io/v2/polyfill.min.js?features=' + features.join(',') + '&flags=gated,always';
```

Finally, we'll include a valid user agent value. This tells polyfill.io not to run its own UA check, and is why we need to use the `always` feature. Otherwise, polyfill.io would just send along polyfills for whatever browser UA you specified.

```js
'https://cdn.polyfill.io/v2/polyfill.min.js?features=' + features.join(',') + '&flags=gated,always&ua=chrome/50'
```

Now we can call polyfill.io, and once it's loaded, run `loadJS()` again with our main scripts file.

```js
/**
 * Load polyfill.io and scripts
 */

// If any features need a polyfill, load Polyfill.io, then our scripts
// Otherwise, just load our scripts
if (features.length > 0) {
	// Include a `ua` argument set to a supported browser to skip UA identification
	// (improves response time) and avoid being treated as unknown UA (which would
	// otherwise result in no polyfills, even with `always`, if UA is unknown)
	loadJS('https://cdn.polyfill.io/v2/polyfill.min.js?features=' + features.join(',') + '&flags=gated,always&ua=chrome/50', function () {
		// Once polyfill.io is loaded, load our main scripts
		loadJS('/path/to/main.js');
	});
} else {
	// No polyfills needed, so just load the main.js file
}
```

Finally, if polyfill.io isn't needed, we can immediately load our main scripts with `loadJS()`.

```js
/**
 * Load polyfill.io and scripts
 */

// If any features need a polyfill, load Polyfill.io, then our scripts
// Otherwise, just load our scripts
if (features.length > 0) {
	// Include a `ua` argument set to a supported browser to skip UA identification
	// (improves response time) and avoid being treated as unknown UA (which would
	// otherwise result in no polyfills, even with `always`, if UA is unknown)
	loadJS('https://cdn.polyfill.io/v2/polyfill.min.js?features=' + features.join(',') + '&flags=gated,always&ua=chrome/50', function () {
		// Once polyfill.io is loaded, load our main scripts
		loadJS('/path/to/main.js');
	});
} else {
	// No polyfills needed, so just load the main.js file
	loadJS('/path/to/main.js');
}
```

## Putting it all together

Here's the full JavaScript to make this work.

```js
/**
 * Create a list of the features this browser needs
 */

// Setup our features array
var features = [];

// CustomEvent API
if (typeof window.CustomEvent !== 'function') { features.push('CustomEvent'); }

// Array.forEach()
if (window.Array && !Array.prototype.forEach) { features.push('Array.prototype.forEach'); }

// Element.matches()
if (!Element.prototype.matches) { features.push('Element.prototype.matches'); }

// Element.classList()
if (!('classList' in document.createElement('_'))) { features.push('Element.prototype.classList'); }


/**
 * loadJS by Filament Group
 * Async load JS files
 * https://github.com/filamentgroup/loadJS/
 */
var loadJS = function (src, cb) {
	// ...
};


/**
 * Load polyfill.io and scripts
 */

// If any features need a polyfill, load Polyfill.io, then our scripts
// Otherwise, just load our scripts
if (features.length > 0) {
	// Include a `ua` argument set to a supported browser to skip UA identification
	// (improves response time) and avoid being treated as unknown UA (which would
	// otherwise result in no polyfills, even with `always`, if UA is unknown)
	loadJS('https://cdn.polyfill.io/v2/polyfill.min.js?features=' + features.join(',') + '&flags=gated,always&ua=chrome/50', function () {
		// Once polyfill.io is loaded, load our main scripts
		loadJS('/path/to/main.js');
	});
} else {
	// No polyfills needed, so just load the main.js file
	loadJS('/path/to/main.js');
}
```

## Downsides to this approach

This approach has some nice advantages, but it has some disadvantages, too.

Once of my favorite things about polyfill.io is the set-it-and-forget aspect of it. I don't have to *think* about what polyfills I need. Polyfill.io just takes care of it.

With this approach, you need to very consciously choose what polyfills to check for and load. You also need to know how to write your own polyfill tests, where as the by default polyfill.io just kind of handles that piece for you.

I personally think the slight performance hit from the second round trip, and slightly bigger file (for all but the oldest browsers it's generally 5kb or less minified and gzipped) is a worthwhile tradeoff for effortless polyfilling. From a performance standpoint, that's an inconsequential file size, and its *way* smaller than most popular libraries and frameworks.

In other words, I use the default implementation, but you may prefer not to.