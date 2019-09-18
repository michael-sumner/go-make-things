---
title: "JavaScript selectors in HTML"
date: 2018-04-10T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

One of the challenges with using classes as JavaScript selectors is that it muddies the waters between CSS and JavaScript.

```html
<div class="expand">
	Some content that can be collapsed or expanded.
</div>
```

Is the `.expand` class in the above example used for styling, for targeting that element in JavaScript, or both? There's no easy way to tell from looking at it.

If it's used only for targeting in JS, what happens if a well meaning developer sees that the class isn't used in their CSS file and removes it to reduce some weight from the markup? If it's used for both, what happens if someone decides to rename the class to fit a different CSS naming convention?

## An early approach to solving this challenge

To solve this challenge, a few years ago a convention of prefixing classes used only by JavaScript with `.js-`, making it more explicit what it was used for.

```html
<div class="js-expand">
	Some content that can be collapsed or expanded.
</div>
```

If you wanted to be really dogmatic about it, you would include both a `.js-` prefixed and non-prefixed version, one used solely for styling, the other only for targeting with JS.

```html
<div class="expand js-expand">
	Some content that can be collapsed or expanded.
</div>
```

## I don't like this approach

Classes are for styling elements. You *can* target it with JavaScript, and sometimes you have no other choice. But that's not what classes were made for.

So what can you do instead?

## Use data attributes

Data attributes exist solely to add additional information to an element. In the HTML spec, they have no defined meaning, which makes them incredibly flexible.

And since they can be targeted with JavaScript using `querySelector()` and `querySelectorAll()`, it also makes them perfect for JavaScript selection.

There are two approaches to this. One is to use a unique data attribute as your target.

```html
<div class="expand" data-expand>
	Some content that can be collapsed or expanded.
</div>
```

```js
var expand = document.querySelectorAll('[data-expand]');
```

The other is to use an attribute like `[data-target]` or `[data-action]` with a unique value.

```html
<div class="expand" data-action="expand">
	Some content that can be collapsed or expanded.
</div>
```

```js
var expand = document.querySelectorAll('[data-action="expand"]');
```

This approach keeps your HTML, CSS, and JavaScript separate, and makes it more clear what's happening. It also helps prevent accidental conflicts when someone changes the name of class not realizing it's used in JavaScript as well.