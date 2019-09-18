---
title: "Feature tests and server side JavaScript"
date: 2018-06-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In my plugins, I like to include [feature tests](/writing-your-own-simple-feature-tests/) so that my code will only run if the browser supports the modern APIs and methods that are used. This helps prevent unexpected errors.

```js
var supports = 'querySelector' in document && 'addEventListener' in window;
// ...
publicAPIs.init = function () {
	if (!supports) throw 'This browser is not supported.';
	// ...
};
```

Lately, an increasing number of people have been using my scripts on Node servers will server-side rendered code (using things like Next.js and Nuxt).

There's just one problem: `document` isn't defined when the script loads on the server, so it errors out.

Fortunately, the fix for things like this is actually really simple. If I use a function for `supports` that returns my check, it won't execute until it's called in the `init()` method.

```js
var supports = function () {
	return 'querySelector' in document && 'addEventListener' in window;
};
// ...
publicAPIs.init = function () {
	if (!supports()) throw 'This browser is not supported.';
	// ...
};
```

Problem solved!