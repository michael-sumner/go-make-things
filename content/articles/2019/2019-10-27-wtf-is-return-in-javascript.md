---
title: "WTF is return in JavaScript"
date: 2019-10-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Something that often trips up my students who are just learning is JavaScript is the `return` operator.

Today, I want to give you a quick overview of what it is and when you should use it.

## The `return` operator, well, returns stuff

The `return` operator is used to *return* a value from inside a function.

Let's say you wanted to get the phrase, "Hello {name}", where `{name}` is a person's name. You can pass their name into a function, and use `return` to return a string with their name in it.

```js
var hiThere = function (name) {
	return 'Hello ' + name;
};
```

You can return any valid JavaScript object: strings, booleans, objects, arrays, and even other functions.

## The `return` operator ends a function

Once a `return` operator is executed, anything after it inside a function doesn't run.

I often use the `return` operator to bail if certain conditions aren't met. For example, if a function required an element to exist, you could use `return` to stop it from running if the element isn't in the DOM.

```js
// Only runs if elem exists
var makeOrange = function (elem) {
	if (!elem) return;
	elem.classList.add('orange');
};
```

## You can use `return` to avoid `if...else` statements

Because the `return` operator immediately ends a function, you can use it to skip the `else` in an `if...else` statement.

```js
// returns true if the number is bigger than 10
// This is how you would write it with if...else
var isItBiggerThanTen = function (num) {
	if (num > 10) {
		return true;
	} else {
		return false;
	}
};

// But since return ends the function, you can also skip the "else"
var isItBiggerThanTen = function (num) {
	if (num > 10) {
		return true;
	}
	return false;
};
```

## `return` has to be used inside a function

You can only use the `return` operator inside a function. If you try to use it outside of one, it will throw an error.

```js
// This works
var hiThere = function () {
	return 'Hello!';
};


// This throws an error
return 'Hello';
```

Hope that clarifies things!