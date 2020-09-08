---
title: "How to write your own vanilla JS polyfill"
date: 2020-09-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In [yesterday's article on the `String.replaceAll()` method](/how-to-replace-all-instances-of-a-string-with-another-with-vanilla-js/), I mentioned that I wrote a polyfill for it because the support wasn't so great.

Today, I wanted to share how to write polyfills, in case that's ever something you wanted to do.

## What is a polyfill?

A polyfill is [a term coined by Remy Sharp](https://remysharp.com/2010/10/08/what-is-a-polyfill) for a snippet of code that adds support for a feature to browsers that don’t offer it natively.

They let you provide deeper backwards compatibility and browser support without having to use a clunky preprocessor or command line tool.

It doesn't work for everything. [You can polyfill new Object types and methods, but you can't polyfill expressions and operators.](/what-can-and-cant-be-polyfilled-in-vanilla-js/)

For example:

- The `Array.prototype.map()` method *can* be polyfilled
- Arrow functions, the spread operator, and template literals *cannot*

Let's look at how to write polyfills.

## Checking for the native method first

Let's look at the `String.replaceAll()` method.

Before polyfilling it, the first thing I want to do is make sure a native version of it doesn't exist. We only want to run our polyfill if there's *not* a native version available.

In this case, the `replaceAll()` method is on the `String.prototype` object, so we check for that.

```js
// Make sure there's no native method available first
if (!String.prototype.replaceAll) {
	// Add some polyfill code...
}
```

Next, we need to create a function for the method we're polyfilling, and setup some arguments.

In this case, the `replaceAll()` method accepts two arguments: the substring to search for, and the string to replace it with.

```js
if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function (str, newStr){
		// Recreate the native method here...
	};
}
```

## Recreating the native function

Now, we're ready to actually recreate the native method.

To do this, you need to think about what native, better supported methods and approaches already exist that you can use to accomplish the same task. If `replaceAll()` wasn't an option, what would you do?

In this case, we actually looked at [how you can use the `String.replace()` method with a regex pattern to do the same](/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/) thing on Friday.

Because our function is on a prototype, inside our function, `this` is the string that the `replaceAll()` method is called on. We can call `this.replace()`, use `new RegExp()` to create a new regex pattern, and pass our `str` argument in with the global (`g`) flag.

Then, we can pass the `newStr` argument in as the thing to replace it with. And finally, we can return the result.

```js
if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function (str, newStr){

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}
```

There's still one other thing to do, though. Both the `replace()` and `replaceAll()` methods all you to pass a regex pattern in for the string to match.

If one is provided, we *don't* want to create a new regex pattern with it, because it already is on.

We should first check if the `str` is a regex, and if so, pass it into `this.replace()` as-is. To do that, we'll use [the `Object.prototype.toString.call()` hack](/true-type-checking-with-vanilla-js/), since `typeof` on regex returns `object`.

```js
if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function (str, newStr){

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}
```

And with that, we have a polyfill!

## Error handling

Depending on how your polyfill is setup, it may be a good idea to check that all required variables are provided and are of the correct type.

Because in this specific case the arguments for `String.replace()` are the same as `String.replaceAll()`, we can rely on the `replace()` method's built-in error handling to do that for us.