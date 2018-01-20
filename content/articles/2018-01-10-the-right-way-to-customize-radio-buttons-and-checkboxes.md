---
categories:
- Code
- CSS
- Design &amp; UX
- HTML
date: '2018-01-10'
url: /the-right-way-to-customize-radio-buttons-and-checkboxes/
title: The right way to customize radio buttons and checkboxes
---

For all of the power that CSS provides, styling radio buttons and checkboxes remains unnecessarily complicated.

Many techniques involve hiding your real fields and using stylized divs to replace them. These approaches are both complicated *and* bad for accessibility.

When I came across [Adrian Roselli's article on under-engineered custom radio buttons and checkboxes](http://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html), it was like a breath of fresh air.

> I keep seeing overly-complex controls with additional elements as style hooks, scripting to make up for non-semantic replacements, images that need to be downloaded, and so on.
>
> This is silly. Here are some really simple styles to make radio buttons and checkboxes look unlike native controls (which seems to be the main goal from these over-engineered attempts).
>
> The code in here is not perfect, but it is simple, semantic, and accessible. It does not require any third-party libraries, it does not use images, and no scripting is needed. It is pure HTML and CSS.

I love what Adrian's done here. [Go read the article and checkout the examples.](http://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html) You'll be glad you did.