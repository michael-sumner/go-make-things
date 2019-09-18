---
title: "JavaScript Linters"
date: 2018-09-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

JavaScript linters are tools that you can use to help you debug your code.

They scan your scripts for common issues and errors, and give you back a report with line numbers that you can use to fix things.

In addition to actual bugs and errors, they also check for subjective, stylistic preferences as well. Did you include a space between the function name and parentheses? Did you use single or double quotes around strings? Things like that.

## Linting Tools

The three most popular JS linters are:

1. [JSLint](https://www.jslint.com/). Highly opinionated and based on Douglas Crockford's *Javascript: The Good Parts*, it does not allow for much configuration.
2. [JSHint](http://jshint.com/). Comes loaded with sensible defaults, but allows for a lot more configuration than JSLint.
3. [ESLint](https://eslint.org/). An extremely configurable linter that also supports JSX *and* can autoformat scripts to match your preferred code formatting style.

All three provide an online GUI you can use.

They also all offer plugins for text editors like Sublime Text, VS Code, and Atom. These let you lint your code directly in your favorite text editor.

You can even configure them to lint in real time as you code, catching errors as you work (this is what I do).

## Which linter should you use?

This is entirely subjective, but I use and recommend JSHint.

JSLint is super easy to just start using, but does not provide enough customization for my needs. ESLint, on the other hand, provides *too much* customization for my tastes. It does a lot, but this makes it harder to just pick up and start using.

JSHint provides the perfect blend of ease and functionality for my needs. That said, one of the others might be a better fit for your personal needs.