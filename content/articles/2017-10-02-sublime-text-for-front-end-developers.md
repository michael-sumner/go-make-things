---
categories:
- Code
- Technology
date: '2017-10-02'
permalink: /sublime-text-for-front-end-developers/
title: Sublime Text for Front End Developers
url: /2017/10/02/sublime-text-for-front-end-developers
---

A few months ago, I wrote an article on [Visual Studio Code for front end developers](/visual-studio-code-for-front-end-developers/).

In it, I wrote:

> I’ve tried at various times in the past to switch to Atom from GitHub, but kept coming back to Sublime. Code is, to me, the best of Atom (easy customization and flexibility) and Sublime (fast) rolled into one.

After a couple of months of use, I've switched back to Sublime Text.

## Why Sublime over Code?

Code is still a great text editor. I still recommend it to [all of my students](/guides/).

*But*... after installing a bunch of plugins, I found that Code would get a touch laggy with extended use. I'd have to shut it down and reopen it to fix the problem. I let the Code team know, and I'm certain they'll get it figured out, but Sublime never ran into issues like that for me.

So, I switched back. But with a few changes.

Code has a bunch of *really* nice features that I missed in Sublime. I upgraded from Sublime 2 to Sublime 3, and went looking for plugins to pull my favorite features from Code into Sublime.

Here's my setup...

## Package Manageament

Oddly, Sublime Text does not include a package manager by default like Code does.

The first thing anyone should install is [Package Control](https://packagecontrol.io/installation). It lacks the nice visual preview that the package manager in Code does, but it's still quite useful.

In version 3, Sublime made a change to the way packages are stored. The [package resource viewer](https://github.com/skuroda/PackageResourceViewer) plugin helps you find packages that are otherwise hidden deep in the file system.

## Themes

As I mentioned in my post on Visual Studio Code, I'm all-in on Monokai.

I use the [Monokai Extended theme](https://github.com/jonschlinkert/sublime-monokai-extended), which offers traditional Monokai as well as a light version. I use the original at night, and the light version during the day (since I work outside a lot).

I actually use a slightly tweaked version of Monokai Light that's more like the one for Code. [You can find it on GitHub.](https://gist.github.com/cferdinandi/f57f627eeac031685feb31c3384e91c8)

Code makes it really easy to switch themes with a keyboard shortcut. To get this functionality in Sublime, I added the [Schemr plugin](https://github.com/benweier/Schemr). Then I added Monokai and Monokai Light to my favorites. Finally, under my keybindings, I added the option to toggle between my favorites by clicking `command+k+t`.

```js
[
    { "keys": ["super+k", "super+t"], "command": "schemr_cycle_favorite_schemes", "args": {"direction": "next"}}
]
```

## Working with JavaScript

There's not really a ton that's needed here.

The [JavaScript Completions plugin](https://packagecontrol.io/packages/JavaScript%20Completions) adds better autocomplete for JS. I also use [SublimeLinter](http://www.sublimelinter.com/en/latest/) with JSHint to live lint my code.

You can configure JSHint, but I just roll with the defaults. It lints your code as you write it, giving nice visual clues when you've messed something up.

## Working with CSS

The [Sass plugin](https://packagecontrol.io/packages/Sass) provides Sass hinting and autocompletion.

[Sublime CSSComb](https://github.com/csscomb/sublime-csscomb) reorders your CSS and Sass selectors based on criteria that you can specify. I go alphabetically, but you can use any ordering scheme you'd like.

The [Color Highlighter plugin](https://github.com/Monnoroch/ColorHighlighter) displays the color of any hexcode, RGB value, and more when you hover over it. It also works with Sass variables.

## Working with HTML

Again, there's not really much you need to do here, but the [HTML-CSS-JS Prettify plugin](https://github.com/victorporof/Sublime-HTMLPrettify) formats your code with proper indentations.

## DocBlockr

I'm a big fan of the DocBlockr format.

The [DockBlockr plugin](https://github.com/Warin/Sublime/tree/master/DocBlockr) adds the DocBlockr format to JavaScript, PHP, and even CSS files if you type `/**` and hit enter. It even pulls in variable names from functions and sets up type and description placeholders.

## Server Files

The [ApacheConf language plugin](https://github.com/colinta/ApacheConf.tmLanguage) adds syntax highlighting to `.htaccess` files, `.conf` files, and other server files.

## Toggling Quotes

The [Toggle Quotes plugin](https://github.com/spadgos/sublime-ToggleQuotes) let's you easily toggle between single and double quotes.

## Clickable Links

One thing Code does that I absolutely love is make links in files clickable. The [ClickableUrls plugin](https://github.com/leonid-shevtsov/ClickableUrls_SublimeText) adds the same functionality to Sublime.

Under Package Settings for this plugin, I had to add this to the user mouse bindings.

```js
[
	{ "button": "button1", "modifiers": ["super"], "press_command": "open_url_under_cursor" }
]
```

## Syncing Settings

The [Sync Settings plugin](https://packagecontrol.io/packages/Sync%20Settings) helps keep settings and packages in sync across machines by pushing your configuration to a private GitHub Gist and then checking it on all of your devices.

Anything I missed? Any must have plugins I should consider? Email me and let me know!