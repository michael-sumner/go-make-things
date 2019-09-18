---
title: "Should you conditionally load a script based on viewport size?"
date: 2018-04-25T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Yesterday, a student asked me how to conditionally load a script only when the viewport is over a certain size.

> If I want to run some scripts only on larger devices, is an if statement that checks window width my best approach still?

Taking the question at face value, yes, that's probably the best approach, but... it may not actually be the right solution to the problem you're trying to solve.

## What is your script actually going to do?

It's important to ask the right questions before deciding on a solution.

Does the script require a specific device orientation? Do you only care about viewport width, or does height matter, too? Does the script only impact touch screen inputs, or work with mouse interactions as well? And is it viewport size or actual monitor/screen width you're interested in?

Depending on what your script does, you may only want it to load or run on bigger viewports (or bigger screens, regardless of the viewport size). Or, you may *also* want it to load on small screens that don't accept touch inputs. You might *not* want it to load on big screens that also support touch.

Asking the right questions and thinking about edge cases will help you figure out the right approach.

## When the best JavaScript is none at all

In this case, the student had an autoplay background video that they didn't want to load on mobile, out of bandwidth considerations.

*__Side Note:__ I love that there are developers who still care about and consider bandwidth implications in their work. We need more of that!*

For this specific situation, the best approach is actually to let the browser do it's thing.

An increasing number of mobile browsers automatically block autoplay videos, or give the user the ability to customize whether or not they play. And desktop browsers like Safari and Chrome are moving in that direction as well.

Which is great, because there are too many things we don't know as developers to let us make informed decisions around this.

Someone could be on a mobile device connected to wifi, or on a desktop device on a terrible connection, or tethered to a mifi network. Screen size is a bad proxy for bandwidth.

Any time you can lean on the browser instead of writing code, do it.

## This is what thinking in JavaScript means

When students tell me they want to learn how to [think in JavaScript](/learning-how-to-think-in-javascript/), this is what they mean.

Being a great developer isn't about knowing the various methods and browser APIs you can use. It's about knowing which ones to use when to solve the specific challenge you're working on.

If that sounds like something you'd like to get better at, check out the [Vanilla JS Academy](https://vanillajsacademy.com), my six-week, project-based training program for beginners. It kicks off on May 14, but if you join before Saturday you can save 30% with the code `EARLYBIRD` at checkout.