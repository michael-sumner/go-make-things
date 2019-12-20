---
title: "HTML as a building block"
date: 2019-12-20T10:30:00-05:00
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

On Wednesday, I wrote about how [HTML is a living language](/html-is-a-living-language/).

In it, I linked to [a fantastic piece by Dave Rupert titled *Why `<details>` is not an accordion*](https://daverupert.com/2019/12/why-details-is-not-an-accordion/). In that article, Dave wrote...

> At the risk of being a broken record; HTML really needs `<accordion>` , `<tabs>`, `<dialog>`, `<dropdown>`, and `<tooltip>` elements. Not more “low-level primitives” but good ol’ fashioned, difficult-to-get-consensus-on elements. A new set of accessible controls for a modern era... except that these things have been in-use on nearly every major website and application for the last two decades and [exist in every major design system](https://superfriendlydesign.systems/articles/distinct-design-systems/).
>
> In a world where [97.8% of sites are inaccessible](https://webaim.org/projects/million/) and sites that do use ARIA are 26.7% more inaccessible, we are failing the most vulnerable of users on the Web. I wish browsers would prioritize accessibility improvements over things like main thread scheduling optimization to unblock tracking pixels and the Sisyphean task of competing with native.

👏👏👏

Dave's article resonates so damn strongly with me, and I've been thinking about the quote above all week. Apparently, I'm not alone!

In the [latest issue of the CSS-Tricks Newsletter, Chris Coyier wrote](https://css-tricks.com/newsletter/177/)...

> This reminds me that some time ago I had an idea for an open-sourced library of components that are nothing but examples of how to make accessible elements. So, in other words, an Accordion element but with no styles and an API for you to make it look and work exactly as you’d like. Sort of like how [react-dropzone](https://react-dropzone.js.org/) is basically just a bunch of React hooks that gives you complete control over the HTML and CSS.
>
> Anyway, as I thought more and more about this library---which would give you the correct ARIA roles and HTML elements to use and it make sure things are semantically proper---I realized something frightening. This is just how HTML should work! HTML itself should be the library upon which we build upon, rather than some npm nightmare of components and features.
>
> If the markup isn’t allowing us to make things accessible then the fault lies squarely on browser vendors. How much time and how many resources are wasted doing the basics, like making tabs, modals, and dropdowns? Do we really need `portal` elements when the very basics of UI development is so difficult and frustrating?
>
> But this isn’t just about developer convenience, it’s also about accessibility for users of the web, as Dave writes.

HTML as building blocks... so much *yes* to all the things!