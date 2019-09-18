---
title: "Moving from WordPress to a static site generator"
date: 2019-05-09T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
---

Reader [Rich Edmunds](https://www.richedmunds.com/) asked me a handful of really thoughtful questions about migrating from WordPress to a static site generator like Hugo (shared with permission).

> SEO - This is a big one. I use Yoast SEO for all my peace of mind items. I'm open minded, what would you suggest doing instead of using Yoast?

I stopped using Yoast years ago after I discover there's only a few things that really impact SEO and they can be hard-coded in without it. Specifically: page descriptions and tags don't matter at all. "SEO consultants" used to try to game the system by loading up descriptions/meta with keywords, so Google stopped paying attention to them.

Keywords in the title and body copy matter much, much more, as does the URL for the site. Both of these are controlled through other fields anyways, so Yoast has seemed... unnecessary to me?

> Images - I let WordPress handle the image sizes, creation, optimization. What do you use instead of this? Cloudinary?

I resize them and run them through [ImageOptim](/a-web-based-image-optimizer/) on my computer before adding them to the site.

I don't use any service for this. Relying on WP for this, by the way, is why WP sites often swell in size. When I moved off of a wordpress my media directory was a hot mess of the same image in 5 different sizes taking up absurd amounts of space on my server.

> URL's - How easy is Hugo with friendly customizable URL's?

Incredibly easy. It's as simple as [adding a line to your configuration file](https://gohugo.io/content-management/urls/#permalinks-configuration-example).

> Admin - The other links you pointed to [Forestry](https://forestry.io/), is that admin interface easier to find pages, custom post types, etc? Client friendly more or less than WordPress?

I suppose it depends on the sophistication of your clients.

It has less going on, which I think makes it easier for less tech savvy clients. Forestry can build a preview for you, but [Netlify also has a really nice live preview pane](https://www.netlifycms.org/) while you type in real time (I think, it's been a while since I've used it).

> Plugins - This is the fear of why I stay in WordPress. Being a freelancer / developer I'm asked to do things outside of my limits such as calendaring, booking, ecommerce etc with limited budget. A plugin helps me here. Should I put the fear aside and turn down those projects until I can do custom anything with Hugo?
>
> A shopping cart sounds super intimidating and I worry about doing it correctly, security etc. What would you suggest for this? Shopify?

A lot of this depends on the client and what they need and want.

There are JS plugins for a lot of the things you would previously have used a WP plugin for. There is [a well-regarded calendar plugin](https://fullcalendar.io/). [Snipcart](https://snipcart.com/) provides store functionality. I use [Calendly](https://calendly.com/) for scheduling/booking.

But to be honest, sometimes I run little isolated WP installs just for things like this.

My `/checkout` page is a WordPress site skinned to look like the rest of my portal. The [PAWS New England donate page](https://pawsnewengland.com/donate) is powered by WP, even though the rest of the site runs on Hugo. I use PHP's `file_contents()` function to automatically pull in headers and footers (and stylesheets, etc.) into the WP files without having to recreate all of the CSS in a WP theme.