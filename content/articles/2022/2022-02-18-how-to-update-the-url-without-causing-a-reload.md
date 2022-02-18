---
title: How to update the URL of a page without causing a reload using vanilla JavaScript
date: 2022-02-18T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Yesterday, we looked at [how to build a vanilla JavaScript search feature for a static website](/how-to-create-a-search-page-for-a-static-website-with-vanilla-js/). At the end, I mentioned...

>  Tomorrow, I’ll show you how I update the URL with the search query, and run a search automatically on page load if there’s a query in the URL.

Well, today is tomorrow, so let's dig in!

_**Note:** If you haven't yet, you should probably read yesterday's post first, or today's won't make much sense._

## Updating the URL

In our `search()` function, we create an array of regex patterns, get an array of matching items (sorted by how many matches they have), and then render them into the UI.

Let's create another function, `updateURL()`, to update the URL for us. We'll pass in the search `query` as an argument.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// ...

	// Display the results
	showResults(results);

	// Update the URL
	updateURL(query);

}
```

We're going to use [the `history.pushState()` method](/how-to-update-the-browser-url-without-refreshing-the-page-using-the-vanilla-js-history-api/) to update our URL.

This creates a new entry in the browser's history (and updates the URL) _without_ causing the page to reload. It accepts three arguments: the browser `state`, a `title` to use in the `document`, and the `url`. 

We'll use the current `history.state`, no need to replace anything. We'll also use the current `document.title`. 

For the `url`, we'll combine the `location.origin` and `location.pathname`, then append the `?s` query string parameter, and use the `query` for its value. We'll pass the `query` into the `encodeURI()` method to encode it.

```js
/**
 * Update the URL with a query string for the search string
 * @param  {String} query The search query
 */
function updateURL (query) {

	// Create the properties
	let state = history.state;
	let title = document.title;
	let url = window.location.origin + window.location.pathname + '?s=' + encodeURI(query);

}
```

Finally, we can pass all three into the `history.pushState()` method to update the URL.

```js
/**
 * Update the URL with a query string for the search string
 * @param  {String} query The search query
 */
function updateURL (query) {

	// Create the properties
	// ...

	// Update the URL
	history.pushState(state, title, url);

}
```

## Running a search on page load

If the URL has an `s` query string parameter when the page loads, we should also run a search immediately. This lets users bookmark search pages for later.

First, we'll create an `onload()` function to run immediately with the script.

```js
// Create a submit handler
form.addEventListener('submit', submitHandler);

// Check for query strings onload
onload();
```

We'll use [the `new URLSearchParams()` constructor](/getting-values-from-a-url-with-vanilla-js/) to create a `URLSearchParams` object from the `location.search` property. 

Then, we'll use the `URLSearchParams.get()` method to look for a query string parameter with a key of `s`. 

If one is _not_ found, we'll use the `return` operator to end our function.

```js
/**
 * If there's a query string search term, search it on page load
 */
function onload () {
	let query = new URLSearchParams(window.location.search).get('s');
	if (!query) return;
}
```

If a `query` exists, we'll update the `input.value` property with it so that the search field contains the search `query`. Then, we'll pass the `query` into the `search()` function to run a search.

The `URLSearchParams.get()` method automatically decodes the parameter for us, so we don't need to worry about that.

```js
/**
 * If there's a query string search term, search it on page load
 */
function onload () {
	let query = new URLSearchParams(window.location.search).get('s');
	if (!query) return;
	input.value = query;
	search(query);
}
```

Now, when someone reloads or revists a search page, a new search will automatically run.