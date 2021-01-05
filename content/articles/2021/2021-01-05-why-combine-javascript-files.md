---
title: "Why combine JavaScript files?"
date: 2021-01-05T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
- Web Performance
---

Yesterday, I wrote about [whether or not you need build tools](/do-you-need-build-tools/), and looked at the few I use in my projects.

One of those tools is [rollup.js](http://rollupjs.org/guide/en/).

> rollup.js takes modular JS files, combines them, and spits them out in one or more formats. For websites, I create simple IIFEs. For plugins and open-source work, I can use it to output my code into revealing module patterns, common JS, and more.

One of my students wrote back to ask why I bother combining files at all, and it resulted in a really good discussion.

## Is combining files obsolete?

[HTTP/2 negates a lot of the older performance hacks of days past](https://yoast.com/performance-optimization-http2/) (assuming you have it enabled on your server).

Historically, under HTTP/1, browsers would download at most two files from a single domain at a time. Having many small files created download bottlenecks that could slow down the rendering of your site. Combining files into one big file was a way to get around that.

HTTP/2 allows many files to be downloaded concurrently.

As [Rachel Andrew points out in her article for Smashing Magazine](https://www.smashingmagazine.com/2016/02/getting-ready-for-http2/), combining all of your scripts into one file means that if you update one of those files, the user needs to redownload _everything_, including the stuff that hasn't changed. She mentions CSS here, but this applies to JS as well.

> An additional issue with concatenation is that everything will need to be purged from the cache at once. You can’t give some files that never change a long expiry date while giving often changing parts of the code base a shorter date. It all has to be expired if even one line of CSS, used on a single page, is changed.

So... why combine files?

## The `import` operator, dependency management, and performance

While combining all of the scripts in a project might be obsolete, that's not true in one area: the native `import` operator.

About a month ago, [we learned about ES modules and the `import` operator](/series/es-modules/) for dependency management. In that series, I noted:

> Using ES modules natively in the browser results in multiple HTTP requests, and creates the same performance issues that the CSS `@import` property does.

While multiple concurrent HTTP requests are not a problem, with both the CSS and JavaScript `import` operators, the browser needs to parse the file and determine what dependencies are being imported _before_ it can download them. This creates delays in when those files are downloaded.

And because CSS and JS are both render-blocking, each time this happens, it delays when rendering can start in your site or app.

This is a problem with one layer of imports, but if your imported files import more files themselves, it can create big performance bottlenecks with your scripts.

So...

## Combining files _can_ be better for performance

For my bigger plugins, I like to work with a handful of smaller, more modular files instead of one massive 3,000 line JavaScript file. Sometimes, doing so also saves me a lot of work and keeps my code more DRY.

For example, let's look at [Reef, my 2.5kb state-based UI library](https://reefjs.com). You can [find the source code here](https://github.com/cferdinandi/reef/tree/master/src).

In this project, I have three files:

- `reef.js` contains the main `new Reef()` constructor object and it's methods
- `dom.js` contains all of the helper functions I use to diff and update the DOM
- `utilities.js` contains a handful of helper methods that make repetitive tasks easier

Using rollup.js, I can combine all of these files, and their methods, into a single `Reef()` function out of the global scope.

This improves performance, because I no longer have a nested dependency tree that delays rendering. It also keeps all of my little utility functions and DOM methods out of the global scope, where they might cause conflicts and issues with other scripts.

## Using the same files to create different outputs

rollup.js _also_ lets me take those same files and output them in several forms.

Using that one collection of code, I can automatically generate [a Revealing Module Pattern](https://vanillajstoolkit.com/boilerplates/revealing-module-pattern/) for people who want to load the file directly in their browser, a common JS file for people using NPM, and a native ES import for people who want to manage their own build.

You may notice that the source code also includes a `polyfills` directory.

I provide two versions of Reef: one that includes polyfills for IE support, and one without them if you want to manage polyfills on your own or only support modern browsers.

Using ES modules and rollup.js, that's a trivial task. My main `reef.js` file looks like this:

```js
import Reef from './components/reef.js';

export default Reef;
```

And the `reef.polyfills.js` file looks like this:

```js
import './polyfills/proxy.js';
import './polyfills/customEvent.js';
import Reef from './components/reef.js';

export default Reef;
```

## What does this mean for you?

If your server is stuck on HTTP/1&mdash;because you don't have an SSL certificate installed or your host doesn't support HTTP/2&mdash;combining all of your files into one is still a good move for performance.

If you're using imports (either CSS or JS) for dependency management, even if you have HTTP/2 enabled you should still combine your files for performance reasons.

If you just have a handful of individual script files _and_ HTTP/2 is enabled on your site or app, you're probably better off keeping those are separate, individually loaded files.