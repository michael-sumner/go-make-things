---
title: "Build for failure"
date: 2019-01-15T10:30:00-05:00
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

Yesterday's post on [how many people are missing out on your JavaScript enhancements](/does-progressive-enhancement-still-matter/) (and last week's on [whether or not progressive enhancement still matters](/does-progressive-enhancement-still-matter/)) got a lot of comments from readers.

There are three trends in the responses that I wanted to address today:

1. "The gov.uk numbers are from 2013. Isn't that outdated?"
2. "That can happen to CSS, too. It's not just a JavaScript problem!"
3. "We can't engineer for every possible problem."

Let's dig in.

## 1. "The gov.uk numbers are from 2013. Isn't that outdated?"

In web years? Sure.

I couldn't find any updated data on this, but I would expect the number of people *not* getting your JavaScript enhancements to be *higher* today than they were six years ago, for a few reasons.

1. Mobile web usage has exploded, and mobile devices are more likely to timeout or choke on large JavaScript files.
2. There's an assumption that web speeds are---in developed countries, anyways---super fast now. For some people they are, but many people, even those living in cities and such, they're horribly slow.
3. Ads are ruining the web. As a result, more people browse with ad-blockers that can be pretty aggressive in what they block out.
4. A lot of people DGAF about backwards compatibility and write code that only works on newer browsers that your users may not be using.

Another way to look at this: let's say the numbers are lower. Maybe... one in every 200 users. One in every 500.

How many users is ok to not give a shit about? (Particularly when you *can* build sites that still work for them without a ton of extra effort.)

## 2. "That can happen to CSS, too. It's not just a JavaScript problem!"

Yep. That's true.

But when CSS fails to load, you get an ugly but usable collection of markup (assuming you didn't build the whole thing with JavaScript).

<img src="/img/articles/no-css.jpg">

When JS fails to load, you often lose interactivity, access to certain pieces of content, or if your site is entirely JS rendered, the whole damn site.

And sure, the HTML file could fail to load, too. Can't do anything about that. ([Or can you?](https://abookapart.com/products/going-offline))

But you can provide a minimum experience with HTML alone, and you should.

## 3. "We can't engineer for every possible problem."

No, you can't.

But you can build a site that's tolerant of some common failures. You can build in layers. You can ensure that if all that loads is an HTML file, the user can still do *something*.

It's 2019. We have the ability to build the fastest websites and apps ever.

But instead, we've built a slow, buggy mess.