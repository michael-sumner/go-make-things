---
title: "How to force a minimum string length with vanilla JS"
date: 2018-09-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One thing that used to be annoying and hard to do with vanilla JS but is now easy is enforcing a minimum length for a string.

## An example

Let's say you wanted to get the current date and display in `MM/DD/YYYY` format. Here's what that would look like (for demo purposes, I'm forcing the date to be July 4).

```html
<div id="app"></div>
```

```js
var app = document.querySelector('#app');

// Get the current date
var date = new Date('July 4, 2018');

// Format the date
var datestamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

// Render it in the DOM
app.textContent = datestamp;
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/jvZqVG)

<p data-height="265" data-theme-id="light" data-slug-hash="jvZqVG" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="jvZqVG" class="codepen"></p>

One thing you'll notice is that the format for this is `M/D/YYYY`.

How would you force the numbers for July and 4th to be two digits instead of one? An awesome ES6 method called `padStart()`.

## The `String.padStart()` and `String.padEnd()` methods

The `padStart()` method adds a repeating string to the beginning of a string until it's length meets a minimum requirement. The `padEnd()` method does the same thing, but to the end of the string instead of the beginning.

They both accept two arguments: the minimum string length, and the string to prepend/append.

Looking at our example from before, we would use `padStart` to add a leading `0`. For the months of October, November, and December, nothing would be changed because they're already two digits. Same goes for any date from the 10th on.

*__One caveat when working with dates:__ they're numbers, so we'll also need to use the `toString()` method to convert them to strings first.*

```js
var app = document.querySelector('#app');

// Get the current date
var date = new Date('July 4, 2018');

// Format the date
var datestamp = (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear();

// Render it in the DOM
app.textContent = datestamp;
```

[And here's a demo of the end result.](https://codepen.io/cferdinandi/pen/YOeqrX)

<p data-height="265" data-theme-id="light" data-slug-hash="YOeqrX" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="YOeqrX" class="codepen"></p>

## Browser Compatibility

The `padStart()` and `padEnd()` methods work in all modern browsers, but not IE. There are [polyfills available for both](https://vanillajstoolkit.com/polyfills).