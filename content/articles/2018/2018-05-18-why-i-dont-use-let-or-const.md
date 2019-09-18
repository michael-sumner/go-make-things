---
title: "Why I don't use let or const in my JavaScript projects"
date: 2018-05-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

As I was reviewing this week's student projects for the [Vanilla JS Academy](https://vanillajsacademy.com/) during the weekly office hours, I noticed that a lot of my students were using `let` and `const` instead of `var`.

If you're not already familiar with the differences between them, and when and why you'd use them, [here's a quick primer](/let-var-and-const/).

The tl;dr version: `let` works mostly the same as `var` but won't let you redefine the variable a second time within the same scope, while `const` won't let you ever redefine the variable. They're a good way to protect your variables from being accidentally changed or overwritten.

But I don't use them, and a few of my students asked why.

They only work in modern browsers, and IE11 up. And unlike most of the cool new ES6 stuff I share on this site, they can't be polyfilled.

My preferred development approach is to write in fully native JS and [use polyfills to add backwards compatibility](/why-i-love-polyfills/). While I do minify and concatenate stuff, I never run my code through a transpiler to transform it from ES6 into ES5, and I don't want to have to.

Using `let` and `const` would force me to choose between deeper backwards compatibility and adding more tools (and bloat) to my development process.