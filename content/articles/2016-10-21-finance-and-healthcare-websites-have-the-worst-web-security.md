---
categories:
- Design &amp; UX
date: '2016-10-21'
url: /finance-and-healthcare-websites-have-the-worst-web-security/
title: Finance and healthcare websites have the worst web security
---

I'm continually amazed at how bad web security practices are on financial and healthcare websites.

Yes, they're generally encrypted. And sometimes, they also have a second authentication method (a fixed pin, or confirming that a picture is yours or something lame like that).

But the important first lines of defense: your password and your reset questions... well, they're awful at those.

## Do NOT limit password length or characters

I get imposing minimums on passwords. Must have 8 characters? That's laughably short, but sure.

Needs at least one uppercase, one lowercase, and one number? Ok, that's fine.

But why on earth can't my password be longer than 20 characters? Why can't it contain `!` or `#` or `%`?

**Do not restrict password length or limit characters.**

I use a password manager to generate absurdly long strings of nonsense. A typical password for me looks something like this:

```
2A.va;rda6(wJ76MLLhkVwBNUwnerfhR2FGDxb%rvxgZCW$VtB
```

When you limit how long my password can be, or what characters it can contain, you compromise the security of my account.

## Don't disable paste

Those insanely complex passwords I create? If I can't copy-and-paste them into your form, they're useless.

Disabling paste on password forms forces me to create something easier to type and less secure.

And it doesn't actually improve security, which I'm assuming was your goal.

## Your password recovery questions suck

You know those security questions you get asked if you lose your password and need to recover it?

What was your mother's maiden name? What was your high school mascot? What was your first car?

Yea, that's all really easy information to find out. Ask better, more esoteric questions (if you were a tree, what kind of tree would you be?). Or better yet, let me create my own questions.

## Get real two-factor authentication

A static pin or asking me to confirm that a picture of a grassy meadow is in-fact the picture I selected don't improve security in a meaningful way.

Provide real two-factor authentication via a text message or an app like Google Authenticator.

## You can do better

It's absurd that my Facebook and Twitter accounts have better security than your financial website does.