---
title: "Relative vs. absolute JavaScript performance"
date: 2019-05-31T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

In response to yesterday's article about [saving data to `localStorage` or `sessionStorage` to maintain state across views in a multi-page app](/persisting-state-across-views-in-a-multi-page-app-with-vanilla-js/), a few people wrote back asking:

> Isn't `localStorage` slow? Isn't that bad for performance?

I'm *really happy* that performance is something my readers care about and think about. Let's dig into this a bit.

## Big picture

Too often, we as an industry ignore the performance implications of our choices because we're building things on high-end machines with fast internet connections. Our users often aren't like us.

But it's also possible to focus too much on *micro-optimizations*.

As an industry, we do that while ignoring bigger performance issues (like loading 100kb of JS frameworks and dependencies) in the name of "developer convenience" and "scale." We're all building apps at massive million-user-plus scale, right?

I know I'm preaching to the choir, here. You wouldn't be reading an article on my site if you weren't interested in building faster, more lightweight sites and apps.

## Focus

I want to see us focus less on *micro-optimizations* and more on the big-picture performance issues that comes from loading hundreds of KBs of frameworks, large libraries, module bundlers, and JS routers.

Ironically, I often see "faster second view load times" as an argument for using these tools.

Call me crazy, but I'd rather use less JS in the first place and get faster first-view load times, too.

## Answering the actual question

To answer the actual question: yes, writing to `localStorage` is slower than keeping data in memory cached to a variable.

But in absolute terms, it's not *slow*. A user isn't going to see second long delays writing data to `localStorage`.

Also, I still keep the data in memory cached to a variable. That's what you I use to generate UI and so on. Saving to `localStorage` is only for state persistence across views. You only read from on page load to set that initial state variable with the stored data.

## Other micro-optimizations

Like I mentioned, I see this a lot. The two micro-optimizations I most commonly see are...

1. Using `getElementById()` or `getElementsByClassName()` instead of `querySelector()` or `querySelectorAll()`. The latter methods are slower, but still insanely fast (thousands of operations a millisecond).
2. Using `for` loops instead of `forEach()` or other modern array manipulation methods like `filter()`, `map()` and so on. In some browsers, [the newer methods are actually faster](/how-performant-are-modern-array-methods-vs-old-school-for-loops-in-vanilla-js/)!