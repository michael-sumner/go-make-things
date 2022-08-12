---
title: Custom event naming conventions
date: 2022-08-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we looked at how to create custom events with vanilla JS, and a helper function to make things a bit easier. Today, we're going to look at different naming conventions for custom events.

To help prevent naming collisions, it's a good idea to prefix custom events with your library or project name.

```javascript
// Namespaced to the Calculator library
emit('calculator-add');
```

One common naming convention is kebab-case.

```javascript
// kebab-case naming
emit('calculator-add');
```

Another convention is to put a colon (`:`) between the library name and the event type. I'm personally quite fond of this approach, as I think it makes events more readable.

I call this style prefix-kebab.

```javascript
// prefix-kebab naming
emit('calculator:add');
```

You can name custom events anything you want, but as a best practice, you should use all lowercase characters.

Event names are case-sensitive, and the property names on elements are case-insensitive and converted to lowercase by the browser. This can create conflicts if a developer uses `on*` listeners on elements.

Because of these case-sensitivity issues, avoid camelCase.

```javascript
// camelCase
// AVOID THIS
emitEvent('calculatorAdd');
```