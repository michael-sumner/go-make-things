---
title: "A shorthand for adding to a number or string with vanilla JS"
date: 2020-01-13T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you had a string with a simple message on it.

```js
var greeting = 'Hello, world!';
```

You want to add, "How are you today?" to the end of it. You might do something like this.

```js
greeting = greeting + ' How are you today?';
```

That totally works ([here's a demo](https://codepen.io/cferdinandi/pen/abzKypY)), but in JavaScript, there's a shorthand you can use: `+=`.

This adds whatever string you place after it to the existing string. Here's that same task written with `+=` instead.

```js
greeting += ' How are you today?';
```

[Here's a working demo of this technique in action.](https://codepen.io/cferdinandi/pen/vYErJgP)

You can also use this approach with numbers.

```js
var num = 100;

// num now equals 142
num += 42;
```

You can also use it to subtract values from numbers.

```js
// num now equals 122
num -= 20;
```

[Here's a demo with numbers.](https://codepen.io/cferdinandi/pen/JjoZyWZ)