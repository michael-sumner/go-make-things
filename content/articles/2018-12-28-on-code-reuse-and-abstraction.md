---
title: "On code reuse and abstraction"
date: 2018-12-28T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, [Sam Ferree tweeted](https://mobile.twitter.com/sam_ferree/status/1074678991628484608):

> I’m calling for an end to holy war against code duplication. We convince young developers and engineers that it’s the worst thing ever, when time teaches all of us that it is, the vast majority of the time, duplication preferable to dependency.

To an extent, he's right.

I see many of my students get derailed early on by trying to optimize their code before they have it working. **Ugly code that works is better than perfectly written code that doesn't.**

*But...* I also see beginners craft code that repeats itself. A lot.

Maintaining code like that is a nightmare in the long run. I know because I've done it myself. We all have.

Also, the opposite of *duplication* isn't *dependency*. It's *reduction*.

## A process

[Tom Forsyth responded to Sam:](https://mobile.twitter.com/tom_forsyth/status/1075827318373834752)

> My usual process is this:
>
> 1. Write code.
> 2. Copy-paste code, modify for new use.
> 3. Copy-paste code again, modify for new use.
> 4. THEN WHEN THEY ALL WORK consider if all three uses could be sensibly merged.
>
> ...and quite a lot of times the answer is "no" because of divergent uses.

This is my process, too!

But for me, the answer is typically, "yes, but I need to reduce what each function does first." Each function should do as a little as possible.

## An example

Let's say you were doing some DOM manipulation.

In one case, you want to get all elements with the `.sandwich` class, get just the ones that have text longer than 50 characters, and add a `.highlight` class to them.

In another case, you want to get all elements with the `.submarine` class, get just the ones that text *shorter* than 25 characters, and add a `data-float` attribute to them.

Here's what you're initial code might look like.

```js
// Add .highlight class to .sandwiches with text longer than 50 characters
var highlightSandwiches = function () {

	// Get all sandwiches
	var sandwiches = document.querySelectorAll('.sandwich');

	// Convert to an array and filter the results
	// Look for elements with textContent greater than 50 characters
	var filtered = Array.from(sandwiches).filter(function (sandwich) {
		return sandwich.textContent.length > 50;
	});

	// Add the .highlight class
	filtered.forEach(function (item) {
		item.classList.add('highlight');
	});

};

// Add data-float attribute to .submarine elements with text shorter than 25 characters
var floatSubmarines = function () {

	// Get all submarines
	var submarines = document.querySelectorAll('.submarine');

	// Convert to an array and filter the results
	// Look for elements with textContent less than 25 characters
	var filtered = Array.from(submarines).filter(function (submarine) {
		return submarine.textContent.length < 25;
	});

	// Add the data-float attribute
	filtered.forEach(function (item) {
		item.setAttribute('data-float', true);
	});

};

// Run functions
highlightSandwiches();
floatSubmarines();
```

### Different, but the same

Each function does different things, but they're generally following a similar pattern:

1. Get elements
2. Filter them based on some criteria
3. Modify the filtered list

This is the perfect candidates for abstraction. But to make it work, we need to reduce what each function does a bit.

### Abstracting

Here's how *I* would modify the code. Your approach might be different, and that's ok!

First up, both of these use cases could be handled by one function that uses arguments to modify behavior. Let's create a `filterAndAddProperties()` function.

```js
var filterAndAddProperties = function () {
	// ...
};
```

Inside, let's paste the code from the `highlightSandwiches()` function as a template to modify.

```js
var filterAndAddProperties = function () {

	// Get all sandwiches
	var sandwiches = document.querySelectorAll('.sandwich');

	// Convert to an array and filter the results
	// Look for elements with textContent greater than 50 characters
	var filtered = Array.from(sandwiches).filter(function (sandwich) {
		return sandwich.textContent.length > 50;
	});

	// Add the .highlight class
	filtered.forEach(function (item) {
		item.classList.add('highlight');
	});

};
```

We need to get items from the DOM.

Let's add a `selector` argument to pass into `querySelectorAll()`, and change `sandwiches` to `elements` to make it more generalized.

```js
var filterAndAddProperties = function (selector) {

	// Get all matching elements
	var elements = document.querySelectorAll(selector);

	// Convert to an array and filter the results
	// Look for elements with textContent greater than 50 characters
	var filtered = Array.from(sandwiches).filter(function (sandwich) {
		return sandwich.textContent.length > 50;
	});

	// Add the .highlight class
	filtered.forEach(function (item) {
		item.classList.add('highlight');
	});

};
```

Next, we need to reduce our items. Let's add an argument for the number of characters.

In `highlightSandwiches()`, we want items with at least a certain number of characters, but in `floatSubmarine()`, we want items with *less* than a number of characters. We can add an optional boolean argument, `lessThan`. If `true`, we'll return items with less than the number of characters instead of the default greater than.

```js
var filterAndAddProperties = function (selector, characters, lessThan) {

	// Get all matching elements
	var elements = document.querySelectorAll(selector);

	// Convert to an array and filter the results
	// Look for elements with textContent greater than 50 characters
	var filtered = Array.from(elements).filter(function (element) {
		if (lessThan) {
			return element.textContent < characters;
		}
		return element.textContent.length > characters;
	});

	// Add the .highlight class
	filtered.forEach(function (item) {
		item.classList.add('highlight');
	});

};
```

Finally, we need to add an attribute of some sort. Sometimes it's a class. Sometimes it's a data attribute. In another use case we haven't though of yet, it could be something else.

The simplest way to handle this is with a callback function.

Since we want `lessThan` to be optional, let's add this argument right after `selector`. We can also add a default `character` count to make that optional, too.

```js
var filterAndAddProperties = function (selector, callback, characters, lessThan) {

	// Get all matching elements
	var elements = document.querySelectorAll(selector);

	// Set default number of characters if not provided
	if (!characters) {
		characters = 50;
	}

	// Convert to an array and filter the results
	// Look for elements with textContent greater than 50 characters
	var filtered = Array.from(elements).filter(function (element) {
		if (lessThan) {
			return element.textContent < characters;
		}
		return element.textContent.length > characters;
	});

	// Add the .highlight class
	filtered.forEach(function (item) {
		callback(item);
	});

};
```

Now we can use it like this.

```js
// Highlight sandwiches
filterAndAddProperties('.sandwich', function (sandwich) {
	sandwich.classList.add('highlight');
});

// Float submarines
filterAndAddProperties('.submarine', function (submarine) {
	submarine.setAttribute('data-float', true);
}, 25, true);
```

We've gone from 41 lines of code (with comments) to 35.

*And*, we've added the ability to expand with other items in the future. For example, if you wanted to log the ID of an `.egg` elements with more than `35` characters, you could do this.

```js
filterAndAddProperties('.egg', function (egg) {
	console.log(egg.id);
}, 35);
```

Abstraction FTW!