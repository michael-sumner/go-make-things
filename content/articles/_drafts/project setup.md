My project setup looks a bit like this...

```
my-app/
|—— dist/
|   |—— css/
|   |   |—— main.css
|   |   |—— main.min.css
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— classList.js
|   |   |—— classList.min.js
|   |   |—— myplugin.js
|   |   |—— myplugin.min.js
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

I use a custom Gulp.js configuration to manage all of my source files and build them into distribution/production files. It...

- Lints my CSS and JS.
- Concatenates and minifies my CSS and JS.
- Optimizes my SVG files
- Injects headers into the files with copyright info, version numbers, etc.

I used to use CodeKit, which is still awesome. But the Gulp build let's me more easily customize things and I'm *finally* comfortable enough with command line that I can use it reasonably.

All of my source code lives in the `src` directory, and production code is in the `dist` directory.

I use Sass mainly just for variables (I use variables for colors like `$color-primary` and `$color-secondary`, as well as breakpoints like `$bp-small`, `$bp-medium`) so that I can easily change a few things without doing a massive find-and-replace.

It also lets me keep my files modular and combine them into one file easily.

For JavaScript, any file directly under the `js` directory is copied over to `dist` as standalone files (linted and minified). Any subdirectory in `js` has its contents combined into a single file with the same name as the directory itself (ie. everything in `js/main` is output to `main.js` and `main.min.js`).

SVGs are run through SVGO to remove any junk and make them smaller (by quite a bit in some cases).

There's also an option in my `gulp.js` file to turn on or off a bunch of features, including adding cache-busting to the minified files. When it's turned on, it adds the version number to the file. So `main.min.js` would instead by `main.min.1.2.1.js`.

I don't really use any libraries and barely use third-party stuff. Anything I need to add I copy/paste or download from the Vanilla JS Toolkit (https://vanillajstoolkit.com) or it's GitHub repo, respectively.

I also add polyfill.io to basically every site I build these days. It just works, and its awesome!