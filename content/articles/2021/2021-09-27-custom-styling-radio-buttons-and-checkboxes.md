---
title: Custom styling radio buttons and checkboxes
date: 2021-09-27T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

My friend Scott O'Hara just published a fantastic article on [how to customize checkbox and radio button styles](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html).

> About three years ago now (2017/2018), I published a collection of [accessible styled form control](https://scottaohara.github.io/a11y_styled_form_controls/)s which included specific markup patterns to create custom styled radio buttons and checkboxes. These patterns were the culmination of years of my own tinkering, studying other people’s implementations, and then stress testing them with the assistive technologies I had at my disposal.
>
> At the time, the most robust way to style these form controls, without re-creating them from scratch with ARIA, was to visually hide the radio button or checkbox, and then recreate the controls using a `<label>` or `<span>` and their pseudo-elements (`::before` and `::after`). The need for this approach was largely, but not entirely, due to Internet Explorer and Legacy Edge not providing the best support to directly style native HTML` <input>` elements themselves. And if you go even further back in time, all browsers had barries in directly styling these controls.
> 
> That’s not to say, in 2018, that directly styling native radio buttons and checkboxes couldn’t be done (see [restyled radio buttons](https://scottaohara.github.io/a11y_styled_form_controls/src/radio-button/#rstyled) and [restyled checkboxes](https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox/#rstyled)). But there were workarounds needed, and styling limitations that still existed due to inconsistencies with Firefox, Internet Explorer, and pre-Chromium Edge, at the time.
> 
> Now (2021), with Internet Explorer support being dropped left and right, and Edge now being Chromium-based, and Firefox quirks having been ironed out, these limitations have largely lifted.

[Go read the whole thing on Scott's site.](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html)