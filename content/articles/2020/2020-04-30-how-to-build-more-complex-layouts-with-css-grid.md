---
title: "How to build complex layouts with CSS grid"
date: 2020-04-30T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

On Tuesday, we learned [how CSS Grid works](/an-introduction-to-css-grid/) and how easy it is to build simple layouts with it.

Today, we're going to learn how to build more advanced or complex layouts with it.

## Defining a Grid

CSS Grid can be really simple, but it also gives you the power to have incredible amounts of control over where exactly on a page a specific element is positioned.

It starts with defining a grid. For precisely controlled layouts, it's a good idea to define both columns *and* rows.

For today's example, let's create a 5x5 grid (five columns across and five rows down).

```css
.grid-5-by-5 {

	/* Activate grid layout */
	display: grid;

	/* Create 5 columns, each 1 "fractional unit" wide */
	grid-template-columns: repeat(5, 1fr);

	/* Create 5 rows, each 1 "fractional unit" high */
	grid-template-rows: repeat(5, 1fr);

	/* Add a 10px gap between columns and rows */
	grid-gap: 10px;

}
```

[Here's what it looks like](https://codepen.io/cferdinandi/pen/pojrmQb).

For illustrative purposes, every spot in the grid has an element, and it's following the default flow of the grid.

## Positioning elements in your grid

Let's say I had three items in my grid.

```html
<div class="grid-5-by-5">
	<div class="item-1">.item-1</div>
	<div class="item-2">.item-2</div>
	<div class="item-3">.item-3</div>
</div>
```

The `grid-column` and `grid-row` properties can be used to position elements at specific spots in your grid.

Both properties have two values: `start` and `end`, and they're separated by a slash (`/`). (*which is weird, right? why not use a comma?*)

The numbers indicate the *grid lines*, and not the specific grid boxes, which is a little confusing at first. In our 5x5 grid, the leftmost edge grid line is `1`, and the rightmost edge line is `6`.

Confused? A grid with five boxes has a border on each side, plus four lines in the middle to divide it up into columns. Sketch it out on paper to see what I mean.

### An example

Let's say I wanted to position `.item-1` in the last two columns.

I would use `grid-column` for that. For the `start` value, I'd use `4`, the grid line at the start of the fourth column. For the `end` value, I'd use `6`, the grid line after the fifth column.

```css
.item-1 {
	grid-column: 4 / 6;
}
```

I also want to put in the second row, and make it two rows high.

I would use `grid-row` for that. I'd give that a value of `2 / 4`, making it `start` at the second row grid line and `end` at the fourth row grid line.

```css
.item-1 {
	grid-column: 4 / 6;
	grid-row: 2 / 4;
}
```

Similarly, I'm also going to position `.item-3` a few rows down and in.

```css
.item-3 {
	grid-column: 2 / 3;
	grid-row: 4 / 6;
}
```

[You can see it here.](https://codepen.io/cferdinandi/pen/rNOzExp)

You'll notice that `.item-2` is the very first grid spot. Any items that aren't specifically positioned default to the normal grid flow.

### Positioning shorthand

You can combine `grid-column` and `grid-row` into a single property: `grid-area`.

The `grid-area` property has four values: `row-start`, `column-start`, `row-end`, and `column-end`, again separated by a slash (`/`).

So this:

```css
.item-1 {
	grid-column: 4 / 6;
	grid-row: 2 / 4;
}

.item-3 {
	grid-column: 2 / 3;
	grid-row: 4 / 6;
}
```

Would become this:

```css
.item-1 {
	grid-area: 2 / 4 / 4 / 6;
}

.item-3 {
	grid-area: 4 / 2 / 6 / 3;
}
```

[Here's an updated demo with `grid-area`.](https://codepen.io/cferdinandi/pen/ZEbJdLv)

I personally find this shorthand syntax confusing, but you might enjoy it (or run into it), so it's important to know how it works.

## Overlapping content

With CSS Grid, you can position content so that it overlaps.

```css
.item-1 {
	grid-column: 4 / 6;
	grid-row: 2 / 4;
}

.item-3 {
	grid-column: 5 / 6;
	grid-row: 3 / 6;
}
```

[Here's our grid again, with overlapping content.](https://codepen.io/cferdinandi/pen/WNQEqdj)

This can be used to create interesting, magazine-like layouts.

By default, the item that's earlier in the DOM sits on below elements that come later. You can control this by changing an element's `z-index`.

```css
.item-1 {
	grid-column: 4 / 6;
	grid-row: 2 / 4;

	/* Now .item-1 will be position on top of .item-3 */
	z-index: 1;
}

.item-3 {
	grid-column: 5 / 6;
	grid-row: 3 / 6;
}
```

## CSS Grid doesn't *need* to be complicated

You can create some amazingly complex stuff with CSS Grid. And a lot of tutorials you'll find get really into the weeds on those complex layouts.

Hopefully, Tuesday's article and today's dive into advanced layouts have shown you that you can build some pretty interesting layouts without a lot of complexity using CSS Grid.