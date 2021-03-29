---
title: "Live vs. static NodeLists and HTMLCollections in vanilla JS"
date: 2021-03-29T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

In JavaScript, NodeLists and HTMLCollections are two types of array-like collections of objects. They work similarly, with a few notable differences, and can both be looped through with a `for...of` loop.

Why there are so many different array-like collections of things in JavaScript is another article for another day. Today, I want to talk about the difference between _live_ and _static_ collections of elements in JavaScript.

Let's dig in!

## Some sample HTML

Let's imagine you have a `main` element with a group of `button` elements in it, like this.

```html
<main>
	<button>1</button>
	<button>2</button>
	<button>3</button>
</main>
```

You've used the `document.querySelector()` method to get get the `main` element, and now you want to find all of the buttons inside it.

```js
let main = document.querySelector('main');
```

Lets look at two ways to do that.

## Static collections

The `document.querySelectorAll()` returns a _static_ NodeList. That means that it doesn't change, even if the UI does.

```js
// Static NodeList
let btnsStatic = main.querySelectorAll('button');

// After 3 seconds, add a new button
setTimeout(function () {

	// Inject a new button
	let btn = document.createElement('button');
	btn.textContent = '4';
	main.append(btn);

	// logs the first three buttons, but not the new one
	console.log(btnsStatic);

}, 3000);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/wvgzWpW)

## Live collections

The `Element.getElementsByTagName()` method returns a _live_ HTMLCollection. If the DOM changes after you use the method, the HTMLCollection is updated to reflect the current UI.

```js
// Live NodeList
let btnsLive = main.getElementsByTagName('button');

// After 3 seconds, add a new button
setTimeout(function () {

	// Inject a new button
	let btn = document.createElement('button');
	btn.textContent = '4';
	main.append(btn);

	// logs all four buttons, including the new one
	console.log(btnsLive);

}, 3000);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/VwPKjXJ)

## Which one is better?

Like all things code, it depends on what you're trying to do.

I typically use _static_ lists simply because I love the simplicity of `document.querySelectorAll()` and use it for almost everything. But if you have a situation where the DOM is going to be changing and you specifically _want_ your collection of elements to reflect the current UI, a method that returns a _live_ list is a better option.

Use them with caution, however. You can find yourself in a situation where you crash the browser by creating an infinite loop.

For example, here, I loop through each element in our collection, create a new button, and inject after the current one. Because `btnsLive` is a live HTMLCollection, the next element in the loop is always the one I just created and the loop never ends.

```js
for (let btn of btnsLive) {
	let b = document.createElement('button');
	b.textContent = parseFloat(btn.innerText) + 1;
	btn.after(b);
}
```