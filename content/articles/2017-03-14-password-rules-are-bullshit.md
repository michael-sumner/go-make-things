---
categories:
- Code
- Design &amp; UX
date: '2017-03-14'
permalink: /password-rules-are-bullshit/
title: Password rules are bullshit
url: /2017/03/14/password-rules-are-bullshit
---

This post [about passwords](https://blog.codinghorror.com/password-rules-are-bullshit/) from Coding Horror reminds us that most password rules are bullshit.

The two things that matter:

1. Longer is always better.
2. Don't let users create obviously bad passwords, like:
    - Those that are on the top 50 or 100 most used password lists.
    - Their email address.
    - Their user name.
    - The URL of the site.

That said, they also pick apart the length requirement in a world of unicode:

> No, seriously, it does. I'll go so far as to say your password is too damn short. These days, given the state of cloud computing and GPU password hash cracking, any password of 8 characters or less is perilously close to no password at all.
>
> So then perhaps we have one rule, that passwords must not be short. A long password is much more likely to be secure than a short one … right?
>
> What about this four character password?
>
> ✅&#x1f40e;&#x1f50b;&#x1f587;️

I'm going to be updating how [WordPress for Web Apps](https://github.com/cferdinandi/gmt-wordpress-for-web-apps) handles password requirements based on some of this.