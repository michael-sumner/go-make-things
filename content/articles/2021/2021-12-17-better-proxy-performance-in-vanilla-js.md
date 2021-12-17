---
title: Better Proxy performance in vanilla JS
date: 2021-12-17T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Yesterday, I wrote about [some performance problems with nested proxies](/proxies-vs.-setter-functions-in-state-based-ui-libraries/), and why many state-based UI libraries rely on setter functions instead.

> Unfortunately, Proxies are opaque. There’s no property you can look at or test you can do to determine if an object is already a proxy or not.
>
> And that can lead to situations where you end up with proxies nested inside proxies nested inside proxies nested inside…

After a bunch of digging around yesterday, I found a way to make nested Proxies more performant, and today, I want to show you how it works.

Let's dig in!

## How Vue.js approaches it

In yesterday's article, I mentioned that Vue.js v3.x is moving to proxies.

> Version 3.x of Vue is going to use Proxies, and I’m sure Evan You and the rest of the team have figured out some really smart workaround, but my brain just isn’t getting there!

After a _lot_ of looking at the source code, I _think_ they're [using the `WeakMap()` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) to keep track of which objects and arrays are already proxies, and return them instead of the original.

Unfortunately, I couldn't get this to work in my own code, but it's a solution I've seen suggested quite a bit in various places.

## Checking if the item is already being managed by the Proxy handler

What ultimately worked for me was a really clever little "hack" in the Proxy handler itself.

In the `get()` function, we first check if the `prop` being checked has a value of `_isProxy`. If so, we `return true`. Next, when checking if the item is an array or object, we also check if it has a property of `_isProxy`, with [a truthy value](/truthiness-in-javascript/).

While the object doesn't actually _have_ that property, if it's already a proxy, and thus already being managed by the handler, it will return `true` anyways. We can skip making it a proxy and return it as-is.

Otherwise, we'll create a `new Proxy()` and update the saved item in the data first.

```js
/**
 * Create settings and getters for data Proxy
 * @param  {Constructor} instance The current instantiation
 * @return {Object}               The setter and getter methods for the Proxy
 */
function dataHandler (instance) {
	return {
		get: function (obj, prop) {

			// If the property is "isProxy", item is already being intercepted by this proxy handler
			// return true
			if (prop === '_isProxy') return true;

			// If the property is an array or object and not already a proxy, make it one
			if (typeof obj[prop] === 'object' && !obj[prop]._isProxy) {
				obj[prop] = new Proxy(obj[prop], dataHandler(instance));
			}

			return obj[prop];
		},
		set: function (obj, prop, value) {
			if (obj[prop] === value) return true;
			obj[prop] = value;
			render(instance);
			return true;
		},
		deleteProperty: function (obj, prop) {
			delete obj[prop];
			render(instance);
			return true;
		}
	};
}
```

Now, we no longer end up with deeply nested Proxies every time you mutate the data.

[Here's a demo you can play around with.](https://codepen.io/cferdinandi/pen/yLzbKBq)