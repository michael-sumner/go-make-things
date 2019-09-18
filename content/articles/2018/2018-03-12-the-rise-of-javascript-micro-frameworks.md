---
title: "The rise of JavaScript micro-frameworks"
date: 2018-03-12T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

I talk a *lot* about how I think large frameworks like Angular and React are ruining the web.

Today, I wanted to talk about a trend I'm happy to see: the rise of JS micro-frameworks.

## What's a micro-framework?

One of the things I get asked about a lot in [the Slack channel that comes with my pocket guides](/guides) is what I think about various alternatives to the large JS frameworks.

The list includes:

- [VueJS](https://vuejs.org/)
- [StimulusJS](https://stimulusjs.org/)
- [Preact](https://preactjs.com/)
- [MonkberryJS](https://monkberry.js.org/)
- [RE:DOM](https://redom.js.org/)
- [Mithril](https://mithril.js.org/)
- [Stapes](https://mithril.js.org/)

And those are just the ones I know about. I'm sure there are more!

What these all have in common is a much smaller footprint, and a "just enough" approach to building for the web.

I would debate Vue's place on the list. While I love that you can use it with just a humble `script` element, at 80kb minified, it's far from "micro."

## Why I like them

Because I talk so openly about why I believe frameworks like Angular and React are destroying the web, people often assume I hate frameworks altogether.

And I kind of do.

But that doesn't mean I'm against *abstraction* at all. I love [helper functions](https://vanillajstoolkit.com/helpers/) and [plugins](https://vanillajstoolkit.com/plugins/).

My problem with frameworks is that they try to do a lot of things that I think are best handled by the native JavaScript methods and browser APIs that already exist, and in the process add a shit load of latency and bloat to websites that just doesn't have to exist.

**Micro-frameworks are the antidote to that.**

They abstract out some repetitive stuff (ideally *reducing* bloat rather than adding it), and do so with as little a footprint as possible. My favorite ones talk advantage of what the web already gives you, and augment as necessary.

## Which micro-frameworks are my favorite?

Truthfully, there are things I dislike about all of them, but there are a few that come *really* close to the mark for me.

If I *had* to use one today, I'd go with [MonkberryJS](https://monkberry.js.org/), no question.

First, it's absurdly small. They also provide a [CDN version you can load directly into a `script` element](https://monkberry.js.org/docs/installation#cdn).

It has a simple templating system that works directly in your HTML, which is one thing people really like about VueJS. Unlike, Vue, though, it keeps event handlers out of the markup (if you'd like to, which I do).

As a runner up, I like some aspects of how [StimulusJS](https://stimulusjs.org/) works, and I find [Preact](https://stimulusjs.org/), a 3kb alternative to React, kind of interesting.

Are there any that I missed? I'd love to hear more!