---
title: CDN caching isn't the performance boost it used to be
date: 2022-02-14T10:30:00-05:00
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

Today, we're going to talk about a tried-and-true performance recommendation that's not so tried or true anymore: CDN caching. 

Let's dig in!

## The old best-practice around CDNs

For years, one of the big performance recommendations with large JavaScript and CSS libraries was to host it from a shared CDN.

Take jQuery, for example. The idea was simple: someone visits `catsarethebest.com`, where they're loading `jquery.1.1.8.js` from the jQuery CDN. Then, that same person visits `dogsarebetter.com`, where that same file is hosted from that same CDN.

Since the browser already loaded that file from that exact URL on another site, it's already cached and doesn't need to be downloaded again.

**Make a lot of sense, right? Problem is... browsers don't actually do that anymore.**

## Cross-domain caching doesn't work anymore

[In an article from 2020, Stefan Judis explains...](https://www.stefanjudis.com/notes/say-goodbye-to-resource-caching-across-sites-and-domains/)

> All this worked great, but as it is with many great inventions in web technology, cross-site resource caching enabled new ways to track users across different sites.
>
> As an example, let's assume Facebook loads a unique file in their logged-in area (`fb-logo-ajgdmaks839–as.svg` – I made that file path up); if I would know the file path to such a file, request it on `stefanjudis.com` and see a rapid response coming from the browser cache, I can almost be sure that the user has logged into Facebook lately.

Historically, browsers used just the asset URL as the cache key. Modern implementations now use a combination of the URL, the requesting domain, and the current frame instead.

[Safari implemented an approach like this](https://bugs.webkit.org/show_bug.cgi?id=110269) as far back as 2013! Chrome started doing it in 2020. [Firefox added this feature](https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning#network_partitioning) at the start of 2021.

As Stefan explains...

> If your sites request the global jQuery, modules from unpkg.com, font files from Google fonts or GA's (Google Analytics) analytics.js, users will redownload the resources no matter if they downloaded and cached them for other sites already.
>
> What does this change mean for you? If your sites live on modern hosting that provides a CDN and supports HTTP/2, you should drop the third-parties and ship all resources yourself. Relying on a third party resources offers little value in 2020.

## What does this mean in practical terms?

A few things...

1. The idea that it's ok to ship 30kb of minzipped React because "everyone uses it now so users probably already have it cached" is complete and utter bullshit. 
2. CDNs are still incredibly valuable at pushing assets closer to the person who's accessing them. Not having to send files from a server in New York to someone in Sydney can dramatically reduce load times!
3. Third-party CDNs provide no performance benefit over a CDN you control, and potentially introduce a security vulnerability. Better to self-host if you can.