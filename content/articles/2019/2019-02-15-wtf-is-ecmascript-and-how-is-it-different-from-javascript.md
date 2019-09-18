---
title: "WTF is ECMAScript and how is it different from JavaScript"
date: 2019-02-15T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The other day on Twitter, I stumbled into a discussion about JavaScript where someone said (and I'm paraphrasing here):

> I'd recommend learning vanilla JS first, then ES6 and ES7.

If you're not familiar with what ES5, ES6, and ES7 and so on mean, this can be really confusing. I used to have a hard time understanding it, too.

Today, let's demystify what ES (officially called ECMAScript) is.

## ECMAScript *is* vanilla JS

JavaScript is a loose and expendable language. This annoys a lot of people, but that was done intentionally, by design.

It's inventor knew he wouldn't get it right on the first shot, and wanted to make sure people could extend and modify it to essentially fix anything he messed up. Early on, JavaScript had a few variants, including JScript and ActionScript.

__*ECMAScript* (often abbreviated *ES*) is a standardized version of JavaScript.__

This standardization is what allows you to write the same JavaScript and have it work across browsers relatively consistently. Naturally, not all browsers have implemented all of the features at the same time, but there's a standard that they're all working towards and that [you can polyfill](/why-i-love-polyfills/) for.

## What's up with the numbers?

Those are literal version numbers.

ES5 was a *huge* leap forward for JavaScript, bringing in a lot of features and conventions from jQuery and making DOM manipulation reasonable to do without a library for the first time.

ES6 was another big jump, bringing in functionality based on the web's emerging use as an app platform and not just a document sharing medium.

A few years ago, there was a push to release new versions annually and name them by year. This was, from what I've heard, intended to pressure browser makers to release features more frequently. It's... not really stuck all that well.

For example, ES6 is officially named ES2015 (the year it came out). No one calls it that. Some folks do say ES2017, ES2018, and so on, but I see far more references to ES7 and ES8.

If you ever see ESNext, that's typically used as a catchall for future features that are in development.

## Now you know

Next time you see someone refer to ES6/ES7 or ECMAScript, they're just talking about vanilla JS.