---
categories:
- Code
- JavaScript
date: '2017-05-23'
permalink: /who-should-drive-a-vanilla-js-web-app/
title: Who should drive? How to create a vanilla JS web app.
url: /2017/05/23/who-should-drive-a-vanilla-js-web-app
---

Last week, my buddy [Dominic Magnifico tweeted](https://twitter.com/Magnificode/status/866374626749894656) about [Vue Should Drive](http://codepen.io/magnificode/pen/wddMMy), a fun little web app for picking a driver that he built in about 20 minutes using Vue.js.

I thought it would be fun to try to recreate it in vanilla JavaScript, and set a goal for doing it 20 minutes or less.

I was able to [get the functionality recreated in about 15 minutes](https://www.youtube.com/watch?v=wqu4Bi0peCM), and spent my extra 5 minutes bolting in some nice extras like keeping the list of names persistent after reloading the page using `localStorage`. My version is incredibly ugly&mdash;Domenic is a *much* better designer than I am&mdash;but it's functional and works without any dependencies.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wqu4Bi0peCM?rel=0&amp;showinfo=0?ecver=1" frameborder="0" allowfullscreen></iframe>

**Assets:**

- [The screencast on YouTube](https://www.youtube.com/watch?v=wqu4Bi0peCM)
- [The source code on GitHub](https://gist.github.com/cferdinandi/577f8c12ec2804f11c331caaafd20495)
- [The working demo on JSFiddle](https://jsfiddle.net/cferdinandi/Le71gy9y/)