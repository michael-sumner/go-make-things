---
categories:
- Code
- CSS
- JavaScript
- Technology
- WordPress
date: '2017-08-14'
permalink: /visual-studio-code-for-front-end-developers/
title: Visual Studio Code for Front-End Developers
url: /2017/08/14/visual-studio-code-for-front-end-developers
---

A few weeks ago, I switched from Sublime Text to [Visual Studio Code](https://code.visualstudio.com/) as my primary text editor.

I've tried at various times in the past to switch to [Atom from GitHub](https://atom.io/), but kept coming back to Sublime. Code is, to me, the best of Atom (easy customization and flexibility) and Sublime (fast) rolled into one.

And unlike Sublime, it's 100% free. Today, I wanted to share my setup.

## Themes

I'm all in Monokai.

I use the included Monokai theme for nighttime coding, and [Monokai Light](https://marketplace.visualstudio.com/items?itemName=zoxon.monokai-light), available as a free extension, during the day.

The included themes are great, and anything you loved from Sublime, Text Mate, VIM, and so on is probably available for Code as well.

One of my favorite things about the themes is that they extend to the built-in command line functionality in Code as well.

## Working with JavaScript

Code already includes fantastic syntax highlighting, code suggestions, and so on. I use just a few extensions to help making writing it even easier.

[Quotes Transformer](https://marketplace.visualstudio.com/items?itemName=vilicvane.es-quotes) let's me easily toggle between single and double quotes, and even escapes characters in strings automatically for you.

[Complete JSDoc Tags](https://marketplace.visualstudio.com/items?itemName=HookyQR.JSDocTagComplete) extends the native JSDoc functionality in Code by automatically grabbing function arguments and setting them up as `@param`'s for you.

And while ESLint is the new hotness, I use [JSHint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint) for my JavaScript linting. It runs in real time, catching any bugs as I go.

Here are my options, saved directly to my settings in Code:

```lang-javascript
// The jshint options object to provide args to the jshint command.
"jshint.options": {
	"evil": true,
	"regexdash": true,
	"browser": true,
	"wsh": true,
	"trailing": true,
	"sub": true,
	"devel": true
}
```

## Working with CSS and Sass

I use [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint) and [CSSLint](https://marketplace.visualstudio.com/items?itemName=raymondcamden.CSSLint) to lint my Sass and CSS files, respectively.

I've grown to love the DocBlocker format so much that I use it in my CSS, too. The [Auto Comment Blocks](https://marketplace.visualstudio.com/items?itemName=kevinkyang.auto-comment-blocks) adds the JSDoc-style autocompletion to CSS and Sass.

## Working with PHP

Once again, with my love of DocBlocker, I use the [PHP DocBlocker extension](https://marketplace.visualstudio.com/items?itemName=neilbrayfield.php-docblocker) to more intelligently autocomplete my PHP comments with automatic `@param` and `@return` tags, among other things.

## Working with HTML

[Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) automatically closes tags if you open them. Type `<div>` and the extension will automatically add `</div>` right after it. Super useful!

[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) will automatically change the opening or closing tag to match it's pair. For example, if I changed `<div>` to `<article>`, the closing `</div>` would update to `</article>` in real time with it.

Finally, for quick viewing of static HTML page, I use [Open in Browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser) to quickly open files in any browser installed on my machine.

## Working with SVG

I mostly use [Sketch](https://www.sketchapp.com/) for my SVG work, but the [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer) extension let's me quickly view SVG files in Code.

## Settings and the Editor

You can configure almost every aspect of the editor. Here are some tweaks I've made to change the default behavior.

```lang-javascript
// Increase the font size to 15px
"editor.fontSize": 15,

// Automatically format pasted text
"editor.formatOnPaste": true,

// Accept code suggestions by pressing "enter" (in addition to the default "tab")
"editor.acceptSuggestionOnEnter": "on",

// Highlight matching brackets when one of them is selected.
"editor.matchBrackets": true,

// Wrap text to the viewport width
"editor.wordWrap": "on",

// Use 4 spaces for tabs
"editor.tabSize": 4,

// Use hard tabs
"editor.insertSpaces": false,

// Automatically indent text
// "editor.autoIndent": true,

// Indent wrapped lines for easier viewing
"editor.wrappingIndent": "indent",

// Turn off minimap
"editor.minimap.enabled": false,

// Increase the size of the integrated command line text
"terminal.integrated.fontSize": 14,

// Remove trailing whitespace on save
"files.trimTrailingWhitespace": true,

// Allow the editor to scroll past the last line of code
"editor.scrollBeyondLastLine": true,

// Open a new, blank file when the editor starts up for the first time
"workbench.startupEditor": "newUntitledFile",

// If any files were open when Code was closed, reopen them
"window.restoreWindows": "all",
```

## Keeping things in sync

If you work across multiple machines, the [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) extension is amazing. It saves your settings, keyboard shortcuts, extensions, themes and more in sync across all of your devices. It uses a private Gist from GitHub to save your data.

Are there any essentials that you use that I missed? I'd love to hear about them!