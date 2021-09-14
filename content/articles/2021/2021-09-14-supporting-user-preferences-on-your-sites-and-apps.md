---
title: "Supporting user preferences on your sites and apps"
date: 2021-09-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
---

Back in July, I wrote about [how I rolled out an improved dark mode for my website](/how-to-create-a-dark-mode-theme-for-your-site-or-app/).

I discussed how the `prefers-color-scheme` media query can be used to support a user's choices in their operating system. I also shared some tips for making sure your color choices have proper contrast [using WebAIM's color contrast tool](https://webaim.org/resources/contrastchecker/).

```css
/**
 * If dark mode is enabled, do this instead
 */
@media (prefers-color-scheme: dark) {
	/* ... */
}
```

Last week, inclusive design advocate (and personal friend) Eric Bailey shared an article he wrote about [a variety of OS-level choices a user can make that are (or soon will be) detectable with media queries](https://ericwbailey.design/writing/thoughtbot-com-dark-mode-and-other-user-preferences/).

Among my favorites are...

- Reducing motion and animations ([which I've written about before here](/how-to-easily-add-css-animations-to-your-projects/#important-accessibility-concerns))
- Reducing data usage, which will be really useful for serving smaller assets on low bandwidth or low data devices
- Contrast mode
- Transparency, to disable or reduce transparent graphics

Eric's whole article is a good introduction to thoughtful, user-focused design. [Give it a read!](https://ericwbailey.design/writing/thoughtbot-com-dark-mode-and-other-user-preferences/)