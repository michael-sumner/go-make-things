---
title: How to add interactivity to browser native web components with vanilla JS
date: 2022-06-17T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

On Wednesday, we learned [what web components are](/what-are-browser-native-web-components/) and when and why you might want to use them. Yesterday, we at looked at [how to create web components from custom elements](/how-to-create-a-web-component-with-vanilla-js/).

Today, we're going to wrap up the series by adding interactivity to our component. Let's dig in!

_Today’s article is an excerpt from my [new course and ebook on web components with vanilla JS](https://vanillajsguides.com/web-components/)._

## Lifecycle callback hooks

Using web component lifecycle hooks and traditional DOM manipulation techniques, we can add built-in interactivity to our web components.

As a best practice, event listeners for web components should be added inside the `connectedCallback()` function, since this method runs when the element is actually injected into the DOM.

Inside our `connectedCallback()` method, let's use the `Element.querySelector()` method on the custom element, `this`, to get the `button` inside our component.

If the `btn` exists, we'll attach a `click` event listener to it.

```js
/**
 * Runs each time the element is appended to or moved in the DOM
 */
connectedCallback () {

	// Attach a click event listener to the button
	let btn = this.querySelector('button');
	if (!btn) return;
	btn.addEventListener('click', function (event) {
		// ...
	});

}
```

Inside the event listener callback function, `this` is the element that was clicked, _not_ the custom element.

When the button is clicked, we'll use the `Element.closest()` method to get the parent `greeting-message` element, and assign it to the `host` variable. Then, we'll use the `Element.querySelector()` method to search for the `.message` element inside it.

If no `target` element to display the message in is found, we'll use the `return` operator to end the callback function early.

```js
/**
 * Runs each time the element is appended to or moved in the DOM
 */
connectedCallback () {

	// Attach a click event listener to the button
	let btn = this.querySelector('button');
	if (!btn) return;
	btn.addEventListener('click', function (event) {

		// Get the host component
		let host = event.target.closest('greeting-message');

		// Get the message element
		let target = host.querySelector('.message');
		if (!target) return;

	});

}
```

Otherwise, we'll use the `Element.textContent` property to show a message in the `target` element.

Then, we'll use the `setTimeout()` method to clear the message out after `5000` milliseconds (or 5 seconds) so that the user can click the button again if they want.

```js
btn.addEventListener('click', function (event) {

	// Get the host component
	let host = event.target.closest('greeting-message');

	// Get the message element
	let target = host.querySelector('.message');
	if (!target) return;

	// Inject the message into the UI
	target.textContent = `Hi there, friend! Hope you're having a great day!`;

	// Clear the message after 5 seconds
	setTimeout(function () {
		target.textContent = '';
	}, 5000);

});
```

## Customizing interactivity with HTML attributes

Just like with the `button` itself, we can use attributes to customize the behavior here.

For example, let's say we wanted to customize the greeting with the user's name. We could add a `[name]` attribute to the `greeting-message` element.

```html
<greeting-message name="Merlin"></greeting-message>
```

Inside the event listener, we can use the `Element.getAttribute()` method to get the value of the `[name]` attribute. Then, we can use a ternary operator to use the provided `name` if there is one, or `friend` if there's not.

```js
btn.addEventListener('click', function (event) {

	// Get the host component
	let host = event.target.closest('greeting-message');

	// Get the message element
	let target = host.querySelector('.message');
	if (!target) return;

	// Inject the message into the UI
	let name = host.getAttribute('name');
	target.textContent = `Hi there, ${name ? name : 'friend'}! Hope you're having a great day!`;

	// Clear the message after 5 seconds
	setTimeout(function () {
		target.textContent = '';
	}, 5000);

});
```

## Removing interactivity when the web component is disconnected

As a best practice, you should remove any attached event listeners whenever the `disconnectedCallback()` function runs. 

This helps prevent events that are no longer needed from taking up space in the browser's memory.

We can do this using the `Element.removeEventListener()` method. But to do so, the callback function needs to be a named function in the same scope as both the `connectedCallback()` and `disconnectedCallback()` functions. 

To start, let's first move the event listener callback function out as a class function.

```js
/**
 * Handle click events on the button
 */
clickHandler (event) {

	// Get the host component
	let host = event.target.closest('greeting-message');

	// ...

}
```

Then, inside the `connectedCallback()` function, we'll pass `this.clickHandler` in as the callback argument instead of using our anonymous function.

```js
/**
 * Runs each time the element is appended to or moved in the DOM
 */
connectedCallback () {

	// Attach a click event listener to the button
	let btn = this.querySelector('button');
	if (!btn) return;
	btn.addEventListener('click', this.clickHandler);

}
```

Finally, inside the `disconnectedCallback()` function, we can repeat the process.

We'll use the `Element.querySelector()` method to get the `button`. Then, we'll call the `btn.removeEventListener()`, again passing in `click` and `this.clickHandler` as arguments.

```js
/**
 * Runs when the element is removed from the DOM
 */
