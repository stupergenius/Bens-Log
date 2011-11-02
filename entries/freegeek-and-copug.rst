COhPUG Monthly Meetup and FreeGeek
==================================
:date: 2011-09-27 22:07
:category: Tech
:tags: linux, volunteering, hardware, python

This week I think I've met my geek quota a little early, so hopefully I can just
cruise the rest of the week. I'm always pleasantly surprised by the amount of
geekery that goes on in Columbus on a random week.

Tuesday was the monthly meetup for the `Central Ohio Python User Group`_ (COhPUG
I think...). The main topic this week was `Greg Malcom`_'s talk on
`Unix streaming, piping, and forking`_, and how we can write very Unix looking
Python scripts using the same concepts. This talk was apparently originally
given at a Ruby conference, but thankfully, all but one Ruby reference was
converted to Python.

The bit on forks, for me, was a bit of a refresher course, having taken a Unix
class in college. Thankfully, I had forgotten everything so I was able to learn
it all over again. With forks I feel like there's always an "Aha!" moment where
the concept just sort of clicks into place in your brain, but until then you're
all "what the crap is this?" So, that was a good talk. I was reminded how odd
Python's Popen classes are with respect to piping. I think I usually avoided
using those in favor of the commands_ module, but apparently that's deprecated
these days.

`Eric Floehr`_ gave a talk on using PyGame_ to compete in the semi-annual
PyWeek_ game development contest (in which he attempted to participate). PyGame,
as far as I can tell, is a simple Python layer over OpenGL with some sound, font
image, and sprite support baked into a Python module. Writing a PyGame...game
involves the developer implementing a main runloop, much like other frameworks,
and apparenly includes a sort of hybrid event queue mechanism that looks
pretty handy. I don't know how well any physics libraries and such plug into
PyGame, but judging from the sophistication of the entries, it doesn't look too
amazing. That might be a good contribution to the project however, something
like a Box2D port that plugs into the PyGame sprite system at some level.

The remainder of the meetup was spent listening to a fellow who created a nifty
video visualization of all the Columbus Underground forum posts. He apparently
used `Amazon EC2`_ to setup render farm of 60 instances that rendered frames
independently. This sped up the render from all night on his laptop to 60
seconds in *the cloud*. When the job was finished it allegedly cost about $8.
Quite impressive.

I also spent this evening at FreeGeek_. This week I attempted to build a
computer, but the gods would not have it. I kept getting a random freeze.
Normally I would chalk this up to memory but we test all the memory we get at
FreeGeek so I assume it would either have to be a bad CPU or a PSU with damaged
voltage regulators (but the voltage seemed to be fine in the BIOS). So I was
stumped. Initially I found that the sound card was faulty and I replaced that,
but that didn't stop the freezes. I also replaced the video card to be safe, no
dice. So I gave up and just tagged it with my findings. The next thing I did was
mostly a success, in that I was able to get through all quality control checks
for a computer that was waiting to be tested. I ran out of time before I could
test the disc drive, but a success I will take!

.. _FreeGeek: http://freegeekcolumbus.org/
.. _Amazon EC2: http://aws.amazon.com/ec2/
.. _PyGame: http://pygame.org/news.html
.. _PyWeek: http://www.pyweek.org/
.. _Eric Floehr: http://pyohio.org/speaker/profile/7/
.. _Central Ohio Python User Group: http://www.meetup.com/Central-Ohio-Python-Users-Group
.. _Greg Malcom: http://geekswithblogs.net/gregorymalcolm/Default.aspx
.. _Unix streaming, piping, and forking : https://gist.github.com/1241642
.. _commands: http://docs.python.org/library/commands.html
