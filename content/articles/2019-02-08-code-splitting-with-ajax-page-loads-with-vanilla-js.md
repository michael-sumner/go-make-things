---
title: "Code splitting with Ajax page loads using vanilla JS"
date: 2019-02-08T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Yesterday, we looked at a technique for [code splitting with vanill JS](/code-splitting-with-vanilla-js/). One of my readers asked:

> How would you keep track off if a bundle is already loaded? Lets say you have a site which uses AJAX and you have a Google Maps integration on the contact page and you only load the bundle when on the contacts page but how about if you go back to contacts?

Great question! There are two ways to handle this.

The `loadJS()` helper function we looked at yesterday adds the JS file with a script element. You can use `querySelector()` to check if that file already exists, like this:

```js
if (document.querySelector('#search') && !document.querySelector('src[src*="search.js"]')) {
    loadJS('/path/to/search.js');
}
```

Or, if the script loads some sort of global variable/namespace, you can check for that instead.

```js
if (document.querySelector('#search') && !window.search) {
    loadJS('/path/to/search.js');
}
```

If the script needs to be reinitialized in some way, you can use your `if` statement to handle that.

```js
if (document.querySelector('#search')) {

	// If the script is already loaded, run it
	if (window.search) {
		search();
	}

	// Otherwise, load it again
	else {
		loadJS('/path/to/search.js');
	}

}
```