---
title: "Getting the first and last items in a set with vanilla JS"
date: 2019-10-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In jQuery, you can use the `first()` and `last()` methods to get the first and last items in a set.

For example, imagine you had a list of awesome wizards, like this.

```html
<ul>
	<li>Hermione</li>
	<li>Harry Potter</li>
	<li>Neville</li>
	<li>Dumbledore</li>
</ul>
```

If you used jQuery to get all of those list items, the `first()` method would match against Hermione, and the `last()` method would match against Dumbledore.

```js
var wizards = $('li');

// returns Hermione
wizards.first();

// returns Dumbledore
wizards.last();
```

To be frank, this is silly. You don't need helper methods for this. Let's look at how you'd do this in vanilla JS.

First, we'll use `querySelectorAll()` to get all matching elements.

```js
var wizards = document.querySelectorAll('li');
```

Then, we can use *bracket notation* to get items from the NodeList by their index.

The first item has an index of `0`, while the last has an index of the total length of the list, minus `1` (since indexes start at `0`).

```js
// returns Hermione
wizards[0];

// returns Dumbledore
wizards[wizards.length - 1];
```

And that's it.