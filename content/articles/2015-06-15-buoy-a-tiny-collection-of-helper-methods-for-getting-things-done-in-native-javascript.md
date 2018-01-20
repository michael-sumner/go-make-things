---
categories:
- Code
- JavaScript
date: '2015-06-15'
url: /buoy-a-tiny-collection-of-helper-methods-for-getting-things-done-in-native-javascript/
title: 'Buoy: A tiny collection of helper methods for getting things done in native JavaScript'
---

A few years ago, I stopped using jQuery and started writing exclusively in [native JavaScript (aka vanilla JS)](/ditching-jquery/).

There's a handful of helper methods I end up using in every script I write, so I decided to bundle them into a helper library called [Buoy](https://github.com/cferdinandi/buoy).

## Why?

I end up reusing the same methods over and over again in my JS plugins. If I'm using more than one of them on a projects, this let's me keep my code more DRY and reduces my overall file size.

It also makes native JavaScript development more accessible for people coming from a jQuery background.

## What's included?

* `buoy.forEach` - [Todd Motto's method](https://github.com/toddmotto/foreach) for looping through arrays,
nodelists, and objects.
* `buoy.extend` - Merge two or more objects.
* `buoy.getHeight` - For reliably getting the height of an element.
* `buoy.getOffsetTop` - Get an element's distance from the top of the Document.
* `buoy.getClosest` - Get the closest matching element up the DOM tree. Match by class, ID, data attribute, or tag.
* `buoy.getParents` - Get an element's parent nodes. Optionally filter by class, ID, data attribute, or tag.
* `buoy.getSiblings` - Get an element's sibling nodes.
* `buoy.getQueryString` - Get data from a URL's query string.

## How do I get it?

[Download Buoy on GitHub.](https://github.com/cferdinandi/buoy)