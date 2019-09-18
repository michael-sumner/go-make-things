---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-03-31'
url: /javascript-selector-performance/
title: JavaScript Selector Performance
---

One of the students in my [Vanilla JS Slack channel](/guides/) asked me about the performance difference between `querySelector()` and things like `getElementById()` and `getElementsByClassName()`.

Specifically, `getElementById()` and `getElementsByClassName()` are [more than twice as fast](https://jsperf.com/getelementbyid-vs-queryselector/25) as `querySelector()` and `querySelectorAll()`.

So, that's bad, right? I honestly don't think it matters.

`getElementById()` can run about 15 million operations a second, compared to *just* 7 million per second for `querySelector()` in the latest version of Chrome. But that also means that `querySelector()` runs 7,000 operations a millisecond. A millisecond. Let that sink in.

That's absurdly fast. Period.

Yes, `getElementById()` and `getElementsByClassName()` are faster. But the flexibility and consistency of `querySelector()` make the obvious muscle-memory choice for my projects.

And it's not slow. It's just not *as* fast.