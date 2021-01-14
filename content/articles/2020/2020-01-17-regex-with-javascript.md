---
title: "Regex with JavaScript"
date: 2020-01-17T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

*Regular expressions*, or *regex*, are patterns you can use to match specific characters in a string.

For example, let's say you have a set of strings that look like this: `id-num-{some id}-abc`. You want to get the value of `{some id}` from inside that string.

Regular expressions provide you with a way to match those characters and extract them from the string.

Regular expressions are notoriously hard to write, and in particular, to write well. They often have unintended side effects or miss specific patterns.

There's an old quote from programmer Jamie Zawinski about regex:

> Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems.

There are often other, better approaches to solving the same problem. That said, sometimes a regular expression really is the best option.

Today, I wanted to share [two videos from Steve Griffith that dig into writing regex with JavaScript](https://www.youtube.com/playlist?list=PLyuRouwmQCjk2nJENk4hORzy6LBGz8XoU).

[First, an intro to regex.](https://www.youtube.com/watch?v=zPeEU9dP83M)

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/zPeEU9dP83M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

[Then, a look at practical uses of regex in JavaScript.](https://www.youtube.com/watch?v=kUMA1d1Sqto)

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/kUMA1d1Sqto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>