---
title: "Core vanilla JS concepts to learn if you eventually want to learn a framework like React, Vue, or Angular"
date: 2019-07-09T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- JavaScript
---

Many of my students tried to learn a framework (often React or Angular) first, got stuck, and decided to dig into vanilla JS first.

Many of them also try to learn a framework again after going through [my guides](https://vanillajsguides.com) or [Academy training program](https://vanillajsacademy.com) and often tell me that it's a lot easier once you understand how the language actually works.

The other day, a reader asked me:

> What core vanilla JS concepts should you learn if you eventually want to learn React?

As someone who doesn't personally enjoy or use frameworks, I decided to ask my students who had made that transition what they found most helpful. Here's what they told me.

## [Andrew Borstein](https://andrewborstein.com/)

That’s a really interesting question!

I’m definitely not as expert in React as other folks, but I would say, in no particular order:

- ES6 - it’s not strictly required, but basically everyone uses it, so every tutorial and blog post and help doc will be written with it.
- `map()` — gonna use tons of [mapping, like over lists of data](/what-array.map-does-in-vanilla-js/) to render components or to modify the data client side
- destructuring - this was super mysterious to me before React but I don’t work in a single file without it now.
- spread props - similar to destructuring, it’s really handy when passing around and sharing props (object basically) all over the place
- implicit vs. explicit return - you’re constantly switching between the two, since React is very picky about when and you return inside components.
- [ternaries and short-circuit logic](/ternary-operators/) — two techniques used a lot in React, too, to help with the all conditional rendering
- array and object methods — [`push()`](https://vanillajstoolkit.com/reference/arrays/array-push/), [`concat()`](/merging-two-or-more-arrays-with-vanilla-js/), [`slice()`](/how-to-copy-an-array-with-vanilla-javascript/), [`keys()`](https://vanillajstoolkit.com/reference/objects/object-keys/), etc. props are tons of arrays and objects
- [truthiness](/truthiness-in-javascript/) — for example, knowing the difference between `null` and `undefined` and quirks like 0 being falsy
- [deep vs shallow copying](/a-better-way-to-create-an-immutable-copy-of-an-array-or-object-with-vanilla-js/) — Chris and I just went over this recently, and it consistently trips me up when I stop working in react for a bit. you need to do lots of copying data to mess with it, so need to know how to safely do that.

Those are the first things that come to mind.

For sure, you can basically forget all the DOM things you learned! You never really interact directly with it in React, or at least not in the same way.

## [Omar Fernando López Olivas](https://zoma.rs/)

I would recommend to try to [learn "raw" React](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/) first.

I didn't and I wish I did.

## Julio

I _highly_ recommend [Wes Bos's React for Beginners](https://reactforbeginners.com/) - took it a couple years back and it was awesome.

It may be a lot to take in, but essential stuff . Oh, and he updates his videos to latest and greatest all the time.