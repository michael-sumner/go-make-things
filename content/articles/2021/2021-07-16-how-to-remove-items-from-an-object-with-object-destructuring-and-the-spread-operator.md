---
title: "How to remove items from an object with object destructuring and the spread operator"
date: 2021-07-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this year, I wrote about both [object destructuring](/destructing-in-vanilla-js/) and [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/).

Yesterday, [Angus Croll shared a tweet](/the-spread-syntax-operator-in-vanilla-js/) showing how you can combine the two to remove unwanted properties from an object.

Let's say you have an object with some information about Merlin the wizard.

```js
let merlin = {
	job: 'wizard',
	age: '942',
	hobbies: ['disappearing', 'seeming aloof'],
	spells: ['dancing broomsticks', 'turning into animals'],
	height: '6 feet 3 inches',
	eyes: 'blue'
};
```

Now, let's say you wanted to remove the `hobbies`, `height`, and `eyes` properties from the object.

You could use the `delete` operator, like this.

```js
delete merlin.hobbies;
delete merlin.height;
delete merlin.eyes;
```

It's a bit verbose, though. And what if you wanted to keep the original intact?

We can use object destructuring and the spread syntax to create a new object with the properties we want, removing the ones we don't.

```js
let {hobbies, height, eyes, ...merlinAbridged} = merlin;
```

Now, we have a new `merlinAbridged` object containing everything from the original object _except_ the `hobbies`, `height`, and `eyes` properties, which got pulled out into their own variables.

[Here's a demo.](https://codepen.io/cferdinandi/pen/yLbMrBm)