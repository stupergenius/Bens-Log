---
category: Development
date: 2010-01-12 11:17
tags: 'Actionscript, Flex, Bitmapdata, Flash, Transparent'
title: Flash Draw Transparent BitmapData
---

Recently ran into an issue where I thought I should have been drawing a
transparent BitmapData object, but the resulting object had a white
background. The original incorrect code was the following:

```actionscript
var bd:BitmapData = new BitmapData(w, h, true);
```

The third boolean argument to the function is a transparency flag, and
here it is set to true. However, when creating a Bitmap object from this
BitmapData object and adding it to the display list, it clearly has a
white background instead of being transparent. To remedy this, the
solution is to pass along to the function a 32bit color value where the
alpha value is zero. The following code illustrates this solution:

```actionscript
var bd:BitmapData = new BitmapData(w, h, true, 0x00000000);
```

This will create a totally transparent BitmapData object on which you
can draw whatever you desire. In practice I use this to determine the
alpha values of a given pixel in a given display object. The following
function implements this technique:

```actionscript
public static function getAlphaAt(d:DisplayObject, x:Number, y:Number):Number {
    // Even though we set transparent to true, we still need to use a transparent color.
    // This is easily done by setting alpha to 0; the RGB octects after that don't matter.
    var bd:BitmapData = new BitmapData(d.width, d.height, true, 0x00000000);
    bd.draw(d);
    return (bd.getPixel32(x, y) >> 24 & 0xFF)/255;
}
```
