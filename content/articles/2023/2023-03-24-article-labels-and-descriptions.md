---
title: ARIA labels and descriptions
date: 2023-03-24T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
---

Today, I wanted to share [a post from my friend Ben Myers on `[aria-label]`, `[aria-labelledby]`, and `[aria-describedby]`](https://benmyers.dev/blog/aria-labels-and-descriptions/): what they do, how they're different, and when to pick one over the other.

> ARIA is a set of HTML attributes designed to tweak how a webpage is exposed to assistive technology. It can be... a lot. There are presently [36 aria-* attributes](https://www.w3.org/TR/wai-aria/#state_prop_def), each with their own specific or general use cases, their own rules for [compatible elements and roles](https://www.w3.org/TR/html-aria/#docconformance), and their own [browser/screenreader support tables](https://a11ysupport.io/). On top of that, they can be hard to keep straight—when should you use `aria-valuenow` versus `aria-valuetext`, or `aria-checked` versus `aria-selected`?
>
> I've [written about ARIA before](https://benmyers.dev/blog/aria/), but this time, I'd like to hone in on three ARIA attributes that, in my experience, are just similar enough to be confusing: `aria-label`, `aria-labelledby`, and `aria-describedby`.

If, like me, you know accessibility is important but often find the nuances of it confusing and overwhelming, [go check out Ben's post](https://benmyers.dev/blog/aria-labels-and-descriptions/)! It's a very good read!