---
title: A quick primer on testing JavaScript
date: 2022-09-08T10:30:00-04:00
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

For years, one of the most frequent requests I've gotten from students is for resources about testing JavaScript.

There are lots of tutorials and tools for testing JS, but they almost all focus integrating with frontend frameworks like React (and all of the heavy tooling that comes along with it). How exactly do you test vanilla JS? ¯\\_(ツ)_/¯

Well, the wait is over! I just released [a new video course and ebook around testing vanilla JS](https://vanillajsguides.com/testing/)!

Over the next few days, we'll look at some core concepts around testing vanilla JavaScript. Today, we're going to look at the different types of tests you can run, and why you should bother testing in the first place.

Let's dig in!

## The types of tests you can run on your code

There are a handful of different ways that you can test your code.

**Linting (or static testing)** identifies typos, syntax errors, and anti-patterns in your code, and calls attention to them. Your text editor can be configured to run a _linter_ as you type, catching errors very early.

```javascript
// A linter would identify that "function" is misspelled here
fucntion sayHi (name = 'there') {
	return `Hi ${name}!`;
}
```

**Unit tests** look at small chunks of code, and verify that they do what they're supposed to do. They can be used to test individual functions in a library or component, or smaller parts of a bigger application.

```javascript
/** 
 	A unit test might verify that this returns a string,
 	that it includes the provided "name", and
 	that if no "name" is provided, it still works
*/
function sayHi (name = 'there') {
	return `Hi ${name}!`;
}
```

**End-to-End (E2E) tests** verify that all of the different pieces of your app or website work together. E2E testing tools typically open your site up in a real browser, and complete a series of tasks that an actual user might.

For example, an E2E test might open up your app, click on the "Login" link, enter a username and password into the form, click the "Submit" button, and then verify that the login was successful.

**Integration testing** is a phrase that is used differently by different people, and as a result can be confusing.

Some people use it to mean "testing a few units together, but not the whole app in a real browser." Other people use it to mean "testing individual units of code that call third-party services like APIs." [Martin Fowler has a really great article on the history behind this.](https://martinfowler.com/articles/2021-test-shapes.html)

Regardless of the definition that you use, the tools for running these types of tests are the same ones that you use to run a unit test, and functionally, they're the same thing.

For purposes of this guide, I'll be referring to both types of tests as _unit tests_, because it's more simple and clear.

## The goal of testing

Regardless of which testing approaches you use, the goal is always the same: to give yourself confidence that any changes you make and code you ship will continue to work as expected.

Within in the industry, there are a lot of opinions on what the right mix of testing approaches is. Should you write mostly unit tests? More end-to-end tests? An equal mix of both?

Many testing tools also include "coverage reports" that tell you what percentage of your code base has been tested. There are also lots of opinions on what percentage of your code should be tested.

But [as testing specialist Justin Searls notes](https://twitter.com/searls/status/1393385209089990659), those questions miss the point of testing...

> People love debating what percentage of which type of tests to write, but it's a distraction. Nearly zero teams write expressive tests that establish clear boundaries, run quickly & reliably, and only fail for useful reasons. Focus on that instead.

The goal of testing is to catch errors before they ship.

We want to write tests that cover common use cases for whatever it is that we're building, and fail quickly when the code we've written won't behave correctly for the user.

Ready to dive deeper into vanilla JS testing? [Check out my new pocket guide!](https://vanillajsguides.com/testing/)