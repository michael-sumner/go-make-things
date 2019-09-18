---
title: "How to create a form input autocomplete without a library or framework"
date: 2018-06-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- HTML
- JavaScript
- Vanilla Framework Demos
---

For today's article, I *was* going to show you how to recreate [Angular's autocomplete demo](https://material.angularjs.org/latest/demo/autocomplete) with vanilla JS as part of [my series on coding framework demos in vanilla JS](/categories/vanilla-framework-demos/).

However, in preparing for the article, I discovered that you actually don't need JavaScript at all!

## Introducing `datalist`

Turns out, native HTML5 provides elements we can use to get autocomplete without a library or framework... or any JavaScript at all.

The magic that makes this all happen is the `datalist` element.

Let's say you wanted to create an input where you name your favorite state. First, create your input.

```html
<label for="states">What's your favorite state?</label>
<input type="text" id="states" name="states">
```

Then, give it a `list` attribute. The value of this list attribute can be anything that would be a valid ID.

```html
<label for="states">What's your favorite state?</label>
<input type="text" id="states" name="states" list="states-list">
```

Finally, we add a `datalist` element. This element should have an `id` that matches the value of the `input` element's `list` attribute.

Within it, you'll include a set of `option` elements with the values the user can autocomplete from.

```html
<datalist id="states-list">
	<option>Alabama</option>
	<option>Alaska</option>
	<option>Arizona</option>
	<option>Arkansas</option>
	...
</datalist>
```

[Here's a working demo.](http://jsfiddle.net/cferdinandi/zacnfjqL/1/)

<iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/zacnfjqL/1/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Browser Compatibility

This approach works in Chrome, Firefox, and IE11 and up. It does *not* work in Safari.

In Chrome, IE, and Edge, when the user focuses on the `input`, a menu of options appears that they can select from. This *doesn't* happen in Firefox, for some reason. Options for that browser only appear as the user types.