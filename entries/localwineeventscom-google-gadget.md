---
category: Development
date: 2007-06-21 19:49
tags: 'google, gadgets'
title: 'LocalWineEvents.com Google Gadget'
---

Just finished a Google Gadget for the
[LocalWineEvents](http://www.localwineevents.com) website. It uses the
Google Gadget API, of course, which is in JavaScript, XML, a little
HTML, CSS, and the obligatory IE CSS hacks. Basically it asks the user
where he or she lives when it's run for the first time, then it grabs
the corresponding RSS feed from LocalWineEvents.com, parses that, and
produces the output as shown in the screenshot below. Clicking on the +
reveals the event's details and changes the + to a -, which can then be
hidden again using the - button. I used a new tool to make this gadget,
since it's primarily coded in JavaScript, called
[Aptana](http://www.aptana.com/). It's essentially a plugin for
[Eclipse](http://www.eclipse.org/), but the authors also provide a
stand-alone client preloaded with the plugin. I liked it except that it
didn't detect JavaScript inside an XML document, which is the format for
Google Gadgets. So I just coded the JavaScript in an HTML file and
pasted the JavaScript into the XML as needed. I was once again reminded
how bad I am at using the [GIMP](http://www.gimp.org/) or any other
graphics editor. Must be missing that visual creativity gene... [Add to
your Google
Homepage.](http://www.google.com/ig/add?moduleurl=http://local-wine-events-gadget.googlecode.com/svn/trunk/src/ig.xml)

![LWE Google Gadget](http://local-wine-events-gadget.googlecode.com/svn/trunk/src/ss.png)
