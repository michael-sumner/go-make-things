---
title: "Just use :focus styles, damnit"
date: 2018-11-27T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
---

*This post has also been [translated into Russian](https://medium.com/web-standards/just-use-focus-799c577a8479).*

Recently, there's been a handful of articles and recommendations from people about how to use `:focus-visible` to show `:focus` styles when someone is using a keyboard but ignore them when the user interacts with a mouse.

The best one I've seen so far [comes from Lea Verou](https://twitter.com/LeaVerou/status/1045768279753666562):

> I’m gonna start blanket adding the following rule to all my stylesheets:
>
> ```js
> :focus:not(:focus-visible) { outline: none }
> ```
>
> Gets rid of the annoying outline for mouse users but preserves it for keyboard users, and is ignored by browsers that don’t support `:focus-visible`.

The general sentiment is always the same: focus rings (those outlines around links and buttons and other focusable elements) suck, and we only include them because keyboard users need them.

Bullshit.

Focus styles are actually awesome. My friend [Eric Bailey has a great presentation on this](https://noti.st/ericwbailey/TcMJFP/slides).

<iframe src="https://noti.st/ericwbailey/TcMJFP/embed" frameborder="0" width="960" height="540" allowfullscreen></iframe>

I personally enjoy them for the same reason that I also actually like `:visited` styles on link-heavy pages.

Even as a mouse user, knowing what currently has focus is useful, because I do *sometimes also use my keyboard*, often interchangeably with using a mouse. I may be an edge case, but do you know how every single one of your users navigates your sites and apps?

We keep making the same mistake&mdash;assuming we know how our users want to use what we build or that they're just like us&mdash;over-and-over again.

Also, focus styles don't have to be ugly. I think the defaults are great, but you can do all sorts of creative things to make them look ~~nicer~~ different.

My point: just include focus styles on your site. For everything focusable. For everyone.