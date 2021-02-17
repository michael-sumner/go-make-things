---
title: "My build tool boilerplate goes v2"
date: 2021-02-17T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

For years, I was an avid [Gulp](https://gulpjs.com/) user.

But last year, I got tired of having to repair my build anytime I didn't use it for a few months. I got tired of installing 270mb of `node_modules` dependencies to build a simple website or web app.

So, I put together [a build tool boilerplate](https://github.com/cferdinandi/build-tool-boilerplate) with simple NPM scripts (a trick I [learned from Keith Cirkel](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) years earlier). I was able to create a simplish build tool that does just what I want (and nothing more) with a fraction of the footprint.

Yesterday, thanks to an amazing pull request from [Simon Minter](http://www.nineteenpoint.com/), I released [v2 of my boilerplate](https://github.com/cferdinandi/build-tool-boilerplate).

**Version 2 brings...**

- Watch tasks to detect changes to files and automatically run a build
- A local server that automatically reloads whenever files changes
- Better cross-OS support
- Tasks run in parallel for faster build times

The whole thing is designed to be modular and easily customizable.

The documentation details each tasks, the dependencies it uses, and how to run it. Whenever I start a new project, the first thing I do is remove any of the tasks (and matching dependencies) that I don't need. I'd encourage you to do the same.

[You can find v2 of my build tool boilerplate on GitHub.](https://github.com/cferdinandi/build-tool-boilerplate)