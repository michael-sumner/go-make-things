---
title: "Building low impact websites"
date: 2018-10-16T10:30:00-04:00
draft: false
categories:
- Art and Science
- Business and Leadership
- Technology
- Web Performance
---

Yesterday, I wrote a bit about how [the web is actually an obnoxiously slow place](/the-web-is-actually-really-slow/) considering how fast our internet speeds have gotten.

Today, I wanted to talk about why it's so important that we start building lower impact web experiences.

## Server farms use a *lot* of energy

As our use of the web has exploded, so have the number of servers we use to store all of that data.

In 2014, [the world's server farms used 70 billion killowatt hours of electricity](https://www.datacenterknowledge.com/archives/2016/06/27/heres-how-much-energy-all-us-data-centers-consume). [Forbes puts that number in context:](https://www.forbes.com/sites/christopherhelman/2016/06/28/how-much-electricity-does-it-take-to-run-the-internet/)

> To generate 70 billion kwh you’d need power plants with a baseload capacity of 8,000 megawatts — equivalent to about 8 big nuclear reactors, or [twice the output of all the nation’s solar panels](https://www.eia.gov/electricity/monthly/epm_table_grapher.cfm?t=epmt_1_01_a).

But that was four years ago.

In 2016, server farms accounted for 3-percent of the global electricity use and 2-percent of global emissions, [giving it the same footprint as the airline industry](https://www.independent.co.uk/environment/global-warming-data-centres-to-consume-three-times-as-much-energy-in-next-decade-experts-warn-a6830086.html). Last year, scientists predicted that [server farm energy consumption would triple by 2025](https://www.theguardian.com/environment/2017/dec/11/tsunami-of-data-could-consume-fifth-global-electricity-by-2025).

Oh, and scientists are also saying [we have just 12 years to get global warming in check](https://www.theguardian.com/environment/2018/oct/08/global-warming-must-not-exceed-15c-warns-landmark-un-report) before things go from really bad to catastrophic.

A low-impact web is a moral issue.

## What you can do to build more sustainable websites

So, what can you do about it?

1. Use fewer servers for the same data.
2. Use static HTML sites instead of dynamic, real-time ones.
3. Ask your web host to use more renewable energy.

Let's unpack these.

### 1. Use fewer servers

I *love* [DigitalOcean](https://www.digitalocean.com/). Their servers are affordable, fast, and very customizable.

But, their model encourages you to buy one for every site you host. They're only $5 a month, after all!

Instead, I host every single site I manage on a single DigialOcean droplet. I use [ServerPilot](https://serverpilot.io/) to make it easier to install multiple sites, manage installed resources, and handle the routing stuff for me.

### 2. Use static HTML sites

WordPress is cool, but it's also a resource hog.

Every time someone visits your site, WordPress grabs your content from the database, mashes it into your templates, renders out some HTML, and sends it down the pipe. All of that dynamic content generation is computationally demanding.

Last year, I switched to [Hugo](/static-websites/).

My sites load *way* faster now, and they use a fraction of the server resources they did before. This makes hosting everything on a single DigitalOcean droplet a lot more feasible, by the way.

I cannot recommend doing this enough. Static sites are awesome!

### 3. Ask your host to use more renewable energy sources

This is an area where DigitalOcean is very opaque.

[People have asked.](https://www.digitalocean.com/community/questions/are-droplets-powered-with-green-energy) They have not really answered. Which probably tells you everything you need to know.

This is an issue with the entire electrical grid, not just your web host. But encouraging them to use more renewable sources of energy is not a bad idea.