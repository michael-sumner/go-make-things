---
title: "How to approach JavaScript selectors with vanilla JS"
date: 2019-07-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

About a year ago, I wrote about [my JavaScript selector strategy](/javascript-selector-strategy/). Specifically, I prefer to use data attributes over classes or IDs.

> Classes are for styling elements. You can target it with JavaScript, and sometimes you have no other choice. But that’s not what classes were made for... Data attributes exist solely to add additional information to an element. In the HTML spec, they have no defined meaning, which makes them incredibly flexible.
>
> And since they can be targeted with JavaScript using `querySelector()` and `querySelectorAll()`, it also makes them perfect for JavaScript selection.

One of my readers asked me how I would approach selectors for a project they were working on (shared anonymously with permission).

## Their email

I find that I frequently use inconsistent approaches to querying elements with an unsatisfying mixture of ids, CSS classes and JS-prefixed classes! I read a while ago you recommended the use of data-attribute selectors. I really like this approach and would like to use it more but i'm still a bit unsure on the best way to do it.

For example, I recently worked on small widget that contained a single text input and two buttons to either increase or decrease the value in the input.

I ended up writing my JS element queries as follows:

```js
elemAmount = document.querySelector('.entered__quantity');
elemIncreaseAmount = document.querySelector('.change-quantity-value[data-elem-type="increase"]');
elemDecreaseAmount = document.querySelector('.change-quantity-value[data-elem-type="decrease"]');
```

In a separate piece of work for a hero banner, and to select the main parent element, I've used -

```js
document.querySelector('.hero__component');
```

I'd really appreciate your thoughts on how you might have written selectors in each of these scenarios, to maintain a consistent naming convention?

## My response

I like to use *only* data attributes, and keep them as minimal as possible. I would do something like this...

```js
var amount = document.querySelector('[data-quantity]');
var increase = document.querySelector('[data-increase]');
var decrease = document.querySelector('[data-decrease]');
```

For something like a hero, while I sometimes use JS to just target what's already there, I'd still worry about the classes on that element changing and breaking my CSS.

I'd use a data attribute for that, too.

```js
var hero = document.querySelector('[data-hero]');
```

Hope that helps!