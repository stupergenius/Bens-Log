LocalWineEvents.com Google Gadget
#################################
:date: 2007-06-21 19:49
:category: Development
:tags: google, gadgets

Just finished a Google Gadget for the `LocalWineEvents`_ website. It
uses the Google Gadget API, of course, which is in JavaScript, XML, a
little HTML, CSS, and the obligatory IE CSS hacks. Basically it asks the
user where he or she lives when it's run for the first time, then it
grabs the corresponding RSS feed from LocalWineEvents.com, parses that,
and produces the output as shown in the screenshot below. Clicking on
the + reveals the event's details and changes the + to a -, which can
then be hidden again using the - button. I used a new tool to make this
gadget, since it's primarily coded in JavaScript, called `Aptana`_. It's
essentially a plugin for `Eclipse`_, but the authors also provide a
stand-alone client preloaded with the plugin. I liked it except that it
didn't detect JavaScript inside an XML document, which is the format for
Google Gadgets. So I just coded the JavaScript in an HTML file and
pasted the JavaScript into the XML as needed. I was once again reminded
how bad I am at using the `GIMP`_ or any other graphics editor. Must be
missing that visual creativity gene... `Add to your Google Homepage.`_

.. image:: http://local-wine-events-gadget.googlecode.com/svn/trunk/src/ss.png
   :alt: LWE Google Gadget

.. _LocalWineEvents: http://www.localwineevents.com
.. _Aptana: http://www.aptana.com/
.. _Eclipse: http://www.eclipse.org/
.. _GIMP: http://www.gimp.org/
.. _Add to your Google Homepage.: http://www.google.com/ig/add?moduleurl=http://local-wine-events-gadget.googlecode.com/svn/trunk/src/ig.xml

