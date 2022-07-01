---
title: Away from the SPA
date: 2022-07-01T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

I have a long history of [writing about my disdain for SPAs](/spas-were-a-mistake/).

> Browsers give you a ton of stuff for free, built right in, out-of-the-box. SPAs break all that, and force you to recreate it yourself with JavaScript.

Last month, Nolan Lawson wrote an article about [how the balance has shifted away from SPAs](https://nolanlawson.com/2022/05/21/the-balance-has-shifted-away-from-spas/) that I thoroughly enjoyed.

In it, Nolan looks at some of the technology shifts that helped make MPAs (multi-page apps, or, you know, websites) cool again. There were a few things in there I didn't know about!

> 1. Chrome implemented [paint holding](https://developer.chrome.com/blog/paint-holding/) – no more “flash of white” when navigating between MPA pages. ([Safari already did this.](https://twitter.com/xeenon/status/1125981836591620097))
> 2. Chrome implemented [back-forward caching](https://web.dev/bfcache/) – now all major browsers have this optimization, which makes navigating back and forth in an MPA almost instant.
> 3. Service Workers – once experimental, now effectively [100% available](https://caniuse.com/serviceworkers) for those of us targeting modern browsers – allow for offline navigation without needing to implement a client-side router (and all the complexity therein).
> 4. [Shared Element Transitions](https://github.com/WICG/shared-element-transitions/), if accepted and implemented across browsers, would also give us a way to animate between MPA navigations – something previously only possible (although difficult) with SPAs.

[Go read Nolan's full article](https://nolanlawson.com/2022/05/21/the-balance-has-shifted-away-from-spas/) to get his perspective on how the web development landscape will over the coming years.