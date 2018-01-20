---
categories:
- Code
- JavaScript
date: '2017-04-10'
url: /javascript-strict-mode-and-why-you-should-always-use-it/
title: JavaScript Strict Mode (and why you should always use it)
---

Strict mode is a way of telling browsers (and JavaScript debuggers) to be, well, stricter about how they parse your code. [MDN explains:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

> Strict mode makes several changes to normal JavaScript semantics. First, strict mode eliminates some JavaScript silent errors by changing them to throw errors.

This is highly desirable. I know that sounds counterintuitive. Why would you want more errors in your code?

Here's the thing: there were already errors in your code. The browser just wasn't telling you about them, so they might crop up in unexpected ways that are harder to find.

Turning on strict mode helps you find errors sooner, before they become bigger problems. And it forces you to write better code.

Always use strict mode on your scripts.

## How do you activate strict mode?

Simple, just add this to your scripts:

```javascript
'use strict';
```

Next, learn [where to activate strict mode](/where-to-activate-strict-mode-in-your-scripts/) (everywhere? in each script? in each function?) and the [types of errors strict mode catches](/types-of-errors-that-strict-mode-catches-that-would-otherwise-be-ignored/) that would otherwise be ignored.