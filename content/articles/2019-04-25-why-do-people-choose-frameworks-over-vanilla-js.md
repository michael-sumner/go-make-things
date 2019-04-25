---
title: "Why do people choose frameworks over vanilla JS?"
date: 2019-04-25T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Careers
- Code
- JavaScript
- Web Performance
---

This week on Twitter, [Maxime Euzière asked](https://twitter.com/MaximeEuziere/status/1120690924651274240) why people choose large frameworks over vanilla JS.

There are quite a few reasons. Some of them are really valid. Many of them aren't.

Here are the ones I see most often (with commentary).

## Vanilla JS is harder.

No, it's often not.

Modern vanilla JS has taken many of its conventions from libraries and frameworks, and is often just as easy to use. Things like getting elements in the DOM, manipulating classes and styles and attributes, and manipulating data sets have gotten incredibly simple over the last few years.

And frameworks come with their own headaches.

They need to be setup (often no simple task) and patched. Build systems magically break and stop working.

There are some things for which frameworks genuinely are better. State-based UI rendering, in particular "live" data that results in small changes rather than an entirely new UI.

Vanilla JS doesn't have an out-of-the-box way to do that yet.

But that doesn't mean you need a large framework. Tools like [Reef](https://github.com/cferdinandi/reef), [Svelte](http://sveltejs.com/), and [hyperHTML](https://viperhtml.js.org/hyperhtml/documentation/) all do the same thing at a fraction of the size or complexity of a typical framework.

## Frameworks have better docs.

Yes, they do.

My biggest gripe with vanilla JS is how badly documented it is. The [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/javascript) is the closest thing we have, and the content quality varies wildly from method to method and API to API.

That's largely why I started publishing my resources. I'm trying to bridge that gap.

That said, using a framework doesn't ensure that just anyone can come in and start working on what you've built. Many teams struggle with internal documentation.

Their code lacks inline documentation. Their project lacks high-level documentation. If it has any, it's often poorly written.

This is a people problem, not a technology one.

## Frameworks enforce code conventions.

Eh. Kind of?

Yes, Vue and React and Angular have some common conventions, but you can (and people sometimes do) deviate from them.

With vanilla JS, you *can* structure your project any way you want, but there are some common conventions that have emerged that people often follow.

Ultimately, this is about having a technical lead who makes and enforces architecture and design decisions. That's important whether you use a framework or not.

Again, a people problem.

## Performance!

So, the thing people *really* love to tout about frameworks is their performance at scale. \

The virtual DOM&mdash;an abstracted JS map of the real DOM&mdash;is faster and more performant at scale.

I've [written before about JavaScript performance](/javascript-selector-performance/). Just because a method or approach is faster than another doesn't mean the relatively slower method is objective slow.

The `querySelector()` method is slower than `getElementById()`. But it can still run 7,000 operations a millisecond. That's not slow. That's REALLY fast!

Is your app operating at Facebook and Twitter scale? No? When will it be? Your performance needs and implications are not the same as the companies that built these tools (nor are they likely to ever be).

And for all of this performance talk, we always seem to ignore that larger and more abstracted JS files take longer for browsers to both download and parse. You've gained performance in one place (debatable), while sacrificing it in another.

## Vanilla JS means reinventing the wheel.

There's this belief that "vanilla JS" means "hand code every single thing you build."

I don't agree.

I use [helper functions](https://vanillajstoolkit.com/helpers) and [plugins and micro-libraries](https://vanillajstoolkit.com/plugins) all the time. And I think you should, too.

Vanilla JS means leaning on native, out-of-the-box methods and APIs as much as possible, and supplementing with small, purpose-built tools when needed.

A contractor wouldn't use a wrecking ball to hammer in a nail. If she were hanging a painting, she would use a hammer, but if she were installing a new roof, she'd probably use a nail gun.

Pick the tool that's "just enough" for the job you're trying to do.

## So... never frameworks?

I wouldn't say never.

If you're building a large scale application (literally Facebook, Twitter, QuickBooks scale), the performance wins of a framework make the overhead worth it.

If you're using dynamic, state-based UIs, *some* tool to help you do that is a good thing, but that doesn't inherently mean a framework.

Start with the native stuff, then add in helpers and small plugins. And if that doesn't meet your needs, *then* consider a framework.

Oh, and document your stuff. Effective team coding is about communication more than tools.