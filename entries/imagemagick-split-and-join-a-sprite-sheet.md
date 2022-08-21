---
category: Development
date: 2010-02-09 18:03
tags: 'Game Dev, Linux, Shell Scripting'
title: ImageMagick Split and Join a Sprite Sheet
---

Continuing the [Flixel](http://wiki.github.com/AdamAtomic/flixel/) theme
that seems to be brewing here, I found a good way to transform images
from full dimension art to sprite sheets. This is useful when converting
an image into a sheet compatible with the Flixel tile and map system. In
my case I am using it to split up background images so I can use them in
[Flan](http://www.tbam.com.ar/utility--flan.php), the Flixel map editor.
I'm just using the standard
[ImageMagick](http://www.imagemagick.org/script/index.php) tools
*[convert](http://www.imagemagick.org/script/convert.php)* and
*[montage](http://www.imagemagick.org/script/montage.php)* to split and
join the images, as well as some bash-fu to sort files properly. I am
using [Cygwin](http://www.cygwin.com/) to get bash tools on my Windows
machine. The first command is used to split up the main image. The only
constraints here are that the resulting tiles must be square, and that
they don't exceed the width limit for Flash
[BitmapData](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/display/BitmapData.html)
objects. So here we simply are cropping the image into square tiles.

```bash
convert full.png -crop 32x32 tiles.png
```

This will spit out a bunch of images in the current folder named
tiles-%d.png where %d is the 0 based index of the tile. This also
assumes that the width and height of the full.png image are divisible by
32 without remainder. The next command we need is to stitch the images
back together. For this we will use the handy *montage* tool to tile the
images into one big sheet. We just pass it a sorted list of names and
tell it to make 1 row with as many columns as it needs (the x1
parameter). Sorting is not entirely necessary but using the default bash
globbed format will result in tiles that should be at the end of the
image randomly at the beginning (try it before this step by noting the
output of \`ls tiles\*.png\`).

```bash
files=$(ls tiles*.png | sort -t '-' -n -k 2 | tr '\n' ' ')
montage $files -tile x1 -geometry 32x32+0+0 sheet.png
```

If all went well we should see, inside the current directory, an image
with all of our separate tile sprites in a single row in order from the
original image from left to right and top to bottom. This technique is
also useful for converting "liberated" sprite sheets that have more than
one row, into single row sprite sheets that flixel can handle out of the
box.
