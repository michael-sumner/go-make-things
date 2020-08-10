---
title: "Progressive enhancement, graceful degradation, and asynchronously loading CSS"
date: 2020-08-10T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

On Friday, I wrote about [how to asynchronously load CSS (and when you might want to)](/how-to-load-css-asynchronously/). I got a handful of questions from people asking:

> So someone only gets the CSS if JS is enabled?

Yes.

Today, let's look how to handle that, and whether or not that's even a problem.

## Who would be affected by this?

If you missed Friday's article (or don't remember the details), you can load non-critical CSS asynchronously in the background by modifying your `link` element to look like this.

```html
<link rel="stylesheet" href="/path/to/my.css" media="print" onload="this.media='all'; this.onload=null;">
```

CSS blocks rendering, so for CSS that's not critical to the initial paint, this can improve overall and perceived performance.

Yes, this solution depends on JS. And yes, JavaScript doesn't always work. But only a small subset of "JS doesn't work" users would actually be affected by this.

JavaScript fails for a lot of reasons.

- Connections time out
- CDN's fail
- Bugs in the code stop it from running
- Network connectivity is lost before the file finishes download
- People turn JS off

With the asynchronous CSS solution above, only people in that last category&mdash;people who explicitly turn JS off&mdash;would be affected.

Because the `link` element is directly in the HTML document that they already have, and because the JS to load it is inline and doesn't depend on any external files to run, the only time it won't run is if someone has JS completely turned off.

### How many people disable JavaScript?

There aren't many good statistics on this, because it's hard to measure "JS was turned off" versus "JS failed to load."

[Buzzfeed found that about 1 percent of all requests for JS failed for one reason or another](https://twitter.com/philhawksworth/status/990890920672456707). I think it's reasonable to assume that not all of of those failures were caused by JavaScript being disabled.

So, the number is less than 1 percent. How much less? Tough to say.

That doesn't mean they're not important, though. So, what can we do for those users?

## Progressive Enhancement and Graceful Degradation

There are two similar but opposing approaches to browser support that are sometimes incorrectly used interchangeably.

1. **Graceful degradation** is when you provide a *fallback approach* to fill the gap created by lack of browser support of a failure of some kind.
2. **Progressive enhancement** is when you provide a *baseline experience* that works for all users, regardless of support or failures, and then *enhance* the user experience for more modern browsers.

For example, detecting whether or not a browser supports the `fetch()` method, and falling back to `XHR` when they don't (either through an `if...else` statement or a polyfill) could be considered *graceful degradation*.

Providing a link to an external page, and then using JS to replace the link with content from that page when modern JS is supported, is a *progressive enhancement*.

Both approaches have their merits, and you should lean on different techniques for different use cases.

## Which approach should you use for asynchronously loaded CSS?

It depends.

If you're loading a custom web font asynchronously (as you should), I would personally treat that as a **progressive enhancement**.
*All users* start with a system font, and when their browsing experience supports it, they get the enhanced experience of your prettier web font.

In that case, no change to the approach is needed. It's progressively enhanced out-of-the-box.

```html
<!-- A progressively enhanced custom web font -->
<link rel="stylesheet" href="/my/fonts.css" media="print" onload="this.media='all'; this.onload=null;">
```

What about non-critical CSS that's part of your overall layout, though? Stuff that's not critical for above-the-fold content, but that you still want for a good user experience?

This one is *maybe* a bit trickier.

Depending on how extreme you want to be, you can think of CSS itself as a progressive enhancement.

If you use semantic markup and a good layout structure, the content&mdash;the *truly* critical part of your site or app&mdash;then CSS is technically just an enhancement to make it look nicer. Hell, [there's a whole day devoted to removing CSS from sites to highlight the importance of good HTML](https://css-naked-day.github.io/).

Personally, I would lean towards **graceful degradation** for my main CSS.

Browsers with JS enabled get the performance benefits of asynchronous loading. People who have it disabled instead get a synchronously loaded file wrapped in a `noscript` element.

```html
<!-- Better experience for supporting browsers -->
<link rel="stylesheet" href="/my/main.css" media="print" onload="this.media='all'; this.onload=null;">

<!-- Fallback for unsupported ones -->
<noscript>
	<link rel="stylesheet" href="/my/main.css" media="all">
</noscript>
```

If you want to make the *fallback experience* a bit more enhanced, you could move it to the footer so that the main HTML renders before the CSS loads, but I probably wouldn't bother.

## Mix-and-match techniques as needed

As you can see, there's no *One True Way* to do things.

There are different techniques that you can mix-and-match on projects to based on what's appropriate for any particular piece of the experience.

Building things for the web is always a trade off between a variety of concerns, including browser support, desired user experience, user versus developer control, and performance.

We as developers have shockingly little control compared to the backend. Personally, I love that about front end development. It's what makes this profession so exciting to me.

I've found that [learning to embrace it](/the-tao-of-web-development/) is the key to bliss as a front end dev.