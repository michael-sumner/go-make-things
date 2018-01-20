---
categories:
- Code
- Design &amp; UX
- JavaScript
- Web Performance
date: '2017-05-04'
url: /why-66ms-when-using-settimeout/
title: Why 66ms when using setTimeout?
---

Yesterday, I wrote about [how to improve event listener performance](/event-listener-performance-with-vanilla-js/) for `scroll` and `resize` events. [Mark Goodyear asked](https://twitter.com/markgdyr/status/859756434828951553):

> Any reason for it being 66ms?

Yes. It's all about frame rate (how quickly your screen refreshes what's being displayed).

## Calculating FPS

Movies are shown in about 24fps (frames per second). TV shows are generally at 30fps, though many newer TVs can/do use 60fps instead. If you have a newer TV and find your shows look more like soap operas, it's because the TV is set to 60fps (great for sports, terrible for everything else).

You can calculate the number of milliseconds needed to hit your target refresh rate by dividing 1000 by your target fps:

```javascript
var 15fps = 1000/15; // 66
var 24fps = 1000/24; // 42
var 30fps = 1000/30; // 33
var 60fps = 1000/60; // 16
```

## Why 15fps?

So why do I use 15fps as my refresh rate? In a word: compatibility.

You *could* go faster but slower browsers can't resolve JS fast enough to keep up and start to lag. For example, 16ms (for a refresh rate of 60fps) is faster than many scripts can reliably execute.

You could certainly go *slower*, but I wouldn't. Anything above 100ms (a number I see used commonly in examples) [is perceivably slower](https://www.youtube.com/watch?v=vOvQCPLkPt4), even if you can't visually see the difference.

15fps is fast enough that it doesn't feel noticeable, but slow enough that it works broadly. If you want to play around with how different refresh rates look, [this web app is pretty cool](https://frames-per-second.appspot.com/).