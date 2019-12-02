---
title: I <3 the cascade!
date: 2019-12-02T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
- Web Performance
---

A lot of developers, particularly those who learned JavaScript first, **hate** *the cascade*.

*The cascade*, if you're not familiar with it, is the *C* in *CSS* (Cascading Style Sheets). In CSS, styles default to the `window`, and *cascade* down to child elements.

```css
/**
 * This will apply to all buttons in the entire UI
 */
button {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}
```

For JavaScript developers who are used to being able to tightly scope variables, functions, and so on to a component, this feels like a bug.

But in reality, the cascade is a feature.

The cascade let's me keep my stylesheets small, lean, and performant. It means I don't have to redeclare styles for the same element over and over again for each component I include it in.

Imagine having to rewrite the same styles for buttons used to submit your contact form, buttons used to sign up for your newsletter, and buttons for a call-to-action box.

```css
/**
 * Button styles for the contact form
 */
.contact button {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}

/**
 * Button styles for newsletter form
 */
.newsletter button {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}

/**
 * Button styles for calls-to-action
 */
button.call-to-action {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}
```

And yes, you could combine them like this.

```css
.contact button,
.newsletter button,
button.call-to-action {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}
```

But isn't that absurd when you can just style a button once and get on with your life?

```css
button {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}
```

And all this talk about how CSS is broken but JavaScript makes so much more sense ignores the mountain of hacks that exist in JavaScript, too.

JS is also global by default. We use [IIFEs and wrapper functions](/the-anatomy-of-an-immediately-invoked-function-expression/) to add scope.

```js
// This is a global variable
var myName = 'Chris';

// Wrapping it in a function gives it scope
(function () {
	var myName = 'Chris';
})();
```

And for all this talk about CSS being global, you *can* actually scope styles when you need to. It's more-or-less the same way you do it in JavaScript.

Let's say you used a global button style, but wanted to override certain buttons to have a different background color. Maybe blue instead of purple.

You can do this.

```css
/**
 * This will apply to all buttons in the entire UI
 */
button {
	background-color: rebeccapurple;
	color: white;
	font-weight: bold;
}

/**
 * This overrides the default button styles for .callout components
 */
.callout button {
	background-color: blue;
}
```

Rather than rewriting all of the styles for any particular component, you tweak just the styles you need to.

The cascade is a beautiful thing!