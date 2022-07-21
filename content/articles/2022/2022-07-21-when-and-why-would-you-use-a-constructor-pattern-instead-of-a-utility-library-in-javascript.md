---
title: When and why would you use a constructor pattern over a utility library or standalone functions in vanilla JavaScript?
date: 2022-07-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Over the last few weeks, we've looked at different patterns for creating JavaScript libraries: the [Revealing Module Pattern](/the-vanilla-js-revealing-module-pattern/), the [Constructor Pattern](/the-vanilla-js-constructor-pattern/), and the [JavaScript Class pattern](/the-vanilla-js-class-pattern/).

One of the students in the current session of my [Vanilla JS Structure & Scale workshop](https://vanillajsacademy.com/advanced/) asked me for examples of actual problems that the Constructor Pattern (and by extension, the Class Pattern) solve. 

When and why would you choose that approach over a utility library with a Revealing Module Pattern, or just standalone functions?

Let's dig in!

## The big benefit of using constructors

Instance specific properties are _the_ reason you would choose to use a constructor or class instead of another approach.

Any time you have a library where you want to store, access, and modify unique information for each instance and manipulate it (and might have more than one), a constructor or class is a good choice.

One native example that comes to mind is the `Date` object and `new Date()` constructor.

The `Date` object contains a bunch of methods that you can use to get and set information for a specific date. And there's a chance you might have more than one date you want to work with.

```js
let halloween = new Date('October 31, 2022');
let lastChristmas = new Date('December 25, 2021');
```

You can run methods on each `Date`, and get information unique and specific to it.

```js
let halloweenTimestamp = halloween.getTime();
let christmasDay = lastChristmas.getDay();
```

## Examples of libraries that use this approach

I see the constructor pattern used a lot with DOM manipulation libraries.

[Swiper](https://swiperjs.com/) is a library for creating touch-supported sliders and carousels. It converts a collection of images or elements into a slider, and accepts an object of options that you can use to customize its behavior.

There's a good chance you might want to have multiple sliders on a page, with different settings for each. A constructor pattern is perfect for this!

```js
// Basic slider
let slider1 = new Swiper('.hero');

// Another slider, with options
let slider2 = new Swiper('.photo-gallery', {
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
```

Perhaps the most notable example is jQuery. 

They handle the `new JQuery()` part for you under-the-hood, but the `$()` function returns a new jQuery instance.

```js
let sandwiches = $('.sandwich');
let drinks = $('.drink');
```

You can then call a variety of methods on your collection of elements.

```js
// This has no effect on the .drink elements
sandwiches.addClass('mayo');
```

## The constructor pattern is a design choice

Just because a library would be a good fit for the constructor pattern doesn't mean its the _only_ way to write that library.

The constructor pattern is a design choice, and sometimes, two libraries that do the same thing will take very different approaches.

For example, [day.js](https://day.js.org/) and [date-fns](https://date-fns.org/) are both libraries that make working with dates a bit easier. Day.js uses a constructor pattern, while date-fns uses a utility library design.

```js
// day.js
let halloween = dayjs('2022-10-31');
let halloweenDay = halloween.day();

// date-fns
import {getDay} from './date-fns.js';
let christmas = new Date('December 25, 2022');
let christmasDay = getDay(christmas);
```

## The constructor pattern is falling out of favor

Right now, there's a trend away from the constructor pattern towards utility libraries.

While constructor patterns can be incredibly useful, utility libraries [built with ES modules](https://vanillajsguides.com/es-modules/) allow users to import just the functions they need, which can result in much smaller JS files.

Some libraries originally built as constructor patterns are converting to (or offering) utility functions.

[Version 1 of Dinero.js](https://dinerojs.com/), for example, works like this.

```js
let price = Dinero({amount: 5000, currency: 'EUR'});

// returns a Dinero object with amount: 5500
price.add(Dinero({amount: 500, currency: 'EUR'}));

// returns a Dinero object with amount: 4500
price.subtract(Dinero({amount: 500, currency: 'EUR'}));
```

[Version 2 uses utility functions instead.](https://v2.dinerojs.com/docs)

```js
import { dinero, add, subtract } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

let price = dinero({amount: 5000, currency: USD});

// returns a Dinero object with amount 5500
add(price, dinero({amount: 500, currency: USD}));

// returns a Dinero object with amount 4500
subtract(price, dinero({amount: 500, currency: USD}));
```

## Which one should you use?

Trends come and go in JavaScript, so a shift towards utility functions at the moment doesn't mean constructors and classes don't still have their place.

Any time you're building a library where you need to maintain some instance specific data, consider using a constructor pattern. Otherwise, utility functions might be a better choice.