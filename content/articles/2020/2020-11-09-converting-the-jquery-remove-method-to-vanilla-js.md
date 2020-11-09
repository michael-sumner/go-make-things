---
title: "Converting the jQuery remove() method to vanilla JS"
date: 2020-11-09T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I have an ongoing series on [converting jQuery methods and plugins to vanilla JS](/series/converting-jquery-to-vanilla-js/).

Today, we're going to look at the jQuery `remove()` method, and how to convert it to vanilla JS. Let's dig in!

## The jQuery `remove()` method

jQuery's `remove()` method removes all elements in a set from the DOM.

Let's say you have a collection of buttons, like this.

```html
<p>
	<button id="save">Save</button>
	<button id="edit">Edit</button>
	<button id="cancel">Cancel</button>
</p>
```

You could remove the `#edit` button like this.

```js
$('#edit').remove();
```

Your HTML would look like this afterwards.

```html
<p>
	<button id="save">Save</button>
	<button id="cancel">Cancel</button>
</p>
```

Or, you could remove _all buttons_ from the UI like this.

```js
$('button').remove();
```

Afterwards, your HTML would look like this.

```html
<p></p>
```

## How to remove elements from the UI with vanilla JS

This used to be a [*just a little* more complicated](https://vanillajstoolkit.com/reference/dom-injection/element-removechild/), but today, [the vanilla JS `Element.remove()` method](https://vanillajstoolkit.com/reference/dom-injection/element-remove/) gives you the same functionality as jQuery's `remove()` method.

To use it, you get the element you want to remove (using `querySelector()` or some other selector method), then call the `remove()` method on it.

You could remove the `#edit` button like this.

```js
document.querySelector('#edit').remove();
```

Your HTML would look like this afterwards.

```html
<p>
	<button id="save">Save</button>
	<button id="cancel">Cancel</button>
</p>
```

Unlike jQuery, you *cannot* call the vanilla JS `remove()` method on a collection of elements.

But you can loop through them and call it on each element. To, for example, remove all buttons from the DOM, you would do this.

```js
Array.from(document.querySelectorAll('button')).forEach(function (button) {
	button.remove();
});
```

This uses `querySelectorAll()` to get a NodeList of matching elements. Then, it [converts the NodeList to an array with the `Array.from()` method](/using-array-methods-with-nodelists-in-vanilla-js/).

This allows us to use [the `Array.forEach()` method](https://vanillajstoolkit.com/reference/loops/array-foreach/) to loop through each item.

## Browser compatibility

The `remove()` method works in all modern browsers, but [requires a polyfill for IE](https://vanillajstoolkit.com/polyfills/remove/). The `Array.from()` method [also requires a polyfill](https://vanillajstoolkit.com/polyfills/arrayfrom/).

Alternatively, you can use [the `Element.removeChild()` method](https://vanillajstoolkit.com/reference/dom-injection/element-removechild/) and [the `Array.prototype.slice.call()` hack](/using-array-methods-with-nodelists-in-vanilla-js/#array-prototype-slice-call), respectively.