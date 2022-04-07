---
title: Your website is a pollution machine
date: 2022-04-07T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Your website is a small (or, depending on where you work, not-so-small) pollution machine. Today, I wanted to share some things you can do to make the web a bit more green.

Let's dig in!

## How much pollution are we talking about?

[The internet is responsible for about as much pollution as the airline industry.](https://www.bbc.com/future/article/20200305-why-your-internet-habits-are-not-as-clean-as-you-think)

One of the biggest contributors is data centers. Running the servers themselves isn't that bad, but servers generate a tremendous amount of heat, and data centers consume massive amounts of energy keeping them cool.

[Another big contributor is streaming data.](https://www.webfx.com/blog/marketing/carbon-footprint-internet/) Any time you have to send data "down the wire," that consumes more energy than if you accessed it locally.

[You can measure the impact of your own website here.](https://www.websitecarbon.com/)

## Things you can do

There are a few simplish things you can do to reduce the amount of pollution your website creates.

- **Reduce the size of your pages.** Smaller sites means less data sent down-the-wire, which means less pollution. One easy way to get there is to lean more heavily on browser-native features and stop using so many damn libraries.
- **Serve statically-rendered HTML.** Dynamically generated sites (like WordPress) use a lot more energy for every visit. Pre-rendered HTML files use almost none. You can also run many more sites on a much smaller server this way. (_I'll be digging into static-site generators more in a future article._)
- **[Use service workers](https://vanillajsguides.com/service-workers/).** Service workers let you cache assets locally, and serve them already-downloaded versions of files instead of having to re-fetch them from the network every time. This can dramatically reduce your carbon impact, _and_ results in a more resilient, fault-tolerant site.
- **Use a green web host.** Unfortunately, DigitalOcean, who I use and love, use traditional energy sources for most of its hosting. There are many hosting providers who rely more heavily on renewable energy.

Not every approach works for every site. Some sites need to be dynamically rendered. Some things can't be cached with a service worker.

But our industry tends to love "the one true tool" type web development, which is why you see people using React for all sorts of things where it's not at all the right choice.

Being more thoughtful about what you build, and how you build it, goes a long way.