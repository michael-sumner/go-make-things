---
title: How to create a search page for a static website with vanilla JS
date: 2022-02-15T10:30:00-05:00
draft: true
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
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

