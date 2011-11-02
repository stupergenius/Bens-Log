Code Camp Columbus 2011
=======================
:date: 2011-10-29 16:14
:category: Tech
:tags: code, Open Source

Last weekend I had the opportunity to attend `Code Camp Columbus`_ for the first time. This is the second year that the event has been held, and it was pretty great this year. As a busy, working developer, I greatly appreciate their core principles:

* by and for the developer community
* always free
* community-developed material
* no fluff - only code
* never occurs during working hours

The venue was `Tech Colubmus`_, which is quite a nice place. The main presentation room was large with a very large screen. There were two additional rooms, one of which was probably a little too small for the group, but it made the talks more interactive in that space. Breakfast, drinks, snacks, and lunch were all generously provided by the event `sponsors`_, as were the many many raffle prizes. I went away with a neat `Beginning Scala`_ book (which I'm currently working through) and a $25 Best Buy gift card. All in all, quite worth the cost of attendance, which was **free**.

Overall the talks were great, and I highly recommend going to this conference the next time it is presented. I greatly enjoyed the *Perl*, *Behavior Driven Development*, and the *Verilog* talks. I'll outline a few of the talks below.

========================
HTML5 Apps with PhoneGap
========================

The first talk that I attended, and the talk that was likely most persuaded my attendance, was a talk about PhoneGap_ and HTML5. In the near future I hope to develop several HTML5 mobile apps and will probaby use PhoneGap to wrap them for deployment on the various app stores. My particular problems revolve around video and complexity management, which weren't specifically addressed, but the talk was indeed generally useful.

The main narrative here was an app that the presenter had made in HTML5 and was planning on releasing it to the various mobile app stores, as well as to the chrome app store. The app was a simple two screen deal that queried the `Heavens Above`_ ISS orbit data, asked the user where he/she is (or uses GPS data when available) and presents the user with the times and locations of the next few ISS viewings. Admittedtly a rather simple app, but a good showcase of the integration between HTML5, web services, and PhoneGap.

This particular talk was hosted in the smallest of the three venues, and it was quite a tight fit for all the people that wanted to attend talks in this room. Otherwise the venue was nice. No real technical difficulties or anything.

==========================================
Unlock the Power of Arduino with Libraries
==========================================

This talk was a more specific Arduino talk than the others I have previously attended at other conferences. It assumed at least a basic understanding of Arduino, which I thought was quite helpful. Most people interested in Arduino already know a significant amount about the platform, but just don't have the time to devote to actually doing anything with it. This talk introduced more advanced topics that I hadn't previously known. An interesting quote from the presentation speaks to the paradigm shift when switching from primarly software development to a more hardware integrated approach with Arduino:
*Ardiuno interacts more directly with the world, as opposed to mediated through a user or another library.*

The main topic of this particular talk is about how to use libraries in Arduino. Libraries in Arduino are more or less identical to libraries in other contexts, and the use is the same as well. Simply #including a header file adds callable code to the current program. The header files expose some public members or methods, and the including program can use them as usual. As a sort of throwback to the days when one had to be conscious of memory, including library code can easily overflow the amount of program memory available on the Arduino. Other than that, libraries are just header files that you can use to easily add additional functionaly to your Arduino programs. The community is apparently fairly active, and many libraries are available for common addon hardware, as well as libraries for controlling servos and enabling communication, and the like.

The talk ended with a demonstration of some cool Arduino hardware. The speaker had quite a cool collection of Arduino shields, displays, servos, a digial analog clock, a TV out shield, and other stuff. I was particularly interested in the `Danger Shield`_ which is a shield that just gets stuck onto the top of the Arduino board (a "shield") and adds a bunch of additional hardware like a temperature sensor, a bunch of LEDs, a speaker, three potentiometer sliders, and some other cool tech.

=====================================================
Perl - laziness, impationence, hubris, and one liners
=====================================================

I've always been a fan of Perl because of its expressive syntax, but it's just not terribly practical anymore. This talk centered around some of the new cool features in the latest versions of Perl, as well as introducing some of the syntax standardization that has been formalized in the past few years. This lets Perl developers adhere to a standard set of best practices and a single coding standard, so that the programs are more readable and more maintainable.

To this end, the speaker showed an example of some of the core regex library code, and the file's header literally said "VOODOO MAGIC, LINE NOISE FOLLOWS." It was the sort of Perl that one thinks of when one thinks of overly complicated Perl code. The speaker then showed how to use some new tools available through CPAN that mostly de-obfuscated the line noise into a quite readable program.

The speaker also went through the use of the Mechanize_ framework, that has been quite improved since the last time I used it. The framework makes it easy to login to website, carry over the login cookies, and generally request and scrape content from websites in a concise manner. The speaker is using the Mechanize library to automate the transfer of projects from the closing BerliOS_ repository and import them into GitHub.

==================================
Intro to Verilog for C programmers
==================================

I went into this talk without even a little bit of understanding about Verilog_ but went away with a desire to learn more. Coincidentally the next local Python meetup I went to was about VHDL_, a competitor to Verilog. The talk was a basic overview of Verilog, and I probably knew about as much about Verilog as everyone else in the room (e.g. nothing) and the talk was still fairly well above all our heads lol. It's good to experience things outside of our expertise, however, and I appreciated the challenge in understanding Verilog, which is very difference from most procedural languages that compile into code that runs on microcontrollers.

In a nutshell, Verilog is a hardware description language that, when compiled, can be loaded onto an FPGA_ and run. This is a major difference from compiling code that runs on a normal CPU. For one thing, most operations in a Verilog program can happen at the same time, in parallel. This entails that a line at the top of the program can run *after* a line at the end of the program. This all depends on the ending strucutre of gates that get programmed into the FPGA, but the designer must still be aware of such thins. Another difference is the fact that all operations are essentially a set of logic operations that runs through gates on a positive or negative clock edge. This means most of the operations a Verilog program describes are things like XORing or NORing two integers, for example. A major shift from traditional programming languages.

The speaker is apparently using a Verilog designed FPGA to detect gamma ray bursts from an x-ray machine used in a healthcare environment. This is for his day job at Batelle, in Columbus. Apparently, using a microcontroller wouldn't work for this particular problem because the gamma ray bursts are on the order of a single nano-second, and even the fastest microcontrollers aren't fast enough to process all the incoming data. So his team turned to an FPGA that can, in parallel, process the input, perform a FFT on it, and dump it out over a serial interface to a PC based program. Overall, very cool stuff.

Verilog is something I would like to learn more about, because it does indeed seem fascinating, and I greatly appreciated this talk because it helped open my eyes to yet another subset of computer science and engineering.

==========
In Summary
==========

Code Camp Columbus was a huge success this year, in my opinion, and I look forward to the next year of new and cool presentations. Perhaps next year I'll get my act together and present something. I fancy myself quite an expericed iOS developer, and perhaps I will have more to share with my experience of HTML5 and PhoneGap. Winning some goodies in the raffle was icing on the cake, and I enjoyed the venue and the presentations very much.

.. _Code Camp Columbus: http://columbuscodecamp.com/
.. _Tech Colubmus: http://www.techcolumbus.org/
.. _sponsors: http://columbuscodecamp.com/?s=sponsors
.. _PhoneGap: http://phonegap.com/
.. _Heavens Above: http://www.heavens-above.com/?lat=0&lng=0&loc=Unspecified&alt=0&tz=CET
.. _Danger Shield: http://www.sparkfun.com/products/10570
.. _Mechanize: http://search.cpan.org/dist/WWW-Mechanize/
.. _BerliOS: http://www.berlios.de/
.. _Verilog: http://en.wikipedia.org/wiki/Verilog
.. _FPGA: http://en.wikipedia.org/wiki/Field-programmable_gate_array
.. _VHDL: http://en.wikipedia.org/wiki/VHDL
.. _Beginning Scala: http://www.apress.com/9781430219897
