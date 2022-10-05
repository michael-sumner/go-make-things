---
title: Myths about vanilla JavaScript
date: 2022-10-05T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- Design and UX
- JavaScript
- Web Performance
---

Over the years, I've seen a lot of the same myths about vanilla JS pop up over-and-over again. Today, I wanted to debunk a few them.

Let's dig in!

## Myth 1: Vanilla JS doesn't scale

Oh no? It powers every single library and framework you use that allegedly _does_ scale.

Often, people who say this don't mean, "can't handle lots of requests/operations," but actually mean, "it's harder to use on teams because it's so open-ended." And that's fair!

But that doesn't mean it _doesn't_ scale. That means you need to establish some conventions.

Which brings us to our next one...

## Myth 2: Libraries provide structure that vanilla JS lacks

JavaScript is a _very_ flexible language. 

You can run it in the browser and on the server. For any task you want to accomplish, there are usually _at least_ two or three approaches you can use, often more, with no one obvious choice.

But that's also why coding conventions and style guides exist.

Those are important even if you use a library, because libraries also have multiple ways to do things. With Vue, you can use the Options or Composition API. With React, you have to decide between hooks and classes. There are big decisions with either about where state should live.

Libraries absolutely add some structure. They also introduce numerous other decisions you need to make.

## Myth 3: Vanilla JS is slow

This one is, frankly, befuddling.

Vanilla JS isn't just _not slow_. [It's orders of magnitude faster than using a library.](https://css-tricks.com/radeventlistener-a-tale-of-client-side-framework-performance/)

I've seen this myth appear in a few different ways. I once had someone argue passionately that React is faster than vanilla JS because it uses a virtual DOM and "the real DOM is slow." Thing is, after figuring out what needs to change via the virtual DOM, React still needs to modify the actual DOM.

The other day, I saw someone arguing that vanilla JS is slow because "loading lots of UMDs is slow."

[A UMD is a wrapper](https://vanillajstoolkit.com/boilerplates/umd/) you can put around your JavaScript to make it compatible with module loaders like Common JS while still letting it run directly in the browser.

But nothing about UMDs are inherently slow. Loading lots of scripts with a module loader can be slow, but that's a library problem, not a vanilla JS problem.

## Myth 4: Vanilla JS means writing everything from scratch

Nope!

I use helper functions and small libraries all the time. A lot of very talented people have done a lot of great work to make the web faster, safer, and easier to build. Stand on their shoulders!

Vanilla JS as an ethos is more about avoiding big lock-in ecosystems that become a core dependency for everything else you do. 

A lot of the more popular tools on the web do a few really great things you need... and a bunch of stuff you don't. We make users pay a tax for our ease-of-development in the form of more data usage and slower sites.

Vanilla JS means using _just enough_ code. Nothing more. Nothing less.

## Why do these myths persist

I honestly think a lot of it has to do with marketing nonsense from big libraries.

It may start off as a conference talk about some specific situations where using a library for a task is faster, better, or easier than using vanilla JS. Then that gets distilled into more general marketing copy. 

Then that marketing copy gets repeated as a simple truism enough times that people start parroting it without context.