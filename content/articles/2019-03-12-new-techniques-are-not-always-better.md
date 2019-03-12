---
title: "New techniques are not always better"
date: 2019-03-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [how you can chain a few array methods to achieve a desired result](/chaining-array-methods-in-vanilla-js/). Today, I wanted to explore why new techniques are not always better, and when it might not make sense to use them.

## Recap

In the chaining article, we had a list of wizards.

```js
var wizards = [
	{
		name: 'Harry Potter',
		house: 'Gryfindor'
	},
	{
		name: 'Cedric Diggory',
		house: 'Hufflepuff'
	},
	{
		name: 'Tonks',
		house: 'Hufflepuff'
	},
	{
		name: 'Draco Malfoy',
		house: 'Slitherin'
	},
	{
		name: 'Ronald Weasley',
		house: 'Gryfindor'
	},
	{
		name: 'Hermione Granger',
		house: 'Gryfindor'
	}
];
```

And, we wanted to get an array of names of *just* the wizards in Hufflepuff. We did this.

```js
var hufflepuff = wizards.filter(function (wizard) {
	return wizard.house === 'Hufflepuff';
}).map(function (wizard) {
	return wizard.name;
});
```

## An older approach

You can do the same thing with a `forEach()` loop.

```js
var hufflepuff = [];
wizards.forEach(function (wizard) {
	if (wizard.house === 'Hufflepuff') {
		hufflepuff.push(wizard.name);
	}
});
```

While this example is one line longer, it involves fewer loops or steps (the array is only manipulated once). You could also argue that it's more obvious what it's doing: looping through each item, and pushing the names of wizards in Hufflepuff to a new array.

You can even write it in one *less* line that the other example by dropping the curly brackets (though I don't visually like this one as much).

```js
var hufflepuff = [];
wizards.forEach(function (wizard) {
	if (wizard.house === 'Hufflepuff') hufflepuff.push(wizard.name);
});
```

## Sometimes `for` loops are better than `forEach()`

Let's say you wanted to create a list of all wizards who appear *before* a Slitherin in the list.

With a `forEach()` loop, there's no way to quit halfway through. We need to create a variable that tells us if a Slitherin has shown up or not yet, and if so, just quit and do nothing.

```js
var wizardsUntil = [];
var slitherin = false;
wizards.forEach(function (wizard) {

	// Quit if there's been a slitherin already
	if (slitherin) return;

	// Check if the wizard is in Slitherin
	if (wizard.house === 'Slitherin') {
		slitherin = true;
		return;
	}

	// Otherwise, push to the array
	wizardsUntil.push(wizard.name);

});
```

But with an old-school `for` loop, you can quit mid-loop using `break`. Look how much shorter and simpler this is.

```js
var wizardsUntil = [];

for (var i = 0; i < wizards.length; i++) {

	// Check if the wizard is in Slitherin
	if (wizards[i].house === 'Slitherin') break;

	// Otherwise, push to the array
	wizardsUntil.push(wizards[i].name);

}
```

## Use the right tool for the job

Often, newer methods do a lot of work for you and make tasks easier to accomplish. But sometimes, older methods are actually better.

At the end of the day, these are all just tools. Use the ones that you're most comfortable working with and that best suite the task you're trying to accomplish.