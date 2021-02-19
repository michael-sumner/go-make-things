---
title: "Do you still need to support IE11 for accessibility reasons?"
date: 2021-02-19T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

Last month, I mentioned that I believe [its time to drop support for IE11 and go "fully modern" with our websites](/its-time-to-drop-ie-support/).

This week, one of my students shared this really interesting article from Hassell Inclusion: [Do accessible websites still need to support Internet Explorer 11?](https://www.hassellinclusion.com/blog/should-accessible-websites-still-support-ie11/)

Their recommendation:

> *Spoiler Alert*  Our recommendation is that developers and companies continue to support Internet Explorer 11 for now, until the newer version of Edge (Chromium) can deliver a comparable experience for assistive technologies – especially JAWS, Dragon NaturallySpeaking and Zoomtext.

The article than does a deep dive on why folks want to drop IE 11, and why those using assistive technologies (AT) may still prefer it.

**A few quick thoughts I have in no particular order.**

- It's absolutely egregious to me that web standards have been around for as long as they have, but AT (like screen readers) do not behave consistently with each others or across browsers.
- Much of their research found that the major AT devices in question worked as expected in Chrome, but had a few hiccups in the Edge 87 and the latest Firefox. Edge is now on version 88, and is built on Chromium just like Chrome, so I'd expect those issues to get smoothed out shortly.
- One of the big reasons they gave for continuing to support IE11 is that folks using it are less technically savvy and may prefer a browser they're already comfortable with. That's fair, but it's also a security concern, and I believe they should be encouraged to upgrade rather than enabling security issues to persist.
- Corporate users stuck on IE were also mentioned. This is why I think MS themselves dropping IE support in MS365 is so important. It forces the corporate issue a bit. And again, should be encouraging or enabling the use of dated tech at this point?

The key thing for me is this: I like to support as many users as possible, and I recognize people don't always have a choice in the browser they use.

But in 2021, continuing to use IE feels like a choice rather than a need. I'm going to continue to recommend we drop support for it, but your conclusion may be different from mine, and that's ok, too!

If you do still need or want to support IE, you can use [a polyfill service like polyfill.io](https://polyfill.io/v3/), or [transpile your code back to ES5 with BabelJS](https://babeljs.io/).