---
title: "How I setup my vanilla JavaScript projects"
date: 2018-10-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I don't use module loaders or bundlers like RequireJS, Webpack, and so on (for simplicity). I also don't use the ES6 `import` statement (for browser compatibility reasons).

As a result, one of the most common questions I get is how I set up my projects.

Today, I'm going to show you.

*__Standard caveat:__ This is the setup that works best for __me personally__. I'm not dogmatic about this. If you have a setup you use and like, keep at it! Let's stop chasing tools and start making more cool stuff for the web.*

## Folder Structure

My typical project folder structure looks a bit like this...

```
my-app/
|—— dist/
|   |—— css/
|   |   |—— main.css
|   |   |—— main.min.css
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— someStandaloneScript.js
|   |   |—— someStandaloneScript.min.js
|   |   |—— main.js
|   |   |—— main.min.js
|   |—— svg/
|   |   |—— icons.svg
|   |—— # other static assets
|—— src/
|   |—— js/
|   |   |—— someStandaloneScript.js
|   |   |—— main/
|   |   |   |—— atomic.js
|   |   |   |—— smooth-scroll.js
|   |   |   |—— fluid-vids.js
|   |   |   |—— app.js
|   |   |   |—— zzz_inits.js
|   |—— sass/
|   |   |—— _config.scss
|   |   |—— _mixins.scss
|   |   |—— components/
|   |   |   |—— _normalize.scss
|   |   |   |—— _grid.scss
|   |   |   |—— _typography.scss
|   |   |   |—— _overrides.scss
|   |   |—— main.scss # imports config.scss, mixins.scss, and all components
|   |—— static/
|   |	|—— img/
|   |   |	|—— # image files
|   |   |—— # other static files and folders
|   |—— svg/
|   |   |—— # svgs
|—— .travis.yml
|—— gulfile.js
|—— package.json
|—— README.md
```

## Gulp.js

I use a custom [Gulp.js](https://gulpjs.com/) configuration to manage all of my source files and build them into distribution/production files. It...

- Lints my CSS and JS.
- Concatenates and minifies my CSS and JS.
- Optimizes my SVG files
- Injects headers into the files with copyright info, version numbers, etc.

[Here are my gulp configuration and `package.json` files.](https://gist.github.com/cferdinandi/8ca81dcff6b0324f7335003cd9003e99)

- Run `gulp` to run the build.
- Run `gulp watch` to automatically run the build whenever you change a file.

I used to use [CodeKit](https://codekitapp.com/), which is still awesome. But the Gulp build let's me more easily customize things and I'm *finally* comfortable enough with command line that I can use it reasonably.

## The Details

All of my source code lives in the `src` directory, and production code is in the `dist` directory.

### Sass

I use Sass mainly just for variables (I use variables for colors like `$color-primary` and `$color-secondary`, as well as breakpoints like `$bp-small`, `$bp-medium`) so that I can easily change a few things without doing a massive find-and-replace.

It also lets me keep my files modular and combine them into one file easily.

### JavaScript

For JavaScript, any file directly under the `js` directory is copied over to `dist` as standalone files (linted and minified).

Any subdirectory in `js` has its contents combined into a single file with the same name as the directory itself (ie. everything in `js/main` is output to `main.js` and `main.min.js`).

To force certain files (polyfills, for example) to be included first, I prefix them with an underscore (`_`). To force certain files to show up last (maybe some plugin initializations), I prefix them with `zzz_`.

```
_closest.polyfill.js
_matches.polyfill.js
myPlugin.js
zzz_inits.js
```

Is it as fancy as a module loader? Of course not.

But it's simple and it works. Every time.

### SVGs

SVGs are run through SVGO to remove any junk and make them smaller (by quite a bit in some cases).

### Configuration

There's also an option in my `gulp.js` file to turn on or off a bunch of features, including adding cache-busting to the minified files.

```js
var settings = {
	scripts: true,		// Turn on/off script tasks
	styles: true,		// Turn on/off style tasks
	svgs: true,			// Turn on/off SVG tasks
	images: true,		// Turn on/off image tasks
	docs: false,		// Turn on/off documentation generation
	cacheBust: false	// Turn on/off cache busting (adds a version number to minified files)
};
```

When that's turned on, it adds the version number to the file. So `main.min.js` would instead by `main.min.1.2.1.js`.

## Including third-party scripts

I don't really use any libraries and barely use third-party stuff. Anything I need to add I copy/paste or download from the [Vanilla JS Toolkit](https://vanillajstoolkit.com) or it's GitHub repo, respectively.

I also add polyfill.io to basically every site I build these days. It just works, and its awesome.

I include it with a `script` element in the footer. Those work just fine!