---
categories:
- Code
- JavaScript
date: '2017-08-21'
permalink: /when-to-use-return-with-javascript/
title: When to use return with JavaScript
url: /2017/08/21/when-to-use-return-with-javascript
---

One of the discussions that came up in my private Vanilla JS Slack channel (available to people who purchase my [pocket guides](/guides/)) the other day was when to use `return` in functions.

There are two times you'll want to `return` in a function:

1. When you literally want to return a value.
2. When you just want the function to stop running.

## Returning a value

Let's say you have a function whose job is to divide a number by `4` for you and give you the result.

```lang-javascript
var divideByFour = function (num) {
    num / 4;
}

var divided = divideByFour(27); // null
```

In the above example, you're passing `27` in the function, which divides it by `4`. *But*... you're not doing anything with the number because it only lives inside the function.

If we return it, we can use it elsewhere.

```lang-javascript
var divideByFour = function (num) {
    return num / 4;
}

var divided = divideByFour(27); // 6.75
```

You might use this approach for constructing markup in a JavaScript app.

```lang-javascript
var helloThere = function (name, day) {
    return 'Hello there, ' + name + '! How is your ' + day + ' going so far?';
};

var greeting = document.querySelector('#greeting');
greeting.innerHTML = helloThere('Chris', 'Monday');

// Result
// <div id="greeting">Hello there, Chris! How is your Monday going so far?</div>
```

## Stopping a function

I use this approach a lot in event listeners. For example, let's say you have a modal window.

```lang-markup
<div class="modal">
    Hey there! This is a pointless modal window!<br>
    <button class="modal-close">Close Me</button>
</div>
```

When someone clicks the modal, you want to do nothing *unless* they clicked on the `.modal-close` button. If they click that *or* anywhere outside the modal, you want to close the modal.

One way to handle this is with `if...else` statements.

```lang-javascript
var closeModal = function () {
	document.querySelector('.modal').remove();
};

document.addEventListener('click', function (event) {

	if (event.target.matches('.modal-close')) {
		// If the clicked element is the .modal-close button, close the modal
		closeModal();
	} else if (event.target.closest('.modal')) {
		// If the clicked element is the `.modal`, do nothing
	} else {
		// Otherwise, close the modal
		closeModal();
	}

}, false);
```

Or, you could instead use `return` to end the function after the matching statement.

```lang-javascript
var closeModal = function () {
	document.querySelector('.modal').remove();
};

document.addEventListener('click', function (event) {

	// If the clicked element is the .modal-close button
	if (event.target.matches('.modal-close')) {
		// close the modal
		closeModal();
		return;
	}

	// If the clicked element is the `.modal`, do nothing
	if (event.target.closest('.modal')) return;

	// Otherwise, close the modal
	closeModal();

}, false);
```

Both approaches do the same thing, and the `if...else` statement probably save a byte or two when minified. But, I find the `return` approach easier to read, so that's what I use. Totally a personal preference thing.

You can also use `return` for what I call a "sanity check."

Let's say you have a function that depends on an argument or element to work. You can check for that item, and if it doesn't exist, `return` to end the function.

```lang-javascript
var toggleMenu = function () {

	// Get the menu
	var menu = document.querySelector('#menu');

	// Sanity check
	if (!menu) return;

	// Toggle the menu
	menu.classList.toggle('active');

};
```

Without the sanity check, `menu.classList` would throw an error if no `menu` was found.