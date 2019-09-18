---
categories:
- Code
date: '2017-01-18'
url: /fix-for-ssh-passphrases-on-macos-sierra/
title: Fix for SSH passphrases on MacOS Sierra
---

Since updating to MacOS Sierra, GitHub asks me for my SSH passphrase every single time I try to pull or push.

The benefit of SSH over HTTPS is specifically that you *don't* have to enter your credentials every time. From my research, this appears to be a change to how the MacOS keychain handles things in Sierra.

Fortunately, I also stumbled onto [an easy fix](https://github.com/lionheart/openradar-mirror/issues/15361#issuecomment-270242512) from Josh Buchea:

1. In terminal, run `cd ~/.ssh`.
2. Next, run `open .` to open the `.ssh` directory.
3. In the `config` file, add the snippet below. If no `config` file exists, create one first.

```bash
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
```

This tells MacOS to use the credentials stored in your Keychain for SSH. If your token is named something other than `id_rsa` (the default), naturally you'll want to change that in the snippet above.