---
title: "What can and can't be polyfilled in vanilla JS?"
date: 2019-09-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In response to [my article on Promises in vanilla JS](/promises-in-javascript/) the other day, one of my students told me that if they knew it could be polyfilled, they would have started using Promises a lot sooner.

This led to an interesting question: what can and can't be polyfilled in vanilla JS.

Here's the gist:

1. Any native method, property, or browser API *can* be polyfilled.
2. Operators and expressions *cannot*.

Why can one group of items be polyfilled while the other cannot?

For methods, properties, and browser APIs, the JavaScript language provides a mechanism for extending features and functionality. [Everything is an object in JavaScript](/everything-is-an-object-in-javascript/), so everything can be given properties and have functions added to it's prototype.

The `Array.prototype.map()` method can be polyfilled by adding a new `map()` method to the `Array.prototype` object. The `fetch()` method can be polyfilled by creating a new global `fetch()` function that uses XHR under the hood.

Operators and expressions&mdash;things like the spread operator (`[...someVar]`), template literals, and `const` and `let`&mdash;cannot be polyfilled, because they don't get attached to any sort of object.

They're underpinnings of the language, baked into a browser's JS parsing engine. In older browsers, using `let` to define a variable has no meaning, and things break. Unfortunately, there's no way around that since we can't replace the rendering engine itself in the old browser.

Hope that clears things up!