---
categories:
- Code
- JavaScript
date: '2017-06-27'
url: /vanilla-javascript-form-validation-and-the-constraint-validation-api/
title: Vanilla JavaScript form validation and the constraint validation API
---

Yesterday, I showed you [how to use native browser form validation through a combination of semantic input types](/vanilla-javascript-form-validation/) (for example, `<input type="email">`) and validation attributes (such as `required` and `pattern`).

While incredibly easy and super lightweight, this approach does have a few shortcomings.

1. You can style fields that have errors on them with the `:invalid` pseudo-selector, but you can't style the error messages themselves.
2. Behavior is also inconsistent across browsers.

In today's article on CSS Tricks, I walk you through [how to use the Constraint Validation API and some lightweight vanilla JavaScript to get our desired user experience](https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/)&mdash;without relying on heavy JS libraries.

Check it out!