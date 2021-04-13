---
title: "A case study on why the modern web sucks: the Space Jam website"
date: 2021-04-13T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Technology
- Web Performance
---

Since 1996, [the Space Jam website](https://www.spacejam.com/1996/) has remained online, unchanged, a time capsule of the web 25 years ago.

In advance of the sequel, Space Jam: A New Legacy, [the website has been updated](https://www.spacejam.com/) for the first time in over two decades (with the old one thankfully archived at the link above).

With both websites available online, [Max Böck decided to run a performance test](https://mxb.dev/blog/space-jam/) to see how the web from 25 years ago performs against the modern web. The results are... underwhelming, but unsurprising.

> Unsurprisingly, the new site is a lot heavier than the original: with 4.673KB vs. 120KB, the new site is about 39 times the size of the old one. That’s because the new site has a trailer video, high-res images and a lot more Javascript.
>
> This is keeping with the general trend of websites growing heavier every year, with the average site weighing in at around 1.900KB now.
>
> But since our connection speeds and device capabilities are significantly better now - that’s fine. Everything is way faster now than it was back in the days of Michael Jordan’s first Looney Tunes adventure.
>
> Is it though? Let’s find out.

Max actually went so far as to test the old Space Jam website using 1996 connection speeds against the new one using modern connection speeds, to get a true apples-to-apples performance comparison.

He found that the new site _loads just 1.3 seconds faster_ on _a connection that's 30 times faster_ than the 1996 site. I read elsewhere that the archived 1996 site now includes Google Analytics (the original didn't), and I wonder if the 1996 would actually win without it.

[Go read Max's article to get the full results and see all the data.](https://mxb.dev/blog/space-jam/)

To me, the conclusion is obvious: the modern web sucks.