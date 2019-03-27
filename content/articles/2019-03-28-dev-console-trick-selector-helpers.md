---
title: "Dev console trick: selector helpers"
date: 2019-03-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, [Laurence Hughes](https://fuzzylogic.me/) let me know about an awesome dev console trick he learned from [Remy Sharp](https://remysharp.com/) in [a live stream](https://www.twitch.tv/videos/401973569).

You can use `$()` as a shorthand for `querySelector()`, and `$$()` as a shorthand for `querySelectorAll()`. Even better, `$$()` returns an array instead of a NodeList, so you can use all of the array methods with the returned results.

```js
// Get the first h3 element
var h3 = $('h3');

// Get all h3 elements
var h3s = $$('h3');
```

They look like this under-the-hood.

```js
var $ = function (selector) {
	return document.querySelector(selector);
};

var $$ = function (selector) {
	return Array.from(document.querySelectorAll(selector));
};
```

I would *not* use these in production code, but its great for quickly testing stuff live in your UI.

I tested these in the latest versions of Chrome, Firefox, and Safari, and it worked in all three. I don't have access to IE or Edge right now to test.