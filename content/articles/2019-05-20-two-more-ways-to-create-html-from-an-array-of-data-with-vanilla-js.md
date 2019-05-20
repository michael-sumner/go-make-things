---
title: "Two more ways to create HTML from an array of data with vanilla JS"
date: 2019-05-20T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Last week, we looked at [two different ways to create HTML from an array of data](/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/), and [some performance considerations](/loops-dom-injection-and-performance-with-vanilla-js/) with the techniques.

Today, I wanted to show you two *more* ways to create HTML from array data with vanilla JS.

We'll again be using our array of awesome wizards, and creating an unordered list from it.

```js
var wizards = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];
```

## Creating an element

For this approach, we'll use the `createElement()` method to make our elements, and `appendChild()` to inject them into the DOM.

First, let's create the unordered list.

```js
// Create an unordered list
var list = document.createElement('ul');
```

Then, we'll use the `Array.forEach()` method to loop through each wizard and create a list item. Then, we'll append the list item into our `list` element.

```js
// Create an unordered list
var list = document.createElement('ul');

// Create a list item for each wizard
// and append it to the list
wizards.forEach(function (wizard) {
	var li = document.createElement('li');
	li.textContent = wizard;
	list.appendChild(li);
});
```

You can use `appendChild()` to inject the list itself into the DOM.

```js
var app = document.querySelector('#app');
app.appendChild(list);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/vweLYR)

## Creating a fragment

Creating elements is a good alternative to `innerHTML` when you have third-party or user-provided content.

Injecting third-party content with `innerHTML` exposes you to [the risk of cross-site scripting (XSS) attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/). Using `textContent` to add your content removes that risk.

But, creating HTML with `createElement` can be slow. Fragments are a more performance alternative.

### What's a fragment?

A fragment is a node that's not attached to anything and isn't part of the DOM tree.

Because it's not attached to any thing, unlike nodes created with `createElement()`, the browser has to do less work. Strangely, even though the elements in the previous approach aren't actually in the rendered page yet, the browser is doing work behind the scenes that impacts performacne.

### How it works

This technique is pretty similar to the previous approach, but with a few minor changes.

We'll still create our unordered list, but we'll also use `createDocumentFragment()` to create a new DOM fragment.

```js
// Create an unordered list
var list = document.createElement('ul');

// Create a fragement
var fragment = document.createDocumentFragment();
```

In our loop, instead of appending each list item to the list directly, we'll append it to the fragement.

```js
// Create an unordered list
var list = document.createElement('ul');

// Create a fragement
var fragment = document.createDocumentFragment();

// Create a list item for each wizard
// and append it to the fragment
wizards.forEach(function (wizard) {
	var li = document.createElement('li');
	li.textContent = wizard;
	fragment.appendChild(li);
});
```

After the loop is done, we can append our fragment to the list itself.

Since the fragment isn't any specific type of node, this just adds all of the content we created to the list. There's no other elements in there. The output is the same as our previous approach.

```js
// Create an unordered list
var list = document.createElement('ul');

// Create a fragement
var fragment = document.createDocumentFragment();

// Create a list item for each wizard
// and append it to the fragment
wizards.forEach(function (wizard) {
	var li = document.createElement('li');
	li.textContent = wizard;
	fragment.appendChild(li);
});

// Append the fragement to the list
list.appendChild(fragment);
```

[Here's another demo with this technique.](https://codepen.io/cferdinandi/pen/vweLJV)

## Which one should you use?

For looping over an array of content, fragments. Even with just a few items, it's faster.

Tomorrow, we'll look at some performance comparisons for the various techniques we've covered in this series.