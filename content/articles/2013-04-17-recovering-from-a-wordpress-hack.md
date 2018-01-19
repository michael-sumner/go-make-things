---
categories:
- Code
date: '2013-04-17'
permalink: /recovering-from-a-wordpress-hack/
title: Recovering from a WordPress hack
url: /2013/04/17/recovering-from-a-wordpress-hack
---

Over the weekend, I noticed that links for "Secure Payday Loan" where briefly being displayed next to my navigation links. On page reload, they disappeared.

Turns out a lot of other WordPress users who host on GoDaddy were seeing the same issue. It looks like some databases on shared hosting may have been compromised.

Repairing the damage took me about two hours. Here's how I fixed it...
<!--more-->
<h2>How the Hack Worked</h2>

Based on what I read on the WordPress support forums, hackers gained access to WordPress databases on GoDaddy shared hosting. From there, they were able to create admin users and gain access to the site itself.

They added a PHP script to the site's <code>functions.php</code> file that would add hidden links in the header to a spam site as a way of generating SEO. The links are typically only visible to search engine bots, so site owners often won't even realize they're there.

I discovered them after a reader noticed them briefly while visiting the site. Then, the Twitter iPhone app browser displayed them (just once) when I was looking at my site.

If you want to check if you've been infected, open up your <code>functions.php</code> file and look for a long, suspicious string of code that starts with <code class="language-php">function callbackx</code>. It will probably be at the top of the file.

<h2>Backups</h2>

I use the <a href="http://austinmatzko.com/wordpress-plugins/wp-db-backup/">WordPress Database Backup plugin</a> to run weekly backups of my database.

Since this seemed to be a database compromise that could have gone back many months, I decided to instead wipe out my site completely and install a fresh version of WordPress, database and all. I was worried that hackers could have added malicious files or alternate access points into the database itself.

<h3>Exporting Your Files</h3>

Using the built-in Export tool, I exported all of my posts as an XML file.

Then, I accessed my server by FTP and my Uploads folder (under WP Content) to my desktop. This is where all of the images I upload to posts are saved. I scanned each folder for any files that were not image files. Fortunately, none existed.

<h3>Plugins</h3>

I also took note of all of the few plugins I use, so I wouldn't miss any on the reinstall. These could have been compromised or editted, too, so they'll need to be reinstalled from scratch.

<h3>Your Theme</h3>

I use GitHub to version control my site, so I already had a local copy of the latest version of my theme.

I hope you do, too, because the hackers edited theme files. You'll want to install a fresh, clean copy of your theme. Don't just download the version that's currently on your server. It has malicious code in it.

<h2>Delete WordPress</h2>

Before you do this, make sure you've saved copies of your posts and Uploads folder to your computer.

Log in to GoDaddy. Under All Products > My Account, select Web Hosting and click "Launch". On the page, there's an "Options & Settings" heading, and below that "Popular Apps". Click the "Show all" link. Under "My Management" in the right-hand sidebar, select "Manage My Applications" (they really make this difficult!).

Find your WordPress site from the list, and click either "View and manage details" or "Update Now," depending on how recently you've updated your core files. Click "Uninstall Application" and follow the on-screen instructions. GoDaddy will uninstall your WordPress installation, including your database.

For good measure, you should also log in to your server by FTP and delete the entire directory for your site.

<h2>Reinstall WordPress</h2>

Once the uninstall is complete, you can reinstall WordPress. Go back to the "Popular Applications" page and select WordPress. Click "Install Now," and follow the on-screen instructions to get setup.

I would recommend using new names and passwords for both your database and admin account. I would also change your FTP password at this time.

GoDaddy will send you an email when WordPress has been reinstalled. It usually only takes a few minutes.

<h2>Getting Setup</h2>

Once WordPress has been reinstalled, login to your admin panel.

There's a few things you'll need to do:

<ul>
<li>Under "Settings," you'll want to update things like Timezone settings, permalink structure, and so on to match your previous setup. You should also click on your Profile under users and make sure your information is setup the way you want.</li>
<li>Open up your site in your FTP client and copy your Uploads folder back under the WP Content folder. This will ensure that any photos in your blog posts still work.</li>
<li>Under "Tools," select "Import" and install the WordPress import plugin. Once it's installed, select your exported posts XML file and run the importer. Attribute all posts to your new admin user name.</li>
<li>Upload a fresh copy of your theme and activate it.</li>
</ul>

This whole process took me about an hour or two. It's a pain, but it was worth it to ensure that my site was complete protected.
