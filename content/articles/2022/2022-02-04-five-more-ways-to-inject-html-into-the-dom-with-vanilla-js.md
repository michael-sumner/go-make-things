---
title: Five more ways to inject HTML into the dom with vanilla JavaScript
date: 2022-02-04T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [four ways to inject text and HTML into the DOM with vanilla JS](/four-different-ways-to-inject-text-and-html-into-an-element-with-vanilla-javascript/). Today, we're going to look at five more.

Let's dig in!

## The `document.createElement()` method

You can use the `document.createElement()` method to create an element. Pass in the element to create, without angled brackets (`<>`), as an argument

```js
let div = document.createElement('div');
let link = document.createElement('a');
let article = document.createElement('article');
```

You can use any valid HTML tag, and even create custom ones, too. For example, these also work.

```js
let chicken = document.createElement('chicken'); // <chicken></chicken>
let placeholder = document.createElement('_'); // <_></_>
```

You can manipulate an element created with `document.createElement()` like you would any other element in the DOM. Add classes, attributes, styles, and more.

```js
let div = document.createElement('div');
div.textContent = 'Hello, world!';
div.className = 'new-div';
div.id = 'new-div';
div.setAttribute('data-div', 'new');
div.style.color = '#fff';
div.style.backgroundColor = 'rebeccapurple';
```

[Here's a demo of the `document.createElement()` method.](https://codepen.io/cferdinandi/pen/qBVaVYB?editors=0011)



## The `Node.before()` method

The `Node.before()` method inserts elements and strings before another element. Call the `Node.before()` method on the node you want to insert before, and pass in one or more new elements or strings as arguments.

```html
<div id="app">Good evening</div>
```

```js
// Create a new element
let p = document.createElement('p');
p.textContent = 'Hello!';

// Get the target node
let app = document.querySelector('#app');

// Insert the new node before the target node
// <p>Hello!</p><div id="app">Good evening</div>
app.before(p);

// You can inject more than one item by passing in multiple arguments
// <p>Hello!</p>What's poppin'<div id="app">Good evening</div>
app.before(p, `What's poppin?`);
```

[Here's a demo of the `Node.before()` method.](https://codepen.io/cferdinandi/pen/bGYwYMY?editors=1010)



## The `Node.after()` method

The `Node.after()` method inserts elements and strings after another element. Call the `Node.after()` method on the node you want to insert after, and pass in one or more new elements or strings as arguments.

```html
<div id="app">Good morning</div>
```

```js
// Create a new element
let p = document.createElement('p');
p.textContent = 'Hello!';

// Get the target node
let app = document.querySelector('#app');

// Insert the new node after the target node
// <div id="app">Good morning</div><p>Hello!</p>
app.after(p);

// You can inject more than one item by passing in multiple arguments
// <div id="app">Good morning</div><p>Hello!</p>What's poppin'
app.after(p, `What's poppin?`);
```

[Here's a demo of the `Node.after()` method.](https://codepen.io/cferdinandi/pen/JjOROZP?editors=1010)



## The `Element.append()` method

You can use the `Element.append()` method to insert one or more elements or strings at the end of a set elements inside a shared parent. Call the `Element.append()` method on the target node, and pass in one or more new elements or strings as arguments.

```html
<ul id="list">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>
```

```js
// Create a new element
let li = document.createElement('li');
li.textContent = 'I am new here.';

// Create another new element
let liToo = document.createElement('li');
liToo.textContent = `I'm new, too!`;

// Get the parent node
let list = document.querySelector('#list');

// Insert the new node after the last element in the parent node
// ...<li>Item 3</li><li>I am new here.</li>
list.append(li);

// You can inject more than one item by passing in multiple arguments
// ...<li>Item 3</li><li>I am new here.</li><li>I'm new, too!</li>
list.append(li, liToo);
```

[Here's a demo of the `Element.append()` method.](https://codepen.io/cferdinandi/pen/eYedeKb?editors=1010)



## The `Element.prepend()` method

You can use the `Element.prepend()` method to insert one or more elements or strings at the beginning of a set elements inside a shared parent. Call the `Element.prepend()` method on the target node, and pass in one or more new elements or strings as arguments.

```html
<ul id="list">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>
```

```js
// Create a new element
let li = document.createElement('li');
li.textContent = 'I am new here.';

// Create another new element
let liToo = document.createElement('li');
liToo.textContent = `I'm new, too!`;

// Get the parent node
let list = document.querySelector('#list');

// Insert the new node before the first element in the parent node
// <li>I am new here.</li><li>Item 1</li>...
list.prepend(li);

// You can inject more than one item by passing in multiple arguments
// <li>I am new here.</li><li>I'm new, too!</li><li>Item 1</li>...
list.prepend(li, liToo);
```

[Here's a demo of the `Element.prepend()` method.](https://codepen.io/cferdinandi/pen/gOXwXdW?editors=1010)



## The `Node.replaceWith()` method

The `Node.replaceWith()` method replaces an element (and all of its HTML elements and content) with another. Call the `Node.replaceWith()` method on the target node, and pass in one or more elements or strings as arguments.

```html
<h1>Good evening</h1>
```

```js
// Get the target element
let h1 = document.querySelector('h1');

// Create a new element
let p = document.createElement('p');
p.textContent = 'Good morning';

// Replace the target with the new element
// <p>Good morning</p>
h1.replaceWith(p);

// You can replace it with more than one item by passing in multiple arguments
// <p>Good morning</p>How are you today?
h1.replaceWith(p, 'How are you today?');
```

[Here's a demo of the `Node.replaceWith()` method.](https://codepen.io/cferdinandi/pen/BamLmqw?editors=1010)