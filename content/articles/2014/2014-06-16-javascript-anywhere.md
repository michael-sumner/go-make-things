---
categories:
- Code
date: '2014-06-16'
url: /javascript-anywhere/
title: JavaScript Anywhere
---

Over the last few weeks, I've converted all of [my open source scripts](http://cferdinandi.github.io/kraken/addons.html#interactive) to a UMD pattern.

UMD, or [Universal Module Definition](https://github.com/umdjs/umd), is a simple wrapper around your code that allows it to run both in a browser *and* on a server (and theoretically, other places, too). While not formally registered, I also added instructions on installing the scripts with [NPM](https://www.npmjs.org/), [Bower](http://bower.io/), and [Component](http://component.io/) using the GitHub hook if any of those are your thing.

The [boilerplate I use to start all of my scripts](https://gist.github.com/cferdinandi/ece94569aefcffa5f7fa) is available on GitHub if you want to give UMD a go yourself. Major kudos to [Todd Motto](http://toddmotto.com/) for helping me get started.
