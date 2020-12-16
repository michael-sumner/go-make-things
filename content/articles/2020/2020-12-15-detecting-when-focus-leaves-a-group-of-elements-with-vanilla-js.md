---
title: "Detecting when focus leaves a group of elements with vanilla JS"
date: 2020-12-15T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Let's say you have a group of form inputs, and you want to do something when focus leaves the whole group.

```html
<form action="#">
	<label for="input1">Input 1</label>
	<input type="text" id="input1" value="Oh">

	<label for="input1">Input 2</label>
	<input type="text" id="input2" value="hello">

	<label for="input1">Input 3</label>
	<input type="text" id="input3" value="there">

	<button>Submit</button>
</form>
```

How would you do that? That's what we're going to talk about in today's article. Let's dig in.

## The challenge

Vanilla JS has a `focusout` event, so you first inclination might be to use that.

```js
var form = document.querySelector('form');

// Do something when focus leaves the entire form
form.addEventListener('focusout', function (event) {
	console.log('focus left!');
});
```

However, because events bubble, this doesn't fire when focus leaves the whole form. It fires whenever an element inside the form loses focus.

If you were to tab from `#input1` to `#input2`, the event listener callback would run. [You can see it in action here.](https://codepen.io/cferdinandi/pen/bGwqPad)

You might also think you can check the `event.target`. But that doesn't work, either, because the event that triggers the event is the field that just lost focus, and not the one that's receiving it.

Similarly, you can't check which event currently has focus using the `document.activeElement` property, because the event fires at some weird in-between state where the current element has lost focus, but the new one hasn't received it yet.

```js
// do something when focus leaves the entire form
form.addEventListener('focusout', function (event) {
	console.log(event.target, document.activeElement);
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/JjRWQMZ)

So... how _do_ you handle this?

## The `event.relatedTarget` property

[Scott Jehl tipped me off to the `event.relatedTarget` property.](https://codepen.io/scottjehl/pen/dyXPQgV?editors=1010)

This is only available on focus events, and returns the "secondary target." This target varies based on event. On the `focusin` event, it's the item losing focus. On the `focusout` event, it's the item getting focus.

We can check if the `event.relatedTarget` in inside the `form` element using the `contains()` method. If not, the whole group of elements has lost focus.

```js
// do something when focus leaves the entire form
form.addEventListener('focusout', function (event) {

	// If focus is still in the form, do nothing
	if (form.contains(event.relatedTarget)) return;

	// Otherwise, log a message
	console.log('Focus left!');

});
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/OJRpeEP)

## Browser compatibility

The `event.relatedTarget` property works in all modern browsers, and all the way back to IE9. The `Element.contains()` method also works back to IE9, but only for elements, not other node types (like text nodes).