disconnectedCallback () {

	// Remove the click event listener from the button
	let btn = this.querySelector('button');
	if (!btn) return;
	btn.removeEventListener('click', this.clickHandler);

}
```

Now, whenever our web component is injected into the DOM, an event listener will be added, and whenever its removed, the event listener will be, too.

## Detecting changes to web component attributes

The web component lifecycle includes an additional function, `attributeChangedCallback()`, that runs when attributes on a custom element are added, removed, or changed in value.

You can use it to detect attribute changes and run code in response.

For our `greeting-message` element, let's detect when the `logout` attribute is added to the element. When that happens, we want to remove the `button` from our web component and show a "goodbye" message.

```html
<!-- The user is logged out -->
<greeting-message logout>
	<div class="message" aria-live="polite">
		Bye, friend! See you next time.
	</div>
</greeting-message>
```

First, we need to create a static getter method named `observedAttributes()`. 

This function needs to return an array of attributes to watch. Only attributes listed in this array will be observed by the `attributeChangedCallback()` function.

We'll return an array with the `logout` attribute.

```js
/**
 * Create a list of attributes to observe
 */
static get observedAttributes () {
	return ['logout'];
}
```

Next, we'll add an `attributeChangedCallback()` function.

It accepts three arguments: the `name` of the attribute that's been changed, its `oldValue`, and its `newValue`.

```js
/**
 * Runs when the value of an attribute is changed on the component
 * @param  {String} name     The attribute name
 * @param  {String} oldValue The old attribute value
 * @param  {String} newValue The new attribute value
 */
attributeChangedCallback (name, oldValue, newValue) {
	console.log('changed', name, oldValue, newValue, this);
}
```

At this point, if we add the `logout` attribute to our `greeting-message` element, the `attributeChangedCallback()` will log some stuff into the console.

```js
let greeting = document.querySelector('greeting-message');

// Nothing will happen here, because we're not watching this attribute
greeting.setAttribute('hello', 'you');

// logs "changed", "logout", null, "true"
greeting.setAttribute('logout', true);
```

If we were observing more than one attribute, we would want to first check what the `name` was before doing anything in the `attributeChangedCallback()` function.

```js
/**
 * Runs when the value of an attribute is changed on the component
 * @param  {String} name     The attribute name
 * @param  {String} oldValue The old attribute value
 * @param  {String} newValue The new attribute value
 */
attributeChangedCallback (name, oldValue, newValue) {

	// Of tje logout attribute
	if (name === 'logout') {
		// ...
	}

}
```

For this web component, though, the function only runs for the `logout` attribute, so we don't have to check the `name`, nor do we have to worry about the `oldValue` or `newValue`.

First, we'll use the `Element.querySelector()` method to get the `button` inside our web component, and assign it to the `btn` variable.

If a `btn` is found, we'll use the `Element.removeEventListener()` method to remove the `click` event on the button. Then, we'll use the `Element.remove()` method to remove the `btn` from the DOM.

```js
/**
 * Runs when the value of an attribute is changed on the component
 */
attributeChangedCallback () {

	// Remove the button
	let btn = this.querySelector('button');
	if (btn) {
		btn.removeEventListener('click', this.clickHandler);
		btn.remove();
	}

}
```

Next, we'll look for the `.message` element, and assign it to the `target` variable.

If a `target` is found, we'll use the `Element.getAttribute()` method to get the value of the `[name]` attribute on the web component. Then, we'll use the `Element.textContent` property to display a goodbye message in the `target`.

If there's a `name`, we'll use it. Otherwise, we'll use `friend`.

```js
/**
 * Runs when the value of an attribute is changed on the component
 */
attributeChangedCallback () {

	// Remove the button
	let btn = this.querySelector('button');
	if (btn) {
		btn.removeEventListener('click', this.clickHandler);
		btn.remove();
	}

	// Get the message element
	let target = this.querySelector('.message');
	if (target) {

		// Inject the message into the UI
		let name = this.getAttribute('name');
		target.textContent = `Bye, ${name ? name : 'friend'}! See you next time.`;

	}

}
```

Now, when we add the `logout` attribute to our custom element, the button is removed and a message is shown in the UI.

[Here's a demo.](https://codepen.io/cferdinandi/pen/ZErPgxx)

## What's next? The shadow DOM.

The _Shadow DOM_ is a special, hidden DOM, separate from the main DOM.

Web components can use the Shadow DOM to _encapsulate_ elements and avoid the naming collisions and unintended side effects that sometimes happen when code is used by teams or across projects.

If you want to keep learning about native web components, [click here to check out my new course and ebook](https://vanillajsguides.com/web-components/).