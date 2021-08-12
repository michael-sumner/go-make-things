---
title: "What is serverless?"
date: 2021-08-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I'm writing a new [pocket guide and video course](https://vanillajsguides.com) on _serverless_, and wanted to share the first chapter with you today.

Enjoy!

## What is serverless?

_Serverless_ is a terrible name for an awesome thing.

**It’s mostly just a silly marketing term for _Functions-as-a-Service_.**

With _serverless_, you don’t have to worry about “the server” itself. You write some code and add it to your account. Then, you can make that code run in response to specific events, such as calling an API endpoint.

## A few important details

There are a few important under-the-hood details about _serverless_ that are worth noting.

**1. Different vendors support different languages.**

Options include PHP, Node.js, Python, Ruby, and even vanilla JS. Some vendors even support multiple languages, allowing you to mix-and-match as desired.

**2. Serverless functions only run when needed.**

With traditional cloud-based server options, the server or virtual machine is always running. You pay a fixed amount for a fixed amount of memory, storage, CPUs, and data transfer, whether you use it all or not.

With serverless, a machine is spun up whenever a function is triggered, and shut down when its done. The vendor handles provisioning, scaling, and so on, and you only pay for the amount of server resources used (many vendors also have free options).

**3. Serverless functions are _stateless_.**

You can't update a variable or value when a function runs, and then access that modified value the next time it runs. Because the server is spun up, runs the function, and then shuts down, any session data is lost each time it runs.

In the example below, if you run `saveName()`, then sometime later call `getName()`, it will return `Merlin` instead of the name you updated it to.

```js
let wizard = 'Merlin';

// Update the wizard variable
function saveName (name) {
	wizard = name;
}

// This will ALWAYS return Merlin, even if saveName is run
function getName () {
	return name;
}
```

**4. Many serverless vendors offer database services.**

While serverless functions are stateless, many vendors offer databases that you can call from your serverless functions. This allows you to save data when functions run, and retrieve that data later.

## Why is it called _serverless_ if there are servers involved?

Primarily marketing nonsense, honestly.

_Serverless_ is supposed to describe your experience with the servers. You don't have to think about them at all, and instead focus on the code you want to run and the tasks you're trying to accomplish.

With traditional cloud services, even with managed ones, you still have to make choices around how much memory, storage, and bandwidth you need, and when to increase or decrease that. Serverless handles that stuff automagically for you.