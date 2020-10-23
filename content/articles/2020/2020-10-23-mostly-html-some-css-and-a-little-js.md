---
title: "Mostly HTML, some CSS, and a little JS"
date: 2020-10-23T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

On Wednesday, we looked at [how you can build interactive expand-and-collapse components with *just* HTML](/how-to-build-a-progressively-enhanced-accordion-component-with-vanilla-js/).

Thinking about the future of the web, I want fewer new JS APIs and more HTML features.

## HTML is my favorite part of the stack

HTML is simple, resilient, and powerful. It naturally progressively enhances itself.

The developer community as a whole, and browser vendors as well, seem particularly focused on "low-level JavaScript APIs" that you can use to build open-ended stuff. And that's cool. I get it.

[Web Components are pretty neat.](https://developer.mozilla.org/en-US/docs/Web/Web_Components) But that's not what I want.

I want out-of-the-box, ready-to-use HTML components that are interactive and provide baked-in solutions for common component problems. And I want them accessible by default, too.

I don't want to have to think about how to implement things like tabs, dropdown menus, and modals. I don't want to have to write JS to make them work, or think about what roles and ARIA attributes are needed to make sure screen reader users know what's going on. And I don't want to grab a third-party component and hope that *they* did those things correctly, either.

I just want that stuff baked in.

## I still want *some* control

I don't want *only* HTML.

I want to be able to style these elements with CSS. I want to be able to hook into them with JavaScript to toggle behaviors, like we did with the `details` and `summary` elements earlier this week.

But I also want to be able to use them out-of-the-box and have them just work, in a progressively enhanced, accessible way.

Imagine being able to add a dropdown to your page like this.

```html
<dropdown>
	<toggle>Menu Item 1</toggle>
	<ul>
		<li><a href="#">Sub Item 1</a></li>
		<li><a href="#">Sub Item 2</a></li>
		<li><a href="#">Sub Item 3</a></li>
	</ul>
</dropdown>
```

Imagine being able to style it like this.

```css
dropdown:before {
	content: "+";
}

dropdown[expanded]:before {
	content: "-";
}
```

Or being able to hook into it and extend it's behavior like this.

```js
document.addEventListener('expand', function (event) {
	// Do something with the expanded dropdown
	console.log(event.target);
});
```

Mostly HTML, some CSS, and a little JavaScript. That's the future of the web I want.