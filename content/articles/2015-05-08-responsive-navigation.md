---
categories:
- Code
- Design &amp; UX
date: '2015-05-08'
title: Mobile-Friendly Navigation
---

How do you display navigation elements on smaller screens in a way that makes it easy for the user to move around your site, but keeps it out of the way when they're trying to perform a task?

People address this challenge in a large number of ways:

* An expand-and-collapse menu that slides in from the top or side of the page.
* A horizontal list of links.
* A select menu.
* An anchor link that takes you to a vertical navigation list at the bottom of the page.
* [And on, and on, and on...](http://bradfrost.github.io/this-is-responsive/patterns.html#navigation)

So which one you should choose?

<!--more-->

## Responsive Navigation Guidelines

There's no one right way to implement navigation for smaller viewports, but there are some guidelines you should keep in mind for a better user experience.

1. Don't use a select menu. Forms as navigation are both unsemantic and confusing to visitors.
2. Many solutions require the use of JavaScript. Make sure that navigation is still accessible before your JS file has loaded (or if it fails altogether).
3. An anchor link that brings you to footer navigation can be jarring and and unexpected. If you go with this approach, it may be worth [animating the scroll](https://github.com/cferdinandi/smooth-scroll) so that visitors understand they've moved to a new location. You should also provide a link back to the original anchor link.
4. Avoid multi-level navigation patterns, as they can be quite confusing on smaller viewports.
5. If your navigation is small enough that it can displayed on one-line on smaller screens, don't hide it. Keeping the links exposed makes it easier for visitors to find what they're looking for.
6. Avoid fixed headers. They eat up valuable real estate on smaller screens.

If you want to get up and running quickly, I've put together a collection of [five mobile-friendly navigation patterns](https://github.com/cferdinandi/astro) that you can use on your project, as well as a set of [responsive drop-down menus](https://github.com/cferdinandi/drop) that are designed to work well with them.

## About the Hamburger

You may be familiar with the "hamburger icon," those three horizontal lines stacked one of top of the other, as a symbol for the navigation menu. It's an approach that was popularized, and then later abondoned, by Facebook.

There's a growing body of research that the icon is confusing and not easily recognizable to many users, and that you should instead use a more obvious word like "Menu" or "Navigation". Here are some articles on it if you wanted to explore this more deeply:

* [Hamburger vs. Menu: The Final AB Test](http://exisweb.net/menu-eats-hamburger)
* [Apple on Hamburger Menus](http://blog.manbolo.com/2014/06/30/apple-on-hamburger-menus)
* [The Hamburger is Bad for You](http://mor10.com/hamburger-bad/)

And as a counterpoint, here's some data from Bookings.com that it's really not a big deal: [Would you like fries with that?](http://blog.booking.com/hamburger-menu.html)

So who should you believe? I err on the side of including some supporting text (like the word "menu"), but if you don't do that, I don't think it's the end of the world.

*Luke Wroblewski has started called the hamburger's counterpart, three dots stacked on top of each other, as [the "kebab"](https://twitter.com/lukew/status/590911111358242816).*