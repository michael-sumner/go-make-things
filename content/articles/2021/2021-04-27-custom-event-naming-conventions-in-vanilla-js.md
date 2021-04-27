---
title: "Custom event naming conventions in vanilla JS"
date: 2021-04-27T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Over the last few days, we've learned about [how to create custom events](/custom-events-in-vanilla-js/), [how to cancel them](/canceling-custom-events-with-vanilla-js/), and [how to create a helper function to make them easier to work with](/a-custom-event-helper-function/).

Today, we're going to learn about naming conventions: things to do, things to avoid, and some common gotchas.

## Prefix event names

To help prevent naming collisions between the custom events in your library and others, it's a good idea to prefix them with your library name.

```javascript
// Namespaced to the Greetings library
emitEvent('greetings-before-hi');
```

## Use lowercase

You can name custom events anything you want, but as a best practice, you should use all lowercase characters.

Event names are case-sensitive, and the property names on elements are case-insensitive and converted to lowercase by the browser. This can create conflicts if uses `on*` listeners on elements.

One common naming convention is kebab-case.

```javascript
// kebab-case naming
emitEvent('greetings-before-hi');
```

Another convention is to put a colon (`:`) between the library name and the event type. I'm personally quite fond of this approach, as I think it makes events more readable.

I call this style prefix-kebab.

```javascript
// prefix-kebab naming
emitEvent('greetings:before-hi');
```

Because of case-sensitivity issues, avoid camelCase.

```javascript
// camelCase
// AVOID THIS
emitEvent('greetingsBeforeHi');
```