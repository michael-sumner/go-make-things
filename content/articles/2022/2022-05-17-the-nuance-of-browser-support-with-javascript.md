---
title: The nuance of browser support with JavaScript
date: 2022-05-17T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

I often say that "I support all modern browsers" with the code that I write. But what does that mean, actually?

Let's dig in.

## What's a "modern browser?"

For me, a modern browser is one of the _evergreen_ (automatically updating) desktop browsers: Edge, Firefox, Chrome, and Safari. It also includes the most popular and common mobile browsers: WebKit View, Chrome, and FireFox on Android; Safari on iOS.

It does _not_ include legacy browsers like IE (including IE 11). It also excludes popular but feature-lite browsers like Opera Mini.

## What does "support" mean?

This is where, in my opinion, the nuance really comes in.

<p class="margin-bottom-small">This means different things for me depending on context...</p>

- For nice-to-have features and extras/flourishes, the feature _only works_ in modern browsers. An example of this might be smooth-scrolling to anchor links. That's [a progressive enhancement](/progressive-enhancement-the-new-hotness/) that doesn't work in IE or Opera Mini. They get hard jumps to anchor links instead.
- For core-features that are essential to how an app works, I use a combination of older and better supported browser methods, polyfills, and transpiling to get broad support. Most importantly, I'll still use progressive enhancement with a server fallback when I can, because things break in browsers all the time. 
  
The browser is a fragile, fickle beast. Servers? Less so.

We need to plan for failure with everything we build, because it's inevitable.