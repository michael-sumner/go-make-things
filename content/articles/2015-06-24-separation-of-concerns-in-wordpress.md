---
categories:
- Code
- Design &amp; UX
- WordPress
date: '2015-06-24'
permalink: /separation-of-concerns-in-wordpress/
title: Separation of concerns in WordPress
url: /2015/06/24/separation-of-concerns-in-wordpress
---

One of things that I absolutely hate to see when picking up a WordPress project for an existing site is a theme that has all of the site's functionality baked in.

That sounds like it would be great for the client, right? It's not.

<!--more-->

<h2>WordPress is modular</h2>

One of the things that makes WordPress so powerful is how modular it is.

You can modify the core functionality without every touching the core code, which lets you updates to new versions freely without breaking your modifications. You can extend plugins with other plugins. You add custom content categories and meta data. You can build a frickin' app.

When building a custom site with lots of rich content, baking all of that awesomeness into a theme is bad for the client. It breaks the modularity of WordPress.

<h2>Don't lock your clients into a theme</h2>

WordPress themes represent the specific implementation of a specific design. What happens to custom post types that are part of your theme's <code>functions.php</code> file when the client decides to do a redesign in two years?

Anything that might have a life beyond the  current design belongs in a plugin.

Custom post types? Plugin. Replacing the default RSS feed with a Feedburner URL? Plugin. Custom post fields? Plugin. Google Analytics? Plugin.

<h2>Isn't this a lot more work than just delivering a theme file?</h2>

Yes, it is. It means you'll end up with a ton of plugins, and it means a bit more work getting your client set up.

But it also means that you or your client can freely swap out themes and add and remove functionality without having to untangle a web of files from their theme first. It means that when they redesign their site, their custom post types don't magically disappear from the admin.

It's how WordPress is meant to work, and if this is the platform you're building your site on, you should adhere to the norms and conventions of the platform. It's better for your clients, and it's better for other developers that end up working on the site.