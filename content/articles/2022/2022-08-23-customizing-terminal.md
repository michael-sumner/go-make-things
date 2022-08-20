---
title: Customizing terminal
date: 2022-08-23T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

_I'm wrapping up production on [a new series of courses on developer tooling](https://vanillajsguides.com/tooling-bundle/). The first course on [Terminal](https://vanillajsguides.com/terminal/) should be ready in the next week or two, but you can pre-order it today. This is an excerpt from the guide._

I don't typically start with customizing the UI of apps, but the default Terminal experience is... lacking. The colors are stark, and the font size is far too small for a lot of people.

So to make your experience with the rest of this guide more enjoyable, let's start by adjusting some preferences in Terminal.

Open the Terminal app, then open up the Preferences menu (under Terminal in the menu bar, or with the `Command + ,` keys on macOS). Then, select the _Profiles_ tab.

![A screenshot of the Profiles tab in the Terminal Preferences menu](/img/articles/terminal-profiles.png)

On the left, you'll see an assortment of built-in themes you can choose. They include a mix of colors and typography. Find one that resonates with you and select it.

On the right-hand side under the _Text_ tab, you can customize the font and font-size. The default font size for most themes in 10-11 pixels, which in my opinion is far too small for comfortable use. I set mine to 15, but choose a size that's comfortable for you.

I also updated my typeface to Menlo, a monospace font that I'm quite fond of.

Any changes you make are automatically saved. Once you're happy with your selections, click the General tab.

![A screenshot of the General tab in the Terminal Preferences menu](/img/articles/terminal-general.png)

Under _On startup open_, select _New window with profile_, then choose your preferred Profile from the dropdown menu.

Under _Shells open with_, make sure _Default login shell_ is selected.

## Custom themes

You can install custom themes for Terminal beyond the built-in ones.

For example, I'm a big fan of the Monokai color scheme, and use it for text editor as well. I installed [a Monokai theme for Terminal](https://github.com/stephenway/monokai.terminal), and use that as my default theme.

Installing a custom theme is as simple as downloading the file and double clicking it to run it. Terminal handles the rest.

If there's a color scheme or text editor theme you're fond of, finding a Terminal theme version of it might make your CLI experience more enjoyable.