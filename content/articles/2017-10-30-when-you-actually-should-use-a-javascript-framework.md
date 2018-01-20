---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-10-30'
url: /when-you-actually-should-use-a-javascript-framework/
title: When you actually should use a JavaScript framework
---

I spend a lot of time teaching people how to write JavaScript without frameworks. I think the whole front end development process has gotten far too complicated.

One chapter I started to write for [my latest pocket guide, Web Apps with Vanilla JS](/guides/web-apps/), but decided not to include, is on when you actually *should* use a JS framework.

Specifically, there are three situations where I think choosing a framework makes more sense than using vanilla JavaScript.

## 1. Large apps that need to scale.

One of the biggest benefits of frameworks like React and VueJS is that they provide a virtual DOM.

What's a virtual DOM?

The DOM, or Document Object Model, is the nested tree of elements on a webpage. Manipulating it is (relatively speaking) a bit slow compared to working in JavaScript.

A virtual DOM is a JavaScript-based map of the actual DOM using nested objects. For example, this:

```html
<div class="sandwich" id="tuna">
	<div class="topping" id="lettuce">Yum!</div>
</div>
```

Might become something like this:

```javascript
{
	div: {
		class: 'sandwich',
		id: 'tuna',
		elements: {
			div: {
				class: 'topping',
				id: 'lettuce',
				innerHTML: 'Yum!'
			}
		}
	}
}
```

When you make an update to that content, instead of rendering the entire `.sandwich` element again, a "diffing" algorithm would create a virtual DOM map of the new content, compare it to the old one, and then only update the things that changed.

That could mean just updating a class, or just the `innerHTML` on an element within a bigger component.

### Does that mean vanilla JavaScript isn't performant?

Not at all.

If you've been reading my articles for a while, you've hopefully already seen how fast vanilla JS can be. In fact, the abstraction of frameworks can make your code slower than vanilla JavaScript.

However, on larger apps that are handling huge amounts of data (think Facebook, Twitter, and so on), the virtual DOM likely provides some real performance gains.

If you're working at that kind of scale, you might want to consider using a framework.

## 2. Server-side rendering for better fault-tolerance.

React and Vue both provide plugins that let you run your JavaScript on the server.

This means that:

1. You can still serve your app to people who don't support modern JS or for whom the JavaScript file failed.
2. You benefit from the faster time-to-first-render that server-side HTML provides, but can still take advantage of faster subsequent page rendering via Ajax.

You *can* do server-side rendering with vanilla JS, but it's gets really complicated, and frameworks provide an abstraction that's insanely beneficial.

### 3. Working with large teams.

This one is kind of... *meh*, but I see it come up a fair bit.

If you're working with a large team, or external developers, using a well-known, well-established framework with existing documentation can make time-to-learn shorter and make finding people who can work on your app easier.

The flip-side of this is that frameworks can update frequently in significant, breaking ways that make upgrading harder (Angular 1 to Angular 2 is an example). Documentation may not be clear or obvious. Or it can change without notice.

And as anyone who's been doing this for a few years knows, projects can stop being supported or fall out of favor pretty quickly.

That said, if you don't have time to write good documentation for a larger team, or need to pull from a broader pool of developers, a framework might be worth considering.