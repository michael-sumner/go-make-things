---
title: "Vanilla JS project: creating digital dice"
date: 2020-10-08T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- HTML
- JavaScript
---

Today, I wanted to do something a little different, and recorded myself live coding a vanilla JS project so you can see my process and how I work through things.

I play a [table-top role-playing game I created called Adventure](https://kitchentableadventure.com/).

It requires the use of polyhedral dice, dice with various different numbers of sides. I have a bunch of them lying around my house because I'm a nerd who plays _Dungeons & Dragons_, but not everyone does.

I have variant rules that use simple six-sided dice, but today, I thought I'd created a digital dice rolling app for people who want the full experience but don't own a set of fancy dice.

You can [watch me code](https://vimeo.com/466183904), or read how I did it below.

<div class="fluid-vids"><iframe src="https://player.vimeo.com/video/466183904?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

## Creating a digital dice rolling app

The first thing I did was create buttons for each of the different sizes dice a person can roll: D4, D6, D8, D10, D12, and D20.

I also added a `[data-roll]` attribute to each button, with the die size as a value.

```html
<p>
	<button data-roll="d4">D4</button>
	<button data-roll="d6">D6</button>
	<button data-roll="d8">D8</button>
	<button data-roll="d10">D10</button>
	<button data-roll="d12">D12</button>
	<button data-roll="d20">D20</button>
</p>
```

## Detecting when a button is clicked

In my JavaScript, I added a `click` event listener to the `document`.

This will detect *all clicks* in the UI. In my `clickHandler()` function, I can ignore any clicks that didn't happen on ` [data-roll]` button.

This is an approach called _event delegation_. When listening to the same type of event on more than one or two elements, [its actually better for performance than attaching events to the individual elements](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/).

```js
// Listen for clicks in the DOM
document.addEventListener('click', clickHandler);
```

Inside my `clickHandler()` function, I'm going to get the value of the `[data-roll]` attribute on the clicked element, or `event.target`.

If the clicked elements *doesn't* have the attribute, the `getAttribute()` method will return `null`. I can check to see if there's a value for `d`, and if not, end the `clickHandler()` function.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {

	// Only run on [data-roll] elements
	var d = event.target.getAttribute('data-roll');
	if (!d) return;

};
```

## Rolling the dice

Next, I need dice to actually roll.

I'm going to create an object, using the die sizes as my keys. Each key will use an array of sequential numbers as it's value.

```js
// Dice arrays
var dice = {
	d4: [1, 2, 3, 4],
	d6: [1, 2, 3, 4, 5, 6],
	d8: [1, 2, 3, 4, 5, 6, 7, 8],
	d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
};
```

Now that we have some virtual dice, I need to "roll" them.

To do this, we want to randomly shuffle the numbers in the array and grab the first result. Some languages, like PHP, have a native function that does this. JavaScript does not.

We're going to [grab the `shuffle()` helper function from my Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/shuffle/) and use that. This helper function [uses the Fisher-Yates algorithm to create randomized results](/how-to-shuffle-an-array-with-vanilla-js/).

With that in place, I can `shuffle()` the array in the `dice` object that matches our die size and grab the first result.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {

	// Only run on [data-roll] elements
	var d = event.target.getAttribute('data-roll');
	if (!d) return;

	// Roll the dice
	shuffle(dice[d]);
	console.log(dice[d][0])

};
```

## Showing the roll in the UI

Finally, we need to show the result in the UI.

Let's add a `#result` element into the DOM to inject the rolled number into. I'm also going to [add the `[aria-live]` attribute](/how-and-why-to-use-aria-live/). This tells screen readers that the content of the element is likely to change, so they should listen to and announce those changes.

```html
<div id="result" aria-live="polite"></div>
```

I can use the `document.querySelector()` method to get the `#result` element and save it to a variable.

```js
var result = document.querySelector('#result');
```

Back in my `clickHandler()` function, I'll use the `textContent` method to inject the first number from my shuffled array into the UI.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {

	// Only run on [data-roll] elements
	var d = event.target.getAttribute('data-roll');
	if (!d) return;

	// Roll the dice
	shuffle(dice[d]);

	// Render the result in the UI
	result.textContent = dice[d][0];

};
```

And with that, we've got a functional dice rolling app.

## Doing an initial shuffle

On real polyhedral dice, the numbers aren't sequential. They're all mixed up.

When the app loads, I want to loop through each item in my `dice` object and do an initial `shuffle()` to mix the numbers up before they're rolled.

```js
/**
 * Shuffle the dice on page load
 */
var startingShuffle = function () {
	for (var key in dice) {
		if (dice.hasOwnProperty(key)) {
			shuffle(dice[key]);
		}
	}
};
```

I can run my `startingShuffle()` function as I setup my event listener.

```js
// Shuffle the dice numbers on load
startingShuffle();

// Listen for clicks in the DOM
document.addEventListener('click', clickHandler);
```

## Rolling more than once

In my RPG, [Adventure](https://kitchentableadventure.com), there's a concept called *Best Of* and *Worst Of*.

If you're in a situation that would help or hurt your ability to do something, you roll twice and take the better or worse number. For example, let's say you're trying to jump over something with an injured leg. You'd roll twice and take the worse number.

D&D uses a similar mechanic and calls it *Advantage* and *Disadvantage*.

To support this in the app, I want to add a checkbox to turn the feature on or off. Even though my checkbox is inside my `label`, I'm still using a `for` property as some screen readers don't properly associate the checkbox with the label text without it.

```html
<label for="best-worst">
	<input type="checkbox" id="best-worst">
	Use Best Of/Worst Of
</label>
```

Next, I'm going to use `querySelector()` to store the element to a variable.

```js
var bestWorst = document.querySelector('#best-worst');
```

Now, I need to change how injecting rolls into the UI works. First, I'll setup a new variable, `rolls`.

```js
// Placeholder for die rolls
var rolls;
```

Inside my `clickHandler()` function, I'm going to set `rolls` to an empty array.

After shuffling the `dice` array, I'm going to use `Array.push()` to add the first value to the `rolls` array. Then, if the `bestWorst` checkbox is `checked`, I'm going to `shuffle()` and `push()` again.

Now, `rolls` is an array of my rolled numbers.

Finally, I'll use the `Array.join()` method to convert the array values into a string, using ` - ` as a separator, and I'll inject that string using the `textContent` property.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {

	// Only run on [data-roll] elements
	var d = event.target.getAttribute('data-roll');
	if (!d) return;

	// Clear the rolls array
	rolls = [];

	// Roll the dice
	shuffle(dice[d]);
	rolls.push(dice[d][0]);

	// If best of/worst of, roll again
	if (bestWorst.checked) {
		shuffle(dice[d]);
		rolls.push(dice[d][0]);
	}

	// Render the result in the UI
	result.textContent = rolls.join(' - ');

};
```

## Abstracting rolls

The code to `shuffle()` and `push()` is repeated in two places.

To keep our code a bit more DRY (an acronym that stands for *Don't Repeat Yourself*), I'm going to abstract it out into a function.

```js
/**
 * Roll the dice
 * @param  {String} d The die size to use
 */
var roll = function (d) {
	shuffle(dice[d]);
	rolls.push(dice[d][0]);
};
```

Then, I'll use the `roll()` function inside my `clickHandler()` instead.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {

	// Only run on [data-roll] elements
	var d = event.target.getAttribute('data-roll');
	if (!d) return;

	// Clear the rolls array
	rolls = [];

	// Roll the dice
	roll(d);

	// If best of/worst of, roll again
	if (bestWorst.checked) {
		roll(d);
	}

	// Render the result in the UI
	result.textContent = rolls.join(' - ');

};
```

## See it live

You can see it in action yourself [on the Adventure website](https://kitchentableadventure.com/dice/). You can also [download the source code from GitHub](https://gist.github.com/cferdinandi/7ec16ba39cb4a86d3168b0c169fe2e0a).