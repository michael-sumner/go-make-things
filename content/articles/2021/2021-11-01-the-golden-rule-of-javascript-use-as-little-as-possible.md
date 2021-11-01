---
title: "The golden rule of JavaScript: use as little as possible"
date: 2021-11-01T10:30:00-04:00
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

Over the weekend, [Josh Tumath tweeted a slide](https://twitter.com/JoshTumath/status/1454458945008029698) from a talk by [Heydon Pickering](https://twitter.com/heydonworks)...

> Awkward. Funny how a lot of sites are completely blank with JavaScript disabled.

[Stefan Krieger replied](https://twitter.com/StefKrie/status/1454780628487086080?s=20) (in good faith, I think)...

> Disabling CSS they look even worse. No, seriously, is there a proper reason to disable JS in 2021?

I hear this question a lot.

Some people _do_ disable JavaScript&mdash;for privacy reasons, or because their device is old and JavaScript makes it run a lot slower. But JavaScript fails often, and usually not because its turned off.

An estimated 1-2 percent of all JavaScript requests fail. 

Sometimes the request takes too long and times out. Sometimes the CDN fails. Sometimes an ad blocker gets a bit too aggressive. Sometimes a company's security policy blocks your file out of an abundance of caution. Sometimes you mistype a variable and shit just doesn't work.

The idea that a failed CSS file "looks even worse" than a blank page is maybe accurate in a minimalist kind of sense. But as a user of a thing, would you rather have boring looking text that you can still read, or nothing at all?

JavaScript is amazing. It absolutely has a place on the web, and it's absolutely essential for certain tasks.

But it's also the slowest and most fragile part of the front end stack. Too much of it completely bogs down sites on older devices (not everyone has a fancy new iPhone). And when things go wrong, it fails spectacularly (as shown in Heydon's collection of blank web pages).

The golden rule of JavaScript: use as little possible. 

Not too much. Not too little. Just enough.