---
title: "Everything is an object in JavaScript"
date: 2018-07-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In my article last week on [state-based components with vanilla JS](/state-based-components-with-vanilla-js/), I shared this little snippet for adding state to a simple component.

```js
// This is a simple Component
var greeting = function () {
	return '<p>' + greeting.data.greeting + ', ' + greeting.data.name + '!</p>';
};

// This is the state
greeting.data = {
	greeting: 'Hello',
	name: 'there'
}
```

One of my readers asked (shared with permission):

> What's going on with assigning the function to a variable, but then you can just add object properties to it? isn't it already a function, not an object?

Weird, right?

In JavaScript, *everything* is an object, even when it's something else. Functions are objects. Strings are objects. Numbers are objects. Arrays are objects. Objects are objects.

As a result, anything can have properties assigned to it.

This is how a lot of methods work. For example, `[1, 2, 3].length` works because arrays are also objects and `.length` is a property of the Array object. `Function.arguments` is a property of the Function object.

You can assign properties to basically anything in JS.