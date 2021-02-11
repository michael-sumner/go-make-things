---
title: "How to create a vanilla JS search page for a static website"
date: 2018-12-18T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

_**This article was updated on February 11, 2021.** I switched to Duck Duck Go as the fallback search engine, and fixed a bug in the regex pattern used to match articles._

One of the biggest missing features from most static site generators (like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), and [Eleventy](https://www.11ty.io/)) is that they lack built-in search.

Database-driven platforms like WordPress make a server call and search the database to find matching content. Static websites have no database to query.

Today, I'm going to show you how you can use a little vanilla JS to add search to your static website.

(*[Here's what it looks like when it's finished.](/search)*)

## Progressively Enhanced Search

Since this solution depends on JavaScript, we should provide a base-level experience that works without it.

The easiest way to do that is to create a form that sends people to Duck Duck Go (DDG) when they submit their search terms.

Let's create a form with an action of `https://duckduckgo.com/`. That will redirect people to DDG on submit. We'll add a search input with a name of `q`, which is the query string key DDG uses for search queries.

We can also add a `hidden` field with a `name` of `sites`. If you use your domain as the `value`, it will restrict search results to your domain.

```html
<form action="https://duckduckgo.com/" method="get" id="form-search">
	<label for="input-search">Enter your search criteria:</label>
	<input type="text" name="q" id="input-search">
	<input type="hidden" name="sites" value="your-domain.com">
	<button id="submit-search">Search</button>
</form>
```

Now you have a simple form that will search your site on Duck Duck Go. Let's transform this into a native search field once our JS loads.

## Creating a search index

In order to search your site, we need to create an index of content.

The process for this varies from one static site generator to another, but the end result is the same. You want to generate an array of all of the searchable content on your site.

Some people create an external JSON file for this, but I prefer to embed it as a JavaScript variable directly on the search page. it looks like this:

```js
let searchIndex = [
	{
		title: "My awesome article",
		date: "December 18, 2018",
		url: "https://gomakethings.com/my-awesome-article",
		content: "The full text of the content...",
		summary: "A short summary or preview of the content (can also be a clipped version of the first few sentences)..."
	},
	// More content...
];
```

We can use this to both search for articles *and* generate results on the page.

## Adding a container for the search results

In the markup, let's add an empty container with an id of `#search-results`. This is where we'll add our search results.

```html
<div id="search-results"></div>
```

## Creating a vanilla JS search feature

Let's create an [IIFE](https://vanillajstoolkit.com/boilerplates/iife/iife/) to scope our code.

```js
(function (window, document, undefined) {
	// Code goes here...
})(window, document);
```

Let's also look for our search form, input, and the container for our search results in the DOM and cache them to variables.

If they don't exist, we can bail and do nothing.

```js
(function (window, document, undefined) {

	//
	// Variables
	//

	let form = document.querySelector('#form-search');
	let input = document.querySelector('#input-search');
	let resultList = document.querySelector('#search-results');


	//
	// Inits & Event Listeners
	//

	// Make sure required content exists
	if (!form || !input || !resultList || !searchIndex) return;

})(window, document);
```

### Processing search submissions

Now, we need to detect when search criteria is submitted and look for matching content.

Let's add a `submit` event listener to the `form`. (This is one of those rare occasions where [I recommend attaching an event directly to the element](/why-is-javascript-event-delegation-better-than-attaching-events-to-each-element/).)

We'll pass in a `submitHandler` function as a callback.

```js
//
// Inits & Event Listeners
//

// Make sure required content exists
if (!form || !input || !resultList || !searchIndex) return;

// Create a submit handler
form.addEventListener('submit', submitHandler);
```

In the `submitHandler` function, we'll pass in the `event` as an argument.

We'll run `event.preventDefault()` to prevent the from submitting to Google. Then, we'll pass the `input.value` into another function---`search()`---to actually run the search for us.

```js
//
// Methods
//

/**
 * Handle submit events
 */
let submitHandler = function (event) {
	event.preventDefault();
	search(input.value);
};
```

### Searching for content

In the `search()` function, we'll accept the search `query` as an argument.

We're going to use a regex to match the search query with content in our `searchIndex`.

We'll create a `new RegExp()` with our `query`. We'll also use the `g` and `i` flags to make the search global and case-insensitive, respectively.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
let search = function (query) {

	// Variables
	let reg = new RegExp(query, 'gi');

};
```

We also want to give higher priority to articles with the search term in the title versus just in the body content. Let's create two arrays---`priority1` and `priority2`---to add matching content to.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
let search = function (query) {

	// Variables
	let reg = new RegExp(query, 'gi');
	let priority1 = [];
	let priority2 = [];

};
```

Next, we'll loop through each item in the `searchIndex`, and use the `test()` method to see if the `title` or `content` keys match the search terms.

If the `title` key is a match, we'll push the result to the `priority1` array. If the `content` key is a match, we'll push to `priority2`.

Then we'll use the `Array.concat()` method to push both arrays into a new array assigned to the `results` variable.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
let search = function (query) {

	// Variables
	let reg = new RegExp(query, 'gi');
	let priority1 = [];
	let priority2 = [];

	// Search the content
	searchIndex.forEach(function (article) {
		if (reg.test(article.title)) return priority1.push(article);
		if (reg.test(article.content)) priority2.push(article);
	});

	// Combine the results into a single array
	let results = [].concat(priority1, priority2);

};
```

We now have an array of matching results. Now we need to display them in the DOM.

### Displaying search results

We can add content to our `resultList` container with `innerHTML`.

If the `results` array has no items in it (as in, if it has a `length` of less than `1`), we'll display a "no items found" message with a `createNoResultsHTML()` method. Otherwise, we'll pass the results into a `createResultsHTML()` function to generate the results markup.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
let search = function (query) {

	// Variables
	let reg = new RegExp(query, 'gi');
	let priority1 = [];
	let priority2 = [];

	// Search the content
	searchIndex.forEach(function (article) {
		if (reg.test(article.title)) return priority1.push(article);
		if (reg.test(article.content)) priority2.push(article);
	});

	// Combine the results into a single array
	let results = [].concat(priority1, priority2);

	// Display the results
	resultList.innerHTML = results.length < 1 ? createNoResultsHTML() : createResultsHTML(results);

};
```

The `createNoResultsHTML()` function will return a simple message. You can customize this to say whatever you want.

```js
/**
 * Create the markup when no results are found
 * @return {String} The markup
 */
let createNoResultsHTML = function () {
	return '<p>Sorry, no matches were found.</p>';
};
```

In the `createResultsHTML()` function, we'll first setup an `html` variable, with a message about the number of results that were found.

Then, we'll use `Array.map()` to create a new array from our `results` array, with each item containing the markup for the result as a string. We'll create a `createHTML()` function to handle that part for us.

Finally, we'll combine all of the items in the new array with the `join()` method, append it to the `html` variable, and return the content.

```js
/**
 * Create the markup for results
 * @param  {Array} results The results to display
 * @return {String}        The results HTML
 */
let createResultsHTML = function (results) {
	let html = '<p>Found ' + results.length + ' matching articles</p>';
	html += results.map(function (article, index) {
		return createHTML(article, index);
	}).join('');
	return html;
};
```

### The result markup

In the `createHTML()` function, we'll create markup for the individual search results. You can format this however you want, but here's what I'm doing on my site.

I give each result a unique ID. All of the content is wrapped in a URL so that the whole thing is clickable. I have some CSS that makes only the heading and URL look like links, but the whole result is on big clickable area.

In the link, I include the article's publish date and article title. I display a short summary of the article, and use the `String.slice()` method to limit that to 150 characters.

I also include the URL itself.

```js
/**
 * Create the HTML for each result
 * @param  {Object} article The article
 * @param  {Number} id      The result index
 * @return {String}         The markup
 */
let createHTML = function (article, id) {
	let html =
		'<div id="search-result-' + id + '">' +
			'<a href="' + article.url + '">' +
				'<aside>' +
					article.date +
				'</aside>' +
				'<h2>' + article.title + '</h2>' +
				article.summary.slice(0, 150) + '...<br>' +
				article.url +
			'</a>' +
		'</div>';
	return html;
};
```

The entire thing gets returned as a string.

## Putting it all together

Here's the entire script. This will work in all modern browsers, and IE9 and up.

You can see it in action on [my search page](/search).

```js
(function (window, document, undefined) {

	'use strict';

	//
	// Variables
	//

	let form = document.querySelector('#form-search');
	let input = document.querySelector('#input-search');
	let resultList = document.querySelector('#search-results');


	//
	// Methods
	//

	/**
	 * Create the HTML for each result
	 * @param  {Object} article The article
	 * @param  {Number} id      The result index
	 * @return {String}         The markup
	 */
	let createHTML = function (article, id) {
		let html =
			'<div id="search-result-' + id + '">' +
				'<a href="' + article.url + '">' +
					'<aside>' +
						article.date +
					'</aside>' +
					'<h2>' + article.title + '</h2>' +
					article.summary.slice(0, 150) + '...<br>' +
					article.url +
				'</a>' +
			'</div>';
		return html;
	};

	/**
	 * Create the markup when no results are found
	 * @return {String} The markup
	 */
	let createNoResultsHTML = function () {
		return '<p>Sorry, no matches were found.</p>';
	};

	/**
	 * Create the markup for results
	 * @param  {Array} results The results to display
	 * @return {String}        The results HTML
	 */
	let createResultsHTML = function (results) {
		let html = '<p>Found ' + results.length + ' matching articles</p>';
		html += results.map(function (article, index) {
			return createHTML(article, index);
		}).join('');
		return html;
	};

	/**
	 * Search for matches
	 * @param  {String} query The term to search for
	 */
	let search = function (query) {

		// Variables
		let reg = new RegExp(query, 'gi');
		let priority1 = [];
		let priority2 = [];

		// Search the content
		searchIndex.forEach(function (article) {
			if (reg.test(article.title)) return priority1.push(article);
			if (reg.test(article.content)) priority2.push(article);
		});

		// Combine the results into a single array
		let results = [].concat(priority1, priority2);

		// Display the results
		resultList.innerHTML = results.length < 1 ? createNoResultsHTML() : createResultsHTML(results);

	};

	/**
	 * Handle submit events
	 */
	let submitHandler = function (event) {
		event.preventDefault();
		search(input.value);
	};


	//
	// Inits & Event Listeners
	//

	// Make sure required content exists
	if (!form || !input || !resultList || !searchIndex) return;

	// Create a submit handler
	form.addEventListener('submit', submitHandler);

})(window, document);
```