---
title: The mysterious second argument on the vanilla JS classList.toggle() method
date: 2022-07-14T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

This week, [my buddy Kieran Barker taught me that the `Element.classList.toggle()` method accepts a second argument](https://barker.codes/blog/conditionally-toggle-a-class-in-vanilla-js/) that you can use to more efficiently write `if...else` class manipulation.

Today, I want to quickly review how that works. Let's dig in!

## The `classList.toggle()` method

The `classList.toggle()` method toggles a class on an element.

If the class already exists, the method removes it. If not, it adds it.

```html
<p id="sandwich">Tuna</p>
```

```js
let sandwich = document.querySelector('#sandwich');

// This adds the .mayo class to the #sandwich element
sandwich.classList.toggle('mayo');

// This removes it
sandwich.classList.toggle('mayo');
```

## The `force` parameter

The `classList.toggle()` method accepts a second argument, `force`. 

If set to `true`, the method will only add the class, not remove it. If set to `false`, it will only remove the class, not add it.

For example, let's say you wanted to add the `.mayo` class, but only if the `.mustard` class wasn't already present. You might normally write that like this.

```js
if (sandwich.classList.contains('mustard')) {
	sandwich.classList.remove('mayo');
} else {
	sandwich.classList.add('mayo');
}
```

With the `force` argument, you can instead do this.

```js
let hasMayo = sandwich.classList.contains('mustard');
sandwich.classList.toggle('mayo', hasMayo);
```

Or, if you prefer one-liners, this.

```js
sandwich.classList.toggle('mayo', sandwich.classList.contains('mustard'));
```

[Kieran's article goes a bit deeper into how you might use it](https://barker.codes/blog/conditionally-toggle-a-class-in-vanilla-js/), so go give it a read if you want to learn more.