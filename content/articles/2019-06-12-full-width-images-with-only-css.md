---
title: "Full-width images with only css"
date: 2019-06-12T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
---

Today, I want to show you a simple CSS trick you can use to make images (or any other content) go *full-width* or *full-bleed*&mdash;from one edge of the page to the other&mdash;when the rest of your content is not.

Here's the CSS:

```css
.full-width {
	left: 50%;
	margin-left: -50vw;
	margin-right: -50vw;
	max-width: 100vw;
	position: relative;
	right: 50%;
	width: 100vw;
}
```

Add it to any element you want to run edge-to-edge, like this.

```html
<p>The majority of a sea turtle's body is protected by its shell.</p>

<p><img class="full-width" alt="A sea turtle swimming in the ocean" src="https://images.unsplash.com/photo-1518467166778-b88f373ffec7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"></p>

<p>In general, sea turtles have a more fusiform body plan than their terrestrial or freshwater counterparts. The reduced volume of a fusiform (tapering at both ends) body means sea turtles cannot retract their head, legs, and arms into their shells for protection like other turtles can.</p>
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jjEgJg)