---
title: "The difference between the Node.textContent and Element.innerText properties in vanilla JS"
date: 2021-02-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Vanilla JS exposes two properties you can use to get and set text on an element: `Node.textContent` and `Element.innerText`.

At first glance, they appear to do the same exact thing, but there are a few subtle but important differences between them. Today, we're going to look at what they do, how they're the same, and how they're different.

Let's dig in.

## How they're the same

Let's say you have an element like this.

```html
<p id="sandwich">I love a good tuna sandwich!</p>
```

Both the `Node.textContent` and `Element.innerText` properties can be used to get the text from the `#sandwich` element.

```js
let sandwich = document.querySelector('#sandwich');

// returns "I love a good tuna sandwich!"
let text1 = sandwich.textContent;

// also returns "I love a good tuna sandwich!"
let text2 = sandwich.innerText;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/mdOeRWd)

If there's markup _inside_ the element, both properties also ignore it.

```html
<p id="sandwich">I love a good <strong>tuna</strong> sandwich!</p>
```

```js
// returns "I love a good tuna sandwich!"
let textHTML1 = sandwich.textContent;

// also returns "I love a good tuna sandwich!"
let textHTML2 = sandwich.innerText;
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/bGBVgWB)

And both properties can be used to set text inside an element as well.

```js
// Replace the text in an element
// <p id="sandwich">Hello, world!</p>
sandwich.textContent = 'Hello, world!';

// You can also append with +=
// <p id="sandwich">Hello, world! And hi, Universe!</p>
sandwich.innerText += ' And hi, Universe!';
```

[Here's yet another demo.](https://codepen.io/cferdinandi/pen/GRNprvJf)

## How they're different

So, they appear to do exactly the same thing. What's different about them?

The `Node.textContent` property gets _all_ of the text content, including content inside elements that are not visually rendered on the page. The `Element.innerText` property returns only rendered text, similar to what a user would be able to select with their cursor or the keyboard when highlighting text.

```html
<div class="greeting">
	<style type="text/css">
		p {
			color: rebeccapurple;
		}
	</style>
	<p hidden>This is not rendered.</p>
	<p>Hello world!</p>
</div>
```

```javascript
let greeting = document.querySelector('.greeting');

// Get text content
// returns "p {color: rebeccapurple;} This is not rendered. Hello world!"
let text1 = greeting.textContent;

// Get text content
// returns "Hello world!"
let text2 = greeting.innerText;
```

[Here's one last demo for you.](https://codepen.io/cferdinandi/pen/KKNdayX)