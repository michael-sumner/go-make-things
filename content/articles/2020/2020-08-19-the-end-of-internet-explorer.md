---
title: "The end of Internet Explorer"
date: 2020-08-19T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

Internet Explorer 11 is a lot better than IE 9 and 10. But it's still not great.

So many of the awesome new JavaScript methods work in every browser... except IE. Newer DOM manipulation methods like [`Element.remove()`](https://vanillajstoolkit.com/reference/dom-injection/element-remove/), [`Element.before()`](https://vanillajstoolkit.com/reference/dom-injection/element-before/), and [`Element.after()`](https://vanillajstoolkit.com/reference/dom-injection/element-after/). The [Fetch API](https://vanillajstoolkit.com/reference/ajax/fetch/). [Template literals.](https://vanillajstoolkit.com/reference/strings/template-literals/) Array and object [destructuring](/destructuring-in-javascript/). [Default argument values.](/how-to-set-default-function-arguments-with-vanilla-js/)

You can [polyfill a lot of this stuff](https://vanillajstoolkit.com/polyfills/), but not the cooler, game-changing stuff like template literals, default arguments, or destructuring.

IE has been the last hold-out of a stagnated web, an era when browsers didn't automatically update themselves and you had to take into account about what version of a browser someone was using.

I'm a big fan of progressive enhancement and deep backwards compatibility, but I was *utterly delighted* to read that [Microsoft is finally sunsetting IE11 and Legacy Edge (the non-Chromium original version)](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666).

> Today, we’re announcing that Microsoft 365 apps and services will no longer support Internet Explorer 11 (IE 11) by this time next year.
>
> - Beginning November 30, 2020, the Microsoft Teams web app will no longer support IE 11.
> - Beginning August 17, 2021, the remaining Microsoft 365 apps and services will no longer support IE 11.
>
> This means that after the above dates, customers will have a degraded experience or will be unable to connect to Microsoft 365 apps and services on IE 11. For degraded experiences, new Microsoft 365 features will not be available or certain features may cease to work when accessing the app or service via IE 11.

I'm not typically a fan of average developers refusing to support certain browsers. But I *do* think it's good when the companies that make and maintain those legacy browsers drop support for them.

What's the difference?

You or I refusing to support IE11 means that a bunch of corporate users with locked down computers who have no control over what browser is on it can't use the things we make. Microsoft doing it forces companies to rethink their system defaults and make changes.

It has a seismic shift.

And now, we have a timeline. I reserve the right to change my mind here, but at time of writing, I plan to drop IE support for any future projects starting early-to-mid next year.