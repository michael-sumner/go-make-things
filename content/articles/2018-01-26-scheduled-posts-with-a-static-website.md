---
title: "How to schedule posts with a static website"
date: 2018-01-26T10:30:00-05:00
draft: false
categories:
- Code
- Web Performance
- WordPress
---

Yesterday, we looked at [how to automatically deploy updates to your static website using GitHub](/automating-the-deployment-of-your-static-site-with-hugo-and-github/).

Today, I'll show you how you can schedule posts in advance and have them automatically go live sometime in the future.

## Two quick updates from yesterday's article

I missed a step in yesterday's post. For your server to be able to talk to GitHub, you should [add an SSH key](/automating-the-deployment-of-your-static-site-with-hugo-and-github/#2a-update-add-an-ssh-key-to-your-server).

One of my readers also reminded me that in addition to Netlify, you can also [use GitHub pages to host your site](https://gohugo.io/hosting-and-deployment/hosting-on-github/).

However, if you want a custom domain *and* and SSL cert, there's no easy way to do that on GitHub. Netlify provides a free SSL certificate for you.

## How to schedule posts with a static website

In Hugo (and Jekyll and most other static generators), you can set a publish date and time.

When Hugo runs its build, it only creates HTML files for content that has a publish date for sometime at or before the current date and time (as in, future-dated stuff won't get built).

All that work we did yesterday to have our server run our build? It's going to come in really handy now.

## Scheduling builds on our server

We can tell our server to run a fresh build at set intervals.

You might rebuild your site files once a day. Or twice. Or once an hour. This is on top of the automatic rebuilding that happens when you push an update to GitHub.

For example, I publish a new article each day at 10:30am. I can tell my server to run a new build every hour at the 40 minute mark. When it does, any article whose publish date is now in the past gets created and goes live on the site.

To do this, we need to set up what's called a *cron job*.

### Creating a cron job

Log in to your server, and run `crontab -e`.

This will pull up an editor where you can configure your cron jobs. Cron jobs follow this pattern:

```bash
<minute> <hour> <day of the month> <month> <day of the week> <commands to run>
```

For example, this would run a command every minute:

```bash
* * * * *
```

And this would run a command on the 31st minute of every hour:

```bash
31 * * * *
```

This would run a command at 10:30am every day:

```bash
30 10 * * *
```

On my server, I want to run a fresh build on the 31 minute mark of every hour. Here's the command I use. Make sure you change `<APP_NAME>` to the name of your app directory.

```bash
31 * * * * cd /srv/users/serverpilot/apps/<APP_NAME>/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/<APP_NAME>/build/public/. /srv/users/serverpilot/apps/<APP_NAME>/public
```

The command part of this cron job tells the server to go into our app's `/build` directory and run the `hugo` command, rebuilding our site.

Then, it copies all of the files in the `/build/public` directory (where Hugo renders the build by default) over to our `/public` repository, make them available on the live site.

Once you've pasted that in, press `control+X` to quit, and `S` to save. Hit enter to overwrite the current file.

Now, you can write scheduled posts and your server will automatically publish them when it's time to go live.