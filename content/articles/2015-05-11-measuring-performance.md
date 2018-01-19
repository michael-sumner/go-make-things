---
categories:
- Design &amp; UX
date: '2015-05-11'
title: Measuring Performance
---

*The following post was adapted from [Wicked Fast Websites](/wicked-fast-websites/), my free beginner's guide to building fast websites and web apps that work on any device. [Download it here.](/wicked-fast-websites/)*

How fast is fast enough? One second.

One second is roughly the limit to [keep a visitor's flow of thought on the task at hand uninterrupted](http://www.nngroup.com/articles/response-times-3-important-limits/).

Sound impossible? It's not, but that's because there's a catch.

<!--more-->

## Measuring the right things

Historically, developers have looked at things like total load time and page weight as the key metrics for performance. While those are important, there are two that matter a lot more:

* **Time to First Byte,** which tells you how quickly your server is sending data back to the browser after a user types in your URL.
* **Time to Start Render,** which is how quickly the browser begins displaying content to your visitor after they type in your URL.

Your whole site doesn't need to load in 1 second for it to feel fast. It just needs to start displaying content in that amount of time.

*Perceived* performance is more important than *actual* performance. The rest of this guide will be focused on how to improve start render time on your responsive websites.

## The right tool for the job

If you're serious about web performance, you should become familiar with [WebPagetest](http://www.webpagetest.org/). Originally built by AOL, it was opened source in 2008 and is now maintained by Google.

WebPagetest provides a simple, web-based GUI that measures a ton of performance metrics about your site:

* Total Load Time
* Time to First Byte
* Start Render Time
* Speed Index
* And more!

It provides this data for both initial load and subsequent visits, and allows you to test your site on a variety of devices, from different locations, using different bandwidths. Best of all, WebPagetest provides a "filmstrip" view that shows you the site's render progress in 100ms intervals, which is insanely useful.

## Other Important Measurements

While start render time is critically important (and influenced by time to first byte), other metrics are still worth considering.

Lengthy **total load time** can have a negative impact on a visitor's experience. Ever been on a site where content is still showing up (and shifting elements around) after 20 or 30 seconds? It's annoying.

Total page weight *can* impact overall site speeds, but it also can have a big impact on visitors using mobile devices with restricted data plans. [Tim Kadlec](http://timkadlec.com/) has put together an awesome tool called [What does my site cost?](http://whatdoesmysitecost.com/) that illustrates page weight in more meaningful terms.

It mashes up data about your site from WebPagetest with [average data costs](http://www.itu.int/en/Pages/default.aspx) around the globe and financial metrics from the [World Bank](http://data.worldbank.org/) to provide you with a few different views of what your site costs to visitors around the world. When lobbying for performance, this is nice, tangible metric to share with stakeholders.