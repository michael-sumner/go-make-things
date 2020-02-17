---
title: "Using let to declare variables"
date: 2020-02-17T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In the past, I've been vocal about [why I prefer `var` over `let`](/why-i-dont-use-let-const-or-fat-arrow-functions-and-you-shouldnt-either/), but I'm starting to come around.

Today, I wanted to look how they differ, and when and why you might want to choose `let` over `var`.

## Variables and scope

Historically in JavaScript, scope was only created within functions.

In the example below, `var x = 2` throws an error because `x` has already been declared within the current scope.

```js
var x = 1;

if (x === 1) {
	// This throws an error:
	// Uncaught SyntaxError: Identifier 'x' has already been declared
	var x = 2;
}
```

Similarly, in this example, `console.log(i)` will log `10` to the console after our loop runs.

```js
for (var i = 0; i < 10; i++) {
	// Loop 10 times
}
console.log(i);
```

## Block scope

By contrast, the `let` operator creates *block scoped* variables.

Block scope is created whenever you have curly braces. That includes functions, like with traditional scope. But it also means things like `for` loops and `if...else` statements as well.

Looking at our examples again, here, `let x = 2` creates a newly defined variable within the scope of the `if` statement. Inside the statement, `console.log()` logs `2`. Outside of the `if` statement, it logs the originally defined `1`, because `let x = 2` exists in a different scope.

```js
let x = 1;

if (x === 1) {

	// Does  NOT throw an error
	let x = 2;

	// Logs 2
	console.log(x);

}

// Logs 1
console.log(x);
```

Let's look at our `for` loop again. If we use `let` to declare `i`, its value only exists inside the loop.

Trying to log its value after the loop causes a `ReferenceError`, because `i` is not defined inside that scope.

```js
for (let i = 0; i < 10; i++) {
	// Loop 10 times
}

// Throws an error:
// Uncaught ReferenceError: i is not defined
console.log(i);
```

## What does that mean for you?

My argument for always using `var` hinged on two things:

1. I don't want to have to think about which variable declaration operator to use. I'd rather just pick one and run with it.
2. The `var` operator has way better browser support. The `let` operator can't be polyfilled, and I don't want to use Babel.

That said, I like the more strict behavior that `let` introduces. JavaScript is a very loose language, and anything that forces more structure is, in my opinion, a good thing.

My browser support baseline is also shifting.

For years, I've targeted IE9 and above. Today, I think it's appropriate to consider starting with IE11 for JavaScript that's non-critical.

Rather than mixing `let` and `var`, I would use `let` for everything in that case.