---
title: "Classes vs. prototypal inheritance in vanilla JS"
date: 2021-05-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of the more common questions I get from students is how JavaScript classes are different from prototypal inhertiance in vanilla JS.

Today, that's what we're going to look at. Let's dig in!

## What is prototypal inheritance?

JavaScript uses prototypes to reduce the load on your browsers memory and save you from having to duplicate code.

For example, let's say you had `Wizard()` object that you could use to create wizards and cast their spells. First, you would create a Constructor object. In this case, let's accept a signature `spell` as a parameter.

```js
/**
 * The Wizard constructor
 * @param {String} spell The signature spell
 */
function Wizard (spell) {
	// Do stuff...
}
```

Now, you can create a new wizard by _instantiating a new instance_ with the `new` keyword.

```js
// Create a new wizard
let merlin = new Wizard('Abracadabra!');
```

We want to be able to access the `spell` later, so inside the `Wizard` constructor, we'll save it as a property of the _instance_ using the `this` keyword.

```js
/**
 * The Wizard constructor
 * @param {String} spell The signature spell
 */
function Wizard (spell) {
	this.spell = spell;
}
```

Now, `spell` is a property of each instance you create. For example, `merlin.spell` would return `Abracadabra!`.

```js
// logs "Abracadabra!" to the console
console.log(merlin.spell);
```

### Creating properties on each instance

We can add properties and methods that apply to _every instance_ by adding them to the `Wizard()` constructor object's prototype.

For example, let's give every wizard a `flourish` property that returns `:waves hands: tada!`. We'll do this by attaching it to the `Wizard.prototype`.

```js
Wizard.prototype.flourish = ':waves hands: tada!';
```

Every time a `new Wizard()` is created, it automatically has the `flourish` property.

But instead of creating a copy of that property each time, the browser references the prototype object. This reduces the load on the browser's memory and makes things more efficient.

You can also use prototypal inheritance to add functions. Inside the function, you can use the `this` keyword to access any properties on the instance.

```js
/**
 * Alert the wizard's spell
 */
Wizard.prototype.cast = function () {
	alert(`${this.spell}... ${this.flourish}`);
};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWMpNMR)

## How do vanilla JS classes work?

Vanilla JS classes are (mostly) _syntactic sugar_ around prototypal inheritance.

There are some notable differences (which we'll look at shortly), but generally speaking, they provide a different syntax to do the same thing.

Let's recreate our `Wizard()` object as a JavaScript class. First, we'll define our class.

```js
class Wizard {
	// Code goes here...
}
```

Inside our class, we add our constructor object with the `constructor` keyword.

```js
class Wizard {

	/**
	 * The Wizard constructor
	 * @param {String} spell The signature spell
	 */
	constructor (spell) {
		this.spell = spell;
	}

}
```

Any other functions and properties get added to the class object as properties, _without_ the need for the `function` operator or `prototype` keyword.

Properties that apply to each instance need to be assigned inside the `constructor()`, however.

```js
class Wizard {

	/**
	 * The Wizard constructor
	 * @param {String} spell The signature spell
	 */
	constructor (spell) {
		this.spell = spell;
		this.flourish = ':waves hands: tada!';
	}

	/**
	 * Alert the wizard's spell
	 */
	cast () {
		alert(`${this.spell}... ${this.flourish}`);
	}

}
```

Now, we can instantiate our wizard just like before.

```js
// Create a new wizard
let merlin = new Wizard('Abracadabra!');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ExWZNpQ)

## So... how are they different?

Aside from basic syntactic differences, there are a few things that work differently between them.

### Static properties and methods

Your object may have a property you want applied to the object itself, and not unique instances. For our `Wizard()` object, let's say we had an `volunteer()` function alerts `May I have a volunteer from the audience?`.

We want to run it on the `Wizard()` object, not each individual wizard.

```js
// This should work
Wizard.volunteer();

// This should not
merlin.volunteer();
```

With prototypal inheritance, we would do that like this.

```js
Wizard.volunteer = function () {
	alert('May I have a volunteer from the audience?');
};
```

With classes, we need to use the `static` operator.

```js
class Wizard {

	static volunteer () {
		alert('May I have a volunteer from the audience?');
	}

	// The rest of the code...

}
```

### Private variables and methods

With prototypal inheritance you can wrap your object in [a revealing module pattern](https://vanillajstoolkit.com/boilerplates/revealing-module-pattern/) and have private properties and methods only accessible with it.

For example, lets say we had a function we used to convert spells to lowercase.

(_Yes, this is absurd. It's just an example._)

```js

let Wizard = (function () {

	function makeLowercase (spell) {
		return spell.toLowercase();
	}

	/**
	 * The Wizard constructor
	 * @param {String} spell The signature spell
	 */
	function Wizard (spell) {
		this.spell = makeLowercase(spell);
	}

	Wizard.prototype.flourish = ':waves hands: tada!';

	/**
	 * Alert the wizard's spell
	 */
	Wizard.prototype.cast = function () {
		alert(`${this.spell}... ${this.flourish}`);
	};

	return Wizard;

})();
```

Because `makeLowercase()` isn't attached to the `Wizard()` object, it cannot be accessed externally.

```js
// This isn't a function
Wizard.makeLowercase();

// Neither is this
merlin.makeLowercase();
```

Classes have no way to handle this just yet. There's a proposal to add this feature by prefixing with a hash (`#`), but it's not universally implemented yet and can't be used in production.

```js
class Wizard {

	// This will NOT work yet
	#makeLowercase (spell) {
		return spell.toLowercase();
	}

	/**
	 * The Wizard constructor
	 * @param {String} spell The signature spell
	 */
	constructor (spell) {
		this.spell = this.#makeLowercase(spell);
	}

	// The rest of the code...

}
```

Today, all properties and methods _have_ to be externally accessible.

## Which approach should you use?

While I've grown to enjoy the structure and cleaner syntax of JavaScript classes, I feel like prototypal inheritance gives me more features and control right now, so I personally use that on all of my projects.

In another year or two, that may change.