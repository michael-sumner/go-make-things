---
categories:
- Code
- HTML
- JavaScript
date: '2017-09-19'
permalink: /creating-elements-with-vanilla-javascript/
title: Creating elements with vanilla JavaScript
url: /2017/09/19/creating-elements-with-vanilla-javascript
---

In jQuery, you can create an element by wrapping element tags in a jQuery method:

```lang-js
var elem = $('<div></div>')
```

Did you know it's just as easy to create element with vanilla JavaScript? Let's take a look!

## `createElement()`

The `createElement()` method does exactly what it says: creates an element. Unlike the jQuery version, you don't even need opening or closing tags.

```lang-js
var div = document.createElement('div');
var link = document.createElement('a');
var article = document.createElement('article');
```

You can use an valid HTML tag, and even create invalid ones, too! For example, these also work.

```lang-js
var chicken = document.createElement('chicken'); // <chicken></chicken>
var placeholder = document.createElement('_'); // <_></_>
```

`createElement()` should always be called on the `document`.

Over the next few days, I'll be teaching you a few ways to inject elements you create into the DOM.