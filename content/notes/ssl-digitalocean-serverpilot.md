---
title: How to install a Let's Encrypt SSL certificate with ServerPilot and DigitalOcean
url: /ssl-digitalocean-serverpilot
date: 2021-01-05T10:30:00-05:00
lastmod: 2021-01-05T10:30:00-05:00
---

Back in 2016, Cormac Bracken wrote a fantastic article on [how to install a free Let's Encrypt SSL certificate with ServerPilot and DigitalOcean](https://www.redhotlemon.com/dev-blog/free-ssl-with-lets-encrypt-on-serverpilot-with-multiple-domains/) when you have multiple domains on a single droplet.

I reference it constantly, and because I don't trust that the article won't someday disappear, I wanted to document the most important parts on my own site.

(_The stuff in all caps should get replaced with your own details._)


## Log in to your droplet from the command line

Unfortunately, this whole process requires the CLI. If you'd rather use a GUI, ServerPilot offers one with their paid plans.

First, SSH into your droplet as your `serverpilot` user.

```bash
ssh serverpilot@YOUR-DROPLET-IP-OR-HOSTNAME
```

Then, login as the root user. You'll probably need to enter your root user password.

```bash
su
```


## Install Let's Encrypt

In order for this to work, you first have to install Let's Encrypt on your DigitalOcean droplet. Once it's installed, you can jump straight to the next section for additional domains and skip this step.

Next, you need install the Let's Encrypt package from GitHub.

```bash
git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
```

Finally, check that everything worked OK.

```bash
/opt/letsencrypt/letsencrypt-auto --help
```


## Install a certificate

Replace the stuff in caps with your info. Replace `YOURAPP` with the name of your application in ServerPilot.

```bash
/opt/letsencrypt/letsencrypt-auto certonly --agree-tos --email YOU@YOUREMAIL.com --webroot -w /srv/users/serverpilot/apps/YOURAPP/public -d YOURSITE.com -d www.YOURSITE.com
```

_**Note:** If your droplet has some weird security settings, you may need to add the flag `--preferred-challenge dns`. Try it without the flag first._

If it worked, you'll get the following message.

> Congratulations! Your certificate and chain have been saved at  `/etc/letsencrypt/live/YOURAPP/fullchain.pem`.

Now we need to tell the server where to find the certificate. Jump into the `vhosts.d` directory.

```bash
cd /etc/nginx-sp/vhosts.d
```

Next, create a new `.conf` file for the SSL certificate.

```bash
nano YOURAPP.ssl.conf
```

Replace the stuff in all caps below, and paste this into the file. Press control+X to exit and save.

```bash
server {
 listen 443 ssl http2;
 listen [::]:443 ssl http2;
 server_name YOURDOMAIN.com www.YOURDOMAIN.com;
 ssl on;
# letsencrypt certificates
 ssl_certificate /etc/letsencrypt/live/YOURDOMAIN.com/fullchain.pem; ssl_certificate_key /etc/letsencrypt/live/YOURDOMAIN.com/privkey.pem;
#SSL Optimization
 ssl_session_timeout 1d;
 ssl_session_cache shared:SSL:20m;
 ssl_session_tickets off;
# modern configuration
 ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
 ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK';
# OCSP stapling
 ssl_stapling on;
 ssl_stapling_verify on;
# verify chain of trust of OCSP response
 ssl_trusted_certificate /etc/letsencrypt/live/YOURDOMAIN.com/chain.pem; #root directory and logfiles root /srv/users/serverpilot/apps/YOURAPP/public;
access_log /srv/users/serverpilot/log/YOURAPP/YOURAPP_nginx.access.log main;
 error_log /srv/users/serverpilot/log/YOURAPP/YOURAPP_nginx.error.log;
#proxyset
 proxy_set_header Host $host;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 proxy_set_header X-Forwarded-SSL on;
 proxy_set_header X-Forwarded-Proto $scheme;
#includes
 include /etc/nginx-sp/vhosts.d/YOURAPP.d/*.nonssl_conf;
 include /etc/nginx-sp/vhosts.d/YOURAPP.d/*.conf;
}
```

Finally, we need to restart the nginx server for the changes to take effect.

```bash
service nginx-sp restart
```

As Cormac notes in their original article, if there are any errors in your conf file, this process will fail and break all the things.

> If there’s any problem with the config file, Nginx will fail to restart, and all websites on your server will be unavailable. Quickly rename the `.conf` file to `.con`, then restart Nginx again while you figure out the problem.


## Automatically renewing your certificate

By default, Let's Encrypt certificates are good for 90 days.

We don't want to have log into our server and renew them manually. We want them to automatically renew. Cormac shares an approach in their original article, but I found it stopped working for me after a while. Here's what I do instead.

(_Once you set this up, you'll never have to touch it again, even if you add more certificates._)

First, jump into the `/opt` directory.

```bash
cd /opt
```

Check if there's a `/scripts` directory in it already.

```bash
ls
```

If there's not, create one.

```bash
mkdir scripts
```

Either way, jump into the `/scripts` directory.

```bash
cd /scripts
```

Next, create a bash script named `renewcerts.sh`.

```bash
nano renewcerts.sh
```

Copy/paste the following script into your file, replacing the stuff in all caps with your info. The press control+X to exist and save.

```bash
#!/bin/sh
/opt/letsencrypt/letsencrypt-auto renew --agree-tos --email YOU@YOUREMAIL.com >> /opt/logs/renew-ssl.log
```

Next, open your `crontab` file. Copy/paste this into the file, then exit and save.

```bash
# Renew SSL certificates
0 0 * * * /opt/scripts/renewcerts.sh
```

Once a day, your server will run the bash script and renew any certificates that are close to expiring.