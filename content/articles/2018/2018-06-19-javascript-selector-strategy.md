---
title: "JavaScript selector strategy"
date: 2018-06-19T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Back in April, [I wrote about JavaScript selectors](/javascript-selectors-in-html/), and specifically why I prefer to use data attributes as selectors over things like classes.

> Classes are for styling elements. You can target it with JavaScript, and sometimes you have no other choice. But that’s not what classes were made for.
> ...
> Data attributes exist solely to add additional information to an element. In the HTML spec, they have no defined meaning, which makes them incredibly flexible.
>
> And since they can be targeted with JavaScript using `querySelector()` and `querySelectorAll()`, it also makes them perfect for JavaScript selection.

Reader [Emanuel Saramago sent me a tweet](https://twitter.com/EmanuelSaramago/status/983816342875856897) with some follow-up questions (shared with permission):

> Hi Chris! I follow your tips everyday and I love it! Great work!
>
> In this case, I see a disadvantage on performance: class selectors are much faster than attribute selectors.
>
> Also, if you have multiple data attributes, which one should you use for the selector?

These are great observations/questions!

First, performance. Yes, class selectors are much faster than attribute selectors. [But that doesn't mean attribute selectors are slow.](/javascript-selector-performance/) We're still in the realm of thousands of operations a millisecond (one-thousandth of a second).

You'd need an insanely huge app with absurd numbers of DOM nodes before you start seeing meaningful performance issues with data attribute selectors.

Regarding multiple data attributes and which one to use as a selector, I recommend having an approach and sticking with it.

That might mean having an attribute that's sole job is as a selector (`[data-selector="my-plugin"]`), or it could mean hooking into an attribute that's already there conveying additional information (`[data-modal="#some-element"]`).

The important thing is being consistent in your approach, which keeps your code cleaner, easier to read, and more friendly to work on and debug.

Hope that helps!