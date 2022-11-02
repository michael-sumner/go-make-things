---
title: Coding and cheap speakers
date: 2022-11-03T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Yesterday, I wrote about [how the people who use the things we build are often on slower networks and less powerful computers than we are](/build-tool-plugins-for-web-performance/).

A reader replied with this story about audio engineering (shared with permission), that I thought was particularly relevant...

> When I was in college, I worked for an audio engineer who had a tiny set of $40 speakers under his thousand dollar speakers that he used for mixing music. I asked him about it, and (to paraphrase) he said that if you can’t mix music so it sounds good on the best AND the worst speakers you can find, then it doesn’t matter if it sounds good on the best speakers – people buying music probably aren’t spending thousands of dollars on their audio set up.
>
> I think coding may by the same way – it doesn’t matter if you’re code runs well on your most expensive setup if it can’t run well on the least expensive setup.

So how _can_ you build sites that run well on the cheap setups, and not just the expensive ones?

I use a few principles...

- Treat JavaScript as an enhancement rather than a core requirement whenever possible.
- Send as little code&mdash;HTML, CSS _and_ JavaScript&mdash;to the browser.
- Cache aggressively with service workers to reduce latency on future requests and add resilience when networks fail.