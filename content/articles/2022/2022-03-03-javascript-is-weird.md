---
title: JavaScript is weird
date: 2022-03-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Last week, [Ryan Cavanaugh, the engineering lead for Typescript, tweeted about a weird JS performance quirk](https://twitter.com/SeaRyanC/status/1496273922714902528).

Imagine an array of objects. Each object has a `val` property, with a numeric value.

```js
let arr = [
	{val: 1},
	{val: 42},
	{val: 24}
];
```

As a test, Ryan created a function that adds the `val` property for each item in the array together to get the sum.

```js
function sum (arr) {
	let acc = 0;
	for (let i = 0; i < arr.length; i++) {
		acc += arr[i].val;
	}
	return acc;
}
```

Next, he created two arrays, each with 100 million identical objects (`[{val: 1}, ...]`). Then, he added some bonus items to each array.

> `array1` gets uniform items, but `array2` elements get some other properties too

```js
array1.push({ val: 0 }, { val: 1 }, { val: 2 }, { val: 3 });

array2.push({ val: 0, a: 0 }, { val: 1, b: 0 }, { val: 2, c: 0 }, { val: 3, d: 0 });
```

Finally, he ran some performance tests. He passed each one into the `sum()` function five times, and calculated how long in milliseconds it took to complete the operation.

The results were... bonkers!

1. With `array1`, the `sum()` function got faster each time it ran, ultimately running twice as fast on the fifth pass as on the first.
2. With `array2`, the `sum()` function got _slower_ each time it ran, ultimately running _six times slower (!!!)_ on the fifth pass as on the first.
3. When Ryan ran `sum()` with `array1` again _after_ running it with `array2`, it ran just as slow as `array2` did.

Ryan notes...

> When sum hit the different objects at the end of the array, they were not the same shape as the rest, so the property access became "megamorphic" - not suitable for optimization.
> ...
> 
> This is despite the fact that every object to ever enter 'sum' had 'val' as its first property with type number, and that sum ever only looked at that property. Doesn't matter; the extra properties are different types and this 100% matters to the engine.

[Ryan has a bunch more insights in his Twitter thread.](https://twitter.com/SeaRyanC/status/1496273922714902528) I'd strongly encourage you to go give it a read!