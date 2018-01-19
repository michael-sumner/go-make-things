---
categories:
- Code
- HTML
- JavaScript
date: '2017-09-20'
title: How to insert an element before another one in the DOM with vanilla JavaScript
---

Yesterday, we looked at [how to create elements with vanilla JavaScript](https://gomakethings.com/creating-elements-with-vanilla-javascript/). Today, we're going to learn how to insert them before other elements in the DOM.

## The Old-School Way

The traditional way of handling this, supported back to at least IE6, is with the `insertBefore()` method.

The `insertBefore()` method works great, but is kind of clunky. You need to call it on the *parent* of the element you're inserting your new element before (the `referenceNode`), and pass in both the new element and the reference node as arguments.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the reference node
var referenceNode = document.querySelector('#some-element');

// Insert the new node before the reference node
referenceNode.parentNode.insertBefore(newNode, referenceNode);
```

## The ES6 Way

Fortunately, ES6 brings us a new approach that's much more like how it works in libraries like jQuery: `before()`.

You call the `before()` method on the reference node, and pass in the new node as an argument. And that's it.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the reference node
var referenceNode = document.querySelector('#some-element');

// Insert the new node before the reference node
referenceNode.before(newNode);
```

### Browser Compatibility

At the time of writing, `before()` works in newer versions of Chrome, Firefox, and Opera, and has no support in Edge and Internet Explorer.

*But*... [a polyfill adds support back to IE9](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before#polyfill).

```js
// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/before()/before().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.parentNode.insertBefore(docFrag, this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
```