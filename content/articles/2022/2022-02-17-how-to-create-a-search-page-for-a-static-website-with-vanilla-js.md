---
title: How to create a search page for a static website with vanilla JS
date: 2022-02-17T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

One of the biggest missing features from most static site generators (like [Hugo](https://gohugo.io/), [11ty](https://www.11ty.io/), and [Jekyll](https://jekyllrb.com/), ) is that they lack built-in search.

Database-driven platforms like WordPress make a server call and search the database to find matching content. Static websites have no database to query.

Today, I'm going to share how I built [the search functionality for my site](https://gomakethings.com/search/) with vanilla JS. Let's dig in!

## Quick aside: done-for-you alternative

If you don't want to roll-your-own search functionality, [Algolia](https://www.algolia.com/) and [ElasticSearch](https://www.elastic.co/) are two done-for-you search vendors.

They both offer free tiers, as well as paid versions with more advanced features.

But, because I like to ~~do things the hard way~~ have more control over the user experience, I wrote my own search functionality instead of using one of them.

## The Search Form

My search functionality starts as a progressively enhanced search form.

```html
<form action="https://duckduckgo.com/" method="get" id="form-search">
	<label for="input-search">Enter your search criteria:</label>
	<input type="text" name="q" id="input-search">
	<input type="hidden" name="sites" value="YourAwesomeWebsite.com">
	<button>Search</button>
</form>
```

If the JavaScript fails (or the user tries to search before it loads), this will open up [Duck Duck Go](https://duckduckgo.com/) and search for articles only on my site.

Be sure to replace `YourAwesomeWebsite.com` with the actual URL to your site.

We'll also add two additional elements to the page. The `#search-results` element is where we'll inject the actual search results. The `#search-status` element is where we'll display the number of items found. 

We want this to announce to screen readers, so we'll also add the `[role="status"]` attribute to it.

```html
<div id="search-status" role="status"></div>
<div id="search-results"></div>
```

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

We can use this to both search for articles and generate results on the page.

## Creating a search function

Next, let's create a function to actually _do_ the searching. This can be [an IIFE](/the-many-ways-to-write-an-immediately-invoked-function-expression-iife-in-javascript/) or a named function. We just want a way to [scope our code](/how-scope-works-in-javascript/).

```js
(function () {
	// Code will go here...
})();
```

Next, we need to get the needed elements from the DOM. We can do that with the `document.querySelector()` method.

```js
(function () {

	// Get the DOM elements
	let form = document.querySelector('#form-search');
	let input = document.querySelector('#input-search');
	let resultList = document.querySelector('#search-results');
	let searchStatus = document.querySelector('#search-status');

})();
```

If we can't find any of them, or if the `searchIndex` doesn't exist, we'll `return` to stop the function from doing anything else.

```js
(function () {

	// Get the DOM elements
	let form = document.querySelector('#form-search');
	let input = document.querySelector('#input-search');
	let resultList = document.querySelector('#search-results');
	let searchStatus = document.querySelector('#search-status');

	// Make sure required content exists
	if (!form || !input || !resultList || !searchStatus || !searchIndex) return;

})();
```

## Running a search

Next, we need to detect when the user searches for something. To do that, we'll listen for `submit` events on the `form` element.

(_The rest of the code all happens inside the IIFE, but I'm sharing just the relevant stuff to make it easier to read._)

```js
// Create a submit handler
form.addEventListener('submit', submitHandler);
```

In the `submitHandler()` function, we'll use the `event.preventDefault()` method to stop the form from submitting to Duck Duck Go. Then, we'll pass the `input.value` into a `search()` function that will actually look for results.

```js
/**
 * Handle submit events
 */
function submitHandler (event) {
	event.preventDefault();
	search(input.value);
}
```

## Searching for results

Here's where stuff gets a bit messy.

Rather than search for complete phrases, we want to look at each word from the search query, and look for it in the titles and content of our articles. We want to ignore case, and we probably also want to ignore common words like `a`, `an`, and `the`.

I use [the `String.toLowerCase()` method](/converting-strings-to-uppercase-and-lowercase-with-vanilla-javascript/) to convert the `query` to lowercase. Then, I use [the `String.split()` method](/getting-an-array-from-a-string-with-vanilla-js/) to convert it to an array, with each word as its own item.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// Create a regex for each query
	let regMap = query.toLowerCase().split(' ');
}
```

Next, I created an array of `stopWords`: words that should be ignored. I found a list on the web, and modified it based on the type of content I have on my site.

For example, I added `vanilla`, `javascript`, and `js` to my list, since almost every article I write includes those words heavily, making them meaningless.

```js
let stopWords = ['a', 'an', 'and', 'are', 'aren\'t', 'as', 'by', 'can', 'cannot', 'can\'t', 'could', 'couldn\'t', 'how', 'is', 'isn\'t', 'it', 'its', 'it\'s', 'that', 'the', 'their', 'there', 'they', 'they\'re', 'them', 'to', 'too', 'us', 'very', 'was', 'we', 'well', 'were', 'what', 'whatever', 'when', 'whenever', 'where', 'with', 'would', 'yet', 'you', 'your', 'yours', 'yourself', 'yourselves', 'the', 'vanilla', 'javascript', 'js'];
```

Back in my `search()` function, I use [the `Array.filter()` method](/what-array.filter-does-in-vanilla-js/) to remove any `word` that's an empty string or part of the `stopWords` array.

I use [the `Array.includes()` method](/how-to-check-for-an-item-in-an-array-with-vanilla-js/) to check if the `word` is in `stopWords`.

Finally, I use [the `Array.map()` method](/what-array.map-does-in-vanilla-js/) an `new RegExp()` constructor to create an array of regex searches from my `query`.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// Create a regex for each query
	let regMap = query.toLowerCase().split(' ').filter(function (word) {
		return word.length && !stopWords.includes(word);
	}).map(function (word) {
		return new RegExp(word, 'i');
	});

}
```

## Doing the actual search

Now that I have my regex patterns all setup, I can actually _do_ the search.

For this, I use [the `Array.reduce()` method](/using-array.reduce-in-vanilla-js/) on my `searchIndex`. I want to create a new array containing just matching items. I also want to include a `priority` rating, so that more closing matching items are shown higher in the results.

I pass in an empty array (`[]`) as my _accumulator_, which I assign to the `results` parameter.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// Create a regex for each query
	// ...

	// Get and sort the results
	let results = searchIndex.reduce(function (results, article, index) {
		// Do stuff...
	}, []);
}
```

Inside the callback function, I create a `priority` variable with a value of `0`.

Then, I loop through each item in my `regMap` using [a `for...of` loop](/the-for...of-loop-in-vanilla-js/). I use the `RegExp.test()` method to look for matches in the `article.title`, and `RegExp.match()` method to look for matches in the `article.content`.

I give more weight to the `title` than content. If there's a match, I increase the `priority` by `100`. For every match in `content`, I increase the `priority` by `1`.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// Create a regex for each query
	// ...

	// Get and sort the results
	let results = searchIndex.reduce(function (results, article, index) {

		// Setup priority count
		let priority = 0;

		// Assign priority
		for (let reg of regMap) {
			if (reg.test(article.title)) { priority += 100; }
			let occurences = article.content.match(reg);
			if (occurences) { priority += occurences.length; }
		}

	}, []);
}
```

If `priority` is greater than `0`, I use the `Array.push()` method to add a new object (`{}`) to the `results` array.

I include the `priority` and `article` as properties. Then, I `return` the `results`.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// Create a regex for each query
	// ...

	// Get and sort the results
	let results = searchIndex.reduce(function (results, article, index) {

		// Setup priority count
		let priority = 0;

		// Assign priority
		for (let reg of regMap) {
			if (reg.test(article.title)) { priority += 100; }
			let occurences = article.content.match(reg);
			if (occurences) { priority += occurences.length; }
		}

		// If any matches, push to results
		if (priority > 0) {
			results.push({
				priority: priority,
				article: article
			});
		}

		return results;

	}, []);
}
```

Finally, I use [the `Array.sort()` method](/array-sorting-basics-with-vanilla-javascript/) to order the `results` by article priority. Items with the highest `priority` show up first.

Then, I pass the `results` into a `showResults()` method that renders them into the UI.

```js
/**
 * Search for matches
 * @param  {String} query The term to search for
 */
function search (query) {

	// Create a regex for each query
	// ...

	// Get and sort the results
	let results = searchIndex.reduce(function (results, article, index) {
		// ...
	}, []).sort(function (article1, article2) {
		return article2.priority - article1.priority;
	});

	// Display the results
	showResults(results);

}
```

## Rendering search results

Inside the `showResults()` method, I do a quick check to see if their are any results to show.

If there are, I inject a message into the `searchStatus` element that shares how many matches were found. This also gets read aloud by screen readers. 

Then, I use the `results` to create an HTML string with the `title` and a link to the article. The appearance of this varies from one site to another, but you can style it however you want.

```js
/**
 * Show the search results in the UI
 * @param  {Array}  results The results to display
 */
function showResults (results) {
	if (results.length) {
		searchStatus.innerHTML = `<p>Found ${results.length} matching articles</p>`;
		resultList.innerHTML = myTemplate(results);
	}
}
```

If there are no `results`, I clear the `resultList` element and show a message saying there were no matches.

```js
/**
 * Show the search results in the UI
 * @param  {Array}  results The results to display
 */
function showResults (results) {
	if (results.length) {
		searchStatus.innerHTML = `<p>Found ${results.length} matching articles</p>`;
		resultList.innerHTML = myTemplate(results);
	} else {
		searchStatus.innerHTML = '<p>Sorry, no matches were found.</p>';
		resultList.innerHTML = '';
	}
}
```

## What else?

Tomorrow, I'll show you how I update the URL with the search query, and run a search automatically on page load if there's a query in the URL.

This let's people bookmark searches.