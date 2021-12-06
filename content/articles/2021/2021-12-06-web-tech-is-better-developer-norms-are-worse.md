---
title: Web tech is better. Developer norms are worse.
date: 2021-12-06T10:30:00-05:00
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

Last week, [Devon Govett, the creator of Parcel.js, tweeted...](https://twitter.com/devongovett/status/1467320352745398279)

> I don’t understand the “things were better in the late 2000s” school of web development thinking going around lately. Maybe it’s nostalgia for when people first started? Or not wanting to learn new things?
>
> Either way, no! I assure you, things are SOOO much better now. 😄

I wanted to unpack this tweet a bit, because I have _strong feelings_ about it.

## The modern web is amazing

From a purely technological standpoint, Devon's right.

I started my career as a front end developer about a decade ago. Aligning and positioning shit used to be _HARD_. Like, really, comically hard. It involved an absurd amount of hacks.

Rounded borders? You needed PNGs for that. Animations? Mountains of JavaScript.

What the modern web can actually do, easily and out-of-the-box, is amazing. My friend Sarah Dayan started her career at around the same time as me, and has [a wonderful thread on how things have changed since then](https://twitter.com/frontstuff_io/status/1467551852447379462).

In particular, Sarah talks about the dramatically improved capabilities of the web _and_ expectations from customers and the people who use it.

**Modern web technology is lightyears ahead of the late 2000s.**

## Modern developer practices are awful

There's another side to the increased capabilities and expectations of the modern web: developer "best practices."

There's an _expectation_ that every project "needs" a 30kb library (minified and gzipped, in reality, they're usually bigger). It doesn't matter how simple what you're building is. "Just use a library."

The need to `npm install` as step one of any new project sucks. But not as much as constantly fixing and managing deep dependency trees you don't understand. Building on the shoulders of giants is awesome, but the way we do it is fragile and risky AF.

Our obsession with build tools and "developer ergonomics" creates a web development process that's both _aggressively worse_ for many developers and almost always worse for the people who use what we build.

Yes, the increased complexity of the things we build sometimes requires more complex tooling. But not in the all-encompassing don't-leave-home-without-it way its become.

The very existence of Devon's tool, [Parcel.js](https://parceljs.org/), seems to confirm the point he's arguing against:

> **A build tool for the rest of us.** Parcel starts with a great development experience, from starting a new project, to iterating and debugging, and shipping to production. No more fiddling with configuration, or spending hours to keep up with best practices – it just works!

It specifically exists because Devon recognized that the modern developer process is confusing and difficult.

## The waves of the web

The web historically moves in waves.

Libraries are created to push complex features in an easier way. Then the libraries themselves get complicated, often more so than the benefits they provide.

Eventually, (some of) the core features of those libraries make their way into the browser itself, but the libraries linger like water on the shore, slowly receding. 

And before the sand has a chance to fully dry, a new set of libraries washes in to push the web even further.

It's one of the most exciting things about working on the web. But with every wave, with every expanding set of things the web can do, it also gets a bit more exhausting.

And if you've been through a few of these waves, you'll see people reinvent the wheel and declare it some shiny new thing every few years (cough "HTML over the wire" cough). And you'll watch the masses celebrate the genius of these new tools doing the same stuff we've done before.

And that's the moment that you realize you're really, really fucking old.