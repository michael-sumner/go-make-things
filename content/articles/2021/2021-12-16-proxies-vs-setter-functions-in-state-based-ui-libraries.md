---
title: Proxies vs. setter functions in state-based UI libraries
date: 2021-12-16T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

In the past, I've written about [how Proxies can be used to make data reactive in state-based UI](/how-to-create-a-reactive-state-based-ui-component-with-vanilla-js-proxies/). They're what [my own state-based UI library, Reef](https://reefjs.com), currently uses under-the-hood.

But a student of mine recently put together a reduced test case showing how they can severally hurt performance in apps that have high levels of interactivity.

Today, we're going to take a look at that. Let's dig in!

## The problem

When you use proxies for state-based UI, they intercept any updates to your data object, and run a `render()` function when that happens.

But... they _don't_ detect changes to nested array and object data. To work around this, you need to create a `new Proxy()` from the nested array or object whenever it's requested.

(_If you have no idea what any of that means, [you can read the background in the original article here](/how-to-create-a-reactive-state-based-ui-component-with-vanilla-js-proxies/)._)

```js
/**
 * Create settings and getters for data Proxy
 * @param  {Constructor} instance The current instantiation
 * @return {Object}               The setter and getter methods for the Proxy
 */
function dataHandler (instance) {
	return {
		get: function (obj, prop) {
			if (typeof obj[prop] === 'object') {
				new Proxy(obj[prop], dataHandler(instance));
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

Unfortunately, Proxies are opaque. There's no property you can look at or test you can do to determine if an object is already a proxy or not.

And that can lead to situations where you end up with proxies nested inside proxies nested inside proxies nested inside...

**[Here's the demo my student put together.](https://codepen.io/cferdinandi/pen/VwMpoYQ)**

When you click the "Swap Wizards" button, it switches the position of the first and second wizard in the rankings. Each time you do, another layer of proxies gets wrapped around that data object.

If you focus on the "Swap Wizards" button and hold down the return key for a second or two, the entire UI will freeze as more and more callback functions stack on top of each other.

## Can it be fixed?

I tried adding an `_isProxy` property to avoid recreating a proxy if an object already is one, but that ended up breaking reactivity.

If an object or array is cloned, the Proxy gets removed but the `_isProxy` property will remain, which can trigger some false logic inside the library.

Version 3.x of Vue is going to use Proxies, and I'm sure Evan You and the rest of the team have figured out some really smart workaround, but my brain just isn't getting there!

## What can you do instead?

Libraries like React and Preact use setter functions instead of proxies.

Classic class-based components use a `setState()` function that updates the data, then runs a `render()` function. In more modern hook-based components, the `useState()` method lets you write your own setters.

This is also how `mutations` work in [Vue's _state management library_, Vuex](https://vuex.vuejs.org/guide/mutations.html).

I'm working on a new version of Reef that will move towards this pattern instead, which should hopefully address the performance issues.