---
title: "What's the difference between encodeURI() and encodeURIComponent() in vanilla JS?"
date: 2019-12-11T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, `encodeURI()` and `encodeURIComponent()` methods are used to convert certain characters to make them safe for use in URLs.

**So, what's the difference between the two?**

[Steve Griffith put together a wonderful explainer video.](https://www.youtube.com/watch?v=tmgMWWNRTp0)

<iframe width="560" height="315" src="https://www.youtube.com/embed/tmgMWWNRTp0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The simple version:

- `encodeURIComponent()` encodes everything *except* these characters: `A-Z a-z 0-9 - _ . ! ~ * ' ( )`
- `encodeURI()` ignores the same characters as `encodeURIComponent()`, and `*also ignores` these: `; , / ? : @ & = + $ #`

**So... which one should you use, and when?**

If the string is a complete URL, use `encodeURI()`. Otherwise, the slashes (`/`), colons (`:`), question marks (`?`), and other valid URL characters will get stripped out the link won't work.

If the string is just going to be *part* of a URL, and does not need any of those valid characters to work, use `encodeURIComponent()`.

Steve goes into a lot more detail in his video, so [go give it a watch](https://www.youtube.com/watch?v=tmgMWWNRTp0).