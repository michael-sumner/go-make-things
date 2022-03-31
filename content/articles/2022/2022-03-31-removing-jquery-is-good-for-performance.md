---
title: Removing jAuery is good for performance
date: 2022-03-31T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

Today on Twitter, [Matt Hobbs from the [Gov.uk](https://www.gov.uk/) team shared that they recently removed jQuery from the site](https://twitter.com/TheRealNooshu/status/1509487050122276864), and saw some big performance improvements as a result.

> 🧵 As I mentioned last week [GOV.UK](https://www.gov.uk/) removed jQuery as a dependency for all frontend apps, meaning 32 KB of minified & compressed JS was removed. So let's see what difference this has made for users by examining our RUM data. Thread will mainly focus on JS CPU time.

Matt dives into some specific numbers in his thread, looking at percentiles of users. 

If you're not familiar with how these work, P95 is the 95th percentile, while P50 is the 50th percentile, or median. In web performance, P95 represents the 5 percent of users with the slowest connection (95 percent of all users have a _faster_ connection), while P50 is the median speed (half of users have a faster connection, and half of users have a faster one).

Many web developers look at their own performance experiences, but also often have the fastest connections and represent users in the P25 or lower brackets.

Looking at P75 or P95 users&mdash;the slowest connections&mdash;tells a much more accurate story of how performant an app or website is.

Back to jQuery, in his thread on removing it from the Gov.uk site, Matt notes...

> We see many of our key metrics trending down (for p75) after the change, including frontend time, First CPU Idle, JS Long Tasks.
> 
> If we compare before / after for our JavaScript performance, we can easily see the percentage improvements. If we look at the extreme end (our P95 users). they also see significant improvements.

If you [click through to Matt's thread](https://twitter.com/TheRealNooshu/status/1509487050122276864), he shares lots of detailed charts and such, and goes into a lot more detail.

But the bottom line is: on pretty much every metric for every mid-range or slower user, removing jQuery results in meaningful improvements in performance.