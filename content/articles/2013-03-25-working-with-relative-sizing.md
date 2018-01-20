---
categories:
- Accessibility
- Code
date: '2013-03-25'
url: /working-with-relative-sizing/
title: Working with Relative Sizing
---

The [Kraken boilerplate](http://cferdinandi.github.com/kraken/) uses only relative sizing. There's not a single pixel in the stylesheet.

Relative sizing can be a bit tricky to get the hang of, but once you do, it's actually really easy to work with and has a lot of great benefits.

Let's look at how it all works.
<!--more-->
## The Base Font-Size

Web browsers set a default `font-size` of 16px.

If you set the `font-size` to 100% in your stylesheet (or didn't set it at all), your text would render at 16px. If the visitor had changed their default `font-size` to 20px, your text would render at 20px.

When you set sizes in pixels, nothing changes if your visitor adjusts their default `font-size`.

Many web designers like the control this gives them, but relative sizing is better for usability. It gives control to the visitor and allows people who have accessibility needs (for example, someone who's visually impaired and needs to read at larger font-sizes) the ability to modify the content to fit their needs.

You don't have to worry about this breaking your layout. If all of your sizing uses relative values, when the default `font-size` changes in a visitor's browser, all of the site elements will scale with it.

This is good for you as a designer, too. Imagine being able to adjust everything on your site by changing a single value!

### Adjusting the Base Font-Size

On larger screens (about 1280px), the base `font-size` on the `body` element in Kraken is 125%. What is that in pixels?

```
1.25 (125%) * 16px = 20px
```

If that's a bit too big or small for your design, you can adjust it by changing the percentage on the `body` element in the stylesheet. Changing it 100% gives you a `font-size` of 16px. Changing it to 112.5% results in 18px text.

Avoid going below 100%. That's the default browser `font-size` for a reason.

### Changing Other Elements

The `body` is the only element sized as a percentage. All other elements are sized using <em>ems</em>.

1em is equal the font-size of the object you're manipulating. So if you're working with default text set at 16px, 1em = 16px. If you're working with a heading that has a `font-size` of 24px, 1em = 24px.

For example, an `h1` heading has a `font-size` of 1.5em. In pixels, that's:

```
16px (our base font-size) * 1.5em = 24px
```

If you knew you wanted that element to be 24px wide, you can calculate the ems by dividing the desired value by the base:

```
24px / 16px = 1.5em
```

The `margin-bottom` of 1em on that `h1` heading is based on the heading size, not the `body` size. Here's what that looks like:

```
24px * 1em = 24px
```

This is what makes relative sizing so awesome. If you change the `body` size, all other page elements will proportionately scale up or down with it&mdash;and each other&mdash;because their sizing is relative to the base `font-size`.

### An Example

Let's say you wanted to change the `margin-left` on sorted and unsorted lists.

By default, those are set as `margin-left: 2em` in the Kraken stylesheet. What is that value in pixels currently, and how would you change it?

```
16px * 2em = 31px
```

If you wanted to set that margin to a bigger size, say 48px, here's what you'd do:

```
48px / 16px = 3em
```

Pretty easy!

## Working with a Typographic Scale

You may be wondering where I got the pixel values that I used in these examples.

Kraken was built on a typographic scale using the <a href="http://lamb.cc/typograph/">Typograph app</a>. All of the values in the stylesheet are taken from that scale:

```
1px, 4px, 5px, 8px, 9px, 11px, 12px, 13px, 15px, 16px, 19px, 21px, 24px, 28px, 32px, 48px, 64px, 80px, 96px
```

If you're going to change any of the values in the Kraken stylesheet, your design will feel more harmonious if you use one of these pixel values as your reference.

Even if you change the base `font-size` on the `body` element, use 16x as your working base. Remember, everything scales relative to the base your base font-size may not be 16px anymore, but the em value you get from dividing by 4px won't really be 4px anymore, either.

It's the relative value between elements that makes the scale work.