---
title: How to move elements around in the DOM with vanilla JavaScript
date: 2022-10-13T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

There are handful of ways you can move elements around in the DOM using JavaScript. Today, we're going to look at a few them, and how to decide when to use which one.

Let's dig in!

## A sample UI

Let's imagine we have a UI that looks like this.

```html
<ul id="wizards">
	<li>Gandalf</li>
	<li>Radagast</li>
	<li>Merlin</li>
</ul>

<ul id="witches">
	<li>Ursula</li>
	<li>Morgana</li>
	<li>Hermione</li>
</ul>

<p id="msg">These are some magical folks</p>
```

We want to move some elements around.

## How to move one element before another

Let's say we wanted to move the `#msg` paragraph to the top of our UI, before the `#wizards` list.

We can use the `Element.before()` method for that.

You run the method on your target element (`#wizards`), and pass in the node or nodes to put before it (`#msg`) as an argument.

```js
// Get the DOM nodes
let msg = document.querySelector('#msg');
let list = document.querySelector('#wizards');

// Move stuff
list.before(msg);
```

[Here's a demo of the `Element.before()` method](https://codepen.io/cferdinandi/pen/rNvPGbX)

## How to move one element after another

Let's imagine that we instead want to switch the `#wizards` and `#witches` lists.

We _could_ use the `Element.before()` method for that, moving the `#witches` list before the `#wizards` element. Or, we could use the `Element.after()` method to move the the `#wizards` list _after_ the `#witches` list.

We're ultimately getting the same result, just in a slightly different way.

Once again, you call the method on the target element, and pass in the elements to move as arguments.

```js
// Get the DOM nodes
let wizards = document.querySelector('#wizards');
let witches = document.querySelector('#witches');

// Move stuff
witches.after(wizards);
```

[Here's a demo of the `Element.after()` method.](https://codepen.io/cferdinandi/pen/oNdmGrz)

## How to move an element before all of the child elements in a parent

Let's say you wanted to move `Gandalf` from the `#wizards` list to the start of the `#witches` list.

For that, we can use the `Element.prepend()` method. You call it on the target element, and pass in the elements to prepend as arguments.

```js
// Get the DOM nodes
let gandalf = document.querySelector('#wizards li');
let list = document.querySelector('#witches');

// Move stuff
list.prepend(gandalf);
```

[Here's a demo of the `Element.prepend()` method.](https://codepen.io/cferdinandi/pen/NWMowWL)

## How to move an element after all of the child elements in a parent

Let's imagine that you instead wanted to move `Ursula` to the end of list of `#wizards`. For that, we can use `Element.append()`.

Call it on the target element, and pass in the elements to append as arguments.

```js
// Get the DOM nodes
let ursula = document.querySelector('#witches li');
let list = document.querySelector('#wizards');

// Move stuff
list.append(ursula);
```

[Here's a demo of the `Element.append()` method.](https://codepen.io/cferdinandi/pen/RwyvjPL)

## There's often multiple ways to move things

As you can probably tell, you could approach some of these problems using multiple approaches.

For example, to move `Gandalf`, we could also have targeted the first list item in the `#witches` list and used the `Element.before()` method.

One approach isn't inherently better than the other, so choose the one that's most readable to you and best fits how you think about what you're asking the code to do.