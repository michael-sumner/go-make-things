---
title: Dependency hell
date: 2023-04-18T10:30:00-04:00
draft: false
---

Last week, one of my students went on a bit of a rant about legacy projects and the utter hell that is dependency management. It's so incredibly on point, and they agreed to let me share with you...

> This is so ridiculous: every other legacy project (4-5 years old) on GitHub is completely unusable because of dependencies version hell.
>
> You download the project to follow an older tutorial, run `npm install` and spend the next 2 days doing crazy movements trying to resolve the project dependencies conflicts.
> 
> Your node is too new, so it doesn't work with the version `gulp-sass`. 
> 
> OK. You get `nvm` and install the local version of node/npm (your best bet), then the `gulp-sass`'s own dependency doesn't work with that particular downgraded version of npm.
> 
> You downgrade/upgrade again, just to find out that the whole thing doesn't work with that particular version of gulp. And to upgrade to gulp version 3 you need to rewrite part of gulp config.
> 
> And also a part of the build is bundled with the older version of babel and webpack, and you don't even start to comprehend how to resolve those. 
> 
> You install something really weird using Homebrew on your machine because someone smart-looking recommended it on StackOverflow for that error, or maybe it was a different error... 
> 
> You don't even have a chance to look at JS (sorry TS) of the actual project yet, there is no time---you're just trying to get something to show in your browser without a million errors.

The dependency issues described here can plague even relatively newish projects that you actively manage.

A few years ago, I would run into this any time I'd go to touch one of my open source projects after a few months. I'd spend two hours trying to debug Gulp issues just to change a line or two of CSS and run a new build.

It's why I switched to [a smaller build setup a few years ago that mostly just uses NPM scripts](/my-build-tool-boilerplate-goes-v2/).

Just like with front end libraries, some build tools can be helpful, but too many create a nightmare to maintain in the long run, even when they help in the short term.