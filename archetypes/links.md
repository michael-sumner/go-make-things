---
title: "{{ .TranslationBaseName | replaceRE "[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-" "" | humanize }}"
date: {{ delimit (findRE "[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]" .TranslationBaseName 1) "" }}T07:00:00{{ dateFormat "-07:00" .Date }}
draft: false
link: ""
---

