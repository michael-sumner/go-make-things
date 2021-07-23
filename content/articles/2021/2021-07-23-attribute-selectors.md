---
title: "Attribute selectors in CSs"
date: 2021-07-23T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

Today, we'll be looking at some of the awesome ways CSS lets you target elements on a page.

It's worth nothing that all of these selectors can be used both in your CSS files _and_ with the `document.querySelector()` and `document.querySelectorAll()` JavaScript methods, which accept any valid CSS selector.

Let's dig in.

## Attribute selector basics

You can use square brackets (`[]`) to target an element by an attribute. If you add an equal sign and quotes (`=""`), you can also target a specific value.

```css
/* Target elements with the data-sandwich attribute */
[data-sandwich] {}

/* Target elements with a data-sandwich value of tuna */
[data-sandwich="tuna"] {}
```

## Advanced attribute selectors

What about elements with multiple values? Partial matches? Values in a different order? CSS has you covered!

Consider the following the element.

```html
<div data-lunch="tuna-sandwich chips soda Cookie">My Lunch Order</div>
```

What if you wanted to match an element with a `[data-lunch]` attribute containing the word `chips`. Targeting the value directly won't work with the example above, because `chips` is just one of a few values on the `[data-lunch]` attribute.

```css
/* This won't work */
[data-lunch="chips"] {}
```

Instead, prefix your value with a tilde (`~=""`) to match a value separate by whitespace.

```css
/* This WILL work */
[data-lunch~="chips"] {}
```

Let's say you wanted to look for `tuna`, but didn't care if it was `tuna-sandwich` or `tuna-salad`. You can use a vertical bar (`|`) for that.

It will match any value that's an exact match _or_ a match followed by a dash (`-`).

```css
/* This matches */
[data-lunch|="tuna"] {}
```

If you want to check if the value _starts with_ a string, you can use a caret (`^`). In our example, `^="tuna"` will match, but `^="chips"` will not.

```css
/* This matches */
[data-lunch^="tuna"] {}

/* This does not */
[data-lunch^="chips"] {}
```

To check if a value _ends with_ a string, use the dollar sign (`$`). In our example, `$="Cookie"` matches because `Cookie` is the ending value on the `[data-lunch]` attribute.

```css
/* This matches */
[data-lunch$="Cookie"] {}
```

To check for a substring anywhere in the value, _without_ worrying about whether it's a standalone word or not, you can use an asterisk (`*`).

In our example, `*="Cook"` will match, because `Cookie` contains the string `Cook` in it.

```css
/* This matches */
[data-lunch*="Cook"] {}
```

Finally, you can ignore case by using an `i` after your value. If we want to match any instance of `cookie` whether its capitalized or not, we would do this.

```css
/* This matches */
[data-lunch~="cookie" i] {}
```