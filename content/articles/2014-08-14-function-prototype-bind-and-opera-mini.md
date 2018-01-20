---
categories:
- Code
date: '2014-08-14'
url: /function-prototype-bind-and-opera-mini/
title: <code>Function.prototype.bind</code> and Opera Mini
---

Last week I discovered that a few scripts that *should* work in Opera Mini were not. And they weren't just failing to work. They were passing the [mustard test](/ditching-jquery-for-vanilla-js/#cutting-the-mustard), so important content was getting obscured with no way to access it.

The problem turned out to be with `Function.prototype.bind`, a late addition to the ECMAScript 5 standard that is missing from some otherwise compatible browsers (like Opera Mini). Fortunately, there's an easy fix.

[snippet id="8395"]

# `Function.prototype.bind` polyfill

The fix was as easy as dropping in a polyfill, [courtesy of MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility):

```language-javascript
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1);
		var fToBind = this;
		fNOP = function () {};
		fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
		};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
```

All of my scripts that use `Function.prototype.bind` now include the polyfill.

[snippet id="8397"]