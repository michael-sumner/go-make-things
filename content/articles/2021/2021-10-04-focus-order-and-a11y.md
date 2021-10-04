---
title: Focus order and accessibility
date: 2021-10-04T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
---

Many aspects of accessibility are [a lot harder than they should be](/accessibility-is-hard.-its-also-your-job./). But, there's also a lot of low-hanging fruit and easy wins... simple nudges and tweaks we can make that dramatically improve the user experience for people.

One of the more common accessibility errors is breaking focus-order.

[As Rachel Leggett wrote back in April](https://devyarns.com/logical-focus-order/):

> Logical focus order is the idea that someone navigating your webpage with a keyboard (i.e. without a mouse) will encounter elements in an order that makes sense.
>
> As someone presses TAB on their keyboard to move through your webpage, focus should go to interactive elements in a logical order. The order should make sense both for the meaning of the content and for how it is visually displayed.

You often see developers break this by manually overriding the focus order with the `tabindex` property.

In this example, the user would jump to the `#password` field first, _then_ to the `#username` field. This is unexpected, since the `#username` field appears first in the markup.

```html
<label for="username">Username</label>
<input type="text" name="username" id="username" tabindex="2">

<label for="password">Password</label>
<input type="password" name="password" id="password" tabindex="1">
```

Rachel's article includes info on how to test focus order, common pitfalls, and how to avoid them. 

[I'd recommend reading the whole thing.](https://devyarns.com/logical-focus-order/) This is an easy win for accessibility.