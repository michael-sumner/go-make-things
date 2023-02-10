---
title: Static versus live NodeLists and HTMLCollections in vanilla JavaScript
date: 2022-07-25T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

`NodeLists` and `HTMLCollections` are two types of array-like collections of objects. They work similarly, with a few notable differences, and can both be looped through with a `for...of` loop.

Today, I want to talk about the difference between static and live collections of DOM nodes in JavaScript. Let's dig in!

(_Why there are so many different array-like collections of things in JavaScript is another article for another day._)

## Sample HTML

Let's imagine you have some HTML that looks like this.

```html
<div id="sandwiches">
	<p class="sandwich" id="tuna">Tuna</p>
	<p class="sandwich" id="pbj">PB&J</p>
	<p class="sandwich" id="turkey">Turkey</p>
</div>
```

You want to get the `.sandwich` elements so that you can work with them.

## Static Collections

The `document.querySelectorAll()` method returns a _static collection_.

The `NodeList` that you back never changes, even if the HTML elements inside the collection no longer reflect the selector you used when you first ran it.

```js
// A NodeList with the three .sandwich elements
let sandwiches = document.querySelectorAll('.sandwich');
```

Let's say you used [the `Element.classList.remove()` method](/how-to-add-and-remove-classes-with-vanilla-js/) to remove the `.sandwich` method from the `#pbj` element.

```js
// Remove the .sandwich class from #pbj
let pbj = document.querySelector('#pbj');
pbj.classList.remove('sandwich');
```

The `NodeList` assigned to the `sandwiches` variable still contains the `#pbj` element, even though it no longer has the `.sandwich` class.

It's a _static collection_, so it doesn't change, even if the DOM does.

[Here's a demo.](https://codepen.io/cferdinandi/pen/BardwGr?editors=1111)

## Live Collections

By contrast, the `Element.getElementsByTagName()` method and `Element.children` property both return a _live collection_.

If you assign the returned `HTMLCollection` to a variable and the DOM changes afterwards, the `HTMLCollection` automatically updates to match the current state of the DOM.

```js
// An HTML collection with the three .sandwich elements
let sandwiches = document.getElementsByTagName('p');
```

If you removed the `#pbj` element from the DOM with the `Element.remove()` method, the `HTMLCollection` assigned to `sandwiches` would only contain two elements.

```js
// Remove the .sandwich class from #pbj
let pbj = document.querySelector('#pbj');
pbj.remove('.sandwich');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/vYRJePZ?editors=1111)

## Which type of collection is better?

It depends!

Typically, having a list that remains fixed is a good thing. But sometimes you might want a list that automatically updates to reflect the current UI.

Understanding whether your selector method returns a static or live collection can also help prevent unintended side-effects and bugs.