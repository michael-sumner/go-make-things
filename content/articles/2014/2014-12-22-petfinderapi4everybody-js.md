---
categories:
- Code
date: '2014-12-22'
url: /petfinderapi4everybody-js/
title: petfinderAPI4everybody.js
---

A week or two ago I quietly replaced [Petfinder API for WordPress](https://github.com/cferdinandi/petfinder-api-for-wordpress) with [petfinderAPI4everybody.js](https://github.com/cferdinandi/petfinderAPI4everybody).

As the names imply, both make it easier for developers to work with the Petfinder API. PFAPI for WordPress required a working knowledge of PHP and plugin development, and required the developer to do a lot of custom development. I also received an email from someone who wanted a custom Petfinder API solution but whose CMS did not allow them to access server-side code.

petfinderAPI4everybody.js is a JavaScript plugin that let's developers focus on writing CSS and markup instead of messing with code. It features:

* A simple templating system with variables to drop API data into any markup structure.
* Asynchronous page loading and cached API data (with an expiration date) in `localStorage` for better performance.
* Full customization of all output text.
* Optional scripts to filter results and toggle between pet images.
* An optional loading indicator, and fallback content for unsupported browsers.

[Check it out on GitHub.](https://github.com/cferdinandi/petfinderAPI4everybody)