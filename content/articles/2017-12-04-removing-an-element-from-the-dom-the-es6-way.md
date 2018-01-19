---
categories:
- Code
- JavaScript
date: '2017-12-04'
title: Removing an element from the DOM, the ES6 way
---

Earlier this year, I shared [a way to remove elements from the DOM](/removing-an-element-from-the-dom-with-vanilla-js/) using the `removeChild()` method.

ES6 provides an easier, simpler way to achieve the same tax: `remove()`. Call the `remove()` method on the element you want to remove.

```javascript
var elem = document.querySelector('#some-element');
elem.remove();
```

## Browser Compatibility

The `remove()` method works in all modern browsers, but not IE. You can [add support back to IE9 with a polyfill](https://github.com/cferdinandi/vanilla-javascript-cheat-sheet/blob/master/polyfills/remove.js).

Personally, I use the older approach because it has better backwards compatibility and doesn't need a polyfill, but the `remove()` method is quite nice.

```javascript
/**
 * ChildNode.remove() polyfill
 */
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
```