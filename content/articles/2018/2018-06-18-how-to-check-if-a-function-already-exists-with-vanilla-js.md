---
title: "How to check if a function already exists with vanilla JS"
date: 2018-06-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I have a student whose background is in PHP. The other day he asked me if there was a JavaScript equivalent of PHP's `function_exists()` method.

For example, when building a plugin that extends some existing code in PHP, it's a good practice to make sure that plugin (and the required function from it) exists before running your code.

```php
if (function_exists('get_purchases')) {
	$purchases = get_purchases(123);
}
```

Given how fragile JavaScript is, this isn't a bad idea, either. Here's how you would do something similar with vanilla JS. 

For simplicity, let's say we want to use a JS method called `getPurchases()`. You would use `typeof` to check if the method you want to use is a function.

```js
if (typeof getPurchases === 'function') {
	getPurchases(123);
}
```

If the method was scoped to a namespaced plugin (for example, `checkout.getPurchases()`, it's also a good idea to make sure that the namespace exists, too.

```js
if (checkout && typeof checkout.getPurchases === 'function') {
	checkout.getPurchases(123);
}
```

Here's a simple helper method you can use if you find yourself needing to do this a lot.

```js
var functionExists = function (method, scope) {
	if (scope) {
		var namespace = window[scope];
		return (namespace ? true : false) && typeof namespace[method] === 'function';
	}
	return typeof window[method] === 'function';
};

if (functionExists('getPurchases', 'checkout')) {
	getPurchases(123);
}
```