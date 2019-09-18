---
title: "Not all code is the same"
date: 2018-12-19T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Last week, Kent Dodds (who just released [a really impressive looking course on JavaScript testing](https://testingjavascript.com/), by the way), tweeted:

> OH: "JavaScript is the main cause for making websites slow."
>
> ummm....
>
> "Code is the main cause for making computers slow."
>
> Fixed it for you.

There's a problem with this, though: not all code is the same. JavaScript is literally the most expensive part of the front end stack.

A byte of CSS and a byte of JS may take the same amount of time to download.

Both are render blocking, but the JavaScript also blocks all other files from downloading. CSS does not. JavaScript is more expensive to parse. It's more memory intensive to run.

[Addy Osmani has written extensively about this.](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

Yes, more code of any type can slow sites down. But JavaScript is uniquely bad for performance.

Kent does go on to acknowledge this.

> Don't get me wrong. I know that if we ship less JavaScript our websites will run faster.
>
> But I mean... I'm building an app... Hard to do that without shipping some JavaScript...

I don't think most people are saying, "don't use JavaScript." That would be absurd.

But use less, use it wisely, and don't depend on a giant framework for simple stuff. Use as little JS as possible to get the experience you want. You can do that and still have a great, immersive app.

None of this is to pick on Kent. He's a talented developer and educator, and I love his perspectives on testing.

But I do want to push back on this notion that lots of JavaScript is just a cost of building apps in 2018. It may be the norm, but it doesn't have to be.

We don't have to choose been engaging apps and a JS-light experiences. We can have both.