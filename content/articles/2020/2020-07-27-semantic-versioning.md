---
title: "Semantic versioning"
date: 2020-07-27T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

In programming, a very popular way of versioning is code is *semantic versioning*, sometimes called *semver*.

It's a powerful way to communicate what's new about a code update through version number alone. But, it can be confusing, in large part because many developers use it incorrectly.

Let's quickly breakdown how semantic versioning works.

## major.minor.patch

Semantic versioning uses a `major.minor.patch` pattern.

If a piece code was version `4.2.1`, `4` would be the *major* version, `2` would be the minor version, and `1` would be the patch.

[The semantic versioning website](https://semver.org/) defines them like this:

> 1. MAJOR version when you make incompatible API changes,
> 2. MINOR version when you add functionality in a backwards compatible manner, and
> 3. PATCH version when you make backwards compatible bug fixes.

That works, but I tend to mentally think of them a bit differently.

## breaking.feature.fix

This is literally the same thing as the real definitions above, but it's how I wrap my brain around semantic versioning.

1. A **major** version bump breaks the existing code base's backwards compatibility.
2. A **minor** version bump adds one or more new features.
3. A **patch** version bump fixes bugs or security issues.

## Pick the highest version type that applies

Let's say the current version of your code base is `4.2.1`.

You push a release that adds new features but *also* breaks backwards compatibility. What's the new version number?

With semantic versioning, it should be `5.0.0`, because it's a breaking change. Yes, it adds new features, but you only increase the highest version type.

From a strategic perspective, if you're implementing bug fixes but *also* want to implement some breaking changes, it might make sense to issue two releases.

1. Release a *patch* bug fix update first...
2. Then add breaking changes and release a *major* version bump.

I personally think it's ok to tie new features to a breaking major version bump, though.