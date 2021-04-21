---
title: "Challenges and limitations with advanced selectors and the document.querySelectorAll() method"
date: 2021-04-21T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, I wrote about [how to get all direct descendants that match a test condition](/how-to-get-all-direct-descendants-that-match-a-test-condition-with-vanilla-js/).

A substantial number of folks wrote to me asking why I would use the `Array.filter()` method with the `Node.children` property instead of using a nested selector with the `document.querySelectorAll()` method.

```js
let tuna = document.querySelectorAll('#sandwiches > .tuna');
```

This absolutely works when...

1. The parent element has a unique selector, and
2. You want to filter child elements based on a CSS selector.

If the parent element doesn't have a unique selector (as in, no ID), you can use the `:scope` pseudo-class.

Here, `:scope` refers to the `sandwiches` element.

```js
// This is silly, since the element obviously has an ID
// Just roll with it
let sandwiches = document.querySelector('#sandwiches');

// Here, :scope refers to the sandwiches element
let tuna = sandwiches.querySelectorAll(':scope > .tuna');
```

When you're filtering with things that can be targeted with CSS, this works great. But what if your criteria is more elaborate?

For example, what if you wanted to exclude...

- The third child element
- Child elements with more than one nested element inside it
- Child elements with a nested button

In those situations, the `Array.from(NodeChildren).fitler()` approach is, in my opinion, more robust, simpler, and in some cases, the only option.

```js
// exclude the third child element
let noThirdChild = Array.from(sandwiches.children).filter(function (elem, index) {
	return elem.matches('.tuna') && index !== 2;
});

// exclude more than one nested elements
let noNestedElements = Array.from(sandwiches.children).filter(function (elem) {
	return elem.matches('.tuna') && elem.children.length < 2;
});

// exclude items with nested buttons
let noNestedButtons = Array.from(sandwiches.children).filter(function (elem) {
	return elem.matches('.tuna') && !elem.querySelector('button');
});
```