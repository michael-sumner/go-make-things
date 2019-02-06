---
title: "Detecting select menu changes with vanilla JS"
date: 2019-01-06T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The other day, a reader asked:

> Is there a way to detect changes to `select` menu values with vanilla JS?

Yes there is!

There are two events that detect changes to `input`, `textarea`, and `select` elements: `change` and `input`.

The `change` event feels like it would be the right one, but it only fires when focus leaves the field. To detect real-time changes, you want the `input` event.

```html
<select id="wizard">
	<option value="">Pick One</option>
	<option value="Harry Potter">Harry Potter</option>
	<option value="Hermione">Hermione</option>
	<option value="Voldemort">Voldemort</option>
</select>
```

```js
document.addEventListener('input', function (event) {

	// Only run on our select menu
	if (event.target.id !== 'wizard') return;

	// Do stuff...

}, false);
```

With a `select` menu, you can get the `value`, if there's one on the selected `option`, using `event.target.value`.

You can also get the `option` element itself using `event.target.options` and `event.target.selectedIndex`. The former returns an array-list list of `option` elements, and the latter returns the index of the selected option.

```js
document.addEventListener('input', function (event) {

	// Only run on our select menu
	if (event.target.id !== 'wizard') return;

	// The selected value
	console.log(event.target.value);

	// The selected option element
	console.log(event.target.options[event.target.selectedIndex]);

}, false);
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/gqGbbz)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="gqGbbz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Best Wizard"></p>