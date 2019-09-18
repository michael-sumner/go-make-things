---
categories:
- Accessibility
- Design and UX
date: '2012-11-07'
excerpt: Mobile first explained in plain, practical terms
url: /wtf-is-mobile-first/
title: WTF is Mobile First?
---

Mobile First is starting to achieve a buzzword like status, much in the same way that web 2.0 and HTML5 did. And that's a shame, because mobile first is actually really awesome.

Today, I want to cut through the crap and explain mobile first in plain, practical terms.

<!--more-->

<h2>Ubiquity & Diversity</h2>

Right now is an insanely exciting time to be making things for the web. Internet access is virtually ubiquitous, and for a large and rapidly growing percentage of people, the internet is something you rarely or never access on a computer.

Obviously, people are browsing the web on tablets and smart phones. But they're also browsing on gaming consoles like X-Box and Gameboy, on web-enabled TVs, and on older or not-so-smart phones. I've even heard of folks using the Kindle e-ink browser to do things like send emails and read on the web.

Screen sizes, device capabilities, and user contexts all vary wildly. Your job is to make sure everyone who wants to can access your content.

<h2>Responsive Web Design</h2>

Over the last couple of years, Responsive Web Design (RWD) has emerged as a way to deal with the growing device diversity.

Rather than building a separate mobile site, your existing design "responds" to device that's accessing it, adjusting to accomodate the user. Content shifts and flows. On a small screen, the site may be a single column. On a big desktop monitor or TV, it can be many columns wide. On tablets, somewhere in between.

The more nitpicky folks in the web community will tell you that Responsive designs need to have fully fluid columns, while fixed-width columns that simply move or stack on top of each other are called Adapative design. It's generally agreed upon now that Adaptive is a type of RWD.

The goal, however, is always to provide the same content regardless of the device.

<h2>Mobile First is a type of Responsive Web Design</h2>

Responsive Web Design isn't always mobile first, but Mobile First is always Responsive.

Many RWD approaches use what's known as graceful degradation. With this approach, you build your normal "desktop first" design (often a 960 pixel or so grid), and then use media queries to set maximum widths below which content shifts and reflows. The previous layout for this site used that approach.

The problem with this approach is that not all mobile devices are smart phones. They're not all very fast or capable. They sometimes don't recognize media queries. And so that beautiful bit of "content choreography" you use for mobile sites? They're not seeing it.

Enter Mobile First.

<h2>Don't gracefully degrade. Progressively enhance.</h2>

Mobile First takes the opposite approach of graceful degradation. Instead of building a desktop site and retrofitting it to mobile devices, you build a really simple foundation and then add features for devices that can support them.

Mobile first sites start with a single column, fully fluid layout and use minimum widths to add columns (instead of maximum widths to take them away). They work on devices that don't have or support javascript.

They're not always beautiful, but they're functional.

<h2>It's not just looks</h2>

You can't design mobile first without caring about <a href="https://gomakethings.com/how-to-trick-out-the-performance-of-your-wordpress-site/">web performance</a>. Your content is being accessed on weak cell phone signals, not just high-speed broadband.

Sites should be as lightweight and fast as possible. You should combine your javascript and CSS into single files whenever possible. You should use image sprites and icon fonts, smush your image files, and make sensible choices about which file formats to use. You should minify and compress your files.

This doesn't just benefit your mobile users. It benefits everyone. No one likes a slow website.

<h2>Getting Started</h2>

I'll be honest: I don't sit down and sketch out the mobile layout before I sketch the desktop layout. It's more fluid than that.

I usually sketch them both out at the same time, and one design feeds the other. But the important thing is that you're always thinking about how to the design would work on a tiny flip-phone in the middle of the desert.

When I go to code, I start with the base styles that would apply to a very basic device. That means a single, fluid column with no javascript. On bigger screens, I'll increase the line height for easier reading. I'll increase header sizes. I'll add multiple columns, and <a href="https://gomakethings.com/accessible-javascript/">functionality for devices that support javascript</a>.

To see a very simple Mobile First site in action, download my <a href="https://gomakethings.com/go-mobile-first/">Go Mobile First</a> WordPress them and start poking around under the hood.

<h4> Referenced & Useful Resources</h4>

<ol>
<li><a href="https://gomakethings.com/how-to-trick-out-the-performance-of-your-wordpress-site/">How to improve web performance</a></li>
<li><a href="https://gomakethings.com/accessible-javascript/">Javascript accessibility</a></li>
<li><a href="https://gomakethings.com/go-mobile-first/">The Go Mobile First WordPress theme</a></li>
<li><a href="https://gomakethings.com/icon-fonts/">Using icon fonts</a></li>
<li><a href="http://bradfrostweb.com/blog/mobile/the-many-faces-of-mobile-first/">The Many Face of Mobile First</a> by Brad Frost</li>
<li>The <a href="http://www.abookapart.com/products/mobile-first">Mobile First book</a> on A Book Apart</li>
</ol>