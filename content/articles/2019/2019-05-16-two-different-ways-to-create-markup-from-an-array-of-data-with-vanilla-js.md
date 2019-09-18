---
title: "Two different ways to create HTML from an array of data with vanilla JS"
date: 2019-05-16T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Let's say you have an array of your favorite wizards, like this.

```js
var wizards = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];
```

Today, I'm going to show you two different ways to take that array and convert it into an an unordered (or bulleted) list.

## Using `Array.forEach()`

The most straightforward approach, is to loop through each item with `Array.forEach()` and push it to a string.

For this approach, we'll first setup an empty string&mdash;`html`&mdash;to add each item to.

```js
// Setup the HTML string
var html = '';
```

Then, we'll loop through each item, wrap it in a list item (`li`), and add it to the string with *string concatenation*.

```js
// Setup the HTML string
var html = '';

// Loop through each wizard and create a list item
wizards.forEach(function (wizard) {
	// += adds an item to the existing value
	// It's the same as writing this:
	// html = html + '<li>' + wizard + '</li>';
	html += '<li>' + wizard + '</li>';
});
```

And finally, we need to wrap all of our list items in an actual list element.

```js
// Setup the HTML string
var html = '';

// Loop through each wizard and create a list item
wizards.forEach(function (wizard) {
	// += adds an item to the existing value
	// It's the same as writing this:
	// html = html + '<li>' + wizard + '</li>';
	html += '<li>' + wizard + '</li>';
});

// Wrap items in an unordered list
html = '<ul>' + html + '</ul>';
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/mYmbgL)

Most of my students like this approach when they're just learning because it's very clear what exactly is happening, and in what ordered.

## Using `Array.map()` and `Array.join()`

Now, let's look at another approach that takes all three of those steps and smushes them down into one.

For this technique, let's first take our array of wizards and use `Array.map()` to create a new array with our list items as strings. [Here's a primer on `Array.map()`](/what-array.map-does-in-vanilla-js/) if you're not familiar with what it does.

```js
var html = wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
});
```

At this point, we now have an array of list items. [You can play around with this here.](https://codepen.io/cferdinandi/pen/QRvWLX)

```js
// logs ["<li>Hermione</li>", "<li>Neville</li>", "<li>Gandalf</li>", "<li>Radagast</li>"]
console.log(html);
```

Now, we can use [the `Array.join()` method](https://vanillajstoolkit.com/reference/arrays/#array-join) to combine all of our array items into a single string. This can be chained directly to the `map()` method, because it returns an array.

The `Array.join()` method uses a comma between items by default. We'll pass in an empty string to use as a separator instead.

```js
var html = wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
}).join('');
```

Now that we have a string of list items, the last thing to do is wrap it with our unordered list.

```js
var html = '<ul>' + wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
}).join('') + '</ul>';
```

Let's format that a bit nicer so that it's easier to read.

```js
var html =
	'<ul>' +
		wizards.map(function (wizard) {
			return '<li>' + wizard + '</li>';
		}).join('') +
	'</ul>';
```

[Here's this technique in action.](https://codepen.io/cferdinandi/pen/ZNKELp)

I personally prefer this approach because it's fewer steps.

## Which one should you use

Either approach works fine, and they're about equally performant.

As I've said before, [readability is more important than brevity](/readability-is-more-important-than-brevity/), so whichever one is easier for you to read and make sense of is the right one to use.