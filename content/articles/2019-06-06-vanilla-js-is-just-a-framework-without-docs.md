---
title: "Vanilla JS is just a framework without docs"
date: 2019-06-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

There's a popular saying among framework fanatics that goes somethings like this:

> Vanilla JS just means "a homegrown framework without docs."

It makes for a great quip. It's also wrong in three very clear ways.

## 1. Vanilla JS, even a fair amount of it, is not the same as a framework.

Depending on what you're building, you *could* end up writing a framework's worth of JavaScript.

But there's a good chance you won't.

People who build things with vanilla JS tend to focus on reducing their dependency on JavaScript in the first place. They lean more heavily on other parts of the stack, use some lightweight helpers when necessary, and get on with it.

And remember, a framework is the literal *starting point* on a React or Vue project. All of the app code you write is *in addition* to that baseline.

You'd have to write a lot of vanilla JS for it to be the same as writing a framework.

## 2. Vanilla JS has documentation.

Admittedly, there's no "one true source" like there is for Angular, React, or Vue. And some of it is of varying quality.

But there *is* documentation.

The [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/javascript) is literally documentation for the entire web platform. It's community-driven, so some of it is better than others. But it's the most obvious form of documentation for vanilla JS.

My [Vanilla JS Toolkit](https://vanillajstoolkit.com/) might also be considered documentation for vanilla JS. [You Might Not Need jQuery](http://youmightnotneedjquery.com/) and [Plain JS](https://plainjs.com) also fit the bill, to me.

## 3. The apps people build with frameworks are no more or less documented than those built with vanilla JS.

When you build a JavaScript app, documentation for the underlying technology becomes less important than documentation for the thing you actually built with it.

What are the conventions, how is it structured, and so on?

React, Vue, and the like don't force a single way of building apps on you. There are countless different ways people build things with those tools, and each one is unique.

If you team doesn't bother writing good documentation, then it doesn't matter if you used React, Vue, or vanilla JS. The app isn't documented.