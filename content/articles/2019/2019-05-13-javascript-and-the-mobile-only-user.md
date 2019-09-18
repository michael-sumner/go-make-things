---
title: "JavaScript and the mobile-only user"
date: 2019-05-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
- Web Performance
---

> It's 2019. No one disables JavaScript.

Actually (cue Adam Conover!)... some people do. They represent about a tenth of a percent (0.1%) of the people who don't get your JavaScript file, though, and they've chosen to browse the web that way, so let's ignore them for a second.

I see this argument&mdash;that one one disables JS in 2019&mdash;as an argument for not bothering to care or worry about progressive enhancement. But it's wrong!

There are plenty of other reasons why people don't get your JavaScript.

- Your CDN fails
- An ad blocker or filewall got a little overly aggressive
- A JS error (either in your code or something third-party) stops all of the JS from rendering
- The file times out because it's too big or too slow to parse

Today, I want to focus on that last one.

We tend to think of the web, and the devices people use to access it, as getting faster. And generally, it is.

But there's a large and growing segment of the market that are "mobile-only users." They have no broadband and no high-powered desktop computers.

They access the web exclusively or primarily from a mobile device. And they've doubled in number among low income web users since 2013.

[From a recent Pew Study:](https://www.pewresearch.org/fact-tank/2019/05/07/digital-divide-persists-even-as-lower-income-americans-make-gains-in-tech-adoption/)

> With fewer options for online access at their disposal, many lower-income Americans are relying more on smartphones. As of early 2019, 26% of adults living in households earning less than $30,000 a year are “smartphone-dependent” internet users – meaning they own a smartphone but do not have broadband internet at home. This represents a substantial increase from 12% in 2013. In contrast, only 5% of those living in households earning $100,000 or more fall into this category in 2019.
>
> This reliance on smartphones also means that the less affluent are more likely to use them for tasks traditionally reserved for larger screens. For example, lower-income smartphone owners were especially likely to use their mobile device when seeking out and applying for jobs, according to a 2015 Pew Research Center report.

The assumption that mobile devices keep getting better so performance and JavaScript size don't really matter any more is wrong. No everyone can drop $1,000 on a fancy new iPhone.

And that's just in the US. In developing nations, web use is often on older, lower powered feature phones shared among multiple users.

A lot of people get upset when I say that our overuse of JavaScript is breaking the web. I've even had some prominent names in the space call that "divisive."

You know what's *actually* divisive? Saying you don't care about the 26% of low-income users in the US who access your stuff on underpowered mobile devices.

JavaScript is breaking the web. Let's use it more responsibility.