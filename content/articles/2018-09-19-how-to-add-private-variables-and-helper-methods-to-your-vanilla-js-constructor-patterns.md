---
title: "How to add private variables and helper methods to your vanilla JS constructor patterns"
date: 2018-09-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to use JavaScript constructor patterns](/an-introduction-to-the-javascript-constructor-pattern/).

Today, you'll learn how to add private variables and helper methods to your constructor. You'll also learn how to add functions you can use to update private settings and variables.

## A quick recap

Yesterday, we build a little plugin to help Dumbledore's Army practice their spells.

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

If they wanted to practice getting their wand, they would do this.

```js
var getWand = new Spells({
	spell: 'Accio wand',
	description: 'Retrieve your wand from across the room.'
});

getWand.cast();
```

This opens up an alert window with the spell and description.

## Adding a helper function

Let's imagine that getting the spell text to display in your alert window was a bit more complicated. You want to use a helper function for that.

Because our constructor is wrapped in [a revealing module pattern](https://gomakethings.com/public-vs.-private-functions-in-javascript/#how-to-do-this-with-your-own-scripts), we can add a function the typical way and instantly have a private function only accessible inside the plugin.

Let's create a new function, `getSpellText()`. We'll pass `this`---the current instance of our constructor---into it, and pass its returned value into the `alert()` method.

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
	 * Get the spell test
	 * @param  {Function} spell The spell component
	 * @return {String}         The spell text
	 */
	var getSpellText = function (spell) {
		return spell.spell + ': ' + spell.description;
	};

	/**
	 * Cast the spell
	 */
	Constructor.prototype.cast = function () {
		alert(getSpellText(this));
	};

	// Return the constructor
	return Constructor;

})();
```

## Adding private variables and settings

Let's extend our plugin further.

The spell description is helpful when practicing your magic, but when you go to actually use it, you only need to spell text itself.

Let's add a variable inside our revealing module pattern---`includeDescription`. In our `getSpellText()` method, we'll check if that variable is set to `true`. If it is, we'll include the description. If not, we'll only alert the spell itself.

```js
var Spells = (function () {

	'use strict';

	// Include the description in the spell alert
	var includeDescription = true;

	/**
	 * The constructor object
	 */
	var Constructor = function (details) {

		// Add properties to this instance
		this.spell = details.spell;
		this.description = details.description;

	};

	/**
	 * Get the spell test
	 * @param  {Function} spell The spell component
	 * @return {String}         The spell text
	 */
	var getSpellText = function (spell) {

		// If a description should be included, return with description
		if (includeDescription) return spell.spell + ': ' + spell.description;

		// Otherwise, just return the spell text
		return spell.spell;

	};

	/**
	 * Cast the spell
	 */
	Constructor.prototype.cast = function () {
		alert(getSpellText(this));
	};

	// Return the constructor
	return Constructor;

})();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/JawJMN) Change the `includeDescription` variable to `false` to see how casting the spell changes.

## Providing a way to programmatically change settings

Having to manually change the `includeDescription` variable is tedious. Let's add a way to do it programmatically via a method.

All of our public method so far have been added to the `Constructor.prototype`. This attaches them to every new instance of our constructor that we create.

This time, we want to attach our method directly to the `Constructor` function.

Let's create the `Constructor.includeDescription()` method. It will accept a boolean (`true`/`false`) argument, and assign its value to the `includeDescription` variable.

```js
var Spells = (function () {

	'use strict';

	// Include the description in the spell alert
	var includeDescription = true;

	/**
	 * The constructor object
	 */
	var Constructor = function (details) {

		// Add properties to this instance
		this.spell = details.spell;
		this.description = details.description;

	};

	/**
	 * Get the spell test
	 * @param  {Function} spell The spell component
	 * @return {String}         The spell text
	 */
	var getSpellText = function (spell) {

		// If a description should be included, return with description
		if (includeDescription) return spell.spell + ': ' + spell.description;

		// Otherwise, just return the spell text
		return spell.spell;

	};

	/**
	 * Cast the spell
	 */
	Constructor.prototype.cast = function () {
		alert(getSpellText(this));
	};

	/**
	 * Set whether or not spells should include a description
	 * @param  {Boolean} include If true, include a description when the spell is cast
	 */
	Constructor.includeDescription = function (include) {
		includeDescription = include;
	};

	// Return the constructor
	return Constructor;

})();
```

Now, you can do this.

```js
// This will include the description
getWand.cast();

// Change the setting
Spells.includeDescription(false);

// This will only include the spell
getWand.cast();

// Change the setting again
Spells.includeDescription(true);

// This will include the description again
getWand.cast();
```

[Try it yourself on CodePen.](https://codepen.io/cferdinandi/pen/KxbvdM)