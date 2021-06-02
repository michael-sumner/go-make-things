---
title: "Sometimes you just need JavaScript"
date: 2021-06-02T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Last week, I shared [a list of HTML and CSS replacements for things that used to require JavaScript](https://calendar.perfplanet.com/2020/html-and-css-techniques-to-reduce-your-javascript/).

One response I got to that article was a website dedicated to HTML and CSS alternatives to JavaScript components. And while I love that sort of thing in concept, the first three components on the page were not accessible (as in, they won't work for people who use screen readers or have certain types of disabilities).

The site includes a note that "some of these demos may not be accessible and work on all browsers," but puts the onus on developers to test that and evaluate. And, I'm sorry, but the typical developer looking for copy/paste tools doesn't have the ability to do that. We're not there as an industry yet.

The point I'm trying to make is that I absolutely _love_ when the platform releases features that replaces JavaScript.

But not every "you don't need JS for this" hack is better than using a JavaScript component. Often, JS is _important_ and _neccessary_ to build a component that's complete and accessible.

For example, I often see image sliders or carousels built without JavaScript using CSS animations.

- Can someone with cognitive impairments pause the animation to give them more time to take it in?
- Can someone who suffers from motion sickness disable animations entirely?
- Can a user move forward and backward through the "slides" on their own?
- Are changes to the slides announced, so that a screen reader user knows what's happening on the page?

There are tons of "CSS-only" hacks that are bare-minimum functional, but provide a worse and less accessible experience that adding a little bit of JavaScript.

JS isn't bad. Using it poorly is. So is not using it at all when it would actually be the proper choice.