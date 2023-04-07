<?php

	/**
	 * Automated deploy from GitHub
	 *
	 * https://developer.github.com/webhooks/
	 * Template from ServerPilot (https://serverpilot.io/community/articles/how-to-automatically-deploy-a-git-repo-from-bitbucket.html)
	 * Hash validation from Craig Blanchette (http://isometriks.com/verify-github-webhooks-with-php)
	 */

	// Variables
	$secret = getenv('REFRESH_SECRET');
	$key = $_GET['secret'];

	// Validate key/secret
	if (empty($secret) || empty($key) || $secret !== $key) {
		die('Unable to complete this task at this time.');
	}

	// Rebuild all the sites
	exec('cd /srv/users/serverpilot/apps/gomakethings/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/gomakethings/build/public/. /srv/users/serverpilot/apps/gomakethings/public');
	exec('cd /srv/users/serverpilot/apps/vanillajspodcast/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajspodcast/build/public/. /srv/users/serverpilot/apps/vanillajspodcast/public');
	exec('cd /srv/users/serverpilot/apps/vanillajsguides/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajsguides/build/public/. /srv/users/serverpilot/apps/vanillajsguides/public');
	exec('cd /srv/users/serverpilot/apps/vanillajsacademy/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajsacademy/build/public/. /srv/users/serverpilot/apps/vanillajsacademy/public');
	exec('cd /srv/users/serverpilot/apps/vanillajsshorts/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajsshorts/build/public/. /srv/users/serverpilot/apps/vanillajsshorts/public');
	exec('cd /srv/users/serverpilot/apps/learnvanillajs/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/learnvanillajs/build/public/. /srv/users/serverpilot/apps/learnvanillajs/public');
	exec('cd /srv/users/serverpilot/apps/vanillajstoolkit/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajstoolkit/build/public/. /srv/users/serverpilot/apps/vanillajstoolkit/public');
	exec('cd /srv/users/serverpilot/apps/theleanweb/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/theleanweb/build/public/. /srv/users/serverpilot/apps/theleanweb/public');
	exec('cd /srv/users/serverpilot/apps/vanillajsprojects/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajsprojects/build/public/. /srv/users/serverpilot/apps/vanillajsprojects/public');
	exec('cd /srv/users/serverpilot/apps/vanillajsprepschool/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/vanillajsprepschool/build/public/. /srv/users/serverpilot/apps/vanillajsprepschool/public');
	exec('cd /srv/users/serverpilot/apps/gomakethings/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/gomakethings/build/public/. /srv/users/serverpilot/apps/gomakethings/public');
	exec('cd /srv/users/serverpilot/apps/techeducators/build && /usr/local/bin/hugo && cp -r /srv/users/serverpilot/apps/techeducators/build/public/. /srv/users/serverpilot/apps/techeducators/public');

	// Log the deployment
	file_put_contents('rebuild.log', date('m/d/Y h:i:s a') . ' Rebuilt all the sites' . "\n", FILE_APPEND);

	die('All set, dude!');