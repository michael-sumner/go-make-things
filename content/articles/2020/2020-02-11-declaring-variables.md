---
title: "Declaring variables"
date: 2020-02-11T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this week, my friend Kieran Barker wrote an article on [declaring multiple variables with one statement](https://kbarker.dev/2020/02/09/declare-multiple-javascript-variables-in-one-statement).

In it, he talks about how you can declare multiple variables with a single `var` (or `let`, or `const`).

```js
// This creates two variables: myName and dogName
var myName = "Kieran", dogName = "Yoko";
```

I often see it written out with each item on its own line like this.

```js
var myName = "Kieran",
    dogName = "Yoko";
```

## I personally consider this an anti-pattern

I often get asked about best practices around structuring code, and to be honest, I don't like this pattern.

I don't think the trouble it can create is worth saving... well, actually, zero characters, becauese you still have spaces where `var` would have been.

Imagine you have a long list of variables, like this.

```js
var name = 'Hermione Granger',
    house = 'Gryffindor',
    speciality = 'Potions and Spells',
    partMuggle = true;
```

Let's say you wanted to add another variable: `patronus`.

If you add it to the end of the list, you also need to remember to jump back up to the `partMuggle` line and replace the semicolon (`;`) with a comma (`,`). If you need to delete `name`, you need to remember to add `var` before `house` or the whole thing breaks.

**In other words, this approach adds a lot of needless cognitive overhead with no benefit.**

It also means that you either can't use tabs (because if the tab width is not `4` spaces things will line up weird), or you need to mix tabs and spaces. If you prefer spaces, that may be fine, but it needlessly limits your coding options.

Compare this approach to something like this.

```js
var name = 'Hermione Granger';
var house = 'Gryffindor';
var speciality = 'Potions and Spells';
var partMuggle = true;
```

Here, you can add or remove variables at any point without worrying about the other variable declarations. You can use spaces or tabs, too. It's more *resilient*.

## The one exception

There is one exception to my position on this where I *will* declare multiple variables with one one statement.

If I'm declaring variables with no value (because I'm going to assign values to them later), I *will* use a single statement, usually on one line.

```js
var name = 'Hermione Granger';
var house = 'Gryffindor';
var headings, settings, isScrolling;
```

I should also mention, if it wasn't already obvious: this is 100% subjectively my opinion. Your team may prefer a different approach, and that's fine, too.

[If you haven't yet, go check out Kieran's post as well.](https://kbarker.dev/2020/02/09/declare-multiple-javascript-variables-in-one-statement) He looks at some of the things about single-statement variable declarations that often trip people up.