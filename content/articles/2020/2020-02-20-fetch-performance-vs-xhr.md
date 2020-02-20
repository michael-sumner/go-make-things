---
title: "The Fetch API performance vs. XHR in vanilla JS"
date: 2020-02-20T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Late last year, I finally came around to [using `fetch()` instead of XHR to make API calls](/how-to-use-the-fetch-api-with-vanilla-js/).

But the portal where students access [my courses](/resources) was already working just fine with XHR. Last week, I finally decided to update it to `fetch()`.

I was not prepared for how noticeably faster that made the site.

## The Fetch API *might* be faster than XHR

Because XHR has been around for so long, I expected that browsers would be better optimized for it and that it would be more performant.

I was wrong.

[Alex Russell, a developer on the Google Chrome team, explained...](https://twitter.com/slightlylate/status/1185017213268287488)

> `fetch()` will be the same as XHR at the network level, but for things like decoding JSON, it can do that work off-thread because the API contract is promise-based up-front.

So, the actual API calls aren't any faster.

But for APIs that return large amounts of JSON that need to be parsed from a string back into an object (like my courses portal), `fetch()` handles that more efficiently because of JavaScript Promises.

Cool!

## How much faster is it?

When I tweeted about this last week, I had a few folks ask me exactly *how* much faster it is.

I'm an idiot, and didn't think to take before/after metrics to measure the difference, so I'm not 100% sure. I suspect a lot of it will depend on how many products of mine someone has. More products means larger JSON payloads to parse.

Anecdotally, it must be at least 100ms or so faster, though, because that's about the minimum amount of latency humans can detect before something feels "instant."

I also talked with a few students about it, and they verified that the site felt faster for them, too.

## What about getting HTML with `fetch()`?

Unfortunately, if you're [using `fetch()` to get HTML](/getting-html-with-fetch-in-vanilla-js/), there's no equivalent way to make that promise-based.

The `.text()` method gets you the HTML as a string, but to parse it into real HTML still requires *synchronous* JavaScript that blocks other code from running.

## Key takeaway

If you're working with large JSON payloads and want to give your site a little bit more of a performance boost, consider switching old XHR API calls to `fetch()`.

If you're getting HTML, you won't see the same performance benefits, and can hold off.

And while the improvement was perceivable (the most important kind of performance increase), it was slight. On the scale of performance optimizations, this is a lot less important than other things you should do first.