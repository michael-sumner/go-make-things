---
title: "Automating the deployment of your static site with Hugo and GitHub"
date: 2018-01-25T10:30:00-05:00
draft: false
categories:
- Code
- Web Performance
- WordPress
---

Before I [made the switch to a static website](/static-websites/), one of the things that really stopped me from trying it was the deployment process.

WordPress is easy. You open an app in your browser, write, and hit publish.

I dreaded the idea of having to open an FTP client and push static files up to a server. And while I don't often make updates from my phone or while traveling, I didn't like the idea of *needing* my laptop to make updates.

Then [Zach Leatherman](https://www.zachleat.com/web/), creator of [Eleventy](https://11ty.io/), tipped me off to automatic deployments. It was a game changer.

Today, I want to show you how I set that up (your setup may differ depending on hosting).

## How does automatic deployment work?

After I make updates, I push my changes to GitHub.

I use command line, but they also have a fantastic GUI, and there are some great third party options and text editor integrations you could use instead, too.

Whenever I push an update in my websites master branch in GitHub, it notifies my server through something called a *webhook*. My server pulls the latest version of my site from GitHub, runs a Hugo build, and moves the built files into my live site directory.

### A side benefit: GitHub is now a web GUI for my content

Let's say I'm away from my laptop and I need to make an update or someone notices a bug on my site.

I can now open the content file on GitHub.com from any browser and make my updates. As soon as I commit and push the file, it triggers a rebuild and automatically updates the site.

## The easy way

If you have really basic needs for your new static site, I cannot recommend [Netlify](https://www.netlify.com/) enough.

When you setup your site, you give them access to your GitHub site. They automatically configure the integration I described above for you.

They also offer [a more proper CMS](https://www.netlifycms.org/) for managing your content. Unlike a traditional CMS that communicates with a database, they use the GitHub API to pull and modify your content (I think).

## The hard way (what I do)

I have some custom server things I need to do, so I do things *the hard way*.

This does require some command line skills in addition to using an FTP client, so it might not be the best approach if command line isn't your thing.

### 0. Hosting environment

I use [DigitalOcean](https://m.do.co/c/08a079d9bd9a) (get $10 in credits to try them with that link) for my hosting, and [ServerPilot](https://serverpilot.io/) to automate setting up apps, handle my tech stack and security layer, and automate domain routing.

Your server environment might work a bit different from mine, so just be aware that these instructions are specific to how DigitalOcean is set up.

### 1. Install Hugo on the server

I followed [DigitalOcean's instructions for installing Hugo](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-hugo-a-static-site-generator-on-ubuntu-14-04).

Their tutorial includes a *very* old version of Hugo. Make sure you [grab the latest version from their releases page instead](https://github.com/gohugoio/hugo/releases).

```bash
# DON'T use this
wget https://github.com/spf13/hugo/releases/download/v0.14/hugo_0.14_amd64.deb

# Use something LIKE this instead
wget https://github.com/gohugoio/hugo/releases/download/v0.34/hugo_0.34_Linux-64bit.deb
```

Quick heads up: the first time I did this, I read quickly and thought `ARM` said `AMD`, so I downloaded the wrong file.

It caused some... annoying to fix conflicts and I had to remove things and start over, and that was uncomfortable for me since I'm a command line novice and terrified of screwing up my server.

Read carefully.

### 2a. UPDATE: Add an SSH key to your server

In order to complete the next step&mdash;cloning your GitHub repository to your server&mdash;you need to setup an SSH key on the server.

To do that, run `ssh-keygen`. It will ask you to add a passcode, if desired. You *can* just leave it blank.

Next, run `cat ~/.ssh/id_rsa.pub` to print the public key into the terminal window. Copy the output, then head over to your account settings in GitHub.

Under the "SSH and GPG keys" section, click "New SSH key" and paste in the output from the terminal window. Then click "Save." Your server now has permission to speak to GitHub on your behalf.

### 2. Clone your GitHub repository

Move into the directory for your app. On DigitalOcean, that looks like this (replace `<MY_APP_NAME>` with your apps actual name):

```bash
cd apps/<MY_APP_NAME>
```

*Do not* go into the `/public` directory.

Next, clone your GitHub repository for your site. Again, don't forget to change `<YOUR_USERNAME>` and `<YOUR_RESPOSITORY>`, respectively.

```bash
git clone git@github.com:<YOUR_USERNAME>/<YOUR_RESPOSITORY>.git
```

Finally, let's rename the new directory with your site in it to `build`.

```bash
mv <YOUR_RESPOSITORY> build
```

### 3. Add a deploy script

Next, we're going to add a deploy script that will automatically pull the latest build and run Hugo whenever we push updates to GitHub.

Create a new file on your computer called `deploy.php`, and add this code to it. Change `<YOUR_APP>` (in just those two locations at the top) to the name of your app on DigitalOcean.

```php
<?php

	/**
	 * Automated deploy from GitHub
	 *
	 * https://developer.github.com/webhooks/
	 * Template from ServerPilot (https://serverpilot.io/community/articles/how-to-automatically-deploy-a-git-repo-from-bitbucket.html)
	 * Hash validation from Craig Blanchette (http://isometriks.com/verify-github-webhooks-with-php)
	 */

	// Variables
	$secret = getenv('GH_DEPLOY_SECRET');
	$repo_dir = '/srv/users/serverpilot/apps/<YOUR_APP>/build';
	$web_root_dir = '/srv/users/serverpilot/apps/<YOUR_APP>/public';
	$rendered_dir = '/public';
	$hugo_path = '/usr/local/bin/hugo';

	// Validate hook secret
	if ($secret !== NULL) {

		// Get signature
		$hub_signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

		// Make sure signature is provided
		if (!isset($hub_signature)) {
			file_put_contents('deploy.log', date('m/d/Y h:i:s a') . ' Error: HTTP header "X-Hub-Signature" is missing.' . "\n", FILE_APPEND);
			die('HTTP header "X-Hub-Signature" is missing.');
		} elseif (!extension_loaded('hash')) {
			file_put_contents('deploy.log', date('m/d/Y h:i:s a') . ' Error: Missing "hash" extension to check the secret code validity.' . "\n", FILE_APPEND);
			die('Missing "hash" extension to check the secret code validity.');
		}

		// Split signature into algorithm and hash
		list($algo, $hash) = explode('=', $hub_signature, 2);

		// Get payload
		$payload = file_get_contents('php://input');

		// Calculate hash based on payload and the secret
		$payload_hash = hash_hmac($algo, $payload, $secret);

		// Check if hashes are equivalent
		if (!hash_equals($hash, $payload_hash)) {
		    // Kill the script or do something else here.
		    file_put_contents('deploy.log', date('m/d/Y h:i:s a') . ' Error: Bad Secret' . "\n", FILE_APPEND);
		    die('Bad secret');
		}

	};

	// Parse data from GitHub hook payload
	$data = json_decode($_POST['payload']);

	$commit_message;
	if (empty($data->commits)){
		// When merging and pushing to GitHub, the commits array will be empty.
		// In this case there is no way to know what branch was pushed to, so we will do an update.
		$commit_message .= 'true';
	} else {
		foreach ($data->commits as $commit) {
			$commit_message .= $commit->message;
		}
	}

	if (!empty($commit_message)) {

		// Do a git checkout, run Hugo, and copy files to public directory
		exec('cd ' . $repo_dir . ' && git fetch --all && git reset --hard origin/master');
		exec('cd ' . $repo_dir . ' && ' . $hugo_path);
		exec('cd ' . $repo_dir . ' && cp -r ' . $repo_dir . $rendered_dir . '/. ' . $web_root_dir);

		// Log the deployment
		file_put_contents('deploy.log', date('m/d/Y h:i:s a') . " Deployed branch: " .  $branch . " Commit: " . $commit_message . "\n", FILE_APPEND);

	}
```

Move this file into your `/public` directory on DigitalOcean. The easiest way is with an FTP client.

### 4. Create a secret

To keep this process and file secure, you should setup a secret that GitHub will use to encrypt the webhook.

Generate a random string. I used my password manager for this, but there are online tools, too. Google `random string generator` to find one.

If your app already has an `.htaccess` file setup, download it so you can edit it (it would be in the `/public` directory at the root level). If not, create one.

We're going to add our GitHub secret to it as a server environment variable. Putting it directly in our `deploy.php` script would be insecure.

Add this to your `.htaccess` file, and then upload it back to the `/public` directory, replacing `<YOUR_RANDOM_STRING>` with your random string. Make sure you save it somewhere for the next step.

```bash
# GitHub webhook secret
SetEnv GH_DEPLOY_SECRET <YOUR_RANDOM_STRING>
```

### 5. Setup a GitHub webhook

Next, go to the settings for your GitHub repository and select *Webhooks* from the left-hand menu. Click "Add a webhook."

For the *Payload URL*, using your domain + `deploy.php`.

```
http://example.com/deploy.php
```

Paste your random string into the *Secret* field, and click save. The defaults are fine for everything else.

GitHub will ping your script to make sure everything is setup correctly, and if it is, your first build and deploy will run automatically.

## What now?

If that worked for you, you can now make updates to your site, push to GitHub, and have the site automatically update itself.

You never need to run a Hugo build locally on your computer (though you obviously can if you want to).

If I missed anything, wasn't clear, of your have any questions, please hit reply and let me know. Unfortunately, I can't provide debugging or tech support on this because every server setup is unique, but I'm happy to fill in any blanks in the steps I took.

Tomorrow, I'll cover how to handle scheduling posts ahead of time, and then next week, we'll look at how to migrate content off of WordPress.