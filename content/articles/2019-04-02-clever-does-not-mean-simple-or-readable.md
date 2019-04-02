---
title: "Clever JavaScript does not mean simple or readable"
date: 2019-04-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Last week, someone tweeted:

> Woah, this is elegant JavaScript. Need to conditionally add a property to an object? Here's a slick approach. The right-hand side is only applied if the condition is true. If the condition is falsy, the spread operator does nothing.

They shared [this code snippet from an article by Andrea Simone Costa](https://dev.to/jfet97/the-shortest-way-to-conditional-insert-properties-into-an-object-literal-4ag7):

```js
const obj = {
    ...condition && { prop: value },
};
```

This is not a dig at Andrea. That code is *really* clever!

But we've become obsessed as an industry with brevity and *clever code*, and it results in code that's sometimes less performant, and typically harder to read and make sense of for most people.

[Readibility is way more important than brevity.](/readability-is-more-important-than-brevity/)

The example above could be rewritten like this:

```js
var obj = {};
if (condition) {
	obj[prop] = value;
}
```

One extra lines, one *less* character, and much more obvious what's actually going on.

And [as Lea Verou pointed out](https://twitter.com/LeaVerou/status/1111978340515266561), also slightly more performant since you're not needlessly creating a new object each time.