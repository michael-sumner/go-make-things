---
title: "When to use CSS vs. JavaScript"
date: 2018-11-12T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

My article on Friday about [overengineering CSS](/overengineering-css/) apparently hit a chord with a lot of readers.

The responses I got were a mix of "hell yes!" and "how do you approach CSS in your projects?" Today, I wanted to talk more about when I use CSS vs. JavaScript.

## CSS before JS

My general rule of thumb is...

> If something I want to do with JavaScript can be done with CSS instead, use CSS.

CSS parses and renders faster.

For things like animations, it more easily hooks into the browser's refresh rate cycle to provide silky smooth animations (this can be done in JS, too, but CSS just makes it so damn easy).

And it fails gracefully.

A JavaScript error can bring all of the JS on a page to screeching halt. Mistype a CSS property or miss a semicolon? The browser just skips the property and moves on. Use an unsupported feature? Same thing.

## You can take this rule too far, though

A few years ago, there was an obsession with finding creative CSS hacks for things that would normally be done in JS.

A CSS-only expand/collapse navigation menu is the one that jumps to mind. [Here's an example.](https://medialoot.com/blog/how-to-create-a-responsive-navigation-menu-using-only-css/) These are really cool examples of pushing CSS farther and thinking about code creatively, but...

**The results are often wildly inaccessible.**

[Here's the demo from the example I linked to.](https://medialoot.com/preview/css-only-navigation-menu/index.html) Hover over *About* or *Portfolio*. Works great!

Now, reload the page and try to tab through the menu. Nothing shows up. You can access the submenus below those items if you're a keyboard only user.

There are times where, for accessibly, using JavaScript is actually better than using CSS.

## A mental model for making decisions

I don't really have a formal model for choosing when to use CSS vs. JS, but approach to which one to use and when looks like this:

- If the item requires interaction from the user, use JavaScript (things like hovering, focusing, clicking, etc.).
- If the item needs to change in visibility, needs to be animated, or have any other visual change made to is, use CSS.

Often times, these two are combined.

For example, let's talk about the drop-down menu example we looked at earlier. You can detect focus on the drop-down link with CSS, but once you tab into the links below it, the original link loses focus.

I would use JavaScript to detect a change in focus, and then check if the currently in focus element is either that link *or* one of the items below it.

If either of those conditions is true, I would add a class to the dropdown menu that makes it visible. You could also use that class to add animations and do all sort of other fun stuff.

Tomorrow, I'm going to talk about my preferred CSS methodologies, and how I use them to write stylesheets that are absurdly tiny and performant.
