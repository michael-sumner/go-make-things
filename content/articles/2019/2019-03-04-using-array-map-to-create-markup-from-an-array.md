---
title: "Using Array.map() to create markup from an array with vanilla JS"
date: 2019-03-04T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

One thing you often need to do when building some UI elements with JavaScript is take some data from an array and create markup from it.

For example, let's say I have an array of awesome wizards, like this.

```js
var wizards = ['Hermione', 'Neville', 'Gandalf'];
```

And I want to create an unordered list from it, like this.

```html
<ul>
	<li>Hermione</li>
	<li>Neville</li>
	<li>Gandalf</li>
</ul>
```

My favorite way to do this is with the `Array.map()` and `join()` methods. A lot of my students find this confusing when they first see it, so I thought I'd explain how it works today.

## Transforming array content

The `Array.prototype.map()` method let's you take an array of data and create a new array from it while modifying each entry.

We can use it to take each name in the `wizards` array and create a new array where each name is wrapped in a list item (`<li></li>`). In the `Array.map()` callback method, you `return` the value you want in the new array.

```js
wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
});
```

## Creating a single string from the array

Next, we need each of those list items combined into a single string.

We can use the `join()` method for that. It normally separates each item with a comma (`,`), but we can pass in an empty string to use as a delimiter instead.

```js
wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
}).join('');
```

## Injecting into the DOM

Finally, we'll add our markup into the DOM with `innerHTML`, same as you might with other methods. We'll need to wrap it in an unordered list (`<ul></ul>`), too.

```js
var app = document.querySelector('#app');
app.innerHTML = '<ul>' + wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
}).join('') + '</ul>';
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/gEMJQm)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="gEMJQm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Array.map() and creating markup"></p>

*__Note:__ don't forget to [sanitize your HTML](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/) if you're working with third-party or user-generated data.*

## Why I like this method

Other approaches, like looping through each item and pushing it to a string, are still totally valid.

I like this method because it makes it easier to create my markup and set it in one swoop. If you have an approach that's working for you, don't feel like you need to switch.