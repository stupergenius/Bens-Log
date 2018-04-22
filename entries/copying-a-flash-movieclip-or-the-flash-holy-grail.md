---
category: Development
date: '2009-05-15 19:41'
tags: 'Actionscript, C/C++, Flash, Flex'
title: 'Copying a Flash MovieClip, or The Flash Holy Grail'
---

Ran into a nice solution for copying arbitrary MovieClips at runtime
today. I am designing a spot the difference game akin to [6
Differences](http://www.kongregate.com/games/Ivory/6-differences) with
the requirement that, upon finding a difference, the scene should go to
the "correct" state depending on which difference was defined as master,
among a few other criterion. This required that I somehow duplicate, as
much as is possible, the state of the "master" difference, when
appropriate. At any rate, the solution comes from [Danny Burbol's
blog](http://www.dannyburbol.com/2009/01/movieclip-clone-flash-as3/),
which apparently came from a [Experts Exchange
thread](http://www.experts-exchange.com/Software/Photos_Graphics/Web_Graphics/Macromedia_Flash/Q_22684629.html)
(damn people charging for information). I modified the solution a bit to
fit my needs, but not by a whole lot. Sometimes I only need to copy the
instance and I can reconstitute the MovieClip from there but other times
I will need to get the whole shebang. It's pretty handy in general. So
my version follows (as a bonus I include my handy-dandy clearAllChildren
function):

``` {.sourceCode .actionscript}
package com.bmm.utils {
  import flash.display.DisplayObject;
  import flash.display.DisplayObjectContainer;
  import flash.geom.Rectangle;

  /**
   * ...
   * @author BenS
   */
  public class UIUtils {

    public static function clearAllChildren(c:DisplayObjectContainer):void {
      if (c == null || c.numChildren == 0) return;

      var i:int = 0, n:int = c.numChildren;
      for (i = 0; i < n; i++) {
        c.removeChildAt(0);
      }
    }

    public static function simpleDisplayObjectClone(source:DisplayObject):DisplayObject {
      var cc:Class = Object(source).constructor;
      return new cc();
    }

    public static function displayObjectClone(source:DisplayObject):DisplayObject {
      var copy:DisplayObject = UIUtils.simpleDisplayObjectClone(source);

      copy.transform = source.transform;
      copy.filters = source.filters;
      copy.cacheAsBitmap = source.cacheAsBitmap;
      copy.opaqueBackground = source.opaqueBackground;
      if (source.scale9Grid) {
        var r:Rectangle = source.scale9Grid;
        copy.scale9Grid = r;
      }

      return copy;
    }
  }
}
```
