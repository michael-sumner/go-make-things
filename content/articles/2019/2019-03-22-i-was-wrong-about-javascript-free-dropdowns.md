---
title: "I was wrong about JavaScript-free dropdowns"
date: 2019-03-22T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Yesterday, I wrote an article about [JavaScript-free dropdowns](/javascript-free-dropdown-menus/) using the native `<details>` and `<summary>` elements.

My good friend and [accessibility expert Scott O'Hara](https://www.scottohara.me/) quickly messaged me to tell me that I had gotten things all wrong.

*__Quick aside:__ every developer needs a Scott in their life!*

## The issue

Scott explained to me that while those elements are perfectly valid for [JavaScript-free accordions](/javascript-free-accordions/), they don't work for dropdown menus.

In his [detailed article (ha, get it?) on the `<details>` and `<summary>` elements](https://www.scottohara.me/blog/2018/09/03/details-and-summary.html), Scott describes the current state of browser, operating system, and screen reader support for these elements.

The tl;dr is that it's wildly inconsistent, and different combinations of browser, OS, and assistive tech announce the element different ways.

So, why are those elements OK for accordions but *not* dropdowns? In a word, semantics.

The way the elements are announced in all combinations conveys "click this thing to learn more." It doesn't inherently imply, "click this thing to see more navigation items," which can lead to confusion for some users.

Their use as a dropdown is what Scott calls "technically accessible."

The content is there and can be accessed, but it doesn't provide an experience that's clear and obvious to people using assistive technology. In that way, it's "functionally inaccessible."

*__PS:__ Scott has an article coming out about this next week that will certainly be a "must read."*

## What you should do instead

Scott tells me that dropdowns are probably best implemented with a JavaScript-based disclosure component.

I wrote one called [Houdini](https://github.com/cferdinandi/houdini). Scott also [has one as well](https://github.com/scottaohara/aria_disclosure_widget) that's, of course, built with accessibility in mind.

## Why is this so hard?

Earlier this week, I wrote about [the moral obligation we have to build accessible websites](/building-accessible-websites-and-apps-is-a-moral-obligation/).

In it, I also lamented that accessibility is harder than it should be.

> The proper markup structure, keyboard interactions, and aria attributes and roles for things like tabs, accordions, modals, and so on is tricky to get right.

I personally find it difficult that things that *feel* like they do the same thing (accordions and dropdowns both show and hide content on click) can have such different needs in terms of markup, aria attributes, and roles.

But after talking with Scott, I discovered there's a bigger issue at play.

## Accessibility is stuck in IE

If you're newish to web development, you might not remember what the Internet Explorer (IE) days were like.

IE, Opera, Chrome, Firefox... they all implemented proprietary features behind vendor prefixes, or implemented common features in slightly different ways.

Building cross-browser experiences was a nightmare, and its why tools like jQuery flourished and became so popular.

Today, web standards have (mostly) eliminated that problem. Not all browsers have implemented all of the latest features, but Edge, Chrome, and Firefox all do a pretty good job of keeping up.

And, *when* they implement features, they do so according to a shared specification so that a feature behaves consistently across browsers.

### But what about accessibility?

But while HTML, CSS, and JavaScript have made huge leaps here, accessibility has been left in the dark.

The various browsers implement features and announce elements differently from each other, and sometimes from themselves depending on operating system. Assistive technologies like screen readers all work a little differently, too.

This makes implementing advanced features and components consistently a lot like trying to build cross-browser websites during the IE era.

And this is where most people get frustrated and decide they don't care.

Because web development with native methods and APIs has gotten much easier, but not when it comes to accessibility. We need to do better, but browsers and operating systems need to step up their game, too.