---
title: What should your browser support strategy be in 2022?
date: 2022-01-27T10:30:00-05:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

A year ago this month, I mentioned that [it was time to drop support for Internet Explorer](/its-time-to-drop-ie-support/). Yesterday, Alan Dávalos published [a report looking at the current browser usage landscape](https://engineering.linecorp.com/en/blog/the-baseline-for-web-development-in-2022/), and what that means for us as developers.

Today, I wanted to highlight some key insights, and my takeaways from the report. Let's dig in!

## The High-Level Summary

Alan notes that IE was the "baseline" level of support for a lot of folks for years. With it gone, what should replace it?

He writes...

> Taking all the data above in consideration, the new baseline for web development would be:
> 
> 1. **Safari** is the baseline in terms of web standards: The sites we develop must work in Safari versions at least 2 years old.
> 2. **Low-tier Android devices** are the baseline in terms of performance: Low-tier Android devices have advanced little in the past few years so we must make sure our sites are super performant.
> 3. **4G** is the baseline in terms of networks: Mobile networks have become a lot faster and stabler worldwide in recent years.

This has some big implications for how we make things for the web, and that's what I want to talk about for the rest of this article.

## Safari and web standards

The good news is that a lot of the best modern JavaScript methods and browser APIs work in Safari.

Template literals, array and object destructuring, modern DOM manipulation methods, the object property shorthand syntax, the spread syntax operator, ES classes, ES modules... they all work natively in the last few versions of Safari.

The bad news is that Safari/webkit is _woefully behind_ Chromium and Firefox/Gecko in terms of implementing browser spec features.

> One fact becomes evident here, the number of web standards only Safari hasn’t implemented is many times bigger than those of Firefox and Chrome. To be precise, 2.4 times as much as Firefox and 4.7 times as much as Chrome.

This becomes more problematic because on iOS and iPadOS devices, users don't have a choice. All browsers on those devices use a webkit under-the-hood. They're essentially just reskinned versions of Safari.

**What this means for you** is that you need to verify that features work in Safari, and if not, [polyfill them](/whats-the-difference-between-polyfills-helper-functions-and-transpiling-in-javascript/) or [compile them back into a syntax that does using Babel](https://babeljs.io/).

## Performance considerations

A lot of developers (but not all of them)...

- Have expensive, high-end computers
- Have expensive, modern smart phones
- Have really fast home internet and/or 5g cell service

Most real world users do not.

As a result, we build things that work perfectly fine for us, but fail the people who use the things we build in pretty serious ways. 

That 30kb of minified and gzipped React (and all the accompanying JS you ship to render the UI) doesn't seem like a big deal on a good machine with faster internet. It makes sites unusable on older devices and slower connections.

**What this means for you** is that web performance, specifically on older devices and slower networks, should be a key part of your support strategy.

## Practical implications

Here's what this all means for how I personally build things for the web...

1. Ship as little JavaScript possible.
2. Avoid the latest and greatest, cutting edge JS methods and APIs unless I plan to polyfill them.
3. [Make heavy use of service workers](https://vanillajsguides.com/service-workers/) to improve performance and reduce data usage.

Adding polyfills (item 2) violates "ship as little JS as possible" (item 1). I reserve that for situations where new methods add dramatic improvements to what I'm building over older approaches.

Things can fail if JS is unsupported if they're "nice to have" features. Anything critical needs to work without JavaScript.