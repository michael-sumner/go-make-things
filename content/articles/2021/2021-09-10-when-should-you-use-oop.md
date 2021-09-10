---
title: "When should you use object-oriented programing (OOP)?"
date: 2021-09-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Back in May, I wrote about object-oriented programming (OOP), and the [difference between classes and traditional prototypal inheritance](/classes-vs.-prototypal-inheritance-in-vanilla-js/). One thing I didn't discuss, though, was when you would want to use OOP over plain old functions.

Let's talk about that today.

## What is OOP?

If you missed the original article and are too lazy to go read the whole thing, here's a quick summary.

JavaScript uses prototypes to reduce the load on your browsers memory and save you from having to duplicate code.

For example, let’s say you had `Wizard()` object that you could use to create wizards and cast their spells. First, you would create a Constructor object. In this case, let’s accept a signature `spell` as a parameter.

```js
/**
 * The Wizard constructor
 * @param {String} spell The signature spell
 */
function Wizard (spell) {
	// Do stuff...
}
```

Now, you can create a new wizard by instantiating a new instance with the `new` keyword.

```js
// Create a new wizard
let merlin = new Wizard('Abracadabra!');
```

We want to be able to access the spell later, so inside the `Wizard` constructor, we’ll save it as a property of the instance using the `this` keyword.

```js
/**
 * The Wizard constructor
 * @param {String} spell The signature spell
 */
function Wizard (spell) {
	this.spell = spell;
}
```

Now, spell is a property of each instance you create. For example, `merlin.spell` would return `Abracadabra!`.

```js
// logs "Abracadabra!" to the console
console.log(merlin.spell);
```

### Attaching properties and methods

With this type of setup, you can attach properties to the object's `prototype`, and they'll be accessible to every instance of the object that you instantiate.

You can also access instance properties using the `this` keyword.

```js
// Will return a string
Wizard.prototype.flourish = ':waves hands: tada!';

/**
 * Alerts the wizard's spell, with the flourish
 */
Wizard.prototype.cast = function () {
	alert(`${this.spell}... ${this.flourish}`);
};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWMpNMR)

## The same thing with functional programing

You can achieve more-or-less the same outcome using functional programming.

First, we'll assign an object to a variable, with the `spell` and `flourish` as properties.

```js
let merlin = {
	spell: 'Abracadabra',
	flourish: ':waves hands: tada!'
};
```

Then, we'll create a function to cast the spell.

```js
function cast (wizard) {
	alert(`${wizard.spell}... ${wizard.flourish}`);
}
```

Now, we can access the `spell` and `flourish` properties directly on the `wizard` object, and cast spells by passing the `wizard` into the `cast()` function.

```js
// logs "Abracadabra"
console.log(merlin.spell);

// alerts "Abracadabra... :waves hands: tada!"
cast(merlin);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/jOwmEQa)

## When and why would you choose OOP over functional programing?

If you're like many of my students (and me!), you may find the functional programing example easier to read and understand. So... why would you ever choose OOP over functional programming?

In certain situations, OOP is better for performance.

Whenever you create a `new Wizard()`, the only new thing that gets added to the browser's memory is `this.spell`. All of the properties and methods point to the original _prototype_ the instance is based off of.

In our functional programming example, the memory benefit is negligible. The `flourish` property is a second bit of information in memory, but it could be easily hard coded into the `cast()` function.

Where OOP really shines is in bigger libraries where you want or need to be able to call methods on an instance, or where you're creating lots of items with shared properties.

### An example with a library

For example, let's say you wanted to [scope your functional code inside a library](/how-scope-works-in-javascript/), to avoid variable collisions.

```js
function wizard (spell) {

	let flourish = ':waves hands: tada!';

	function cast (wizard) {
		alert(`${spell}... ${flourish}`);
	}

	return {cast, spell};

}
```

With this setup, you could do something like this.

```js
let merlin = wizard('Abracadabra');
merlin.cast();
console.log(merlin.spell);
```

[Here's one more demo.](https://codepen.io/cferdinandi/pen/XWgRbJO)

While this _seems_ simpler and cleaner than using OOP, it's worse for performance. Every time you create a new wizard, a new object is created that takes up more space in the browser's memory.

If you're just creating a couple of wizards, it's no big deal. But if you're creating a lot of them, things can start to get bogged down.

### So... when should you use OOP?

If you need a simple guideline: whenever you're going to being creating more than one or two of an item that has some shared properties and some unique ones.

It will be better for performance.