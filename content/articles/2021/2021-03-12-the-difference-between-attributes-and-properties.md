---
title: "The difference between attributes and properties in vanilla JS"
date: 2021-03-12T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

In JavaScript (the DOM, really), an element has _attributes_ and _properties_. The terms are often used interchangeably, but they're actually two separate things.

An _attribute_ is the _initial state_ when rendered in the DOM. A _property_ is the _current state_.

In most cases, attributes and properties are kept in-sync automatically. For example, when you use `setAttribute()` to update an ID attribute, the `id` property is updated as well.

```html
<p>Hello</p>
```

```javascript
let p = document.querySelector('p');

// Update the ID
p.setAttribute('id', 'first-paragraph');

// These both return "first-paragraph"
let id1 = p.getAttribute('id');
let id2 = p.id;
```

However, user-changeable form properties&mdash;noteably, `value`, `checked`, and `selected`&mdash;are _not_ automatically synced.

If the user types something into the `#greeting` field in this example, using the `Element.setAttribute()` method to update the `value` will _not_ change what appears in the DOM and will _not_ update the `value` property on the element.

```html
<label for="greeting">Greeting</label>
<input type="text" id="greeting">
```

```javascript
let greeting = document.querySelector('#greeting');

// Update the value
greeting.setAttribute('value', 'Hello there!');

// If you have made any updates to the field, these both return "Hello there!"
// If you HAVE updated the field, val1 returns whatever was typed in the field instead
let val1 = greeting.value;
let val2 = greeting.getAttribute('value');
```

If you try to update the `value` property directly, that _will_ update the UI.

```javascript
greeting.value = 'Hello there!';
```

This often feels like a really silly decision on the part of spec writers. At a minimum, it's really confusing.

However, it does allow you to choose different approaches depending on whether you want to overwrite user updates or not. If you want to update a field, but _only if_ the user hasn't made any changes, use `Element.setAttribute()`. If you want to overwrite anything they've done, use the `value` property.