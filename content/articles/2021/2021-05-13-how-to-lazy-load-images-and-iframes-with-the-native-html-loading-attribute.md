---
title: "How to lazy load images and iframes with the native HTML loading attribute"
date: 2021-05-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

A few months ago, I wrote about [the IntersectionObserver API](/an-introduction-to-the-vanilla-js-intersection-observer-api/), which is useful for things like lazy loading scripts.

Today, though, I wanted to take a look at the native HTML `[loading]` attribute, which can be used to lazy load images and iframes without the need for any JavaScript.

Let's dig in.

## How to use the `[loading]` attribute

To make an image lazy load, add the `[loading]` attribute to it and assign a value of `lazy`.

```html
<img loading="lazy" alt="A photo of a crab walking on the beach" src="/imgs/crab.jpg">
```

The `[loading]` attribute also accepts a value of `eager`, which is the same as not including it at all.

```html
<!-- I'm not sure why you would ever do this -->
<img loading="eager" alt="A photo of a crab walking on the beach" src="/imgs/crab.jpg">
```

And that's it, really!

The browser will load any images that are in (or close to) the viewport immediately, and then load additional images later as they get close to the viewport (but before they're in it).

You can also add the attribute to iframes, though browser support is a little worse for that than for images (more on that in a bit).

## How the `[loading]` attribute works

With this approach, you hand control of lazy loading over to the browser.

In my experience, Chromium browsers load more aggressively, loading more images up front and loading them when they're further away from the viewport than Firefox does.

**[Here's a demo.](https://gist.github.com/cferdinandi/1fac32b6f6781c899afde90399e25741)**

Browsers may also use connection speed to determine how they load. For example, on slower browsers, they may load all of the images immediately to avoid lag later as the user scrolls.

Despite being an native HTML feature, the `[loading]` attribute only works with JavaScript enabled, for privacy reasons. [MDN notes...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)

> This is an anti-tracking measure, because if a user agent supported lazy loading when scripting is disabled, it would still be possible for a site to track a user's approximate scroll position throughout a session, by strategically placing images in a page's markup such that a server can track how many images are requested and when.

In my opinion, giving up this control is _a good thing_, not a bug.

Ultimately, it should be up to users and browsers to decide what's best for the user in that moment, not us as developers.

## Browser support

At time of writing this, the `[loading]` attribute works in Chromium browsers: Edge, Chrome, Opera, and Android Browser. It also works in Firefox and Samsung Mobile.

While `[loading]` works in Firefox, only images are supported at this time. Iframes load as normal.

It does _not_ work in IE, Safari, or Opera Mini.

Despite browser support being a bit spotty, I see no downside to using it now. Unsupported browsers will load images the old fashioned way, while modern ones will benefit from a nicer experience.