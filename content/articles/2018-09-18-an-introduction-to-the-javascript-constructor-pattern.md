---
title: "An introduction to the JavaScript constructor pattern"
date: 2018-09-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The JavaScript constructor pattern allows you to create multiple instances of the same script or plugin.

It's particularly useful for things like plugins or libraries where each instance will share many methods and properties in common, but have some differences as well.

## Some examples of when you'd want to use constructors

For example, in [Reef, my lightweight state-based component helper](https://github.com/cferdinandi/reef), I use a constructor pattern to instantiate new components.

In the code below, both components share a common set of methods like `render()` and `setData()`, but have unique properties (like `data` and `template`) that are specific to each component.

```js
var app = new Reef('#app', {
	template: '<h1>Hello, world!</h1>'
});
app.render();

var todos = new Reef('#todos', {
	data: {
		todos: [
			'Buy a new wand',
			'Pick up food for Hedwig',
			'Enroll in classes for this semester'
		]
	}
});
todos.render();
```

In [Smooth Scroll, my animated scrolling plugin](https://github.com/cferdinandi/smooth-scroll), you can use different easing patterns for different links.

The functions that handles all of the animations are shared, but the selector, easing pattern, and other options are unique to each instance.

```js
var scrollFast = new SmoothScroll('.scroll-fast', {
	easing: 'easeIn',
	speed: 50
});

var scrollSlow = new SmoothScroll('.scroll-slow', {
	easing: 'easeInOut',
	speed: 1000
});
```

Let's look at how you can actually create your own plugin or library using the constructor pattern.

## Setting up the plugin wrapper

We're going to create a plugin to help [Dumbledore's Army](https://en.wikipedia.org/wiki/Dumbledore%27s_Army) practice casting spells.

For simplicity, I'm going to use a [revealing module pattern](/public-vs.-private-functions-in-javascript/#how-to-do-this-with-your-own-scripts), but you can [use this with UMD wrappers](https://vanillajstoolkit.com/boilerplates/umd/constructor/) as well.

Constructors always start with a capital letter to distinguish them from regular functions.

```js
var Spells = (function () {

	'use strict';

})();
```

## Adding a constructor

Inside our revealing module pattern, we'll add a constructor function.

This is the actual thing that will get duplicated every time we instantiate our plugin with `new Spells()`. You can name it anything you want, but for clarity, I always just name `Constructor` (again, capitalized).

Then, we return the `Constructor` so that it's accessible when someone instantiates.

```js
var Spells = (function () {

	'use strict';

	/**
	 * The constructor object
	 */
	var Constructor = function () {

	};

	// Return the constructor
	return Constructor;

})();
```

## Adding properties to each instance

To add properties to each instance of `Spells()`, we'll add an argument to our `Constructor`.

The `details` variable will be an object of details about the spell. For this example, we'll include a `spell` and `description` for the spell.

Then, we'll assign each of those keys as properties on `this`. The `this` operator can be weird and confusing, but in this context, it refers to the currently instantiated `Constructor()` object.

```js
var Spells = (function () {

	'use strict';

	/**
	 * The constructor object
	 */
	var Constructor = function (details) {

		// Add properties to this instance
		this.spell = details.spell;
		this.description = details.description;

	};

	// Return the constructor
	return Constructor;

})();
```

At this point, we can do something like this:

```js
var getWand = new Spells({
	spell: 'Accio wand',
	description: 'Retrieve your wand from across the room.'
});
```

Now you can get the `name` and `description` properties directly from your instance.

```js
// returns "Accio wand"
getWand.spell;

// Returns "Retrieve your wand from across the room."
getWand.description;
```

If you tried to call those properties directly on `Spells()`, you would get `undefined`.

These properties are unique to each instance of your constructor.

## Adding methods to each instance

So that's cool, but what if you want to actually *do* something with your spell?

Let's add a `cast()` method to `Spells()` that you can use to cast each spell. The function will pop up an alert modal with the spells title and description.

We'll attach it to the `Constructor.prototype`. You can use `this` inside your function to access the properties we set for the instance---`spell` and `description`.

```js
var Spells = (function () {

	'use strict';

	/**
	 * The constructor object
	 */
	var Constructor = function (details) {

		// Add properties to this instance
		this.spell = details.spell;
		this.description = details.description;

	};

	/**
	 * Cast the spell
	 */
	Constructor.prototype.cast = function () {
		alert(this.spell + ': ' + this.description);
	};

	// Return the constructor
	return Constructor;

})();
```

Now, you can cast your spell like this.

```js
// Alerts "Accio wand: Retrieve your wand from across the room."
getWand.cast();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/QVJvPo)

### Why attach the function to the prototype and not as a property of the `Constructor()`?

You *could* achieve the same affect like this.

```js
var Spells = (function () {

	'use strict';

	/**
	 * The constructor object
	 */
	var Constructor = function (details) {

		// Add properties to this instance
		this.spell = details.spell;
		this.description = details.description;

		// Cast the spell
		this.cast = function () {
			alert(this.spell + ': ' + this.description);
		};

	};


	// Return the constructor
	return Constructor;

})();
```

So why use `prototype` instead?

When you create a new instance of `Spells()`, all of the properties of your constructor are duplicated. Prototype methods, on the other hand, act a *reference* function.

When you instantiate a new instance of your constructor, prototype methods refer to the original rather than being copied, so they take up less memory in the browser.

For a small plugin it probably doesn't matter much. For larger projects, it can make a big difference for performance.

## Wrapping up

That's it for today. Tomorrow, we'll look at how add private functions to your constructor. We'll also look at how to include shared settings, and methods that only run on `Spells()` instead of being attached to each instance.