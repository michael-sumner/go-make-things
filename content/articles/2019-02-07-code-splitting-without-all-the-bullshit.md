---
title: "Code splitting with vanilla JS"
date: 2019-02-07T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Code splitting is a technique where, rather than loading your scripts as one big file, you break it up into smaller parts and only load what's needed on that page.

For projects with large amounts of JavaScript, this can have a big improvement on performance.

It was popularized by [the React community](https://reactjs.org/docs/code-splitting.html), where [tools like Webpack](https://webpack.js.org/guides/code-splitting/) are used to manage which bundles are loaded when. But Webpack can be... frustrating to get setup.

Today, I wanted to share a simple, vanilla JS approach to code splitting.

## The secret sauce: `loadJS()`

The secret sauce to this simpler approach is [`loadJS()`, a tiny helper function from the Filament Group](https://github.com/filamentgroup/loadJS).

It weighs just 500 bytes (that's half a kb!) minified (even less after gzipping), and lets you asynchronously load JavaScript files.

Here's how the technique works.

1. Use `querySelector()` and an `if` statement to check if the DOM condition required to load the file exists.
2. If true, use `loadJS()` to load it.

## A code splitting example

For example, lets say you have [JavaScript-driven search](/how-to-create-a-vanilla-js-search-page-for-a-static-website/) on your site, and you only want to load that script on the search page.

That page has a search form with and ID of `#search`.

```html
<form id="search">
	<label for="search-input">Search this website</label>
	<input type="text" id="search-input">
	<button>Search</button>
</form>
```

You would do this:

```js
if (document.querySelector('#search')) {
	loadJS('/path/to/search.js');
}
```

## What to code split

You *could* split every single component on your site or app into it's own component, but I don't think that's the best approach. Here's what I do.

1. Put any shared JavaScript components that are loaded on all or most pages into a single `main.js` file.
2. Keep anything loaded on just one or a few pages as its own standalone file.

For my website, the `main.js` right now includes scripts to handle the newsletter signup form, add anchor links to each of the headings on the page, and load in special messages about sales and discounts on my products. These are used on almost every page of my site, so I load them all together.

I have a standalone file for the search page, and another one to handle opt-outs for special holiday marketing promotions. Those last two are only used on one or two pages, so there's no sense in loading them everywhere.

## How to split code into bundle

The `loadJS()` helper function is great for actually loading code bundles, but... how do you bundle them in the first place?

Today, I use a custom [Gulp](https://gulpjs.com/) build ([here's my Gulp boilerplate](https://github.com/cferdinandi/gulp-boilerplate)) to combine my separate components into bundled files.

Before I learned command line, I used to use [CodeKit](https://codekitapp.com/), and still recommend it for anyone who's more visual or doesn't know/like command line. It's Mac-on, but if you're on Windows, I hear that [Prepros](https://prepros.io/) is also a great option with a similar feature set.