---
title: "HTML is a living language"
date: 2019-12-18T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

This week, [Alex Russell tweeted](https://twitter.com/slightlylate/status/1206765639777443840)...

> HTML may be a dead language because those who claim to love it can't imagine it being better.

Today, I'm going to talk about how utterly, completely wrong this is.

## Unpackaging the baggage

There are two points in Alex's tweet, and I think we need to explore each of them separately.

1. HTML is dead.
2. People who claim to love HTML don't want it to change.

Neither of these statements are true. Let's dig in.

## HTML is *not* dead

Over the last few years, HTML has added tons of awesome new features.

First, HTML5 brought us awesome semantic elements like `nav` and `article` and `header`. We have [browser-native date pickers](/how-to-check-if-a-browser-supports-native-input-date-pickers/), and special input types that handle form validation and pull up custom keyboards for email addresses and URLs.

We also picked up browser-native ways to play `video` and `audio` files. The website for the [Vanilla JS Podcast](https://vanillajspodcast.com) uses the `audio` element to stream episodes, and it's *so damn easy* to use! Several years ago, doing stuff like that required complex JavaScript and flash plugins.

We got [native responsive images with the `picture` element and `srcset`](/better-responsive-images/) attributes. We can [asynchronously load JavaScript files with `async` or `defer`](/when-should-you-add-the-defer-attribute-to-the-script-element/), and [preload important content with the `rel="preload"` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content).

More recently, we picked up [the `loading="lazy"` attribute for images and iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) that let's you natively lazy-load stuff without a JavaScript plugin. And as Jen Simmons explains, [adding `height` and `width` attributes to your images will reserve space for that image while it loads](https://www.youtube.com/watch?v=4-d_SoCHeWE&t=513s) (maintaining aspect ratio) so that content doesn't jump after the image shows up.

There are plenty of new things I'd love to see added to HTML (and CSS, and JavaScript), but I don't see how you can look at all of these things and conclude that HTML is dead.

## You can love HTML and want it to get better

The idea that people who claim to love the web can't imagine it being better is just patently false.

In fact, just this week, [Dave Rupert documented how the `details` and `summary` elements are *not* actually an accordion](https://daverupert.com/2019/12/why-details-is-not-an-accordion/), even though they behave they way, and that this subverts expectations and makes his job harder.

Scott O'Hara has written about how [the `dialog` element, which functions kind of like a modal, misses the mark](https://www.scottohara.me/blog/2019/03/05/open-dialog.html) in many ways and is inaccessible.

In Dave's article, he even suggested new elements that he'd love to see exist: `accordion`, `tabs`, `dropdown`, and `tooltip`. In chatting about this with [Mandy Michael](https://twitter.com/Mandy_Kerr), she suggested `carousel` would be another awesome addition.

These are all things that are hard to do well and would benefit from built-in elements.

### Web standards are important

There's a political backdrop to Alex's tweet. It included a link to an article from Adrian Roselli that criticizes how [Google Chrome hastily rolled out the `toast` element without going through the proper standards process](https://adrianroselli.com/2019/06/scraping-burned-toast.html).

Web standards are a set of processes browser vendors are supposed to go through before implementing a feature to get other browser makers onboard, document specs, and iron out details.

They exist to make sure that whatever you ultimately ship will be as useful as possible to as many people as possible, and will be implemented consistently by all browsers.

### The browser wars

If you're newer to web development, you may not know what the web was like before web standards. In short, it was fucking awful.

Browser makers would just go off and do whatever the hell they wanted, creating new elements, new JavaScript methods, and so on to accomplish things their users were asking for. Sounds good, but because each browser did things a little differently, writing code that worked everywhere was a *fucking nightmare*.

Some people would use User Agent sniffing to serve up different pages to different browsers. JavaScript files were littered with conditional `if...else` statements, using different methods for different browsers. It sucked.

A web standards process ensures this doesn't happen again and makes your life as a developer easier.

### The gorilla in the room

Google Chrome is the dominant browser of the web. They have more developer advocates than some browser vendors have employees.

Chrome's approach to web standards is often, "We have an idea, let's just throw it in the browser behind a flag and see what developers do with it."

While it sounds reasonable on the surface&mdash;it's behind a flag after all!&mdash;it means that Google never gets feedback from other browser vendors on what it is, how it should work, or... in the case of the ill-named `toast` element, what it should be called.

And when Google does things like this, they put Firefox, Safari, and other browser vendors in an awkward spot.

Do they ignore the element and then get accused of not innovating? Do they push things through even when they have issues and reinforce to Google that it's ok to ignore web standards processes?

## The unspoken subtext

On mobile devices, a majority of web usage happens in apps.

To some people, that means that the web as a platform is dying ([it's not](/the-web-is-not-dying/)) because it can't compete with native app features. They believe that in order to keep up, browser features need to grow rapidly to match the feature sets that are available in native apps.

I think that's a false dichotomy.

This isn't a zero sum game. The choice isn't web or apps, and one doing well doesn't mean the other is losing. On desktop, we use browsers and native apps alongside comfortably all day. No one thinks this is weird. But on mobile, it's this big "battle for the platform." Why?

On my phone, there are some things I'd rather use an app for: email, and streaming music. For others, I'd rather use a browser. I don't do they frequently enough, and the overhead of *another app* isn't worth the benefits. Why is this a bad thing?

So no, HTML is not dead. The web isn't dead. They're changing and growing. Slowly, deliberately slowly, towards a wonderful future.