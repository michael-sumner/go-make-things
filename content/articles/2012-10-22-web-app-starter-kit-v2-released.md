---
categories:
- Code
- Technology
date: '2012-10-22'
excerpt: The Web App Starter Kit is a free set of tools for using WordPress to power your web app.
permalink: /web-app-starter-kit-v2-released/
title: Web App Starter Kit v2 Released
url: /2012/10/22/web-app-starter-kit-v2-released
---

Last week, I pushed out an update to the <a href="http://cferdinandi.github.com/go-mobile-first/">Web App Starter Kit</a>.

<h2>What's New in Version 2?</h2>

<strong>Favorite Lists Bug Fix.</strong> I fixed a small bug in the Favorite Posts list. The first value in the array was empty, which was causing the Favorite Posts page itself to show up in the list. This has been fixed.

<strong>Failed Login Redirect.</strong> When a user has login errors, WordPress redirects them to the backend by default. In Version 1, I got around this by using javascript, but this wouldn't work if the user had javascript disabled. I've added a plugin that redirects users back to the login page (with an error message) without javascript.

<strong>No Admin Panel Access.</strong> In version 1, if a user knew the app was powered by WordPress they could access a very limited view of the admin panel by visiting YourWebsiteURL.com/wp-admin. It wouldn't cause any damage, but it breaks the user experience. Version 2 features a plugin to prevent users from accessing the admin panel. One side-effect: if you're not logged in, you can't access the admin panel either - even to login. To sign in to your site, visit YourWebsiteURL.com/wp-login.php instead. It will redirect you to the admin panel after login.

<strong>More Recommended Third-Party Plugins.</strong> I've beefed up the list of recommended third-party plugins. There's a lot of great stuff out there.

Download the <a href="http://cferdinandi.github.com/go-mobile-first/">Web App Starter Kit</a> today.