---
category: Tech
date: '2011-09-13 21:46'
tags: 'linux, volunteering, hardware'
title: FreeGeek Columbus Volunteering
---

I volunteered today for the first time at [FreeGeek
Columbus](http://freegeekcolumbus.org/). I got a tour from the staff,
which included a runaround of all the stacks of hardware that they have
in stock. I don't think I've ever seen so many video cards, memory
sticks, hard drives, and various parts in a single place before. My mind
was a little blown at the sheer volume.

They then explained the process that hardware goes through when it comes
in the door. First we basically tear everything out of the computer and
test its components separately. Then, once the parts have passed some
basic tests, they get put in bins based on what type of component they
are. If a part doesn't pass the hardware tests, it gets tore down a
little more and dumped into its own recycling bin.

Tonight I was able to work on testing hard drives and memory. Basically
the process here involves using a set of 8 computers that are setup with
a [PXE boot](http://en.wikipedia.org/wiki/Preboot_Execution_Environment)
loader that loads either [memtest](http://www.memtest.org/) for testing
memory, or a disk recovery image that checks for bad blocks and then
does a [dban](http://www.dban.org/) style wipe on the contents. Once
memory passes I just label it and bin it. Once a hard drive passes and
is wiped, I move it over to the imaging machines where a copy of Ubuntu
is cloned onto it, and I bin it so it can be built into a computer.

Overall, the process was quite cool. I totally geeked out a little bit
at the sheer volume of tech and gadgetry just laying about. Mostly I
just feel good about putting my wasted youth spent in tinkering with
computers to good use. If you want to get started volutneering here,
just walk in and the staff is more than willing to give you a task (or
several).
