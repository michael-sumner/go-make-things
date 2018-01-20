---
categories:
- Uncategorized
date: '2017-11-21'
url: /equals-vs-strict-equals-in-javascript/
title: Equals (==) vs Strict Equals (===) in JavaScript
---

You might have noticed that *equal* comparisons can be written two different ways: *equals* (`==`) and *strict equals* (`===`).

So what's the difference?

Strict equals checks if the two items are the same type. Regular equals does not. For example...

```js
// returns true
(42 == '42')

// returns false
(42 === '42')
```

If you don't want to check type (for example, if the user could pass in a string *or* a number and that's ok) use *equals*. Otherwise, default to *strict equals*.