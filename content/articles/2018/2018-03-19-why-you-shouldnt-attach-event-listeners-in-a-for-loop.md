---
title: "Why you shouldn't attach event listeners in a for loop with vanilla JavaScript"
date: 2018-03-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Whenever I write about event delegation, I mention that [you shouldn't attach event listeners in a `for` loop](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) (I also mention this in my [pocket guide on DOM manipulation](/guides/dom-manipulation/)).

> To add the same event listener to multiple elements, you also *cannot* just use a `for` loop because of how the `i` variable is scoped (as in, it's not and changes with each loop).

I've had a few people tell me I haven't explained this particularly well, so today, I wanted to explain this a bit more clearly.

## You actually *can* attach event listeners in a `for` loop

As you can see [from this example](https://jsfiddle.net/8xd874q9/4/), an event listener is successfully attached to each button, and the console is logged each time one of them is clicked.

```html
<button>One</button>
<button>Two</button>
<button>Three</button>
```

```js
var btns = document.querySelectorAll('button');
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', function (event) {
		console.log('clicked');
	}, false);
}
```

Problems emerge when you try to use your `i` counter variable within the event callback.

## The `i` variable will always be the last element

In this updated example, I log the current button the loop to the console. When clicked, I'll try to log that same button again by using both the `btns[i]` and `event.target` references.

```js
var btns = document.querySelectorAll('button');
for (var i = 0; i < btns.length; i++) {
	console.log('1', btns[i]);
	btns[i].addEventListener('click', function (event) {
		console.log('2', btns[i]);
		console.log('3', event.target);
	}, false);
}
```

[You can see in the demo](https://jsfiddle.net/8xd874q9/5/) that  the buttons initially log fine, and `event.target` works, but `btns[i]` logs `undefined`.

Why is that?

## The `i` variable isn't scoped to the loop

After each iteration of the loop, the `i` variable increases by `1`.

The value does not remain constant within the scope of your event listener callback function. It changes.

After the last iteration of the loop, `i` is increased by `1` one last time. When our `i < btns.length` check runs, it fails because `i` is bigger than the number of items in our node list, and the loop ends.

When you try to log `btns[i]` in the event listener, it's try to reference an index that doesn't exist in the node list.

## So we're cool as long as we don't use `i` in the event listener?

Technically, yes. But you still shouldn't do it.

I think the danger of accidentally doing so is too great, and as a best practice, would recommend avoiding setting event listeners this way.

It's also worse for performance.

It's more performant to have [a single event listener that listens for all clicks](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) and check if the element has a selector you want than it is to attach a bunch of individual listeners.