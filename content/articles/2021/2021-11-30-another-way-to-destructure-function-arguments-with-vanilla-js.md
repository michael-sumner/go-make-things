---
title: Another way to destructure function arguments with vanilla JavaScript
date: 2021-11-30T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, I shared [my preferred way to pass large set of arguments into a function](/my-preferred-way-to-pass-arguments-into-a-function-with-vanilla-javascript/) using object destructuring and the `Object.assign()` method.

```js
function wizard (args) {

	// Get the argument values
	let {name, job, spell, isEvil} = Object.assign({
		job: 'Wizard',
		spell: null,
		isEvil: false
	}, args);

	console.log(name, job, spell, isEvil);

}
```

A few astute readers wrote to me letting me know that you can achieve the same result by destructuring directly in the parameter assignment. You can even assign default parameter values.

```js
function wizard ({name, job = 'Wizard', spell, isEvil = false} = {}) {
	console.log(name, job, spell, isEvil);
}
```

With either approach, you then pass in your arguments like this.

```js
// logs "Merlin", "Wizard", "Dancing teacups", false
wizard({
	name: 'Merlin',
	spell: 'Dancing teacups'
});
```

Personally, I find the use of `Object.assign()` a bit easier to scan and read because each parameter is on its own line. The "shorthand" version feels too cluttered for my taste.

But they both do the same thing, so use whichever one you find easier to read and work with.