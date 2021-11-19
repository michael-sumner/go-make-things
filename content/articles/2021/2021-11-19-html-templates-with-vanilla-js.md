---
title: HTML templates with vanilla JavaScript
date: 2021-11-19T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

One of my new subscribers asked me how to use a chunk of HTML as a template that you can add data from another source (like an API) to. So today, we're going to explore that.

Let's dig in!

## The `template` element

A few years back, HTML added the `template` element. It's purpose is to hold HTML that shouldn't be rendered as-is, but is intended to be used as a template with JavaScript later.

Here, the `#list-item` element contains a list item that can be used to generate a list of wizards. It contains an `li` element with a `.wizard` class on it.

```html
<div id="app"></div>

<template id="list-item">
	<li class="wizard"></li>
</template>
```

In your JavaScript, you might use the `document.querySelector()` method to get the `#app` element (where you want to add your list) and the `#list-item` element (the template).

There's also an array of `wizards`.

```js
// My starting JS
let app = document.querySelector('#app');
let listItem = document.querySelector('#list-item');
let wizards = ['Merlin', 'Gandalf', 'Neville'];
```

To do this, first, I would create a `ul` element with [the `document.createElement()` method](https://vanillajstoolkit.com/reference/dom-injection/createelement/).

```js
// Create a list element
let list = document.createElement('ul');
```

Next, I would use [a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to loop through my `wizards`. 

Inside the loop, we want to use the `listItem` template for the HTML. The `template` element makes this absurdly difficult for something that's supposed to make templating easier.

The content inside [is a _document fragment_](/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#creating-a-fragment) that you can access with the `content` property. Because we're going to be using it more than once, we want to create a clone of it with [the `Element.cloneNode()` method](/how-to-clone-a-node-or-element-with-vanilla-js/).

```js
// Loop through each wizard and add it to the list
for (let wizard of wizards) {

	// Get and clone the inner content
	let li = listItem.content.cloneNode(true);
}
```

At this point, `li` is a copy of document fragment in our `template`. We want the `li` element. For that, we need to use the `document.querySelector()` method to find it.

```js
// Loop through each wizard and add it to the list
for (let wizard of wizards) {

	// Get and clone the inner content
	// Then, find the li element
	let li = listItem.content.cloneNode(true).querySelector('li');

}
```

Now, we can add the `wizard` to it with [the `Node.textContent` property](/the-difference-between-the-node.textcontent-and-element.innertext-properties-in-vanilla-js/), and add it to the `list` element with [the `Element.append()` method](https://vanillajstoolkit.com/reference/dom-injection/element-append/).

```js
// Loop through each wizard and add it to the list
for (let wizard of wizards) {

	// Get and clone the inner content
	// Then, find the li element
	let li = listItem.content.cloneNode(true).querySelector('li');

	// Add the wizard text, then add it to the list
	li.textContent = wizard;
	list.append(li);
	
}
```

Then, finally, we can append the entire list to the DOM.

```js
// Add the list to the UI
app.append(list);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/vYJPmWw)

As you can see, this kind of sucks.

## The `template` element is even worse with lots of items

Imagine if your `template` actually looked like this instead.

```html
<template id="list-item">
	<div class="wizard">
		<strong id="wizard-name"></strong>
	</div>
</template>
```

First, I would create an array to hold the elements I'm going to create from my template.

```js
// Create an array of elements
let elems = [];
```

Next, I'd loop through each `wizard`, get the template content, clone it, and look for the `div` inside.

```js
// Loop through each wizard
for (let wizard of wizards) {

	// Get the content and clone it
	// Then, find the div element
	let div = listItem.content.cloneNode(true).querySelector('div');

}
```

I'd use the `document.querySelector()` to find the `strong` element _inside_ the `div`, and set it's `textContent` property to the value of the `wizard`.

Then, I'd use the `Array.push()` method to add the `div` to the `elems` array.


```js
// Loop through each wizard
for (let wizard of wizards) {

	// Get the content and clone it
	// Then, find the div element
	let div = listItem.content.cloneNode(true).querySelector('div');

	// Get the strong element inside the div
	let strong = div.querySelector('strong');

	// Add the wizard name
	strong.textContent = wizard;

	// Add the div to the elems array
	elems.push(div);

}
```

Finally, I would use the `Element.append()` method to add each element, using [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/) to pass the whole array in at once.

```js
// Add the elements to the UI
app.append(...elems);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ZEJPKxa)

As you can see, this is a huge pain in the ass, and that's just with one element! Imagine doing this with multiple pieces of data across multiple elements.

This is, in my opinion, a big part of why the `template` element never really saw widespread use. It's just not very functional.

## Creating HTML with JavaScript

As a result of these challenges, it's a lot more common for people to [use template literals](/template-literals-and-string-interpolation-in-vanilla-js/) and generate their HTML entirely in JavaScript. With this approach, you skip the `template` element entirely.

There are a few ways to approach it, but the one beginners find the most readable is to first create an empty string to hold the `html`.

```js
// Create an HTML string
let html = '';
```

On each loop, you append (or _concatenate_) the `html` string with another HTML string. Template literals make it really easy to add variable content inside the string.

When you're done, you can use the `Element.innerHTML` property to add your `html` string to the UI.

(_If you're using third-party data, don't forget to [sanitize your HTML string](/how-to-sanitize-html-strings-with-vanilla-js-to-reduce-your-risk-of-xss-attacks/) first to protect against XSS attacks._)

```js
// Loop through each wizard
for (let wizard of wizards) {
	html +=
		`<div class="wizard">
			<strong>${wizard}</strong>
		</div>`;
}

// Add the HTML to the UI
app.innerHTML = html;
```

[Here's a demo of this technique.](https://codepen.io/cferdinandi/pen/PoKLmxZ)

This approach is clean and simple, and as a result, far more common. 

## A hybrid approach

There is one technique you can use that combines both of these approaches.

The `template` element does not support _string interpolation_ (replacing variables with data) like template literals do. But, you can use a little bit of JavaScript to use it that way.

A while back, I found [a little helper function on StackOverflow](https://stackoverflow.com/a/41015840) that interpolates a plain old string like a template literal.

```js
/**
 * Get a template from a string
 * https://stackoverflow.com/a/41015840
 * @param  {String} str    The string to interpolate
 * @param  {Object} params The parameters
 * @return {String}        The interpolated string
 */
function interpolate (str, params) {
	let names = Object.keys(params);
	let vals = Object.values(params);
	return new Function(...names, `return \`${str}\`;`)(...vals);
}
```

Pass in the string as the first argument, and an object of parameters as the second.

To use it, we would setup our `template` element with variables in it just like we would a template literal.

```html
<template id="list-item">
	<div class="wizard">
		<strong>${wizard}</strong>
	</div>
</template>
```

Inside our JavaScript, we would pass the `template` elements `Element.innerHTML` property value into the `interpolate()` function as the string.

The `params` need to be an object, so we'll wrap our `wizard` in an object and pass that in as the second argument. We'll concatenate the string that's returned back to the `html` string.

```js
// Create an HTML string
let html = '';

// Loop through each wizard
for (let wizard of wizards) {
	html += interpolate(listItem.innerHTML, {wizard});
}

// Add the HTML to the UI
app.innerHTML = html;
```

[Here's one last demo for you.](https://codepen.io/cferdinandi/pen/RwZdVON)

The value of this is pretty minimal in our simple example, but can be pretty awesome with larger templates.

There are a few drawbacks to this approach, though. The biggest one is that it uses the `Function()` method, which can expose you to cross-site scripting attacks with third-party data.

Also, unlike a real template literal, it cannot support logic (`if...else`, loops, and so on) inside the template.

This is a cool trick for special circumstances, but I would generally recommend against using it.