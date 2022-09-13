---
title: How to organize unit tests
date: 2022-09-13T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- JavaScript
- Web Performance
---

Over the last few days, we've learned about [the essentials of testing JavaScript](/a-quick-primer-on-testing-javascript/), [how to write basic unit tests with Jest](/unit-testing-with-vanilla-js/), and [advanced matcher methods](/diving-deeper-into-unit-testing-vanilla-javascript/).

Today, we're going to wrap up the series by looking at how to organize tests.

As a best practice, you should keep each piece of code your testing in its own `{filename}.test.js` file.

For a JavaScript library, that might mean testing each method in its own file. For an app or website, that might mean testing multiple functions for a particular view or feature in one file.

Within a test file, you can use the Jest `describe()` method to group `test()` methods and add a bit more structure. Pass in a description of the group of tests, and a callback function that contains your tests.

In this example, I've broken each expectation we're testing about our `sayHi()` function into its own `test()`, and moved the comment into the test description.

```js
describe('The sayHi() method', function () {

	test('it returns a string', function () {
		expect(typeof sayHi()).toBe('string');
	});

	test('it includes the provided name', function () {
		expect(sayHi('Merlin')).toContain('Merlin');
	});

	test('it has a value when no name is included', function () {
		expect(sayHi()).not.toHaveLength(0);
	});

});
```

In addition to being a bit more organized, when we run `npm run test:unit`, we also get a more detailed view of our tests printed in the CLI window.

```bash
PASS  tests/sayHi.test.js
  The sayHi() method
    ✓ it returns a string
    ✓ it includes the provided name
    ✓ it has a value when no name is included

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.16 s
Ran all test suites.
```

If you've enjoyed this series and want to [dig deeper into testing JavaScript, I have a new course and ebook](https://vanillajsguides.com/testing/).

In addition to what you've already learned, it explores code coverage (and whether or not it matters), how to test DOM manipulation and APIs, how to write mocks, how to write testable code, how to test internal functions, how to create end-to-end (E2E) tests with Playwright, how to lint your code, and how to create your own testing suite.

[Click here to learn more.](https://vanillajsguides.com/testing/)