---
title: "How I structure my vanilla JS projects"
date: 2019-11-08T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

*If you'd prefer to hear me ~~ramble on~~ talk about this, you can also [listen to my Vanilla JS Podcast episode about it](https://vanillajspodcast.com/how-i-structure-my-vanilla-js-projects/).*

One of the questions I get asked quite a bit is how I structure and organize my vanilla JS projects. Today, I'm going to show you how.

## Structure within a script

The first thing I do with any new script is wrap it in a function to [keep it out of the global scope](/keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/).

If it's something I want to explicitly run later or at a specific time, I wrap it in a *named function* that I can call later.

```js
var myScript = function () {
	// Some amazing code...
};

// Later on...
myScript();
```

Otherwise, I wrap it in [an *Immediately Invoked Function Expression*, or *IIFE*](https://vanillajstoolkit.com/boilerplates/iife/).

```js
(function () {
    // Some amazing code...
})();
```

Within my script, [I break my code up into three distinct sections](/how-i-structure-my-javascript-plugins/):

1. Variables
2. Methods
3. Initializations and event listeners

This helps keep my code predictable and organized.

```js
(function () {

	//
	// Variables
	//

	var elem = document.querySelector('#app');


	//
	// Methods
	//

	var handleClicks = function (event) {
		console.log(event.target);
	};


	//
	// Inits & Event Listeners
	//

	elem.addEventListener('click', handleClicks);

})();
```

## Modular code

A lot of people assume that because I don't use frameworks and module bundlers, I keep all of my code in one giant JavaScript file.

I don't. That would be madness!

I have a `/js` directory in my project where I keep all of my individual scripts. I use [Gulp](https://gulpjs.com/), a command line JavaScript task runner, to combine files (called *concatenation*) and minify them.

[Here's my Gulp Boilerplate.](https://github.com/cferdinandi/gulp-boilerplate) If you prefer GUIs or just aren't comfortable with command line (I wasn't for a long time), [CodeKit](https://codekitapp.com/) and [Prepros](https://prepros.io/) do the same thing and are both really good.

## Code Splitting

I *don't* just load every script on every page.

In my `/js` directory, I have some individual files and some subdirectories. Any scripts that are inside a folder in my `/js` directory get concatenated together into a file named after that folder. Individual files are minified but kept separate.

For example, `/js/main/mailchimp.js` and `/js/main/heading-links.js` get combined into `main.js`, while `/js/search.js` gets minified but remains `search.js`.

My `main.js` file contains code I use on all (or most) pages on my site. It gets loaded everywhere.

The other individual files are typically used on just one or two views. I use [`loadJS()` from Filament Group](https://github.com/filamentgroup/loadJS) to [conditionally load those scripts only on pages that need them](code-splitting-with-vanilla-js/).

It's a super lightweight, easy way to do code-splitting without messing with a complicated module bundler.

## Inlining JS

When it comes to web performance, 14kb is a magic number. That's the approximate number of bytes in a single round trip HTTP request.

Servers send files to the browser in small packets rather than all-at-once. If you have a 20kb JavaScript file, that takes two round trips to get to the browser.

The more round trips, the slower the site (generally speaking).

After minifying and gzipping my code, my combined CSS, HTML, and `main.js` JavaScript for a typical page on my sites is usually just at or under 14kb.

If I [inline my CSS and JavaScript directly into the HTML](inlining-literally-everything-for-better-performance/), that means I can send the whole page over in a single HTTP request and it will immediately start rendering.

If you combined files are larger than 14kb, it's better to load them externally so that they get cached by the browser. But for me, inlining is why my sites feel so blazingly fast.