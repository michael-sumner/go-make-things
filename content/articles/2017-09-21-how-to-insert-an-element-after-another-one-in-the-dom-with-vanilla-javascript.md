---
categories:
- Code
- HTML
- JavaScript
date: '2017-09-21'
title: How to insert an element after another one in the DOM with vanilla JavaScript
---

This week, we looked at [how to create an element](https://gomakethings.com/creating-elements-with-vanilla-javascript/) and [inject it before another one](https://gomakethings.com/how-to-insert-an-element-before-another-one-in-the-dom-with-vanilla-javascript/) with vanilla JavaScript.

Today, let's look at two ways to insert an element *after* another one.

## Oddly, using `insertBefore()`

Yesterday, we learned about the `insertBefore()` method. You can use it to insert an element after a node by using `nextSibling` to get the node that comes right after the one you want to target.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the reference node
var referenceNode = document.querySelector('#some-element');

// Insert the new node before the reference node
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
```

A bit awkward and clunky, but it works&mdash;back to at least IE 6, in fact.

## The Modern Approach

The modern approach is to use the `after()` method. Call it on the element you want to add your new element after, and pass in your new element.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the reference node
var referenceNode = document.querySelector('#some-element');

// Insert the new node before the reference node
referenceNode.after(newNode);
```

### Browser Compatibility

Like the `before()` method that we looked at yesterday, at the moment `after()` works in newer versions of Chrome, Firefox, and Opera, and has no support in Edge and Internet Explorer.

[Here's a polyfill](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after#Polyfill) that pushes support back to IE 9.

```js
//from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/after()/after().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return;
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.parentNode.insertBefore(docFrag, this.nextSibling);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
```