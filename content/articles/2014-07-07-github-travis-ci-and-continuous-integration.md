---
categories:
- Code
date: '2014-07-07'
title: GitHub, Travis CI, and Continuous Integration
---

As part of my [move over to Gulp](/getting-started-with-gulp-js/) for web development, I added [Travis CI](https://travis-ci.org/) and unit testing with [Jasmine](http://jasmine.github.io/2.0/introduction.html).

Jasmine (and unit testing in general) lets you set up a variety of tests to check that each method and component in a script does what it's supposed to. Travis CI runs your [Node.js build process](http://nodejs.org/), including those tests, each time you submit a push to GitHub and makes sure there are no errors.

This helps me catch errors I might otherwise not notice, but it really shines when working with open source projects. Whenever I get a pull request, it now includes a status from Travis CI telling me if the build passes or not. This makes it a lot easier for me to test and verify the work that others submit.

<img src="https://gomakethings.com/wp-content/uploads/2014/07/travis-status.png" alt="A screenshot of the Travis CI status message on a GitHub pull request" width="781" height="134" class="aligncenter size-full wp-image-5471" />

<!--more-->

## Getting started with Travis CI

Already using Node as part of your build process? Getting started with Travis CI is easy. Head over to the site, login with your GitHub credentials, and activate the script you want to test.

Then in your repository, add a file labeled `.travis.yml` (with the leading dot) and add this content:

```
language: node_js
node_js:
  - "0.11"
  - "0.10"
before_script:
  - npm install -g gulp
script: gulp
```

Push your repository up to GitHub, and Travis CI automatically goes to work. You'll get an email letting you know if the build passed or failed.

### Other programming languages and setups

If you're not already using Node as part of your development process, you might want to check out my post on [getting started with Gulp](/getting-started-with-gulp-js/).

Travis CI also [supports a bunch of other popular languages](http://docs.travis-ci.com/user/getting-started/), include Ruby, PHP, Python and more.