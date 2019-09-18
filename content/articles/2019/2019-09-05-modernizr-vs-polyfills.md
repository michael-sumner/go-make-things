---
title: "Modernizr vs. polyfills"
date: 2019-09-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The other day, one of my students asked me what the difference is between a tool like [Modernizr](https://modernizr.com/) and [using polyfills](https://vanillajstoolkit.com/polyfills/).

Modernizr detects if a feature is available or not in the user's browser. Polyfills add support for features if they don't natively exist.

Modernizr was an amazing tool when it came out, but I'm not sure I see the value of it today. For example, if you wanted to check if the browser supports Promises, you would do this:

```js
if (Modernizr.promises) {
	// Use promises
} else {
	// Use something else?
}
```

So... what exactly would you do if promises weren't supported?

Fallback to a different approach? That feels a lot like writing JavaScript in the browser war days when nothing was standarized. Polfill it? Why bother with Modernizr at all then?

A service like [polyfill.io](https://polyfill.io) makes this brainless. It automatically detects the features you user's browser supports and sends back just the polyfills they need.

Then, you can just... write your code and forget about it. Polyfills FTW!