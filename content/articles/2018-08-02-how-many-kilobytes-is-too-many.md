---
title: "How many kilobytes is too many?"
date: 2018-08-02T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- JavaScript
- Web Performance
---

During a conversation with [Kieran Barker](https://github.com/kieranbarker) about [my article on vanilla JS show and hide animations](/a-vanilla-js-animation-helper-function/), I mentioned that since animate.css is 5kb, you might want to pull out just the animations you need.

Kieran asked:

> What's considered 'a lot' in terms of bandwidth? Because kilobytes don't sound like much, no matter how many there are?

The answer depends on a few factors, including the type of code being loaded, _how_ it’s being loaded, and how it’s written.

For example... CSS and JS are render blocking, so large amounts of either in the header are bad, unless loaded asynchronously. JS takes a lot more time to parse and compile in the browser than CSS does, so it’s inherently slower per byte than the same amount of CSS is ([Addy Osmani from Google just wrote about this](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)).

Modern JS methods are slower than older ones.

For example, `forEach()` is slower than an old school `for` loop, though this is a level of absurd hyper-optimization I avoid. It's not the `forEach()` is slow. It's just that `for` is _faster_. At some point, fast is fast enough.

Then there’s not just browser speed but bandwidth considerations. Maybe the user’s device can support all that JS or CSS, but their data plan can’t. Or they’re in an area with a slow connection and your large JS file times out before it finishes downloading.

So... I like to use as much code as necessary, and not a byte more.

(These days, my CSS and JS files are so small I'm able to [literally inline everything](/inlining-literally-everything-for-better-performance/) and deliver the entire site in a single HTTP request.)