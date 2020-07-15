---
title: "Button state and accessibility announcements"
date: 2020-06-24T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

Last year, [Sarah Higley wrote about button state and accessibility](https://sarahmhigley.com/writing/playing-with-state/):

> Most dynamic changes to a UI component (at least, changes that happen while a user is interacting with it) are communicated through state changes rather than property changes...
>
> This comes across as fairly similar to the use of states vs. properties in javascript application frameworks as well -- a common convention is that a change in application state will trigger a re-render, while a change to a property will not (unless manually triggered).
>
> It might therefore seem reasonable to also expect a screen reader to pick up and announce state changes but not property changes. However, as with many things related to ARIA, it is not that simple.

Sarah goes into detail about how to properly convey state changes to screen readers and other assistive technology.

This article was *incredibly* helpful on a project I was working on a few weeks ago. I highly recommend you [go read the whole thing](https://sarahmhigley.com/writing/playing-with-state/).