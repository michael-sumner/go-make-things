---
title: "What are the web performance metrics that actually matter?"
date: 2021-08-30T10:30:00-04:00
draft: false
categories:
- Web Performance
---

A lot of my students who are just starting out get really hung up on performance differences that make no meaningful impact on the end user.

For example, it's common to hear things like, "Should I use `document.getElementById()` instead of `document.querySelector()`? Which one is better for performance?" Or, "Is it more performant to use a `Array.map()` or `Array.forEach()` and `Array.push()`?"

Often, the answer is: "It doesn't matter."

Tomorrow, I'm going to take a closer look at writing performant JavaScript. But today, I wanted to start a bit higher level, and discuss which performance metrics actually matter.

Let's dig in!

## What matters?

On a page level, these are the metrics I pay attention to...

- **First Byte.** This measures how long it takes your server to start sending data back after the browser asks for an HTML file. You want this number to be below 500ms on a cable connection and under 1000ms (or 1 second) on 3G. If it takes longer than that, it means your server is doing a lot of work before each request.
- **Start Render and First Contentful Paint.** Start Render measures how long it takes the browser to start rendering after it gets data back. First Contentful Paint is similar, but measures when visible content appears (as opposed to hidden content). You want these to be below 1000ms on a cable connection and 3000ms on 3G. The choices you make with your CSS and JavaScript have a _big_ impact on these numbers.

In my opinion, the _least_ important metric is how long the site takes to finish loading. It matters a bit&mdash;you don't want to send a 12 MB site down the wire.

But getting usable content in front of the user is a lot more important than finishing downloading _all the things_.

On a file level, I care about total file size after minifying and gzipping.

The magic number I aim for is 14kb. That's about the size of a single HTTP request. Any file I can keep under that size gets sent from the server to the browser in a single trip and can immediately start running.

For example, I've been able to keep the _combined_ size of my CSS, HTML, and JS on most pages on my site to about 14kb. As a result, I [inline my CSS and JS](/inlining-literally-everything-for-better-performance/) instead of using external files. The entire HTML file comes through in a single HTTP request and immediately displays content to my visitors.

Any given HTML file is a bit bigger as a result, but it's still a single trip so the end result is a faster experience for visitors.

## How to measure performance

This one is shockingly easy.

1. Visit [WebPageTest.org](https://webpagetest.org/).
2. Type in the URL for your site.
3. Expand the Advanced Settings.
4. Select "Cable" for your connection, and "First View and Repeat View" under _Repeat View_.
5. Click the "Start Test" button and wait for your results.

The site will spit out a table with some of the metrics I mentioned above, as well as screenshots of the rendering process so you can see it in action.

I recommend running the test again with 3G fast or 3G slow for your Connection, to see how the mobile experience compares. You might also select different locations around the globe to see how that impacts performance.