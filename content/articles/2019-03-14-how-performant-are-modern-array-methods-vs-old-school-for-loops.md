---
title: "How performant are modern array methods vs old-school for loops in vanilla JS?"
date: 2019-03-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Over the last week or two, I've written a lot about modern array methods like `forEach()`, `map()`, `filter()`, and `reduce()`.

One of the questions I've been asked a lot during the series is:

> What impact do these methods have on performance vs. using an old-school `for` loop?

Rebecca Turner had already done some benchmarking on this, and told me that [the modern are actually *faster* that `for` loops](https://twitter.com/ReBeccaOrg/status/1105265216990765056).

To be honest, I found this surprising. Given that `for` loops have been around forever, I assumed browsers would be optimized for them in a way that they're not with the more modern methods.

## Testing this

I was curious about just *how much* faster the modern methods are, so I [set up some tests on JSPerf](https://jsperf.com/modern-vs-old-loops). Here's what I found:

- `for` loops and the `forEach()` method perform pretty close to each other.
- Methods like `map()` and `filter()` are about twice as fast as using `forEach()` and pushing to a new array to do the same thing.
- Using `forEach()` for multi-step manipulation is about twice as fast as [chaining methods like `filter()` and `map()`](/chaining-array-methods-in-vanilla-js/).
- These results were consistent across Chrome, Firefox, and Safari. I was concerned that only the V8 JavaScript rendering engine had been optimized this way, but all modern browsers saw similar results.

## What this means for you

The obvious win here is that modern array methods are not just easier to write and work with, but also more performant. That's great!

On older browsers, that might not be the case. But honestly, I'm not generally worried about performance with native browser methods and APIs. An approach may be slower *relatively* speaking, but still really fast in the absolute sense. Performing 1,000 operations a millisecond is still really impressive!

Along those lines, what should you do when performing multi-step manipulation? (For example, finding only items with a certain value, and then returning just a subset of data.)

In absolute terms, `forEach()` is faster than chaining methods. But the chained methods are still pretty damn fast!

Personally, I would optimize for readability of the code. Even if one approach is faster, it's all still really fast!