---
title: "How to convert the jQuery append() function into vanilla JS"
date: 2020-10-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I recently had a few folks tell me that one of their biggest challenges is converting their old jQuery code into vanilla JS. Over the next few days, I want to take a look at some jQuery methods, and show you how to convert them into vanilla JS.

Today, we're starting things off with the `append()` method.

## What jQuery's `append()` does

The jQuery `append()` method lets you insert content (either an element or a string) at the end of each element in a set of matching elements.

For example, lets say you have a list of D&D classes, like this.

```html
<ul id="list">
	<li>Bard</li>
	<li>Druid</li>
	<li>Fighter</li>
	<li>Rogue</li>
</ul>
```

You could add the word `Class` after each one like this.

```js
$('#list li').append(' Class');
```

You could also add an element, `<p>Class</p>`, after each one like this.

```js
$('#list li').append('<p>Class</p>');
```

The method also lets you take an existing element in the UI and move it.

```js
$('#list li').append($('.some-other-element'));
```


Let's look at how to do this with vanilla JS.

## The vanilla JS `append()` method

Vanilla JS also has an `append()` method. It works mostly the same way, but has some small but important differences.

First, you call it on just _one_ element rather than a set of elements. I personally find this to be a benefit over the jQuery approach, because it gives you  more control.

```js
// Get all list items
var listItems = document.querySelectorAll('#list li');

// Append to the first matching item
listItems[0].append(' Class');
```

If you want to append to _all_ items, you can [use the `Array.from()` method or the `Array.prototype.slice.call()` hack](/using-array-methods-with-nodelists-in-vanilla-js/) to convert your NodeList into an array, and then use the `Array.forEach()` method to loop through each one.

```js
Array.from(listItems).forEach(function (item) {
	item.append(' Class');
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/eYzmrzg)

## Appending HTML

The jQuery `append()` method automatically converts HTML strings into actual HTML nodes. Unfortunately, the vanilla JS version does not.

To append an element, like `<p>Class</p>`, you'll need to [create the HTML elements using the `createElement()` method](/creating-elements-with-vanilla-javascript/), then add your text content to it.

```js
// Create a paragraph and add some text
var p = document.createElement('p');
p.textContent = 'Class';
```

Then, you can [clone and append it for each item using the `cloneNode()` method](/how-to-copy-or-clone-an-element-with-vanilla-js/).

```js
Array.from(listItems).forEach(function (item) {
	item.append(p.cloneNode(true));
});
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/MWeYGJb)

## Browser compatibility

The `append()` method works in all modern browsers, but not IE. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/append/)

The `Array.from()` method also lacks IE support, and [there's also a polyfill available](https://vanillajstoolkit.com/polyfills/arrayfrom/). The `createElement()` and `cloneNode()` methods works back to at least IE6.