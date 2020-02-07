---
title: "Tools and developer habits"
date: 2020-02-07T10:30:00-05:00
draft: false
categories:
- Accessibility
- Careers
- Code
- HTML
- JavaScript
- Web Performance
---

One of my biggest concerns with the widespread use of frameworks and libraries is the bad habits they create among the developer population (and in particular, the next generation of developers).

Let's dig in.

## Event handling in a framework-obsessed world

Yesterday, I learned that adding an event listener as an `on*` event on an element in React gets converted into [event delegation](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) under-the-hood.

For example, this:

```html
<button onclick={addTask}>Add</button>
```

Becomes this (or something like it&mdash;I don't work with React so I'm not positive of the exact output) after it's compiled from JSX:

```html
<button data-onclick="addTask">Add</button>

<script>
	document.addEventListener(click, function (event) {
		if (event.target.matches('[data-onclick="addTask"]')) {
			addTask(event.target);
		}
	});
</script>
```

React proponents will tell you this is a boon for developers. [As Justin Makeig explained to me:](https://twitter.com/jmakeig/status/1225487763778265088)

> The whole point is to allow you to express the intent of your UI and have the framework deal with the actual DOM.

And I totally get that.

If you're creating a UI with JavaScript, it's helpful to see the events that go with an element right there on that element.

But with React as the dominant framework (and this convention present in VueJS, too), this shapes how people build things *without* frameworks, too.

I've anecdotally seen a rise in vanilla JS that includes `onclick` (and other `on*`) attributes directly on the HTML, because that's what new developers are learning is the "standard convention" for event handling.

## We're regressing

Instead of learning best practices, we're teaching developers to do whatever's easiest and let the framework handle all that messy stuff for you.

It's what a lot of developers call "good abstraction."

But this also means that developers are helpless without their tools, and don't recognize when the tool is doing the wrong thing.

## We're breaking the web

I see this come up a lot in the context of accessibility.

An argument pushed by some of React's biggest proponents is that using a framework can actually make the web *more* accessible, by automating accessibility into the components we use. But that's not what actually happens.

Last year, WebAIM did a survey of the top million sites on the web. They found that [sites that use frameworks are *more* likely to have accessibility issues](/we-are-actively-destroying-the-web/), not less.

What happens when a popular component *isn't* built accessibly?

People who have been told to just let the framework handle it don't know something is wrong. We make the web worse.

## Does that mean we should never use tools?

Of course not! But it's important to understand *what* yours tools do, and *how* they work under-the-hood.

I see two points a developer's career when tools are incredibly useful:

1. When they're just learning, and the tool make a confusing thing more approachable.
2. When the developer is seasoned, understands the benefits and constraints of their tools, and knows how to use them to work more effectively.

Learning inertia is important. Tools that take beginners from "I know nothing" to "I built a thing!" are really important (I'd also argue that React is *not* that kind of tool).

And for seasoned developers, tools can help you move more quickly. If you know what you're doing, you can work around the tool's limitations.

But too often, developers skip the bridge that gets you from 1 to 2: learning the fundamentals.

## Know your craft

You can't understand how React works until you understand how vanilla JS works. You can't know if a component is *really* accessible or not (no matter what it says on the label) unless you understand how accessibility works.

You can't know if a tool really makes your app more performant or not unless you understand how web performance works.

Good abstractions are great. But they're only as powerful as the people using them.

Once you progress past the beginner phase, it's critical to step out of tool-heavy development and learn the basics. The health of the web depends on it.