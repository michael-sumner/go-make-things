---
title: WTF is currying in JavaScript!?
date: 2023-03-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Every now and then, someone asks me to write an article about currying in JavaScript. 

Currying is when you create a function that returns a function. Any time I've tried to research it, though, I come across tons of articles with examples like this...

```javascript
// Regular function
function addNumbers (a, b, c) {
	return a + b + c;
}

// Curried function
function addNumbersCurried (a) {
	return function (b) {
		return function (c) {
			return a + b + c;
		};
	};
}

addNumbers(1, 4, 3);
addNumberCurried(1)(4)(3);
```

And I say to myself, why the _fuck_ would anyone want to do this!?!

Well, after ranting a bit about this the other day, my friend, D&D buddy, and fellow Comic Sans enthusiast Alex Riviere wrote [an _amazing_ article on currying with actual useful examples and when and why you might want to use it](https://alex.party/posts/2023-03-24-better-javascript-currying-examples).

> So “when” is the bigger thing as to why you want to write a curried function. Curried functions are great when you know want to provide a common value across a function call multiple times, but it may not be a static value.
>
> So let’s make a practical example of a Currying Function. The example that you have likely run into before is the authenticated fetch handler...
> 
> Now anywhere in our code base that we want to fetch from our authorized API endpoint, we don’t have to pass a token around.

If you've ever wanted to know more about currying or found it as weird and confusing as I did, [go read Alex's entire post](https://alex.party/posts/2023-03-24-better-javascript-currying-examples).

It's got actual useful code examples in it that make it all click.