---
categories:
- Code
- Design &amp; UX
- JavaScript
date: '2017-06-09'
permalink: /javascript-form-validation/
title: JavaScript form validation
url: /2017/06/09/javascript-form-validation
---

This week I released [Validate.js](https://github.com/cferdinandi/validate), a lightweight, open source form validation script.

You can [play with the demo here](https://cferdinandi.github.io/validate/).

## How is Validate.js different?

There are a ton of form validation scripts. There's even a bunch of vanilla JS ones.

Most of them require you to manually specify your validation criteria with JavaScript&mdash;individually naming each field and how it should be validated. That's a pain in the ass.

Validate.js hooks into the browser-native form input types (like `email`, `number`, and `url`) and validation attributes (like `required`, `pattern`, and `max` and `min`). All you need to do is include it on your site and run `validate.init()`. The script handles the rest.

```lang-markup
<div>
	<label for="email">Email</label>
	<input type="email" id="email" required>
</div>

<div>
	<label for="url">URL</label>
	<input type="url" id="url" required>
</div>
```

Instead of the native pop-up errors on submit, Validate.js displays an error (if there is one) as soon as the user leaves each field. It also checks all fields on submit and brings the first one with an error into focus.

Want to submit successful forms via Ajax? Validate.js has you covered. You can disable page reload on submit and pass in whatever callback function you want instead.

Validate.js also lets you customize all of the error messages (you can also just use the defaults) and style them however you want.

## What about browser support?

Out-of-the-box, it works in all modern browsers, and (mostly) IE 10 and above.

Unfortunately, not all validation types are supported by all versions of IE and Edge consistently. For example, IE10 and IE11 will check if a form input is too long (using the `maxLength` attribute), but Edge will not. And no version of IE or Edge will check if it's too short (using the `minLength` attribute).

The script comes with a polyfill that pushes support back to IE10 (and adds missing features to partially supporting browsers). And if you include [Eli Grey's classList.js polyfill](https://github.com/eligrey/classList.js/), you can push support back to IE9.

[Grab Validate.js on GitHub.](https://github.com/cferdinandi/validate)