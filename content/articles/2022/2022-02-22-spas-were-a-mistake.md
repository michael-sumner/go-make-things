---
title: SPAs were a mistake
date: 2022-02-22T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

For years, a trend in our industry has been to build single-page apps, or SPAs.

With an SPA, the entire site or app lives in a single HTML file. After the initial load, everything about the app is handled with JavaScript. This is, in theory, supposed to result in web apps that feel as fast and snappy as native apps.

Today, I want to explore why that's nonsense. Let's dig in!

## When SPAs make sense

First, let me get this out of the way: there are a few narrow examples of where SPAs make sense and are the right choice.

YouTube is a great example. Being able to keep a video playing while you explore other videos is fantastic. Same goes for audio websites like SoundCloud, where you can keep a song playing as you navigate around and explore other artists. So... media sites, really.

Generally speaking, though, SPAs as an industry trend or "best practice" were mistake.

## We keep reinventing the wheel

Browsers give you a ton of stuff for free, built right in, out-of-the-box. SPAs break all that, and force you to recreate it yourself with JavaScript. Most developers do it wrong, and for the ones who do it right, it results in a ton of extra code to recreate features the browser already gave you for free.

With an SPA, when someone clicks a link you need to...

1. Determine if the link points to the current site or an external location.
2. If it's the current site, match the URL path to content.
3. If the content is API-driven, get it via a `fetch()` request.
4. [Update the URL path and browser history](/how-to-replace-the-current-url-in-the-browsers-history-with-the-vanilla-js-replacestate-method/), without triggering a page reload.
5. Render the content onto the page.
6. If there's an anchor link in the URL, scroll to the anchored element.
7. Shift focus to either the top of the document, or the anchored element (most SPAs get this wrong).
8. Announce the page load/content change to screen reader users (many SPAs also get this wrong).
9. If any scripts you're running rely on a specific DOM structure, or are attached to specific elements, reinitialize them.

You also need to detect when the users clicks the browser's forward/backward buttons, and repeat most of the steps above in response.

Pretty much all of this stuff is just done for you by the browser with a traditional MPA/website. Some of it is easy. Some of it is complicated and nuanced, or easy to get wrong, or easy to forget. All of it adds a lot of code to your site.

And as a result, we build things that are fragile and easily broken. We get the "improved user experience" that led us down this path when all of the stars line up perfectly, and a bunch of edge case situations where the UX is much, much worse.

SPAs were a mistake. Tomorrow, I'll show you how we can build SPAs that are just as performance as MPAs, with less complexity and fragility.