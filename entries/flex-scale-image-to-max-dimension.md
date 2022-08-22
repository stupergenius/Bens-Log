---
category: Development
date: 2010-01-11 18:21
tags: 'As3, Flash, Flex, Image, Scaling'
title: Flex Scale Image to Max Dimension
---

Recently had a problem where I needed to display images as large as
possible within given bounds. So I made a handy little function that
computes the scaling needed so that the image, if it is larger than any
of the bounds, is scaled so that its largest dimension becomes equal to
the given maximum. This function scales the image proportionally so it
won't skew it.

```actionscript
public function scaleImageToMaxDimension(img:Image, maxWidth:Number, maxHeight:Number):void {
    var scaleH:Number=1, scaleV:Number=1;
    if (img.content.height > maxHeight) {
        scaleV = maxHeight / img.content.height;
    }
    if (img.content.width > maxWidth) {
        scaleH = maxWidth / img.width;
    }
    img.scaleX = img.scaleY = Math.min(scaleH, scaleV);
}
```

Flex doesn't do a terribly good job of resizing images, however, but it
works for images that just need to be tweaked to fit. If you have
control over your images and your display size, it is always best to
resize them as needed to save space/bandwidth and preserve quality. This
approach works best when you have little or no control over either. In
application this code would be used after the image has finished
loading. So for example I might do something like the following:

```actionscript
import flash.events.Event;
import mx.controls.Image;

public class Test {
    public var image:Image;

    // pretend scale function is here

    public function Test {
        image = new Image();
        image.addEventListener(Event.COMPLETE, imageComplete, false, 0, true);
        image.load('http://www.google.com/intl/en_ALL/images/logo.gif')
    }

    private function imageComplete(event:Event):void {
        scaleImageToMaxDimension(image, 100, 100);
    }
}
```
