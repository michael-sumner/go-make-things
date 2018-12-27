---
title: "If naming things is hard your function does too much"
date: 2018-12-27T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

There's an oft repeated quote in web development:

> There are only two hard things in Computer Science: cache invalidation and naming things.
> <cite>Phil Karlton</cite>

I hear this from students often. Figuring out what to call functions and variables is sometimes as stressful as writing the code itself.

I used to struggle with this, too.

This a trick to make this easier, though, [courtesy of Kyle Simpson](https://github.com/getify/Functional-Light-JS): **if you're having trouble naming a function or variable, it does too much.**

I'm a big fan of *functional programming*. My functions generally do just one thing, and it makes naming them much, much easier.

There's no hard-and-fast rule here, but as a guideline, anytime you've got some code in your function that's three or more lines, pull it out into it's own function.

I also prefer long-but-obvious names over short-and-clever ones.

```js
// Do this...
var tabContent = document.querySelector('#tab-content');
var getOpenTabs = function () {};

// NOT that...
var el = document.querySelector('#tab-content');
var getElems = function () {};
```

I want to be able to look at a variable or function later in my code and know immediately what it is and what it does.

People write short, clever code to keep file size down, but a competent minifier (like Uglify) coupled with gzipping with do that for you. Keep your code simple and readable, and let computers do the annoying stuff.