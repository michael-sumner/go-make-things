---
title: "Vanilla JS is a web performance decision"
date: 2021-09-09T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

One of the big reasons I started learning vanilla JS a decade ago, and then started evangelizing it to anyone who would listen, is because it's so much better for performance than using libraries and frameworks.

Libraries can be awesome, and definitely have their place. I use a few myself.

But [platform-native JavaScript will almost always be faster than a library](/you-dont-get-a-free-pass-on-web-performance-just-because-you-built-an-app/) that adds lots of weight and layers in abstractions. It's not _just_ the file size that's the issue. The further away you move from the native methods and APIs, the slower things get. [Abstractions add latency.](/no-a-framework-is-not-faster-than-vanilla-js-dom-manipulation-but-it-can-be/)

If you work on modern device with a fast internet connection, you might not notice. [But not everyone does.](/web-performance-during-a-pandemic/)

This morning, Katie Sylor-Miller, author of the amazing [Oh Shit, Git!?!](https://ohshitgit.com/), [tweeted](https://twitter.com/ksylor/status/1435951788990124035)...

> This past weekend, I had an experience that really reinforced why Web Performance is so vitally important. We were on vacation in a remote part of coastal Maine. There was limited 3G service, no TV (my kids hated that part), and very slow broadband with limited range wifi
> ...
> However, when the power briefly went out, the annoyance became a major problem! I couldn't look up the power company phone number, or go online to report the outage b/c sites loaded so slowly. Luckily the neighbor took care of it, but if they hadn't been there, we were stuck.

This is not the first story of its kind that I've read.

When a hurricane slammed into New Orleans in the US last week, I saw at least one tweet about how the electric company's website kept crashing that person's device because of how much JavaScript it was loading. Several years back, I read an article that said more or less the same thing (_for the life of me I can't find it even though I know I wrote about at the time._)

If you actually care about your users, use as little JavaScript as possible, and make sure the critical parts of your site work without if possible.