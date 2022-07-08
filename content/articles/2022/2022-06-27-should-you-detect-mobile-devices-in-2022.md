---
title: Should you detect mobile devices in 2022?
date: 2022-06-27T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

Last week, I was asked what the best modern way to detect mobile devices was.

The use case wasn't adjusting content to work better at a specific viewport size, but to optimize content delivery for a couple of components and maybe omit some altogether for performance reasons.

Today, I want to talk about when and why you _shouldn't_ detect mobile devices. Let's dig in!

## Focus on preferences and network over devices

Ultimately, it depends on what you’re trying to detect, and why.

Generally speaking, detecting the device type is not the way to go. The metrics you really care about are things like bandwidth and user preferences.

How much data are they processing right now? Do they want autoplay or animations disabled by default? That kind of thing.

There are a bunch of media queries, some better supported than others, that you can use to detect user preferences. [My friend Eric Bailey has a great article about that.](https://ericwbailey.design/writing/thoughtbot-com-dark-mode-and-other-user-preferences/)

## Detecting network conditions

Chromium browsers (like Edge and Chrome) support [an experimental Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API). Firefox and Chrome have not implemented it yet.

[There's another way to detect network speed with JavaScript, though.](https://hackthestuff.com/article/how-to-detect-internet-speed-in-javascript)

Essentially, it involves creating an image element with a file of a known size, and measuring the amount of time that passes from when you assign a `src` attribute to when the image is fully loaded. You can divide that elapsed time by the number of bytes in the image to get the speed.

## General principles

The key things to remember are that...

1. Someone could be using a laptop on a tethered mobile phone with bad internet.
2. Someone could be using a laptop at home on a bad internet connection.
3. Someone could be using an iPhone or tablet on a high speed connection with tons of bandwidth.

Device size does not equal bandwidth or performance needs in many cases. If that's your concern, you're better off measuring actual network speed and making adjustments accordingly.