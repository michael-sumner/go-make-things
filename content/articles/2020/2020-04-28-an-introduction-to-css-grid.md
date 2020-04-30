---
title: "An introduction to CSS Grid"
date: 2020-04-28T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

CSS Grid is an insanely powerful way to build layouts. But because it can do so much (and because most tutorials love to show you all the fancy stuff it can do), learning the basics can feel overwhelming.

Today, I wanted to demystify CSS Grid, and show you how to create some simple grid-based layouts with just a few lines of CSS.

## Grids and "fractional units"

As the name implies, CSS Grid operates within a grid layout: a set of rows and columns (not unlike a table).

To create a grid with CSS Grid, you specify how many columns wide it should be, and how many of those columns any particular piece of content should occupy. You can also optionally specific the number of rows, and position content very precisely on specific rows, columns, or both.

If this photo of sticky notes below were a CSS Grid, it would be three columns wide, and three rows high.

<img alt="A photo of sticky notes laid out in a 3x3 grid pattern" src="/img/articles/grid.jpg">

You can use all sorts of different units of measure for column widths, but the most versatile and useful is the `fr`, or _fractional unit_.

A fractional unit is equal to one column or row out of the total number of columns or rows. In the 3x3 sticky note grid above, `1fr` is equal to one-third or 33.3%. In a four-column grid, it would be equal to one-fourth, or 25%. And so on.

## Creating a simple three-column grid

I find CSS Grid makes a lot more sense when you see specific examples. Let's start by building a simple three-column grid.

For all of our examples, I'm going to use a variation on the markup below.

```html
<div class="grid-thirds">
	<div class="container-1">.container-1</div>
	<div class="container-2">.container-2</div>
	<div class="container-3">.container-3</div>
	<div class="container-4">.container-4</div>
	<div class="container-5">.container-5</div>
</div>
```

There are just three things you need to build a simple grid:

1. The `display: grid` property, which activates CSS Grid.
2. The `grid-template-columns` property, which defines how many columns are in the grid.
3. The `grid-column-gap` and `grid-row-gap` properties, which define how much space is between each row and column.

```css
.grid-thirds {

	/* Activate grid layout */
	display: grid;

	/* Create 3 columns, each 1 "fractional unit" wide */
	grid-template-columns: 1fr 1fr 1fr;

	/* Add a 10px gap between columns and rows */
	grid-column-gap: 10px;
	grid-row-gap: 10px;

}
```

Our grid is three columns wide, but we have five content areas. The "extra" containers automatically create a new row that's also three columns wide.

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKdqexa)

### Shorthands to make this even simpler

For the `grid-template-columns` property, of all of your columns are going to be the same width, the `repeat()` function lets you repeat a column width a specified number of times.

(*Yes, CSS has functions, and yes, it's a programming language.*)

The first argument is how many times to repeat, and the second argument is the value to use.

```css
.grid-thirds {
	/* Also create 3 columns, each 1 "fractional unit" wide */
	grid-template-columns: repeat(3, 1fr);
}
```

If the gap between your rows and columns should be the same value, `grid-column-gap` and `grid-row-gap` can be consolidated into a single `grid-gap` property.

```css
.grid-thirds {
	/* Add a 10px gap between columns and rows */
	grid-gap: 10px;
}
```

## The "Holy Grail" Layout

If you've been around the web for a while (*:cough: if you're old like me :cough:*), you might remember [the "holy grail" layout](https://csslayout.io/patterns/holy-grail/): a header, footer, two sidebars, and a body of content in the middle.

It used to be a huge pain to do, then it got easier. Then everyone realized that it's a terribly distracting layout and it's slowly faded into obscurity.

Anyways, let's create a "two sidebars with content in the middle" layout with CSS Grid. We're going to use the same HTML as before, but we'll change the class to `.grid-sidebars`.

So, the only thing we actually need to change is the `grid-template-columns` property. We'll give it a value of `1fr 3fr 1fr`.

```css
.grid-sidebars {
	display: grid;

	/* Create a grid where the first and last column are 1fr, and the second is twice as wide */
	grid-template-columns: 1fr 3fr 1fr;

	/* Add a 10px gap between rows and columns */
	grid-gap: 10px;

}
```

In this example, while the layout is actually three-column grid, for math purposes it's helpful to think of it as a five-column grid with the middle content area spanning three columns.

To figure out the width of `1fr`, count up the total number of fractional units. One over that number (1/n) will give you the fraction, and dividing into 100 will give you the percentage.

In this example, there are five total fractional unites, so `1fr` is one-fifth of the layout, or 20%.

[Here's what that looks like.](https://codepen.io/cferdinandi/pen/NWGgzZb)

Again, you can see the extra columns wrapped into a new row that follows the same grid template.


## Browser compatibility

CSS Grid works in all modern browsers, but not IE.

This is one that I'm 100% comfortable treating as a progressive enhancement, though. IE will get a simple, single column layout. Everyone else gets the fancy layouts.


## More complex layouts

Tomorrow, we'll look at [how to do more advanced layouts with CSS Grid](/how-to-build-complex-layouts-with-css-grid/).