---
title: "How I setup and configure all of my websites"
date: 2021-08-18T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

I maintain about a dozen different coding related websites, including [GoMakeThings.com](https://gomakethings.com), my [Vanilla JS Pocket Guides](https://vanillajsguides.com), the [Vanilla JS Academy](https://vanillajsacademy.com), the [Vanilla JS Podcast](https://vanillajspodcast.com), and the [Vanilla JS Toolkit](https://vanillajstoolkit.com).

I've also got a few other hobby sites, including one for my D&D campaigns, and a site for a rules-light TTRPG I made called [Kitchen Table Adventure](https://kitchentableadventure.com).

I've had a few folks over the last few months ask me what my tech stack looks like, and how I manage all of the sites, so that's what we're talking about today. Let's dig in!

## Hosting

All of my sites are hosted on a single $5 a month [DigitalOcean](https://www.digitalocean.com/) droplet.

They're weirdly secretive about whether or not their hosting is green, which of course means it's generally not. Some data centers of theirs use green power, but many do not. I'd love to either switch providers, or more ideally, see their hosting shift to more renewable energy in the future.

I use [ServerPilot](https://serverpilot.io/) to more easily handle adding new "apps" or sites to the droplet, and sorting out routing for me.

ServerPilot surfaces a GUI you can use to setup different sites and link domains on a DigitalOcean droplet. It also adds some security, and adds an nginx layer on top of the apache hosting, installs a LAMP stack, and automatically keeps things up-to-date.

I'm fortunate enough to be on a legacy free plan which they no longer offer, but they're relatively affordable even now.

## CMS

My sites are all powered by [Hugo](https://gohugo.io/), a static site generator (or SSG).

All of my pages are authored in markdown, which get merged with some HTML templates and rendered into flat HTML files. This dramatically reduces the load on my servers, and is a big part of how I'm able to run a dozen sites on a single, inexpensive server.

If you want to play around with Hugo, [here's a starter template I built](https://github.com/cferdinandi/hugo-starter).

New kid on the block [11ty](https://www.11ty.dev/) is a bit more flexible, but didn't exist when I started and I'm too entrenched in Hugo now. I also don't want to bother messing around with Node on my servers.

I technically have no CMS.

I create a new markdown file for each article, save it, and then push it to GitHub. A webhook then triggers an automated deploy process on my server. [I wrote about how that works here.](/automating-the-deployment-of-your-static-site-with-hugo-and-github/) I also [use cron tasks on my server to manage scheduled posts](/how-to-schedule-posts-with-a-static-website/).

## Design System

I have a directory on my computer with my own design system, including CSS and JavaScript snippets. I use my own [Build Tool Boilerplate](https://github.com/cferdinandi/build-tool-boilerplate) to manage it.

I import the design system into each of my projects to keep the design consistent. Whenever I update it, I have a command line thing I can run to push it to all of my projects and update them in one swoop.

## The Newsletter

My newsletter is powered by [Mailchimp](https://mailchimp.com/).

They've made their offering a lot more confusing over the years, but they're relatively inexpensive (or were, before my list grew over 10k people), reliable, and I've been using them forever.

I'm lazy AF, so my emails start off as blog posts I write in markdown. This makes syntax highlighting code really easy. Hugo hard-codes it into the HTML.

I use Mailchimp's RSS-to-Email feature to turn each daily blog post into an email, so this happens automatically each day.

## An API for marketing messages

I sell educational stuff, and when I make new stuff, I like to let people know about it.

But manually updating a dozen sites is time consuming, error prone, and annoying. So, I created a "marketing API," a JSON file with calls-to-action, adjusted pricing info, testimonials, and even my current "about me" information.

When Hugo runs a build, it uses its built-in API fetching feature to get the file and use the content to generate some HTML.

I also use Hugo itself to generate the file from some YAML files, which allows me to setup start-and-end dates for sales messages in advance. Then, the system just automates itself away.

I've done the same thing for messages in my newsletter. I have a special "just for Mailchimp" RSS feed that includes marketing messages for subscribers, including Mailchimp's `if...else` logic syntax so I can customize messages based on what someone's already purchased.

## Checkout

My actual checkout process is handled by the [Easy Digital Downloads](https://easydigitaldownloads.com/) plugin for WordPress (the only not-Hugo part of my setup).

This lets me not worry about how to integrate with Stripe or PayPal. I can use WordPress's custom REST API feature to get a list of purchases for a specific customer and give them access to the stuff they've purchased in my student portal.

I've customized the UI for it a bit to make the process a bit more streamlined.

## Overview

So, just to recap...

- DigitalOcean for hosting, with ServerPilot for server management
- Hugo for generating my HTML
- Mailchimp for email
- Easy Digital Downloads and WordPress for checkout

If you have specific questions about anything, though, let me know!