---
title: "How to autocomplete two-factor authentication codes with a single HTML attribute"
date: 2020-10-28T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
---

Today's tip comes courtesy of [Tomek Sułkowski on Twitter](https://twitter.com/sulco/status/1320700982943223808).

If you manage an app that supports two-factor authentication, either through an app or SMS, you can make it easy for users to autocomplete their unique code. The trick is a single HTML attribute: `[autocomplete="one-time-code"]`.

```html
<label for="two-factor-auth">Authentication Code</label>
<input id="two-factor-auth" autocomplete="one-time-code">
```

[Tomek setup a demo here.](https://stackblitz.com/edit/one-time-code?file=index.html) (*I made [a fork on CodePen](https://codepen.io/cferdinandi/pen/RwRxzQd) in case his goes down or you want to fork and test yourself*).

To use it, text yourself a short "auth code" (maybe 4 or 6 digits). You can also [read more about the `[autocomplete]` attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values).