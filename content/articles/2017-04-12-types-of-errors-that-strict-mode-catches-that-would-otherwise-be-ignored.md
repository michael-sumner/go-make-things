---
categories:
- Code
- JavaScript
date: '2017-04-12'
title: Types of errors that strict mode catches (that would otherwise be ignored)
---

[Andrew Borstein](http://andrewborstein.com) asked a few follow-up questions to [Monday's article about strict mode](https://gomakethings.com/javascript-strict-mode-and-why-you-should-always-use-it/) over in my [Vanilla JS Slack Room](https://gomakethings.com/vanilla-js-guidebook/).

Yesterday, I clarified [where to enable strict mode in your scripts](https://gomakethings.com/where-to-activate-strict-mode-in-your-scripts/). Today, let's talk about the kinds of errors it catches.

> What's an example of an error that would be silent without [strict mode]?

Types of errors that would get ignored without strict mode include...

1. Missing semicolons after variable declarations.
2. Calling a variable that hasn’t be explicitly set.
3. Redefining a variable that’s already been defined.

For example...

```javascript
// Missing semicolon
var someVar = 'this is my variable'

// Undefined variable
var anotherVar = 'another variable'; // No error
anotherVar = 'change variable value'; // No error
aThirdVar = 'a third variable'; // Error. Not yet been defined with `var`

// Previously defined variable
anotherVar = 'change variable value'; // No error. You're changing the value of a previously set variable
var anotherVar = 'change the value again'; // Error. The variable has already been set, so you should leave off the `var`, which implies it's a new variable
```