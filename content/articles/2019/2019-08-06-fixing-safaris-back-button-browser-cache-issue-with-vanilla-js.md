---
title: "Fixing Safari's back button browser cache issue with vanilla JS"
date: 2019-08-06T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Safari has a weird "quirk."

If you navigate from one page to another in a web app, and then click the back button, Safari loads the entire previous view as a cached version of it's previous state rather than refreshing the content.

**[Here's a demo.](https://gist.github.com/cferdinandi/820ca7f5b92889234e91e8944a93cd2d)**

Download the files, then open `1.index` in Safari.

Click the `Next Page` link, then use the browser's back button to go back. See how the time actually jumps back instead of showing the current time?

## Why this happens

I think this is a performance trick in Safari to make web pages load faster when jumping forwards and backwards through browser history.

On web pages with static content, this is great for performance. On dynamic web apps where content changes, it can be problematic.

For example, imagine if a user logs out, then clicks the back button. You would expect that they can no longer see content that requires them to be logged in. But this "quirk" shows them their old content that was visible when they were logged in anyways.

I'm not sure if this should be called a bug or not, but it sure feels like one.

## Fortunately, there's a simple fix.

I ran into this on a recent project, and one of my colleagues stumbled upon [this explanation and solution from Mika Tuupola on StackOverflow](https://stackoverflow.com/a/13123626/1293256):

> Your problem is caused by [back-forward cache](https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching). It is supposed to save complete state of page when user navigates away. When user navigates back with back button page can be loaded from cache very quickly. This is different from normal cache which only caches HTML code.
>
> When page is loaded for bfcache onload event wont be triggered. Instead you can check the persisted property of the onpageshow event. It is set to false on initial page load. When page is loaded from bfcache it is set to true.

To fix it, drop this on your site.

```js
/**
 * If browser back button was used, flush cache
 * This ensures that user will always see an accurate, up-to-date view based on their state
 * https://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked
 */
(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();
```

The minimize any flicker of content that shouldn't be there, I drop it inlined in the header so that it's immediately executed when the HTML file loads.

[Here are files with the fix in place](https://gist.github.com/cferdinandi/bceb240cf974dd8c2170ea6f007dce76) so you can see it in action.