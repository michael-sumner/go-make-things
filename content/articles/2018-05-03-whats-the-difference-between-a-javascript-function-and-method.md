---
title: "What's the difference between a function and a method in JavaScript?"
date: 2018-05-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

You know what a function is, but you may have also heard the term *method* used before and wondered what it means.

**So what's the difference between a function and a method?** Nothing. They're the same thing.

In languages other than JavaScript, the two terms have specific meanings. And JavaScript developers will sometimes apply their own definition to the two terms.

The one I see most often is that a method is a function that's inside an object like this.

```javascript
var helperLibrar = {
	method1: function () {
		return 'This is a method, supposedly';
	}
};
```

The problem with these definitions is that no one agrees on them, and many, many JavaScript developers use *function* and *method* interchangeably.

In my opinion, they're the same thing.