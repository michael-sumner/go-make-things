---
title: "Adding a keyboard command to mute and unmute Zoom with macOS and Alfred"
date: 2021-08-11T10:30:00-04:00
draft: false
categories:
- Accessibility
- Business and Leadership
- Code
- JavaScript
- Technology
---

I often find myself on a Zoom meeting, on mute, and quickly need to unmute myself to respond to something.

But the Zoom window is not always the one that's currently active on my desktop, so I find myself frantically hunting for it and trying to click the unmute button so I can respond before the moment of awkward silence drags on too long.

I'm also a heavy user of [Alfred for macOS](https://www.alfredapp.com/), and pay for the Powerpack upgrade.

So, this week, I added a few Alfred commands to mute and unmute Zoom calls, and wanted to show you how.

## A few things of note

Items one and two conflict with each other. Sorry!

1. For this to work, you need to Powerpack upgrade for Alfred. This trick uses Workflows, which are a paid upgrade.
2. If you're comfortable creating a macOS Applescript with Automator, you _technically_ don't need Alfred at all. You can map what I'm about to show you to an Applescript and run it with keyboard commands (more on that later).
3. There are a handful of tutorials on the web about how to _toggle_ mute in Zoom. I wanted to explicitly mute or unmute without having to look at Zoom to know which one happened, so I broke them out into two separate commands.

Alright, let's dig in!

## Creating an Alfred workflow to mute Zoom

First, open up Alfred's preferences panel. Then, click on the "Workflows" tab.

Click the little `+` button in the bottom left-hand corner, then select _Templates > Essentials > Keyword to Applescript_. Name it "Mute Zoom," and give it a description and category if you want. Then click _Create_.

A new workflow should now be in your Workflows.

Double click on the _Keyword_ block. Under _Keyword_, write `mute-zoom`. Under _Title_, write `Mute Zoom`. Then click _Save_.

Next, double click on the _Run NSAppleScript_ block. Under _AppleScript_, delete the code that's already there, then copy/paste the following code into the field and click _Save_.

```
on alfred_script(q)
	tell application "System Events"
		if exists window 1 of process "zoom.us" then
			tell application process "zoom.us"
				if exists (menu 1 of menu bar item "Meeting" of menu bar 1) then

					set meetingMenu to menu 1 of menu bar item "Meeting" of menu bar 1
					set canMute to exists menu item "Mute audio" of meetingMenu

					if canMute then
						click menu item "Mute audio" of meetingMenu
					end if
				end if
			end tell
		end if
	end tell
end alfred_script
```

Now, you can mute a Zoom call by typing `mute-zoom` or `Mute Zoom` in Alfred's command prompt.

## Creating an Alfred workflow to unmute Zoom

Let's create a second Workflow to unmute Zoom.

Right-click the Workflow you just created and click _Duplicate_. Double click the Workflow, then update the _Name_ and _Description_ to reflect that this unmutes Zoom.

Next, Double click on the _Keyword_ block. Edit the _Keyword_ field to say `unmute-zoom`, and the _Title_ field to say `Unmute Zoom`. Then click _Save_.

Double click on the _Run NSAppleScript_ block. Under _AppleScript_, delete the code that's already there, then copy/paste the following code into the field and click _Save_.

```
on alfred_script(q)
	tell application "System Events"
		if exists window 1 of process "zoom.us" then
			tell application process "zoom.us"
				if exists (menu 1 of menu bar item "Meeting" of menu bar 1) then

					set meetingMenu to menu 1 of menu bar item "Meeting" of menu bar 1
					set canUnmute to exists menu item "Unmute audio" of meetingMenu

					if canUnmute then
						click menu item "Unmute audio" of meetingMenu
					end if
				end if
			end tell
		end if
	end tell
end alfred_script
```

Now, you can unmute a Zoom call by typing `unmute-zoom` or `Unmute Zoom` in Alfred's command prompt.

## Doing this _without_ Alfred

I mentioned that you technically don't need Alfred at all to do this. Here's how...

1. Open the Automator app.
2. Select "New Document" or go to File > New, then select "Quick Action."
3. Under _Workflow receives_, select "no input."
4. Drag-and-drop _Run AppleScript_ from the left-hand menu into the "Drag actions here" section.
5. Copy/paste the _Mute_ snippet from above _without_ the leading `on alfred_script(q)` or ending `end alfred_script` commands.
6. Select File > Save, and save it as "Mute Zoom."
7. Repeat this process using the _Unmute_ snippet, and name it "Unmute Zoom."

Now, you have to AppleScripts that will mute and unmute Zoom, respectively. Next, you need to map them to keyboard shortcuts.

1. Go to your Apple System Preferences, and select _Keyboard_.
2. Click the "Shortcuts" tab.
3. Select "Services" from the left-hand menu.
4. Under "General," you should see your two new AppleScripts. Click the right-hand column for each one to map a keyboard shortcut to each script.

_**Note:** these will be universal and overwrite any app-specific keyboard commands._