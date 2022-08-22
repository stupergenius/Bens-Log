---
category: Development
date: 2007-06-28 23:12
tags: 'Firefox, XML, Javascript, XPath, Scraping'
title: Flixya Firefox Extension
---

I just recently finished up a Firefox Extension for the social video
site [Flixya](http://flixya.com). Extensions are all written in
JavaScript and a sort of XML called
[XUL](http://www.xulplanet.com/tutorials/whyxul.html). Most of the
framework was already written for me though, so I just hacked together
the bits that worked with my code and nixed some of the old stuff.
Basically the extension grabs some relevant data like tags, the title,
etc., from a video hosted on a number of online video sites like
[Veoh](http://www.veoh.com) or [YouTube](http://www.youtube.com). It
then fills that text into the extension's interface so user's can edit
or add to the provided information. Finally it posts all of the
information to the user's Flixya account where other users can view and
comment on each other's videos. The idea of using an extension like this
is to streamline the video submitting process, and it works quite well.
Grabbing the text from all the various sites took a while and was the
most difficult part of the process. Some sites like Veoh are coded in
XHTML so they use CSS for presentation and a minimal amount of actual
markup. This makes parsing a page much easier with either XPath or
grabbing elements with the JavaScript
[getElementById()](http://developer.mozilla.org/en/docs/DOM:document.getElementById)
function. Other sites like [LiveVideo](http://www.livevideo.com) use
tables almost exclusively which makes finding a unique part of the HTML
rather difficult and sometimes near impossible since the code around the
desired text is so similar to other undesired text. But the resulting
extension works very well with a number of online video sites and allows
easy posting to Flixya.

[Flixya Firefox Video Publisher 2.0](http://www.flixya.com/tools)

![Flixya Extension](http://media.bensnider.com/images/flixya-ext.png)
