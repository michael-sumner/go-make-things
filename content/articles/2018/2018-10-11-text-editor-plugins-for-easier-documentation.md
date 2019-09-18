---
title: "Plugins for Sublime and VS Code that make it easier to write documentation"
date: 2018-10-11T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

Yesterday, one of my students pointed out that my in-code documentation always follows the same format. They asked if there are any plugins or references for how I document my code.

I use the [JSDoc](http://usejsdoc.org/) format for my in-code documentation. I *don't* use it to generate HTML documentation or anything, but I do find it a useful standard for explaining how a block of code is supposed to work.

It uses this rough format:

```js
/**
 * [Description of the function]
 * @param  {[type]} [variable name] [description of the parameter/variable]
 * @param  {[type]} [variable name] [description of the parameter/variable]
 * @return {[type]}                 [description]
 */
```

[Sublime 3](https://www.sublimetext.com/) is my text editor of choice. I use the fantastic [DocBlockr plugin](https://github.com/spadgos/sublime-jsdocs) to make this easier.

When I used [VS Code](https://code.visualstudio.com/), the [Complete JSDoc Tags extension](https://marketplace.visualstudio.com/items?itemName=HookyQR.JSDocTagComplete) was the best alternative to DocBlockr for Sublime.

With both plugins, you type `/**` and hit enter/return. They autogenerate the JSDoc header, pulling out variable names and setting things up for you.

Let's say you have a function that adds two numbers together:

```js
var add = function (num1, num2) {
    return num1 + num2;
};
```

DocBlockr adds this:

```js
/**
 * [add description]
 * @param {[type]} num1 [description]
 * @param {[type]} num2 [description]
 */
var add = function (num1, num2) {
    return num1 + num2;
};
```

The Complete JSDoc Tags extension does something similar.

One annoying quirk with it, though: it splits your cursor onto two lines instead of just focusing on the `[add description]` line. Still, super useful if you need to write a lot of documentation!