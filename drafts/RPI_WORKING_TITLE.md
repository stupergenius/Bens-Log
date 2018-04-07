Title: RPI WORKING TITLE
Date: 2017-01-02 20:31
Author: Ben Snider
Category: Open Source Swift
Tags: swift,linux,raspberry pi

## rpi zero setup

* headless instructions: https://www.raspberrypi.org/forums/viewtopic.php?t=74176
* ^^ are almost complete, my default raspbian with pixel by default has SSH disabled. Just had to boot it up to the TV with a mouse hooked up. From the main toolbar -> Preferences -> Raspberry Pi Configuration -> Interfaces and enable SSH and whatever else (I also enabled VNC).
* Could probably do the above by running `sudo raspi-config`.
* Also take the time to set locale, timezone, etc.
* VNC server doesn't work with the default mac Screen Sharing program. But using the RealVNC VNC Viewer program works well enough:
  * https://www.realvnc.com/download/viewer/

## swift setup

* Pre-built Swift: https://www.uraimo.com/2016/12/30/Swift-3-0-2-for-raspberrypi-zero-1-2-3/
* Pre-reqs `apt-get install`: clang, libkqueue0, libpthread-workqueue0
