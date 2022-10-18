---
title: How to document object properties with JSDoc
date: 2022-10-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I'm in the middle of running [a 6-week workshop on how to structure and scale JavaScript](https://vanillajsacademy.com/advanced/), and one of my students asked a fantastic question that I wanted to share here.

They asked (I'm paraphrasing)...

> If a function accepts an object as an argument, how do you document that objects properties with JSDoc?

Let's dig in!

## An example function

Here, we have an `getWizardMessage()` function. It accepts a `wizard` object as an argument.

For teaching purposes, this particular function just returns a string.

```js
function getWizardMessage (wizard) {
	let {name, spells, age} = wizard;
	return `${name} is ${age} years old, and knows the following spells: ${spells.join(', ')}`;
}
```

To use the function, you pass in an object like this.

```js
let wizard = {
	name: 'Merlin',
	age: 'Old AF',
	spells: ['Dancing teacups', 'Turn into a fish', 'Talk to animals']
};

let msg = getWizardMessage(wizard);
```

Let's look at how to document that.

## Documenting a function with JSDoc

[JSDoc is a popular approach to inline documentation](/documenting-javascript/) used in many code bases. 

It provides conventions for describing what a function does, the parameters it accepts (their expected format, what they are, and so on), and what it returns back out.

Here's an example of how you might document the `getWizardMessage()` function with JSDoc.

```js
/**
 * Get the details about a wizard to render into the UI
 * @param  {Object} wizard The wizard data
 * @return {String}        The message about the wizard
 */
function getWizardMessage (wizard) {
	let {name, spells, age} = wizard;
	return `${name} is ${age} years old, and knows the following spells: ${spells.join(', ')}`;
}
```

As you can see, the docs include a description about what the function actually does, a `@param` tag that documents the `wizard` parameter, and a `@return` tag that documents what's returned out of the function.

This is good, but it provides no detail about what the expected properties of the `wizard` object actually are.

Let's fix that!

## Documenting object properties with JSDoc

With JSDoc, if your parameter is an object with properties, you can optionally add `@param` tags for each of them using _dot notation_.

Here, we'll add documentation for the `wizard.name`, `wizard.spells`, and `wizard.age` properties.

```js
/**
 * Get the details about a wizard to render into the UI
 * @param  {Object}  wizard         The wizard data
 * @param  {String}  wizard.name    The wizard's name
 * @param  {Array}   wizard.spells  A list of spells the wizard knows
 * @param  {Integer} wizard.age     The wizards age
 * @return {String}                 The message about the wizard
 */
function getWizardMessage (wizard) {
	let {name, spells, age} = wizard;
	return `${name} is ${age} years old, and knows the following spells: ${spells.join(', ')}`;
}
```

Now, a developer using this function has a much more clear picture of how the function works, and what expectations are for arguments passed into it.