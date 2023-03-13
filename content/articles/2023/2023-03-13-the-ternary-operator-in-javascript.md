---
title: The ternary operator in JavaScript
date: 2023-03-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

This week, we're looking at variables and functions, and some intermediate JavaScript features that make working with them a bit nicer.

Today, we're kicking things off with the _ternary operator_. Let's dig in!

## What's a ternary operator?

A _ternary operator_ provides a shorter way to write `if...else` statements. It has three parts:

```js
let someVar = [the condition] ? [the value if true] : [the value if false];
```

It's the equivalent of this.

```js
let someVar;

if ([the condition]) {
	someVar = [the value if true];
} else {
	someVar = [the value if false];
}
```

## An example of a ternary operator

Let's say we wanted to define `answer` as `num` if `num` is greater than `10`. If not, we'll use `42`.

We can do that with a ternary operator, like this.

```js
let num = 0;
let answer = num > 10 ? num : 42;
```

It's the same as doing this, but consolidated down to one line.

```js
let num = 0;
let answer;

if (num > 10) {
	answer = num;
} else {
	num = 42;
}
```

## When should you and shouldn't you use ternary operators?

Ternary operators are great for defining values based simple `if...else` checks.

Once you start getting into complex checks with lots of _and_ and _or_ operators (`&&` and `||`), they become really hard to read. This is also true for _nested_ `if...else` checks.

For example, imagine something like this...

```js
let name;

if (api.data.firstName.length > 0) {
	name = api.data.firstName;
} else if (api.data.lastName.length > 0) {
	if (api.data.title.length > 0) {
		name = `${api.data.title} ${api.data.lastName}`;
	} else {
		name = `Mx. ${api.data.lastName}`;
	}
} else {
	name = 'friend';
}
```

You _could_ write that as a nested ternary operator like this...

```js
let name = api.data.firstName.length > 0 ? api.data.firstName : (api.data.lastName.length > 0 ? (api.data.title.length > 0 ? `${api.data.title} ${api.data.lastName}` : `Mx. ${api.data.lastName}`) : 'friend');
```

Is it shorter? Sort of, I guess. Is it more readable? Hell no!

The ternary operator shines when it makes your code more readable and easy to skim. 

If it's not doing that&mdash;if it makes your code harder to quickly parse and understand&mdash;use a traditional `if...else` check instead.