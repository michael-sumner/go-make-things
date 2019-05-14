---
title: "The blessing and the curse of JavaScript frameworks"
date: 2019-05-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I mostly write my own JavaScript for my projects rather than relying on third-party stuff. Yesterday, [Scott Smith brought up something on Twitter](https://twitter.com/ScottSmith95/status/1127952688279244800) that I hear a lot when I mention that to people.

> A huge, unspoken plus of developing on a framework is the community support of people trying to solve similar problems. When dealing with vanilla JS, CSS, etc. it’s rare to find someone with the exact use case or issue you have.

The argument is that frameworks and libraries&mdash;used by thousands of developers at many different organizations&mdash;have found and exposed a lot more of the bugs and edge cases than you (and maybe your small team) at a single organization will.

## The Framework Commons

If you have a problem with a framework, there's a good chance someone else has two and has implemented a fix or is working on one.

It's absolutely a benefit of the ecosystem.

The flip-side of that, though, is that with a framework, you're also inheriting all of the bug fixes and edge-case features for things that you'll never encounter or need and that just don't apply to you.

You're taking on a code base that's many times larger (and more intricate) than it needs to be for your specific needs. [Adrian Holovaty talks about this](/a-framework-authors-case-against-frameworks/) in a video I shared last week.

## Availability vs. Discoverability

I'm not convinced that, with vanilla JS, it's less likely that someone has encountered the same problem as you.

All of the frameworks and libraries are built with vanilla JS. It's been around for a long time. More and more people are coding without it.

**I think the problem is perhaps less that solutions aren't out there, and more that they're harder to find.**

There's no central hub for documentation and resources for vanilla JS, like there is for jQuery, or React, or Vue. Searching for solutions often turns up "just use jQuery" or "just use React" type answers.

A lot of people hate the phrase *vanilla JS*. "It's just JavaScript," they say.

But, it provides an easy way to filter out solutions that require third-party dependencies from those that don't.

I think the discoverability of vanilla JS solutions will get easier over time.