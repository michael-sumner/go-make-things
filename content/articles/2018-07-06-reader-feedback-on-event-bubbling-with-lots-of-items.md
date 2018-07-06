---
title: "Reader feedback on event bubbling with lots of items"
date: 2018-07-06T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, I looked briefly as [how to handle event bubbling with lots of items](/event-bubbling-with-lots-of-items/).

The article was kind of a shoulder shrug, but I got some great responses back from readers (shared with permission).

[Dillon Headley](https://dillonheadley.carrd.co/) wrote:

> The key here is probably making named functions that can be called and not just have all your event handler code within there I would think...

What he means is something like this.

```js
// Instead of this...
document.addEventListener('click', function (event) {

	if (event.target.closest('.scroll')) {
		// Do something...
	}

	if (event.target.matches('[data-some-attribute]')) {
		// Do something else...
	}

	if (event.target.matches('#my-form')) {
		// Do another thing...
	}

}, false);

// Do this...
document.addEventListener('click', function (event) {
	animate(event);
	sayHi(event);
	submitForm(event);
}, false);
```

Your listener contains nothing but functions, and you move the logic and `if` checks out to them instead. This is solid functional programming.

Longtime reader [Judd Franklin](https://github.com/juddfranklin1) had a really interesting solution that builds on what Dillon suggested: using data attributes in the markup as event hooks. This is common in things like React and Vue.

## How that might work

First, let's setup a function called `jetpack()`.

```js
var jetpack = function () {

	'use strict';

};

// Run jetpack()
jetpack();
```

Inside our function, we'll create an object to hold all of our methods, and then add our methods to it. For this example, I'll create a method to open an alert window, and another to log to the console.

```js
var jetpack = function () {

	'use strict';

	// Setup methods object
	var methods = {};

	methods.alert = function (event) {
		alert(event.target.textContent);
	};

	methods.log = function (event) {
		console.log(event.target.textContent);
	};

};

// Run jetpack()
jetpack();
```

Finally, we'll setup an event listener.

Inside it, we'll check to see if the clicked element has some data attribute&mdash;let's use `data-jetpack` for this example. If it does, we'll get the value and use it as a key to check for a matching function in the `methods` object.

If one exists, we'll run it.

```js
var jetpack = function () {

	'use strict';

	// Setup methods object
	var methods = {};

	methods.alert = function (event) {
		alert(event.target.textContent);
	};

	methods.log = function (event) {
		console.log(event.target.textContent);
	};

	document.addEventListener('click', function (event) {
		var method = event.target.getAttribute('data-jetpack');
		if (!method || !methods[method]) return;
		methods[method](event);
	}, false);

};

// Run jetpack()
jetpack();
```

In our markup, we can add a `[data-jetpack]` attribute to any item you want to run, and use the function you want as the attribute value.

```html
<button data-jetpack="alert">Click Me!</button>
<button data-jetpack="log">Click Me, Too!</button>
<button>I do nothing =(</button>
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/mzdkfgnu/)