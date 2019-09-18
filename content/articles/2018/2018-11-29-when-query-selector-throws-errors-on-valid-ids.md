---
title: "What to do when querySelector() fail on valid selectors"
date: 2018-11-29T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Lots of special characters are valid for IDs, classes, and names.

You can use square brackets (`[]`) or curly brackets (`{}`), unicode symbols like `♥`, and all of the special characters above the numbers on your keyboard.

```html
<!-- These are all valid IDs, classes, and name attributes -->
<input type="email" id="form[email]" value="form[email]">
<div class="1@#%^">.1@#%^</div>
<p id="hello{world}">#hello{world}</p>
```

However, `querySelector()` and `querySelectorAll()` fail on some of these totally valid selectors. Sometimes they return `null`. Other times, like with curly brackets (`{}`), they throw errors.

```js
// These all fail
var input = document.querySelector('#form[email]');
var random = document.querySelector('.1@#%^');
var par = document.querySelector('#hello{world}');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/rQQKgP)

So... what can you do about it?

Brackets, both curly and square, are easy. You can escape them with two forward slashes (`\\`).

```js
// These will work
var input = document.querySelector('#form\\[email\\]');
var par = document.querySelector('#hello\\{world\\}');
```

[Here's another demo with proper escaping.](https://codepen.io/cferdinandi/pen/jQQpPp)

That doesn't help with special characters, though.

```js
// This still fails
var random = document.querySelector('.1\\@\\#\\%\\^');
```

For that, we need to convert special characters into unicode. That's not fun.

Fortunately, [Mathias Bynens has written a wonderful polyfill to handle that](https://github.com/mathiasbynens/CSS.escape). You use it like this.

```js
var random = document.querySelector('.' + CSS.escape('1@#%^'));
```

[Here it is in action.](https://codepen.io/cferdinandi/pen/JeeBOX)