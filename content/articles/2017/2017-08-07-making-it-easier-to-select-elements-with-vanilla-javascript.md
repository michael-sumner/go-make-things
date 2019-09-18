---
categories:
- Code
- JavaScript
date: '2017-08-07'
url: /making-it-easier-to-select-elements-with-vanilla-javascript/
title: Making it easier to select elements with vanilla JavaScript
---

The `querySelector()` and `querySelectorAll()` methods make it super easy get elements in the DOM.

Unlike older methods like `getElementById()` or `getElementsByTagName()`, they accept any valid CSS selector, working just like the `$()` selector in jQuery. Unlike jQuery, though, they're pretty verbose.

Writing `document.querySelectorAll()` a handful of times can get pretty annoying if you're working on a large project.

Today, I wanted to show you a simple technique that make it easier to use `querySelector()` and `querySelectorAll()`.

## Adding a custom function

You can create a custom function that runs `querySelector()` and `querySelectorAll()`&mdash;without you having to type it out every time.

```javascript
var get = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelectorAll(selector);
};
```

With these in place, you can use the same way you'd use `querySelector()` and `querySelectorAll()`.

```javascript
// Get all `h2` elements
var h2s = getAll('h2');

// Get the first link inside the `#main` content area
var link = get('#main a');

// Search inside an element
var elem = get('.some-element');
var inside = get('.my-selector', elem);
```

I like to use `get()` and `getAll()`, but if you'd prefer a more jQuery-like syntax, you can use `$` and `$$` instead.

```javascript
var $ = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelector(selector);
};

var $$ = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelectorAll(selector);
};
```