---
title: "How to load CSS asynchronously"
date: 2020-08-07T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- JavaScript
- Web Performance
---

Unlike JavaScript, CSS doesn't have a native way to load it asynchronously. There's no `async` or `defer` attributes for `link` elements the way there are for `script` elements.

In the past, I used to use a JavaScript helper function, [loadCSS from Filament Group](https://github.com/filamentgroup/loadCSS/), for this.

But the smart folks at Filament have found a *nearly native* way to achieve asynchronous CSS loading, no helper function required.

Let's check it out.

## Why would you need this?

CSS is render blocking. While the browser is downloading it, it stops painting the document.

In some situations, it can make sense to asynchronously load non-critical CSS to minimize how long rendering is blocked. Some examples:

1. If you're minified and gzipped HTML + CSS is bigger than 14kb (about the size of a single roundtrip HTTP request), [loading a subset of your CSS async can reduce render blocking](/inlining-critical-css-for-better-web-performance/).
2. Since [web fonts](/how-to-self-host-google-fonts/) produce a *flash of invisible text*, we defer using them until they're fully downloaded. This makes them a great candidate for async loading since they're non-critical anyways.

Let's look at how the technique works.

## Progressively enhancing a `link` element

The newest technique from the Filament Group involves using a `link` element just like you normally would, but with two small changes.

First, set the `media` to `print`. Then, add an `onload` event to it that switches the `media` to `all` once the CSS file loads. For a bonus, you can also set the `onload` to `null` after.

```html
<link rel="stylesheet" href="/path/to/my.css" media="print" onload="this.media='all'; this.onload=null;">
```

[Scott Jehl explains *why* the technique works](https://www.filamentgroup.com/lab/load-css-simpler/) in an article on the Filament site.

> By declaring a media type that doesn’t match the current environment, we can achieve an interesting and useful effect: the browser will load the stylesheet without delaying page rendering, asynchronously!

So neat!

## What about `preload`?

In response to yesterday's article on self-hosting fonts, I had a bunch of people email asking about the `preload` attribute.

In my own experience and testing, this attribute actually slowed down rendering of pages for me. Filament's article hints at why that may have been happening for me.

> More importantly though, `preload` fetches files very early, at the highest priority, potentially deprioritizing other important downloads, and that may be higher priority than you actually need for non-critical CSS.

Your mileage may vary, of course. They do offer a fix in their article, but the newer approach above works great as-is.