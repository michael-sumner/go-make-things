---
title: "Recursion with vanilla JavaScript"
date: 2020-01-08T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, *recursion* is when you call a function from within itself until or unless a condition is a met. Today, let's look at how it works.

## An example

Let's say you have a collection of nested elements, like this:

```html
<div class="bg-1">
	<div class="bg-2">
		<div class="bg-3">
			<div class="bg-4">
				<div class="bg-5">
					<div class="bg-6">
						<div class="bg-7">
							...
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

You want to write a JavaScript function that let's you get the distance in the DOM tree between an element and it's parent. For example, `.bg-5` is two levels above `.bg-7`.

## Creating a helper function

First, let's create a `levelsUp()` helper function.

We'll pass in an `elem` and `selector` as arguments. We'll also add a third argument that we'll use to track the `distance` between our `elem` and an element with the `selector`.

```js
var levelsUp = function (elem, selector, distance) {
	// Do stuff...
};
```

We don't want users to have to set `distance` to `0` every time they run the function.

We'll check to see if a value for `distance` exists, and if not, we'll set it to `0`. Then, we'll use `++` to *increment* our `distance` value by `1`.

```js
var levelsUp = function (elem, selector, distance) {

	// If distance isn't defined yet, set it to 0
	if (!distance) {
		distance = 0;
	}

	// Increase the distance by 1
	distance++;

};
```

Next, we'll get the `parent` of the current `elem` with the `elem.parentNode` property.

```js
var levelsUp = function (elem, selector, distance) {

	// If distance isn't defined yet, set it to 0
	if (!distance) {
		distance = 0;
	}

	// Increase the distance by 1
	distance++;

	// Get the parent of the current element
	var parent = elem.parentNode;

};
```

Now, we can use [the `matches()` method](https://vanillajstoolkit.com/reference/selectors/element-matches/) to check if the `parent` matches the `selector`.

If the `parent` is a match, we can return our `distance`.

```js
var levelsUp = function (elem, selector, distance) {

	// If distance isn't defined yet, set it to 0
	if (!distance) {
		distance = 0;
	}

	// Increase the distance by 1
	distance++;

	// Get the parent of the current element
	var parent = elem.parentNode;

	// If we've reached the parent, return the distance
	if (parent.matches(selector)) return distance;

};
```

## Adding recursion

Now, here's where the recursion comes in.

If the `parent` *isn't* a match, we want to run `levelsUp()` again, using the `parent` as our starting element. We'll also pass in the `selector`, and our current `distance`.

And because the function ultimately needs to return a value, we'll `return` whatever the output of our recursive `levelsUp()` function is.

```js
var levelsUp = function (elem, selector, distance) {

	// If distance isn't defined yet, set it to 0
	if (!distance) {
		distance = 0;
	}

	// Increase the distance by 1
	distance++;

	// Get the parent of the current element
	var parent = elem.parentNode;

	// If we've reached the parent, return the distance
	if (parent.matches(selector)) return distance;

	// Otherwise, recursively run levelsUp() again
	return levelsUp(parent, selector, distance);

};
```

The `levelsUp()` method will run multiple times until it finds a match or hits the `window` element, and will return whatever the final value for `distance` is (or `-1` if no match is found).

And with that, we now have a recursive function.

## One last detail

If there's no matching `selector`, you might end up far enough up the DOM tree that you hit an element that does not support the `matches()` method (like the `window`).

Before trying to use `matches()`, let's first check if the `parent` supports that method. If not, we'll return `-1` and assume there's no match.

```js
var levelsUp = function (elem, selector, distance) {

	// If distance isn't defined yet, set it to 0
	if (!distance) {
		distance = 0;
	}

	// Increase the distance by 1
	distance++;

	// Get the parent of the current element
	var parent = elem.parentNode;

	// If you we reach an element with no matches() method, bail
	if (!parent.matches) return -1;

	// If we've reached the parent, return the distance
	if (parent.matches(selector)) return distance;

	// Otherwise, recursively run levelsUp() again
	return levelsUp(parent, selector, distance);

};
```

## Try it yourself

[I've put together a demo on CodePen for you.](https://codepen.io/cferdinandi/pen/VwYQgKb)

Play around, try it out, and let me know if you have any questions.