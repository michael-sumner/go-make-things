---
categories:
- Code
- JavaScript
date: '2017-10-05'
permalink: /the-easy-way-to-support-almost-every-browser-with-vanilla-javascript/
title: The easy way to support *almost* every browser with vanilla JavaScript
url: /2017/10/05/the-easy-way-to-support-almost-every-browser-with-vanilla-javascript
---

I'm not shy about [my love of polyfills](https://gomakethings.com/why-i-love-polyfills/). They make it incredibly easy to just write code with modern, vanilla JavaScript and still support older browsers.

Less easy: [finding good polyfills](https://gomakethings.com/where-can-you-find-javascript-polyfills/).

It's a bit of a treasure hunt. [MDN](https://developer.mozilla.org/) has some that offer varying degrees of browser support. [GitHub](https://github.com/search?utf8=%E2%9C%93&q=polyfill&type=) has a bunch of varying quality. I've written some of my own.

There has to be a better way, right? There is.

## Polyfill.io

A few months ago I wrote *very* briefly about [Polyfill.io](http://polyfill.io).

Polyfill.io is a polyfill service written by [Jonathan Neal](https://github.com/jonathantneal) for the Financial Times, who is an amazing contributor to the open source community. To use it, you just add this to your site:

```lang-html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

## What it does

The service automatically detects your visitor's browser and generates a set of polyfills that patch any holes in their browser's features. It works all the way back to IE7 for most features!

The latest version of Chrome get's nothing. IE7 gets about 15kb of code. Most browsers get somewhere around 5kb. (These numbers are after gzipping.)

**Think about that: with just 15kb of code, you can use some of the most modern and cutting edge JavaScript features, natively, in Internet Explorer 7.**

No big libraries or frameworks. No new syntaxes to learn. No pre-compilers or module bundlers (though you certainly *can* use those things if you like them). Just modern, vanilla JavaScript.

## My thoughts

[When I first wrote about Polyfill.io](https://gomakethings.com/automatic-polyfilling/), I had not yet used it on a project, but heard a lot of great things about it from others.

I've now had the chance to use it on a large project, and I'm never looking back.

Polyfill.io pushed me head first into ES6, which I had previously been hesitant to use because of the lack of native browser support. Polyfill.io just makes it all so *easy*. My previous bar for entry was IE9. I can now provide even broader support with less work!

This is a no-brainer for me. I'm using it on every project.

## What features are supported?

Polyfill.io has [a growing list of supported features](https://polyfill.io/v2/docs/features/).

Features with a star next to them are included by default. They're selected for their broad support, popularity, and performance impact. You can [add additional features using flags](https://polyfill.io/v2/docs/examples#flags).

Polyfill.io also recommends [using an async loading technique](https://polyfill.io/v2/docs/examples#feature-detection). This is the strategy I would use for most projects, but for JavaScript-powered apps, I would load it with a traditional script tag, since you want your code to execute as quickly as possible.

I could go on and on about this project. Do yourself a favor and start using it today.