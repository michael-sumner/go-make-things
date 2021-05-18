---
title: "Accessibility is hard. It's also your job."
date: 2021-05-18T10:30:00-04:00
draft: false
categories:
- Accessibility
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

A few weeks ago, Twitter use @McgarrDana tweeted:

> Accessibility isn’t more work, you were just cutting corners before. The work was incomplete.

And she's right! If what you built isn't accessible, it's not complete.

[There's no such thing as a website or web app that doesn't need to be accessible.](/theres-no-such-thing-as-a-website-or-web-app-that-doesnt-need-to-be-accessible/) If you're a web developer, accessibility is literally your job. If you ignore it, you're just a hobbyist.

That said... I've been a professional web developer for seven years now, after spending three or four as hobbyist before that.

**Accessibility is consistently the hardest thing for me about making things for the web.**

A lot of what we do is context-based. What's the best way to structure your code? It depends. What's the right strategy for authoring CSS? It depends. What method should you use to select elements in the DOM? `document.querySelector()`, of course!

But web accessibility turns that nuance up to 11.

- Accessibility is more than just screen reader support. It's users with neuromuscular conditions, cognitive conditions, and more!
- People with disabilities are not a monolith. Among people who use screen readers, some will be more technically savvy than others. They will use the software in a variety of different ways. They will have varying degrees of visual impairment. Accordingly, their needs and expectations may be different.
- Screen readers and other accessibility technology have IE6-era levels of cross-browser/cross-platform consistency. When I write JS or CSS these days, I rarely need to worry about browser support. Not so with accessibility practices! Different screen readers are designed to work best with specific browsers and OS's, and don't always adhere properly or fully to the spec.
- Good advice is hard to come by. [The spec documents](https://www.w3.org/WAI/fundamentals/accessibility-intro/) are dense and hard to read. Articles by arm-charm accessibility allies are often wrong or fail to capture nuance. I've been wrong [about dropdown menus](/i-was-wrong-about-javascript-free-dropdowns/) and [about subheaders](/i-was-wrong-about-how-to-create-accessible-subtitles/). The dropdown menu approach? I got that from the GitHub website. They got it wrong, too.

I'm not trying to discourage you. You’re not always going to do it right. Humans are fallible. We mess up.

Even highly trained professionals with years of schooling, like lawyers and doctors, mess up. That’s why malpractice insurance exists. But as @McgarrDana tweeted, if you're not making what you build accessible, the work is incomplete.

What I'd love to see more of are native accessible elements that make this easier, for things like...

- Toggle tabs (ex. `<tab>` and `<tabcontent>`)
- Dropdown menus (ex. `<dropdown>` and `<summary>`, like the `<details>`/`<summary>` elements)
- Modals (as in a `<dialog>` element that actually works!)
- Photo galleries and carousels (ex. `<gallery>` and `<galleryitem>`)

Whenever I write an article like this, someone mentions [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

Yes, you could make your own elements like this, but my point is that you shouldn't have to. The platform should handle it for you. With a web component, you're still trusting someone else to have not messed up some key accessibility consideration.

I want native components that handle the basic interaction patterns, can be styled, and expose JavaScript events that can be hooked into and extended.