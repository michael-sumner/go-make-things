---
title: Managing data attributes with the dataset property in vanilla JavaScript
date: 2021-11-04T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to get, set, and remove data attributes in JavaScript](/how-to-get-set-and-remove-data-attributes-with-vanilla-javascript/). Today, we're going to look at how to do the same thing with the `Element.dataset` property.

Let's dig in!

(_Thanks to [Long View Coder](https://longviewcoder.com/) for suggesting today's article._)

## An example element

Let's imagine you have an element with a handful of data attributes on it, like this.

```html
<div id="lunch" data-sandwich="tuna" data-drink="soda" data-side="chips" data-snack="cookie" data-payment-method="credit card">
	Lunch!
</div>
```

You need to access all of the data attributes on the element. You _could_ use the techniques we learned about yesterday, but for working with multiple attributes, there's another way that can be a bit easier.

## The `Element.dataset` property

The `Element.dataset` property returns a `DOMStringMap`, an object-like collection of key-value pairs.

If you wanted to get all of the data attributes in the `#lunch` element from our example, you could do this.

```js
let lunch = document.querySelector('#lunch');
let data = lunch.dataset;
```

Here, `data` is a `DOMStringMap` that looks like this.

```js
let data = {
	drink: 'soda',
	paymentMethod: 'credit card',
	sandwich: 'tuna',
	side: 'chips',
	snack: 'cookie'
};
```

The `Element.dataset` property drops the `data-` prefix and converts the kebab-case used by data attributes to camelCase. The `[data-payment-method]` attribute is assigned to the key `paymentMethod`, for example.

You can use the `Element.dataset` property to assign values as well. 

To set a data attribute with the `Element.dataset` property, skip the `data-` prefix, and write your properties in camelCase. The property will automatically add the leading `data-` and convert camelCase to kebab-case.

For example, to change the `[data-payment-method]` from `credit card` to `cash`, you could do this.

```js
lunch.dataset.paymentMethod = 'cash';
```

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/BadYjQb)

## Limitations of the `Element.dataset` property

The big limitation with the `Element.dataset` property is that it only works with data attributes.

You can use the `Element.getAttribute()`, `Element.setAttribute()`, `Element.removeAttribute()`, and `Element.gethasAttribute()` methods to work with all sorts of attributes, including custom ones. The `Element.dataset` property is limited to just data attributes.

## When should you use the `Element.dataset` property over dedicated attribute methods?

This is entirely a matter of personal preference.

I prefer using the `Element.*attribute()` methods, as I find the explicit "what they're doing is right in the name" nature of them easier to read and understand. But I know plenty of folks who enjoy the "one property to do it all" aspect of the `Element.dataset` property.

Of course, if you need to work with attributes that aren't data attributes, you have to use the `Element.*attribute()` methods.

Tomorrow, we'll look at some different strategies for working with data attributes.