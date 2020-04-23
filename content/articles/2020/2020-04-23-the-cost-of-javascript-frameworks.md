---
title: "The cost of JavaScript frameworks"
date: 2020-04-23T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
- Web Performance
---

My buddy Tim Kadlec published an amazing article this week looking at [the cost of JavaScript frameworks](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/).

In it, Tim analyzes the performance impact of JavaScript frameworks on page load times by sorting through troves of data from [the HTTP Archive](https://httparchive.org/).

> The thing about JavaScript is you end up paying a performance tax no less than four times:
>
> 1. The cost of downloading the file on the network
> 2. The cost of parsing and compiling the uncompressed file once downloaded
> 3. The cost of executing the JavaScript
> 4. The memory cost
>
> The [combination is very expensive](https://v8.dev/blog/cost-of-javascript-2019).

Go look through all the day yourself, but the key takeaway for me is this: JavaScript begets more JavaScript, and JavaScript is absolutely terrible for performance.

If you include a framework, like React or Vue, your baseline JS build is 30kb after minifying and gzipping. That's before writing a single line of actual code for your site. That's just the cost of the framework.

Once you go down that path of using JS for rendering stuff, the natural progression is to use it for more and more stuff.

Eventually, you end up with a fragile site that's painfully slow or downright unusable on all but the most modern of devices and internet connections.

Tim has some great recommendations on a path forward, but the first three are my favorite:

> - Do a sanity check: do you really need to use it? Vanilla JavaScript can do a lot today.
> - Is there a lighter alternative (Preact, Svelte, etc.) that gets you 90% of the way there?
> - If you’re going with a framework, does anything exist that provides better, more opinionated defaults (ex: Nuxt.js instead of Vue.js, Next.js instead of React, etc.)?

[Do yourself a favor today and go read the whole thing.](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/) It's a masterpiece!