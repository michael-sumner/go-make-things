---
title: "Getting an element's form with vanilla JS"
date: 2020-07-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at how to get all of the elements in a form with vanilla JS. Today, we're going to look at how to get the parent form for any form element.

Let's dig in.

## The `form` property

Every element in a form has a `form` property that returns the parent form for that element.

```html
<form>
	<label for="username">Username</label>
	<input type="text" id="username">
</form>
```

```js
var username = document.querySelector('#username');
var form = username.form;
```

You could also use the `closest()` method, but the `form` property is both easier and more performant.

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxZYJWQ)

## Browser compatibility

The `form` property works in all modern browsers, and back to at least IE9.