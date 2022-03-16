---
title: Accessibility, assistive technology, and JavaScript
date: 2022-03-16T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

I'm creating a new course and ebook on how to build accessible UI components with vanilla JavaScript. 

Many of the core concepts from the course are woven into [the Vanilla JS Academy workshops](https://vanillajsacademy.com), and I thought it was time that they got their own dedicated guide.

Today, I wanted to share the intro section on accessibility, assistive technology, and why sometimes using JavaScript is more accessible than not using it. Let's dig in!

## What is A11Y?

Accessibility is sometimes abbreviated with the numeronym _A11Y_, with 11 representing the number of letters between the A and Y.

For web developers, the field of accessibility is focused on providing people with equal access to the things we make, regardless of any physical or neurological disabilities. 

That includes both temporary disabilities (such as losing mobility after breaking an arm) and long-term or permanent disabilities. It includes physical disabilities, such as visual impairment or a neuromuscular condition, as well as cognitive impairments. 

As you can imagine, the field of accessibility covers a wide-range of topics, from HTML structure to color choices to copywriting and more.

This guide is specifically focused on a subset of A11Y: building interactive JavaScript components that can be used by as many people as possible.

## Navigating with a keyboard

People with visual impairments often navigate the web with just a keyboard instead of using a mouse. People with neuromuscular conditions sometimes use only a keyboard as well, as those certain conditions can make using a mouse difficult.

Using the `tab` key, you can jump from one focusable element (such as links and form fields) to another. Using the `enter` or `return` keys, you can activate a link or submit a form. Using the `space` bar, you press a button or scroll down on a page.

When building things for the web, it's important to ensure that the things can be used with just a keyboard.

### A quick note about macOS

On macOS, keyboard focus navigation is off by default. Chromium browsers (like Chrome and Edge) automatically support keyboard navigation anyways, but Firefox and Safari honor the system preferences. 

To enable website keyboard navigation on macOS...

1. Open System Preferences.
2. Select the "Keyboard" tab.
3. Select the "Shortcuts" tab.
4. Check the box labeled: "Use keyboard navigation to move focus between controls."


## Screen Readers

Users who are visually impaired may use a piece of software called a screen reader to navigate the web.

Screen readers announce the text on a page out loud so that someone who is visually impaired can use it. They also typically communicate additional information about the page, such as the heading structure and other landmarks.

Both macOS and Windows 10 and up include free screen reader software. Users on Linux or older versions of Windows have free third-party options to choose from.

### Enabling a screen reader

On macOS
: Open `System Preferences`, click the `Accessibility` tab, then click `Voice Over`. Check the `Enable Voiceover` box.

On Windows 10
: Click `Start`, then `Settings`. Click `Ease of Access`. Slide the `Narrator` toggle to `On`.

On older Windows devices
: You can [install NVDA for free](https://www.nvaccess.org/).

On Linux
: You can [install Orca for free](https://wiki.gnome.org/Projects/Orca).

### Using a screen reader

In order to build accessible web experiences, it's important to understand how a screen reader announces the content of what you build.

If you've never used one before, opening up a site you've built, turning on a screen reader, and using the `tab` key on your keyboard to move through the links or interact with content on the site can be very enlightening.

_**Note:** using a screen reader for the first time (and second, and third, and...) is an awkward, clumsy experience. You don't have to be an expert. The point right now is to get a taste for what your website is like for people who can't see the layout or changes to it._

## CSS-only components

People sometimes build interactive components using only CSS. These are almost always _inaccessible_ for people who use screen readers and other assistive technology.

As we'll see in the coming sections, screen readers expect and require certain attributes and properties on HTML elements to understand what's happening in the UI and communicate those changes to the people who use them. For interactive components, the values of those properties often change dynamically.

CSS is incredibly powerful, and I love to replace JavaScript with CSS when I can.

But for interactive components, CSS cannot update the attribute values that screen readers rely on to understand what's happening in the UI. Additionally, many CSS-only components assume the use of a mouse, and don't work (or don't work as expected) with keyboard navigation.

Screen readers and other assistive tech not only work just fine with JavaScript, but often _require JS_ to work properly with interactive components.