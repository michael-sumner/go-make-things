---
title: Decoupling HTML, CSS, and JavaScript in design systems
date: 2021-10-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Unpopular opinion: we should use JavaScript for far fewer things than we do right now. 

Let's dig in.

## Leaning on the platform

[Nicole Sullivan](http://www.stubbornella.org/content/) is a fucking legend in the web community.

She's the inventor of [OOCSS](https://www.slideshare.net/stubbornella/object-oriented-css) (for which both [BEM](http://getbem.com/introduction/) and [Tailwind](https://tailwindcss.com/) owe literally everything). She's the creator of [CSSLint](http://csslint.net/) and [Smush.it](https://imgopt.com/).

Nicole is now a product manager at Google. This week, [she posted a thread on Twitter](https://twitter.com/stubbornella/status/1450700676653215745) that had me nodding my head along to every single tweet.

> Personal take: a lot of things would suck less if design systems and JS frameworks weren’t so tightly coupled.
> 
> Another take: JavaScript has overstepped. Declarative CSS and HTML need to do *way more* and push JS out of the design system space.
> 
> Save JS for the truly unique UI challenges... and for managing business logic and data. (And probably other things too, that I’m not thinking of)
> 
> You shouldn’t need JS for a 🤬 carousel or tabs... they are pretty standard patterns by now. If they were declarative we Sparkleswouldn’t need to bind every design system to every frameworkSparkles! (Yes, n^2)
> 
> Because there is JS in design systems you get this weird seam between the design system JS and the framework JS OR you duplicate your work and make a JS implementation for each front end stack your company uses. 
>
> Maintenance nightmare.

One of the weird internal conflicts I have is that my entire business is teaching people JavaScript, and I spend a good portion of my time advocating for people to use way, _way_ less of it. 

I want the web platform&mdash;the browser&mdash;to provide native components for these design patterns that seem to come up over-and-over again. It's absurd that every design system essentially has to reinvent them (or include an OSS library that hopefully is well maintained).

## What about web components?

Whenever I bring this up, inevitably someone says, "hey, we have web components now!" Nicole addresses that, too.

> And no, I’m not advocating for web components. They are another flavor of JS and create another weird seam, JS to JS. Woman gesturing not ok
> 
> I’m advocating for CSS & HTML that can swap from one tab to another.
>
> Could we cover 80% of the use cases for tabs if we had a declarative way of building them? Then JS could handle the 20% of tabs that are so custom they can’t be declarative? Idk yet, but let’s try?
> 
> I’m also advocating for a11y to be built in. It’s beyond nonsense that every developer has to manage individual ARIA properties.

To me, the `details` and `summary` elements are the perfect example of the kind of thing I want.

## How `details` and `summary` work

You wrap content in a `details` element. Inside it, you nest a `summary` element, plus any additional content you want. 

The `summary` element becomes an interactive toggle, expanding and collapsing everything else in the `details` element.

<details>
	<summary><strong>Click me to see more</strong></summary>
	<p>Here's more!</p>
</details>

```html
<details>
	<summary>Click me to see more</summary>
	<p>Here's more!</p>
</details>
```

If the browser doesn't support `details` and `summary`, all of the content is shown by default, so the user still has a baseline experience.

You can style the `details` and `summary` elements with CSS, including using the `list-style-image` property to change the arrow icon.

```css
details {
	margin-bottom: 1em;
}

summary {
	font-weight: bold;
	margin-bottom: 0.25em;
}

/**
 * 1. Styling for Firefox and other non-webkit/blink browsers
 * 2. Styling for webkit and blink
 */
summary, /* 1 */
summary::-webkit-details-marker { /* 2 */
	list-style-image: url('');
}
```

You can even listen for when an element is toggled open or closed with the `toggle` event.

```js
document.addEventListener('toggle', function (event) {

	// The details element that was toggled
	let details = event.target;

	// Check if the details element is open or closed
	if (details.hasAttribute('open')) {
		console.log('open');
	} else {
		console.log('closed');
	}

});
```

This is, to me, the perfect model for future components:

- It works out-of-the-box with just HTML
- It's automatically progressively enhanced for unsupported browsers
- It can be styled with CSS
- It can be hooked into and extended with JavaScript
- It doesn't _require_ CSS or JS to use

## Are more native components coming?

Just a day later, [Dave Rupert wrote an awesome post on his work advocating for a native `tabs` components](https://daverupert.com/2021/10/native-html-tabs/).

> For the past year I’ve been on a team of folks inside [Open UI](https://open-ui.org/) dedicated to figuring out how get a native, accessible `<tabs>` element into HTML. We’re a team of people with varying backgrounds; spec authors, browser vendors, implementors, and normie practitioners like myself. 
> 
> Open UI is a community group so we can’t technically make HTML (for legal reasons), but we can present research to the W3C working groups. I see Open UI as an ad hoc research arm for the W3C with specific experience in design systems and common web componentry.
> 
> The “Tabvengers” as we’re known, have produced a couple research documents and experiments so far...

I love this!

Dave is, if my memory is correct, the person who I first heard suggest that more interactive components should be baked into the browser itself. I've been unable to "unsee it" ever since.