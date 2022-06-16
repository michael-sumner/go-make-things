---
title: How to create a web component with vanilla JS
date: 2022-06-16T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

Yesterday, we looked at [what web components are](/what-are-browser-native-web-components/). Today, I wanted to share how to actually create one.

Let's dig in!

_Today's article is an excerpt from [my new course and ebook on web components with vanilla JS](https://vanillajsguides.com/web-components/)._

## Creating a web component

To help make the concepts in this guide tangible, we're going to build a really simple web component: `greeting-message`.

```html
<greeting-message></greeting-message>
```

When we're done, the component will load a `button` into the UI, and display a welcome message when the `button` is clicked. If a `logout` attribute is added to it, the `button` gets removed from the UI, and a "goodbye message" is shown.

We'll also include some custom styling, and add some hooks that developers can use to customize it a bit (without breaking things).

## Registering a web component

To create a web component, the first thing you have to do is register it with JavaScript.

To do that, we'll first use a JavaScript class to extend the `HTMLElement` object. Just like with a traditional constructor pattern, our class name should be in _Title Case_.

Let's call this one `GreetingMessage`.

```js
// Extend the HTMLElement class to create the web component
class GreetingMessage extends HTMLElement {
	// We'll create our web component here
}
```

After we create our new class, we need to define our component using the `CustomElementRegistry.define()` method.

The first argument is the `name` of the element. This is the name of the actual element itself in your HTML. It must include at least one dash (`-`). Single-word web components are not allowed.

The second argument is the `constructor`, the new class that you create for your web component.

(_As a best practice, we should make sure that `customElements` exist as an object in the `window` first._)

```js
// Extend the HTMLElement class to create the web component
class GreetingMessage extends HTMLElement {
	// We'll create our web component here
}

// Define the new web component
if ('customElements' in window) {
	customElements.define('greeting-message', GreetingMessage);
}
```

Now, we've registered a new web component. It doesn't do anything yet, but it exists!

## The web component lifecycle

As the browser parses and renders your web component into the DOM, there are a few lifecycle callback functions that run at various times.

- The `constructor()` method is run when the element is created, before its injected into the UI.
- The `connectedCallback()` method is run when the element is injected into the DOM, and again whenever it's moved or appended elsewhere.
- The `disconnectedCallback()` method is run whenever the element is removed from the DOM.

We can include functions that run on each of these events inside our web component class.

Because we're extending an existing class, the `constructor()` function needs to include the `super()` method, which provides access to the parent class's properties and methods.

```js
// Extend the HTMLElement class to create the web component
class GreetingMessage extends HTMLElement {

	/**
	 * The class constructor object
	 */
	constructor () {

		// Always call super first in constructor
		super();

		console.log('Constructed', this);

	}

	/**
	 * Runs each time the element is appended to or moved in the DOM
	 */
	connectedCallback () {
		console.log('connected!', this);
	}

	/**
	 * Runs when the element is removed from the DOM
	 */
	disconnectedCallback () {
		console.log('disconnected', this);
	}

}
```

If you include a web component in the UI and do nothing else on the page, the `constructor()` method will run, followed by the `connectedCallback()`. 

```js
// On page load, the browser would log...
// "Constructed" <greeting-message></greeting-message>
// "connected!" <greeting-message></greeting-message>
```

If you were to move your element using something like the `Element.append()` method, the `disconnectedCallback()` function would run, followed by the `connectedCallback()` function. 

If you removed it with the `Element.remove()` method, just the `disconnectedCallback()` function would run.

```js
let greeting = document.querySelector('greeting-message');

// The console logs...
// "disconnected" <greeting-message></greeting-message>
// "connected!" <greeting-message></greeting-message>
document.body.append(greeting);

// The console logs...
// "disconnected" <greeting-message></greeting-message>
greeting.remove();
```

## Generating the web component HTML

Now that we have a registered web component, we need to generate some actual HTML in the UI.

Inside the `constructor()` function, we can use the `Element.innerHTML` property to set the HTML inside `this`, the current instance of the web component element.

In our case, let's add a `p` with a `button` inside it. We'll also add a `.message` element, with an ARIA live region on it. We'll be injecting a greeting in there when the user clicks the button.

```js
/**
 * The class constructor object
 */
constructor () {

	// Always call super first in constructor
	super();

	// Render HTML
	this.innerHTML =
		`<p>
			<button>Hi there!</button>
		</p>
		<div class="message" aria-live="polite"></div>`;

}
```

Now, when the web component is loaded, this is what's displayed in the DOM.

```html
<greeting-message>
	<p>
		<button>Hi there!</button>
	</p>
	<div class="message" aria-live="polite"></div>
</greeting-message>
```

Now we've got a basic web component in place and rendering HTML into the UI. [Here's a demo.](https://codepen.io/cferdinandi/pen/ZErPGME)

Tomorrow, we'll look at how to add interactivity.