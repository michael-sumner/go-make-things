---
title: Diving deeper into unit testing vanilla JavaScript
date: 2022-09-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Technology
---

On Friday, we looked at [unit testing with vanilla JS](/unit-testing-with-vanilla-js/). Today, we're going to learn about some advanced matcher methods you can use.

You could build an entire suite of tests using just the `expect.toBe()` matcher. But Jest includes a bunch of other matcher methods to make testing a bit easier.

For example, we're currently testing that the `name` variable works like this.

```js
// should include the provided name
expect(sayHi('Merlin').includes('Merlin')).toBe(true);
```

We could instead use the `toContain()` matcher method.

```js
// should include the provided name
expect(sayHi('Merlin')).toContain('Merlin');
```

If we wanted to test that the string returned by `sayHi()` without any options actually contained a value, we could use the `toBeTruthy()` method.

```js
// should have a value when no name is included
expect(sayHi()).toBeTruthy();
```

Jest also includes a `not` property that will check that the matcher is _not_ `true`.

For example, what if instead of checking if the returned value was _truthy_, we wanted to make sure it's length was not `0`? We could combine the `not` property on the `toHaveLength()` matcher.

```js
// should have a value when no name is included
expect(sayHi()).not.toHaveLength(0);
```

Don't feel like you have to memorize [all of the matchers](https://jestjs.io/docs/expect), or find the perfect one for the thing you're trying to test.

If there's a matcher that makes your life easier, use it. If not, `toBe()` and the `not` property work great!

And if you enjoyed this article and want to dig into additional JS testing topics like how to test DOM manipulation, how to test APIs, and how to test your entire app in a real browser, you might enjoy my course and ebook, [Testing Vanilla JS](https://vanillajsguides.com/testing/).