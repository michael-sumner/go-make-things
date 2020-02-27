---
title: "CSS selectors and specificity explained"
date: 2020-02-27T10:30:00-05:00
draft: false
categories:
- Code
- CSS
---

For a lot of developers, one of the most confusing things to really wrap your head around is [how CSS selectors and specificity work in the context of "the cascade."](/understanding-the-cascade-and-specificity-in-css/)

<img alt="A screenshot of Hugo Giraudel's Selectors Explained tool" src="/img/articles/selectors-explained.jpg">

One of my students tipped me off to ["Selectors Explained" by Hugo Giraudel](https://hugogiraudel.github.io/selectors-explained/).

This awesome little web app accepts any valid CSS selector, and explains what it means in plain English. It also provides a specificity number, so that you can compare the specificity of different selectors.

[For example, this:](https://hugogiraudel.github.io/selectors-explained/?s=.hello%2523there%2520%255Bdata-friend%253D%2522carl%2522%255D)

```css
.hello#there [data-friend="carl"]
```

Gives this explanation:

> An element with an attribute `data-friend` whose value is `carl` somewhere
> … within the element with id `there` and class `hello`.
> Specificity: 1.2.0

This is neat!