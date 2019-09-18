---
title: "Chaining array methods in vanilla JS"
date: 2019-03-08T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've been looking at the various array methods and how they work under-the-hood. Because many of them return an array, they can be chained together.

## An example

Let's again look at our list of Wizards.

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
		name: 'Ronald Weasley',
		house: 'Gryfindor'
	},
	{
		name: 'Hermione Granger',
		house: 'Gryfindor'
	}
];
```

Let's say you wanted to get an array containing *only the names* of wizards from Hufflepuff.

## Chaining `Array.filter()` and `Array.map()`

We can use `Array.filter()` to reduce the list to only wizards in Huffelpuff, and then `Array.map()` to create a new array of only names.

```js
var hufflepuff = wizards.filter(function (wizard) {
	return wizard.house === 'Hufflepuff';
}).map(function (wizard) {
	return wizard.name;
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/VRbGxK)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js" data-user="cferdinandi" data-slug-hash="VRbGxK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Chaining array methods"></p>