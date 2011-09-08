HP Laptop Linux Boot Parameters
###############################
:date: 2008-11-03 13:32
:category: Tech
:tags: Linux

Instead of me wracking my braing trying to remember the exact boot
parameters to make my HP laptop not break when I update the kernel, I am
posting it here. Hopefully someone else may find it useful as well. My
specific laptop is the HP dv9000 series special edition I bought at Best
Buy about a year ago and I am currently running Ubuntu 8.10 with the
2.27 kernel. The "magic" boot parameter seems to be pnpbios=off, so I
end up with a grub entry something like:

::

    root (hd0,0)
    kernel /vmlinuz root=UUID=<some giant UUID> ro quiet splash pnpbios=off
    initrd /initrd.img
    boot

Fixes most things including sleep, hibernate, USB hotplugging, and most
noticeably my wireless card.
