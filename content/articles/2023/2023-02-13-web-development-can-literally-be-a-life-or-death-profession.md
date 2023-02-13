---
title: Web development can literally kill people
date: 2023-02-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

One of the common tropes I sometimes hear web developers share when talking about our work is something to the effect of...

> I'm not a doctor. No one is going to die if I make a mistake.

But that's not always true. Sometimes our work literally is life or death.

A few weeks ago, my friend [Eric Bailey wrote about his experience with a mental health website](https://ericwbailey.website/published/modern-health-frameworks-performance-and-harm/). Eric was trying to access the site, but encountered a loading spinner that wouldn't go away...

> If you are familiar with how the web is built, what happened is pretty obvious: A website that over-relies on JavaScript to power its experience had its logic collide with one or more other errant pieces of logic that it summons. This created a deadlock.

This is a direct by-product of modern web development, and our over-reliance on JavaScript, large libraries, and mountains of third-party scripts.

And for a mental health website, a mistake made by a web developer _can literally be_ a matter of life or death.

> I also need to point out that people are visiting sites like this because they are not in a good place. Depression and stress lowers your executive function. Furthermore, people internalize technology’s failures as their own.
>
> What if I was suicidal? ...
> 
> A person seeking help in a time of crisis does not care about TypeScript, tree shaking, hot module replacement, A/B tests, burndown charts, NPS, OKRs, KPIs, or other startup jargon. [Developer experience does not count for shit](https://andy-bell.co.uk/speed-for-who/) if the person using the thing they built can’t actually get what they need.

[I highly recommend that you go read Eric's entire article.](https://ericwbailey.website/published/modern-health-frameworks-performance-and-harm/)

And your organization builds bloated, over-engineered software, share it with them, and encourage them to stop. Build with [HTML first](/html-first/). [Under-engineer.](/under-engineer/) Build things that work, even when parts of it break.