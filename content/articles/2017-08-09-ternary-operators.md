---
categories:
- Code
- JavaScript
date: '2017-08-09'
permalink: /ternary-operators/
title: Ternary Operators
url: /2017/08/09/ternary-operators
---

Ternary operators provide you with a way to write more concise `if...else` variables. For example, you might set a conditional variable like this:

```lang-javascript
var getSandwich = function (useMayo) {
	var sandwich;
	if (useMayo) {
		sandwich = 'turkey';
	} else {
		sandwich = 'peanut butter & jelly';
	}
	return sandwich;
};
```

The function above could be slightly improved like this:

```lang-javascript
var getSandwich = function (useMayo) {
	var sandwich = 'peanut butter & jelly';
	if (useMayo) {
		sandwich = 'turkey';
	}
	return sandwich;
};
```

But, with a ternary operator, we can reduce it to just two lines like this:

```lang-javascript
var getSandwich = function (useMayo) {
	var sandwich = useMayo ? 'turkey' : 'peanut butter & jelly';
	return sandwich;
};
```

Here's how it works.

The part before the `?` is a statement to evaluate. It works just like an `if` statement, and can include multiple conditions using `&&` (and) and `||` (or).

The section between the `?` and `:` is the value of the variable if the evaluated statement is `true`. The part after the `:` is the value if it's false.

```lang-javascript
var someVariable = the thing to evaluate ? the value if it's `true` : the value if it's `false`;
```

If you've never seen them before, ternary operators can be a bit confusing. But once you start using them, they keep your code base smaller and can be easier to read.