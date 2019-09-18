---
title: "Readability is more important than brevity"
date: 2019-03-25T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

Often, web developers are obsessed with brevity. There's this thing were developers will try to write the same function in the fewest number of characters possible.

Personally, I think brevity is pointless. *Readability* is a lot more important.

A competent minifier (like [Uglify](https://www.uglifyjs.net/) or[ Terser](https://github.com/terser-js/terser)) will make your code tiny. So will gzipping.

Let technology handle that and focus on code that you can easily read when you (or someone else) comes back to it later.

What that means in practical terms:

1. Use old-school [function declarations or function expressions](/function-expressions-vs-function-declarations/) instead of arrow functions.
2. Use if statements instead of [ternary operators](/ternary-operators/).
3. Use lots of whitespace.
4. Write lots of in-code comments and documentation.

I've also found that beginner developers find `Array.forEach()` easier to understand than the methods like `map()` and `filter()` and so on, but that more seasoned developers find the latter methods more obvious.

That ones a gray area for me. I mix-and-match depending on what I'm trying to do.