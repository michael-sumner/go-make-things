---
title: "How to automate NPM deployment with GitHub action hooks"
date: 2019-03-15T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

One of my biggest annoyances with managing open source projects is publishing to NPM.

I manage dozens of projects. Running `npm publish` after releasing a new version seems like a little thing, but after updating the `package.json` file, running a fresh build, testing everything, updating docs, and commenting on open issues, it's one more detail to mentally worry about.

I always forget to do it, which results in *another* open issue about NPM not having the latest version. As a result, I just stopped supporting NPM for a while.

Here's where automation can be a huge help!

## GitHub Actions

GitHub recently released [a new feature, Actions](https://github.com/features/actions), that let's you automate things whenever you push to GitHub.

*__Note:__ at the time of writing, it's currently in Beta, so you'll need to sign up for the wait list. It took me a couple of months to get access.*

The reason I was personally so excited about this was that it provides a way to automatically push new releases to NPM.

I could finally offer this feature again for people who use my stuff, without the mental overhead that caused me so many issues before.

## Setting up NPM deploy automation

First up, if you don't have an [NPM account](https://www.npmjs.com/), you'll need to create one.

<img alt="The NPM access tokens menu" src="/img/articles/npm-access-tokens.jpg">

Log in to your account, then click on your face and select `Tokens` from the dropdown menu. Once there, click `Create New Token`.

Now head over to the GitHub repository you want to automate. Click `Settings`, then `Secrets`. Click the `Add a new secret link`.

<img alt="The GitHub secrets menu" src="/img/articles/github-secrets.jpg">

Use ` NPM_AUTH_TOKEN` for the `name`, and paste in your NPM token for the `value`. GitHub stores these hashed on their servers does not display them or make them accessible anywhere else.

## Prepping your repository

In the actual repository files for your project, first make sure that you have a `package.json` file.

Double check that  the `name` property matches the project name on NPM (or is available if this will be your first time publishing it), and that there's a proper `version` property, too.

If your project files don't already include a `.github` directory (with leading dot), create one. Inside it, create a file called `main.workflow`.

Open up the file, and copy/paste this into it. Don't forget to save!

```
workflow "publish on release" {
  on = "push"
  resolves = ["publish"]
}

action "publish" {
  uses = "actions/npm@master"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}
```

## Deploying to NPM

Now you're ready to put your GitHub action into, well, action.

Commit your changes and push them up to GitHub.

If the `version` in your `package.json` differs from what's on NPM, it will publish a new version. Otherwise, it will bail and do nothing.

This will run every time you publish to the `master` branch.