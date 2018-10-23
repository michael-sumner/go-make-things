---
title: "Why would you write your own JavaScript library instead of using an established project?"
date: 2018-10-23T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
- Web Performance
---

In response to my article about [writing your own vanilla JS helper library](/creating-your-own-vanilla-js-helper-library-like-lodash-and-underscore.js/), reader [Vince Panuccio](https://www.digitalaffinity.com.au/) wrote me to ask (shared with permission):

> Is it wise to tell developers to write their own stuff from scratch all the time? Lodash doesn't have to be big, you can perform a custom build with lodash include=filter,map and just get the functions you need. You get the benefit of a well maintained code base, cross browser compatibility and a community behind it. There's a higher probability that you'll end up creating a bug vs using a well known library.
>
> I'm primarily a server side developer so perhaps I don't see the reasoning behind this, but a server side developer would never rewrite the functionality of well known libraries. I've never come across them :) Do developers really need to have their own library of helper functions that have been written hundreds of times before?

This is a great question, and one I've been asked many, many times before. "Why write your own thing when [POPULAR LIBRARY] exists?"

## You don't need to write your own code from scratch

There's a common misconception that I advocate always creating your own stuff from scratch. That's not accurate.

I use other people's code all the time. I use and recommend a wide range of [open source JS plugins](https://vanillajstoolkit.com/plugins/). I maintain [a growing list of helper functions](https://vanillajstoolkit.com/helpers/), some of the written by me, and others sourced from other open source projects and articles.

**What I advocate strongly against is using large libraries and frameworks simply because it's easier for you as a developer.**

## The front-end is fundamentally different from the backend

One of the biggest things that I think has hurt the web in the last few years has been the attempt to apply backend methodologies (which are often seen as more mature) to the front end.

On the server, you control the stack, the performance limitations, the entire environment. Adding libraries with lots of code you don't need on a server has limited performance consequences.

The same is not true for front-end code, and JavaScript in particular. And yet, that's what we do.

Load jQuery to do find a few elements and add classes to them. Load React or Vue to build a simple news website. Load Lodash for one or two helper functions. NPM install a bunch of dependencies that have their own dependencies because that's what the tutorial you read online told you to do.

We're making the whole ecosystem slower and more fragile by applying methodologies from one medium (the backend) to an entirely different one (the front-end).

## Are third-party solutions really less likely to have bugs?

Vince raised some good points about community support, but the notion that frameworks and libraries are inherently less bug prone... I'm not sure that's true.

All code has bugs. React had (has?) notoriously bad a11y issues that are [causing serious challenges for WordPress' Gutenberg project](/frameworks-are-a-barrier-to-entry/). [Vue has 25 open bugs at the time of writing this](https://github.com/vuejs/vue/issues?q=is%3Aissue+is%3Aopen+label%3Abug), including a memory leak issue.

The thinking is that bigger projects with lots of developers works out more bugs more quickly. Maybe that's true. But they also grow bigger faster, and add more code from more developers. That has the potential to introduce more new bugs more quickly as well.

## Being mindful of what you load on your sites and apps

You can certainly build a smaller version of Lodash. That's great! I cherry pick helper functions from it from time-to-time as well.

But not everyone is comfortable in command line or with NPM---nor should they have to be to build for the web.

The bottom line for me: I want people to know and understand the code that's on the sites they build.

I want them to be more mindful about what they load and why. And want us an industry to stop thinking that backend development work is more complex or sophisticated or mature than what happens on the front end, and blindly apply their methodologies to our work.

## Agreeing to disagree

Vince had some nice follow-up points, and I wanted to share those as well.

> You make some good points, puts things in to perspective.
>
> I think we'll have to disagree on two points though.
>
> The command line isn't scary and if people don't feel comfortable using it, then they should learn. Part of what you do is teaching people to get out of their comfort zone, and the command line, I think, should be no different. Surely executing a few commands at the command prompt is no more difficult than teaching someone to write a pollyfill and understand the prototype chain :)
>
> About big libraries having no bugs, what I meant was that you'll have a lower probability of having a bug if you wrote something yourself vs a mature framework where you've cherry picked a helper function which has been battle-tested in the wild and had several engineers code review it. Bugs will always exist, but it's lowing the probability for me.
>
> I agree with everything else you've stated though. I never considered the payload as a major factor in the reasoning behind writing things by hand. As a server-side guy, I've got over a decade of habits to change.

As for command line, I think we'll definitely [have to agree to disagree](/you-dont-need-to-know-command-line-to-be-a-good-developer/).

Thanks for writing, Vince, and for letting me share this awesome discussion with everyone!