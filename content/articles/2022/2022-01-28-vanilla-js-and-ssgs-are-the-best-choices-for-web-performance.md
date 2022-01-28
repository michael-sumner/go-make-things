---
title: Vanilla JavaScript and old-school SSGs are the best choices for web performance
date: 2022-01-28T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Yesterday, we looked at [a report by Alan Dávalos on the current browser usage landscape](/what-should-your-browser-support-strategy-be-in-2022/). One thing I didn't dig into that much was the section on web performance.

Today, let's talk about it!

## First, a quick aside on 4g versus 3g

Alan's article notes:

> When using lab tools such as Lighthouse, the network is tethered to simulate 3G, but mobile networks worldwide have changed recently. According to [a May 2020 report by Opensignal](https://www.opensignal.com/sites/opensignal-com/files/data/reports/pdf-only/data-2020-05/state_of_mobile_experience_may_2020_opensignal_3_0.pdf), the worldwide average availability for 4G is 86.8%.

I had a handful of readers push back on the idea that 4g is the standard.

I have students who live in places like Colombia and Kenya where 3g is _very much_ the standard internet speed. Doing some quick math on the numbers Alan shared, more than 13% of the world _doesn't_ have access to 4g.

In other words, I think 3g should still be the web performance baseline we test against.

## JavaScript libraries and performance

Alan also did some analysis of JavaScript libraries and frontend performance.

In particular, while overall library size is one aspect of JavaScript performance, how they're written under-the-hood matters quite a bit more.

> The table above compares frameworks to a hand-optimized vanilla JS implementation in three main categories: DOM Manipulation, Startup, and Memory Allocation. In it we can observe the following:
> 
> - React and Angular perform twice as bad as Vanilla JS on average.
> - In contrast, Vue actually stands closer to Preact and Stencil at an average of 1.5 times. The main reason for the difference between this result and what we saw reported in the Web Almanac might be due to the performance improvements Vue had when version 3.0 released.
> - And finally, Solid, Lit, and Svelte are all at around 1.2 times. They all perform very close to the Vanilla JS version.

As you might imagine, vanilla JS is hands-down the fastest choice. If you care about performance (and you should), using only browser-native JavaScript is the absolute fastest you can get.

But, newer tools like Solid and Preact performed _really close_ to vanilla JS. Shockingly, so did Vue v3.

Why? They were all written fairly recently, and feature far fewer abstractions under-the-hood than older libraries like React and Angular do. In otherwords, they're a lot closer to vanilla JS than their peers.

Similarly, while Svelte has a library-like authoring experience, the exported code is mostly HTML with a sprinkling of vanilla JS. New kid on the block Astro wasn't tested, but I'd expect similar results as Svelte.

## Static Site Generators

Static Site Generators (SSGs) take markdown files with content and template files with HTML, and mash them together to create a bunch of prerendered HTML files.

They give you the authoring benefits of a tool like WordPress, with the performance benefits of hand-written HTML.

A lot of JavaScript library proponents are quick to point out that you can now use React and Vue as SSGs, thanks to frameworks like Next.js (React), Nuxt.js (Vue), and Gatsby (also React). 

But, these tools still output client-side JS. A lot of it, in fact!

> - The median JS size for React-based Gatsby and Next.js and Vue-based Nuxt.js all stand at around 700 KB. This number is similar to the median for React and Vue in general.
> - Compared to that, Go-based Hugo and Ruby-based Jekyll stand at 177 KB and 129 KB respectively.
> - JS framework-based SSGs serve a median of over 500 KB of JS more than those not based in JS.

Old-school SSGs like [Hugo](https://gohugo.io/) (what my site is powered by) and [Jekyll](https://jekyllrb.com/) where orders of magnitude smaller, and also 3x as likely to have good mobile performance scores.

The data didn't look at [11ty](https://www.11ty.dev/), which is built on Node. But I would expect it have similar results as Hugo and Jekyll, as it's built more like the old-school SSGs and not like a JS library-turned-SSG.

## More key takeaways

So, what should you take away from this?

- Test your site and app performance on 3g.
- Using vanilla JS whenever you can.
- If you _need_ a JS library, Preact is a no-brainer choice over React.
- Multi-page apps with SSGs are a better choice than SPAs with JS libraries.