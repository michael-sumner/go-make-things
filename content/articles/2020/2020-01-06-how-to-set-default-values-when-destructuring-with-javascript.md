---
title: "How to set default values when destructuring with JavaScript"
date: 2020-01-06T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at [destructuring with JavaScript](/destructuring-in-javascript/).

One thing I didn't mention was that you can set default values for any destructured variable that doesn't match an index or property in your array or object.

For example, lets say you had an array and an object that looked like this.

```js
var arr = ['Hermione'];
var obj = {
	name: 'Hermione'
};
```

You want to destructure each of them into a few variables. But if there's no matching item in the array or object, you want to fallback to a default value.

When defining the variable names, use the equal sign (`=`) and the desired default value to assign a default.

```js
var [best = 'Dumbledore', worst = 'Ron'] = arr;
var {name = 'Hermione Granger', house = 'Gryffindor', ...otherDetails} = obj;
```

In the example above, `best` would equal `Hermione` because there's already a value at that index, but `worst` would fallback to `Ron` because there is no value.

Similarly, `name` would equal `Hermione`, because that key exists in the object. But `house` would equal `Gryffindor` because there isn't a matching key.

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/YzPYNvz)