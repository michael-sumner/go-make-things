---
categories:
- Code
- JavaScript
date: '2017-10-04'
permalink: /adding-an-element-to-the-end-of-a-set-of-elements-with-vanilla-javascript/
title: Adding an element to the end of a set of elements with vanilla JavaScript
url: /2017/10/04/adding-an-element-to-the-end-of-a-set-of-elements-with-vanilla-javascript
---

Yesterday, we looked at [how to insert an element to the beginning of a set elements](/adding-an-element-to-the-beginning-of-a-set-of-elements-with-vanilla-javascript/) inside a shared parent with vanilla JS. Today, let's look at how to add elements to the *end* of a set of elements.

Just like yesterday, we’re going to look at two ways to do this:

1. The traditional way.
2. The ES6 way.

## The traditional way

Unlike adding an element to the beginning of a list, the traditional way of adding elements to the *end* of a list is actually really easy, thanks to the `appendChild()` method.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the parent node
var parentNode = document.querySelector('#some-element');

// Insert the new node after the last element in the parent node
parentNode.appendChild(newNode);
```

The `appendChild()` method is supported back to at least IE6.

## The ES6 Way


ES6 introduces `append()` as a complement to the `prepend()` method we looked at yesterday. It works basically the same as `appendChild()`.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the parent node
var parentNode = document.querySelector('#some-element');

// Insert the new node after the last element in the parent node
parentNode.append(newNode);
```

### Browser Compatibility

Unlike `appendChild()`, `append()` only works in newer version of Chrome, Firefox, Opera, and Safari. It has no IE or Edge support.

You can extend support back to IE7 with this polyfill from [polyfill.io](http://polyfill.io).

```js
var _mutation = (function () {

    function isNode(object) {
        // DOM, Level2
        if (typeof Node === 'function') {
            return object instanceof Node;
        }
        // Older browsers, check if it looks like a Node instance)
        return object &&
            typeof object === "object" &&
            object.nodeName &&
            object.nodeType >= 1 &&
            object.nodeType <= 12;
    }

    // http://dom.spec.whatwg.org/#mutation-method-macro
    return function mutation(nodes) {
        if (nodes.length === 1) {
            return isNode(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '');
        }

        var fragment = document.createDocumentFragment();
        for (var i = 0; i < nodes.length; i++) {
            fragment.appendChild(isNode(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''));

        }
        return fragment;
    };
}());

Document.prototype.append = Element.prototype.append = function append() {
    this.appendChild(_mutation(arguments));
};
```

The polyfill literally just passes your node into `appendChild()`, so in most cases, honestly, I would just use that instead. Better browser support, less code.