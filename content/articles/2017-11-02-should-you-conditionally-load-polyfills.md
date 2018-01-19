---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-11-02'
permalink: /should-you-conditionally-load-polyfills/
title: Should you conditionally load polyfills?
url: /2017/11/02/should-you-conditionally-load-polyfills
---

If you've ben reading my articles for a while, you already know that [I'm a big fan of polyfills](https://gomakethings.com/why-i-love-polyfills/) (snippets of code that add support for a feature to browsers that don’t offer it natively).

Last week in my private Vanilla JS Slack channel (included with my [pocket guides](https://gomakethings.com/guides/)), one of my students asked how I handle loading polyfills.

> Do you conditionally load polyfills? I note, for example, that the `classList` polyfill is quite a chunk of code that could be shaved off when not needed.

So... should you conditionally load polyfills? And if so, how would you?

## Polyfills conditionally run

Most polyfills (the well written ones, anyways) include an `if` statement to check for native support before running.

For example, this `Array.forEach()` polyfill checks to see if that feature exists, and only adds support if it's not already there.

```lang-js
if (window.Array && !Array.prototype.forEach) {
	Array.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}
```

However, the file still has to load to run this check, and depending on how many modern features you're using and how far back you want to push support, you may have a lot of them.

## How to conditionally load polyfills

*If* you were going to conditionally load polyfills, you could use a helper function like [Filament Group's `loadJS()`](https://github.com/filamentgroup/loadJS/).

You would check for support, and if it doesn't exist, load the polyfill.

```lang-js
if (window.Array && !Array.prototype.forEach) {
	loadJS('/path/to/polyfills/array.foreach.js');
}
```

There's a problem with this approach, though.

Polyfills loaded this way are loaded asynchronously, and there may be a bunch of them. With asynchronous scripts, we have no control over when they load, and you don't want to load and run your main JavaScript before the polyfills are available.

## So... what can you do instead?

I use a combination of approaches, depending on the project.

### 1. Pick your baseline for JavaScript support

I'm a big fan of Brad Frost's ["support is not the same as optimization"](http://bradfrostweb.com/blog/mobile/support-vs-optimization/) mantra. I *support* all browsers, but *optimize* for IE9 and up.

I only polyfill features that don't work back to IE9. For example, that means `querySelector()` and `addEventListener()` don't get polyfills, but `classList` does.

### 2. Include your polyfills with your main script

With this approach, I usually need around 5kb or less of polyfills (minified). Compared to loading a big library or framework, this feels insignificant.

I include my polyfills as part of my main script so they all come over as one package.

### 3. Feature test before loading your script

I use a simple feature test&mdash;[an approach the BBC popularized called "cutting the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard)&mdash;before even downloading my JavaScript file.

I use the `loadJS()` helper method I mentioned earlier to load the file if the visitor's browser passes the test.

```lang-js
if ('querySelector' in document && 'addEventListener' in window) {
    loadJS('/path/to/my/main.js');
}
```

With this approach, people who's browsers don't meet my minimum level for optimization don't download a file they can't use.

## Another approach: using a polyfill service

I've been using this approach for about 3 years, and it's worked really well.

*But*... recently I've been using a new approach that I like even better: a polyfill service.

[Polyfill.io](https://polyfill.io/) is a free service created by [Jonathan Neal](http://jonathantneal.github.io/) and the [Financial Times](https://www.ft.com/) (who are amazing contributors to the open source community, btw). It automatically detects which browser your visitor is using, and sends along a bundle of polyfills optimized for their browser.

To use it, you just load it in a script tag.

```lang-html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

It adds support for some of the most popular ES5 and ES6 features all the way back to IE7. IE7!

The latest version of Chrome gets no polyfills. Newer versions of Firefox and Safari get just 1kb or 2kb of polyfills. IE7 get's 15kb.

**Think about that: you can use the latest ES6 methods, natively, and still support IE7.**

No bloated library. No precompilers or processors or command line tasks. It's awesome!

These days, [polyfill.io](https://polyfill.io) is my preferred way to polyfill.