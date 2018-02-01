---
categories:
- Design and UX
date: '2016-11-03'
url: /progressive-enhancement-and-the-next-billion-web-users/
title: Progressive enhancement, and the next billion web users
---

Nolan Lawson wrote [an interesting perspective on progressive enhancement](https://nolanlawson.com/2016/10/13/progressive-enhancement-isnt-dead-but-it-smells-funny/) the other week:

> As Benedict Evans has noted, the next billion people who are poised to come online will be using the internet almost exclusively through smartphones. And if Google’s plans with Android One are any indication, then we have a fairly good idea of what kind of devices the “next billion” will be using:
>
> - They’ll mostly be running Android.
> - They’ll have decent specs (1GB RAM, quad-core processors).
> - They’ll have an evergreen browser and WebView (Android 5+).
> - What they won’t have, however, is a reliable internet connection.
>
> In a world where your lowest common denominator is a very capable browser with a modern JavaScript engine, running on a smartphone that would have been classified as desktop-class ten years ago, but the network is now the bottleneck, what does that mean for progressive enhancement?
>
> Simple: it means that, if you care about those users, you should be focusing on offline-first, i.e. treating the network as an enhancement. After the first load (which yes, should be server-rendered via isomorphic JavaScript), you’ll want to run as much logic as possible on the user’s device so that it can operate autonomously – regardless of whether the network conditions are good, bad, or nonexistent. And today, the way we accomplish this on the web is by using IndexedDB and Service Workers, i.e. with JavaScript.

Nolan quite effectively argues that, today, progressive enhancement does not mean the core functionality of a site works without JavaScript, but rather works without an internet connection.

His take on this issue really got me thinking about whether or not I'm clinging to now outdated notions of what it means to build a web that works for everyone. A few thoughts, most of them mentioned by others far more articulately than I'm about to in the comments of Nolan's post or in rebuttal articles...

- I don't see this as an either/or proposition. I think you can build sites and apps that fulfill the core mission without JavaScript, or with server-side JavaScript, and ALSO provide an enhanced experience that's JavaScript dependent and works offline.
- I don't think it's fair to assume the next billion users will all be using state-of-the-art Android devices. Many current mobile-only users aren't using such devices, and many Android users are left in the dark with outdated software on relatively new phones.
- Offline or spotty connection access *is* really important, which is why I think a JavaScript-dependent experience is dangerous. It's the most fragile layer of the stack. When CSS fails because of a bad connection, the content still renders. With that content requires JavaScript? Not so much.

So ultimately, Nolan raises some really good points about what PE looks like going forward, but I don't see it as mutually exclusive with how we've thought about progressive enhancement up to this point.

Go read the whole thing, and check out some of the rebuttals he links to as well as the comments.