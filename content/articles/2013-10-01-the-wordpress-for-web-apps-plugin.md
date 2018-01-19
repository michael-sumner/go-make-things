---
categories:
- Code
- Design &amp; UX
date: '2013-10-01'
title: The WordPress for Web Apps Plugin
---

I just released <a href="http://cferdinandi.github.io/web-app-starter-kit/">WordPress for Web Apps 3</a>.

WordPress for Web Apps provides the essential components you need to power your web app with WordPress:

<ul>
<li>Front-end login, sign-up, password reset, and password change forms.</li>
<li>Separate navigation menus for logged-in and logged-out users.</li>
<li>User access settings, so you can selectively hide content from logged-out (or logged-in) users.</li>
<li>Security settings let you set password requirements, hide the admin bar, and block backend access.</li>
<li>The web app settings panel lets you easily configure error messages, button text, and more.</li>
</ul>

<p>So what's new in version 3?
<!--more--></p>

<h2>Now a Plugin</h2>

WordPress for Web Apps has historically been a collection of templates and functions that you would include in your theme. In version 3, it's now a plugin.

My thinking on plugins versus theme-specific functions has evolved a lot over the last month. This is a direct reaction to my belief that <a href="https://gomakethings.com/wordpress-plugins-vs-functions/">data and functionality should be persistent</a> even when themes change.

<h2>Better UX</h2>

Some of the WordPress defaults for account creation and management don't provide the greatest user experience.

<h3>Logins</h3>

By default, WordPress only allows users to login with their username. WordPress for Web Apps let's users also use their email address, so if they forget their username, they can still access the app.

<h3>Signups</h3>

The old signup process required users to choose a username and provide an email address. WordPress then generated a password for them and emailed it in plain text. Not only does that add friction to the signup process, but it's not terribly good for security, either.

WordPress for Web Apps 3 let's users pick their own password, and then immediately logs them into the app.

<h3>Password Resets</h3>

When a user forgets their password, the old toolkit would send them an email with a link. When users clicked the link, it generated a new password and emailed it to them&mdash;again in plain text.

In WordPress for Web Apps 3, users still get a reset email, but when they click it, they get to choose their own new password, and after saving their changes, their immediately logged in. Password reset URLs are unique to the user, and only good for 24 hours by default. After a password is reset, the link becomes invalid so it can't be used again by someone else to hack into an account.

This all makes for a more secure app <em>and</em> a better user experience.

<h2>Web App Settings</h2>

Developers no longer have to dig through lines of code to make simple updates. WordPress for Web Apps 3 has a settings page you can use to control most of the essentials.

If you don't want to mess around with settings, that's ok. WordPress for Web Apps includes a bunch of smart defaults so you don't have to.

But if you want more control, you've got it. The "Web App Options" page in the admin dashboard makes it easy to customize and control password requirements, button text and styling, alert messages and more.

This was as much a change for me as it was for others. Digging through code to change a simple alert message is a pain.

<h2>Navigation</h2>

The old toolkit required developers to add code to their theme template files to serve different navigation elements to logged-in and logged-out users. WordPress for Web Apps 3 hooks into the <code>wp_nav_menu()</code> function so that you can create unique navigation menus from the Admin dashboard.

It also let's you use simple shortcodes to display the current user's username and provide logged-in users with a logout link.

<h2>Theming</h2>

Like most of the add-ons for <a href="http://cferdinandi.github.io/kraken/">Kraken</a>, WordPress for Web Apps 3 is style agnostic. Forms, links and buttons will pick up your default theme styles, so you don't have to waste time removing or overriding someone else's design choices.

You can add classes to buttons and alerts in the settings, and each form has a <code>.form-wpwebapp</code> class on it that you can hook into for more specific styling if needed. And if you know your way around code, you can still dig into the plugin and make some additional changes.

<h2>Security &amp; Code</h2>

The previous versions of WordPress for Web Apps included a lot of code that I had cobbled together from blogs and Stack Overflow threads.

The forms used inconsistent markup and different validation methods. There was redundancy in a lot of the code, and even a few deprecated functions. And for a few folks, if the forms were included before the loop, they wouldn't work properly.

In version 3, I've rewritten all of the code from scratch. It includes the latest functions and methods, including a security check to make sure form requests are originated from your site and not somewhere else. All of the form inputs are validated before going into the database, and properly escaped before being displayed on the site. And, everything is translation ready for easy internationalization.

<h2>What's next?</h2>

In the next iteration of this plugin, I plan to:

<ul>
<li>Let admin customize "password reset" and "welcome message" emails in the settings panel.</li>
<li>Add a front-end "Delete Account" button.</li>
<li>Add "Update Profile" options for front-end for users.</li>
<li>Add an option to restrict signups to only selected email addresses (for private sites or betas).</li>
<li>Add Gravatar shortcode for user profiles.</li>
<li>Add an option to set default user access for pages (currently defaults to all users).</li>
</ul>

All-in-all, I think WordPress for Web Apps 3 is a huge leap forward over the old version. Check it out for your next project, and if you've used older versions, you might want to consider upgrading.

<a class="btn" href="http://cferdinandi.github.io/web-app-starter-kit/">Download it on Github</a>