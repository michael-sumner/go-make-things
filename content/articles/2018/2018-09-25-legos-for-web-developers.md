---
title: "Legos for web developers"
date: 2018-09-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

The other day, someone asked me if I ever use libraries like [Lodash](https://lodash.com/) or [Underscore.js](https://underscorejs.org/), which both have a bunch of helper methods that make working with the web a bit easier.

I don't.

Loading an entire library for one or two helper functions has always seemed absurd to me. You wouldn't get the buffet option at a restaurant just for one dish, right?

A lot of the methods in both Lodash and Underscore.js are covered by vanilla JS methods now, and support can be automatically pushed back for those methods using polyfills (I love [polyfill.io](https://polyfill.io) for this).

I *do* sometimes poach both of those libraries for helper methods, though. I'll dig through the source code and pull out the one thing I need, and just include that.

My approach to the front end is a bit like legos for web developers.

I have a bunch of little bricks---snippets, polyfills, helper methods---that I mix and match as needed for the task at hand.

That's actually how the [Vanilla JS Toolkit](https://vanillajstoolkit.com/) started out. It was my personal collection of vanilla JS resources, and I decided to put it out on the web in case others might find it useful, too.