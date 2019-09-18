---
categories:
- Accessibility
- Code
- CSS
- Design and UX
- JavaScript
date: '2017-07-20'
url: /reduced-motion-media-query/
title: Reduced Motion Media Query
---

The Reduced Motion media query provides <a href="https://css-tricks.com/introduction-reduced-motion-media-query/">a way for people who experience motion sickness and vertigo</a> to specify that they'd like to reduce the motion of an interface.

Reader Daniel Post shared <a href="https://gist.github.com/danielpost/2477d1881d9b267b39756068f09be5d2">some code he uses to implement this on his sites</a>.

Daniel's codes is written in ES6 and Sass. Here's the ES5 and CSS version.

<strong>JavaScript</strong>

```js
if (window.matchMedia('(prefers-reduced-motion)')) {
    // Handle JavaScript differently
    document.documentElement.className += ' reduced-motion';
}
```

<strong>CSS</strong>

```css
.some-component {
    animation: all 2s ease-in;
}

.reduced-motion .some-component {
    animation: none 0s ease-in;
}
```

<h2>Without JavaScript</h2>

Daniel's approach requires JavaScript, which is fine when modifying JS components.

But for CSS, a simple media query does the same thing and works even if the JavaScript fails, fails to load, or loads after an animation has started.

```css
.some-component {
    animation: all 2s ease-in;
}

@media (prefers-reduced-motion) {
    .some-component {
        animation: none 0s ease-in;
    }
}
```