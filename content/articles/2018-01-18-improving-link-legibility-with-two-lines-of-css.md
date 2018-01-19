---
categories:
- Accessibility
- CSS
date: '2018-01-18'
permalink: /improving-link-legibility-with-two-lines-of-css/
title: Improving link legibility with two lines of CSS
url: /2018/01/18/improving-link-legibility-with-two-lines-of-css
---

Links in body copy should pretty much [always be underlined](https://gomakethings.com/accessibility-according-to-people-with-actual-disabilities/).

**A brief aside...** I had [previously assumed](https://gomakethings.com/better-link-accessibility-for-the-color-blind/) that certain colors that aren't affected by common types of color blindness (like certain shades of blue) provided sufficient contrast and did not need to be underlined. Then I [learned that I was wrong](https://gomakethings.com/accessibility-according-to-people-with-actual-disabilities/).

> Sleep disorder: I have to read after 5pm with f.lux cranked up all the way, so sites that assume hyperlinks can be blue w/no underline…

However, underlines introduce their own accessibility challenges.

For people with certain types of visual impairments (low vision and dyslexia, for example), underlines that cut through descenders on letters (the dip below the imaginary "line" caused by lower case g, y, and so on) can make text difficult to read and understand.

Print figured this out years ago, and breaks the underline for those descenders. And now, you can achieve the same affect with CSS.

For a short while, you could use the `text-decoration-skip` property set to `ink`.

```lang-css
a {
    text-decoration: underline;
    text-decoration-skip: ink;
}
```

This has since been moved to it's own property: `text-decoration-skip-ink`, with a value of `auto`. Browser support is spotty, so for now, use both.

```lang-css
a {
    text-decoration: underline;
    text-decoration-skip: ink;
    text-decoration-skip-ink: auto;
}
```

That will make a link like this.

<img src="https://gomakethings.com/wp-content/uploads/2018/01/without-skip-ink.png" alt="" width="576" height="64" class="aligncenter size-full wp-image-20368" />

Look like this instead.

<img src="https://gomakethings.com/wp-content/uploads/2018/01/with-skip-ink.png" alt="" width="576" height="64" class="aligncenter size-full wp-image-20368" />