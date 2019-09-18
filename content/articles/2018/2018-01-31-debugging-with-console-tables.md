---
title: "Debugging with console tables"
date: 2018-01-31T10:37:47-05:00
draft: false
categories:
- Code
- JavaScript
---

This week I learned a super handy debugging trick: `console.table()`.

Debugging often involves [logging a bunch of stuff in the console](/javascript-debugging-basics-part-2/) until you find the thing that's not working the way you'd expect. If you're logging multiple things at once, keeping track of what's what can get confusing.

And here's where `console.table()` comes into play. Pass in an array of objects, and it creates a table in the console from it ([hat tip to Umar Hansa for this one](https://umaar.com/dev-tips/82-console-table/)).

Open up the console tab in developer tools and drop this in:

```js
console.table([
	{
		name: "sandwich",
		type: "turkey"
    },
	{
		name: "snack",
		type: "chips"
    },
	{
		name: "drink",
		type: "soda"
    },
]);
```

Awesome, right?