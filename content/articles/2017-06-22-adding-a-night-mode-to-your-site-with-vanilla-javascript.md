---
categories:
- Code
- JavaScript
date: '2017-06-22'
permalink: /adding-a-night-mode-to-your-site-with-vanilla-javascript/
title: Adding a &#8220;night mode&#8221; to your site with vanilla JavaScript
url: /2017/06/22/adding-a-night-mode-to-your-site-with-vanilla-javascript
---

Yesterday, I added a "night mode" to my website. Toggling it switches to light text on a dark background.

[See a working demo here.](https://jsfiddle.net/cferdinandi/oxu0cqk6/3/)

To be honest, I'm not sure how long I'll keep it up. It's annoying to maintain a separate set of styles, and it feels like the kind of thing that should be handled at the browser or device level.

But, I was able to put it together with just a few lines of code, and thought you might be interested in how I did it.

## Getting setup

My entire code is wrapped in an immediately invoked function expression, or IIFE, to keep my code isolated from the global scope. I'm also using strict mode to help keep my code error free.

```javascript
;(function (window, document, undefined) {

	'use strict';

	// Codes goes here...

})(window, document);
```

I'm also using `localStorage` to save visitors' night mode preference, and `querySelector` to get a few elements on the page. Not all browsers support those, so I want to test browser support before doing anything.

```javascript
;(function (window, document, undefined) {

	'use strict';

	// Feature test
	if (!('localStorage' in window) || !('querySelector' in document)) return;

})(window, document);
```

## Adding a night mode button

I want to grab my navigation menu, and add a toggle for night mode as the last item using `innerHTML`.

So that we can easily get it later, I've added an ID of `#night-mode` to my list item. I'm using an SVG icon of a moon, but you could use text or anything else you'd like.

```javascript
;(function (window, document, undefined) {

	'use strict';

	// Feature test
	if (!('localStorage' in window)) return;

	// Get the navigation menu
	var nav = document.querySelector('#menu-primary');
	if (!nav) return;

	// Insert the night mode toggle
	nav.innerHTML += '<li id="night-mode"><a role="button" href="#"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 16 16"><title>Night Mode</title><path d="M11.185 1.008A8.014 8.014 0 0 0 8.223 0 8.035 8.035 0 0 1 .798 12.861a8.033 8.033 0 0 0 13.328-.88 8.034 8.034 0 0 0-2.94-10.974z"/></svg></a></li>';

})(window, document);
```

I used a link for styling consistency with the rest of my navigation menu, but I added `role="button"` for accessibility reasons.

## Toggling night mode

When someone clicks the night mode button, we want to add a `.night-mode` class we can hook into with our CSS to change the styles.

Let's find our new button in the DOM and add an event listener to it. We'll prevent the default link behavior with `event.preventDefault()`, and toggle our class on or off of the `<html>` element with `classList.toggle()`.

```javascript
;(function (window, document, undefined) {

	'use strict';

	// Feature test
	if (!('localStorage' in window)) return;

	// Get the navigation menu
	var nav = document.querySelector('#menu-primary');
	if (!nav) return;

	// Insert the night mode toggle
	nav.innerHTML += '<li id="night-mode"><a role="button" href="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 16 16"><title>moon</title><path d="M11.185 1.008A8.014 8.014 0 0 0 8.223 0 8.035 8.035 0 0 1 .798 12.861a8.033 8.033 0 0 0 13.328-.88 8.034 8.034 0 0 0-2.94-10.974z"/></svg><span class="icon-fallback-text">Night Mode</span></a></li>';

	// Get our newly insert toggle
	var nightMode = document.querySelector('#night-mode');
	if (!nightMode) return;

	// When clicked, toggle night mode on or off
	nightMode.addEventListener('click', function (event) {
		event.preventDefault();
		document.documentElement.classList.toggle('night-mode');
	}, false);

})(window, document);
```

That's a great start! Now we can use `.night-mode` as a hook in our CSS.

```css
body {
    background-color: #ffffff;
    color: #272727;
}

.night-mode body {
    background-color: #272727;
    color: #ffffff;
}
```

## Making night mode persistent

If someone activates night mode, they shouldn't have to keep toggling it on with each page view. It should remain persistent until they turn it off.

Let's use local storage to save our night mode status. We'll add a local storage value if it's activated, and remove it when it's off.

```javascript
;(function (window, document, undefined) {

	'use strict';

	// Feature test
	if (!('localStorage' in window)) return;

	// Get the navigation menu
	var nav = document.querySelector('#menu-primary');
	if (!nav) return;

	// Insert the night mode toggle
	nav.innerHTML += '<li id="night-mode"><a role="button" href="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 16 16"><title>moon</title><path d="M11.185 1.008A8.014 8.014 0 0 0 8.223 0 8.035 8.035 0 0 1 .798 12.861a8.033 8.033 0 0 0 13.328-.88 8.034 8.034 0 0 0-2.94-10.974z"/></svg><span class="icon-fallback-text">Night Mode</span></a></li>';

	// Get our newly insert toggle
	var nightMode = document.querySelector('#night-mode');
	if (!nightMode) return;

	// When clicked, toggle night mode on or off
	nightMode.addEventListener('click', function (event) {
		event.preventDefault();
		document.documentElement.classList.toggle('night-mode');
		if ( document.documentElement.classList.contains('night-mode') ) {
			localStorage.setItem('nightMode', true);
			return;
		}
		localStorage.removeItem('nightMode');
	}, false);

})(window, document);
```

You'd ideally place this script in your footer for performance reasons, but we want activate night mode styles immediately on each page load.

We'll create a second, really small script that we'll include inline in the `<head>` to do that.

We again want to check for `localStorage` support.

```javascript
;(function (window, document, undefined) {
	'use strict';
	if (!('localStorage' in window)) return;
})(window, document);
```

Next, let's see if our `nightMode` status is saved in `localStorage`. If it is, we'll add our `.night-mode` class to the `<html>` element.

```javascript
;(function (window, document, undefined) {
	'use strict';
	if (!('localStorage' in window)) return;
	var nightMode = localStorage.getItem('nightMode');
	if (!nightMode) return;
	document.documentElement.className += ' night-mode';
})(window, document);
```

And now you have site-wide night mode.