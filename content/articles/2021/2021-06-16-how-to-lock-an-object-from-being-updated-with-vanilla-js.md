---
title: "How to lock an object from being updated with vanilla JS"
date: 2021-06-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

JavaScript provides two ways to prevent objects from being updated: `Object.freeze()` and `Object.seal()`.

They do similar but slightly different things. Let's dig in.

## The `Object.freeze()` method

The `Object.freeze()` method prevents properties from being added, updated, or deleted from an object or array.

As an example, let's say you had a `wizard` object with a few details.

```js
let wizard = {
	name: 'Merlin',
	age: 'old AF'
};
```

If you pass it into the `Object.freeze()` method, then try to update and add some properties, you'll find that the object remains unchanged.

```js
// Freeze the object
Object.freeze(wizard);

// Try to make updates
wizard.age = 42;
wizard.wand = true;
delete wizard.name;

// logs {name: "Merlin", age: "old AF"}
console.log(wizard);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOBdrPY)

## The `Object.seal()` method

The `Object.seal()` method allows properties that are already in an object to be updated, but prevents new properties from being added and existing ones from being deleted altogether.

```js
// Seal the object
Object.seal(wizard);

// Try to make updates
wizard.age = 42;
wizard.wand = true;
delete wizard.name;

// logs {name: "Merlin", age: 42}
console.log(wizard);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ZEewObM)