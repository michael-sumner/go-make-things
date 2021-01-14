---
title: "Return in JavaScript revisited"
date: 2019-10-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

[Yesterday, we looked at `return` in JavaScript.](/wtf-is-return-in-javascript/)

I got some great responses from readers, and thought it was worth sharing a few of them here.

## Line breaks

If you put a line break after your `return` without starting a value to return, JavaScript will interpret it as being complete (because semicolons are optional, ick) and return `null`.

```js
// returns null
var hiThere = function (name) {
	return
		'Hello ' + name;
};
```

As long as you start your value, you can include line breaks.

```js
// returns "Hello {name}"
var hiThere = function (name) {
	return 'Hello ' +
		name;
};
```

## Implied return

Steve Griffith runs [a fantastic YouTube channel on front end development](https://www.youtube.com/channel/UCTBGXCJHORQjivtgtMsmkAQ).

He wrote back reminding me that JavaScript functions have an implied return when you provide one or not.

Take this function, that returns `true` if `num` is bigger than `10`, and otherwise returns `false`.

```js
var isItBiggerThanTen = function (num) {
	if (num > 10) {
		return true;
	}
	return false;
};
```

If you do not `return` anything, a function will return `undefined`, which validates as *falsey*.

```js
var isItBiggerThanTen = function (num) {
	if (num > 10) {
		return true;
	}
};
```

In chatting about this with me, Steve realized he didn't actually have a video explaining this yet, so [he put one together for me](https://www.youtube.com/watch?v=GwU1TAC2BDY). Thanks Steve!

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/GwU1TAC2BDY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

Hope that clears some things up.