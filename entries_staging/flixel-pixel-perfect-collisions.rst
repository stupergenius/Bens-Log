Flixel Pixel Perfect Collisions
###############################
:date: 2010-01-31 23:13
:category: Development
:tags: Actionscript, Flash, Flex, Game Dev

I haven't found a decent source of information about this on the
interwebs so I thought I'd share my findings. Flixel doesn't have any
built in pixel perfect collision support, it just assumes that you are
using square (or at least rectangle) sprites and don't use any rotation.
Well, that's not entirely a real world assumption so some of us will
have to dig around and implement something ourselves. Hence, the below
class. The class I developed is a simple override of the base FlxSprite
class with some modifications to its collision detection system. It
takes advantage of the fact that each sprite has its own set of
BitmapData in its own coordinate space, which the framework uses to blit
to the main screen `BitmapData`_. BitmapData objects in Flash provide us
with a native implementation (in the Player AFAIK) of per pixel
collision detection, using the `hitTest`_ method. The hitTest method
takes 5 parameters, but we only really care about the first 4. The first
parameter we pass it defines where the calling BitmapData object is in
screen space, i.e. the sprite's (x,y) coordinates. We then pass it a
threshold alpha value, 0 being transparent and 255 being opaque. If you
want semi-transparent regions of your sprite to collide then set this to
something lower than 255 (0xFF is the hexadecimal representation of
decimal 255). The third parameter is the colliding sprite's BitmapData
object. And the fourth is the colliding sprite's (x,y) coordinates in
screen space. I have abstracted this into the class's structure, so the
overridden functions handle everything. You can use another alpha
threshold by setting the sprite's *alphaThreshold* value to something
valid, as explained above. You can also disable this pixel perfect
collision detection method per technique by either setting
*doPerfectCollide* or *doPerfectOverlap* to false. Because there are two
methods Flixel uses to detect collisions, the class implements enhanced
versions of both, and allows you to disable either independently. Note
that, in order for the collision detection to be pixel perfect, either
a) both colliding objects must subclass PPlxSprite or b) the sprite
calling *overlaps* or *collide* must sublcass PPlxSprite and the
colliding sprite must have a single frame. This is due to fact that the
original FlxSprite class does not expose the *\_framePixels* BitmapData
object which is needed to collide the objects with the frame that is
currently displayed. When a FlxSprite is collided with a PPlxSprite and
the perfect collision is enabled, the exposed *\_pixels* BitmapData is
used, which contains the entire sprite sheet, so collisions are detected
against all frames, not just the frame displayed. However, changing
existing sprite's to use this class is easy enough so as not to cause
problems. Note also that we only call the hitTest method when we know
there is already a bounding box collision, so as not to waste CPU
cycles. The native hitTest method is fast but probably not fast enough
to call every frame, which would be wasteful in any case. Below is the
PPlxSprite class which override the collision methods to provide pixel
perfect collisions.

.. code:: actionscript

    import flash.display.BitmapData;
    import flash.geom.Point;

    import org.flixel.FlxCore;
    import org.flixel.FlxSprite;

    public class PPlxSprite extends FlxSprite {
        
        public var alphaThreshold:uint = 0xFF;
        public var doPerfectOverlap:Boolean = true;
        public var doPerfectCollide:Boolean = true;
        
        protected var _corePos:Point = new Point();
        protected var _thisPos:Point = new Point();
        
        public function PPlxSprite(X:int=0, Y:int=0, SimpleGraphic:Class=null) {
            super(X, Y, SimpleGraphic);
        }
        
        public function get framePixels():BitmapData { return this._framePixels; }
        
        override public function overlaps(Core:FlxCore):Boolean {
            var doesOverlap:Boolean = super.overlaps(Core);
            if (doesOverlap && this.doPerfectOverlap && Core is FlxSprite) {
                doesOverlap = this.perfectCollision(FlxSprite(Core));
            }
            return doesOverlap;
        }
        
        public function perfectCollision(Sprite:FlxSprite):Boolean {
            this._corePos = Sprite.getScreenXY(this._corePos);
            this._thisPos = this.getScreenXY(this._thisPos);
            
            var corePixels:BitmapData;
            if (Sprite is PPlxSprite) {
                corePixels = PPlxSprite(Sprite).framePixels;
            } else {
                // i guess other standard FlxSprites are boned if they are animted
                corePixels = Sprite.pixels;
            }
            
            return this._framePixels.hitTest(this._thisPos, this.alphaThreshold, corePixels, this._corePos);
        }
        
        override public function hitWall(Contact:FlxCore=null):Boolean { return this.hitSomething(Contact); }
        override public function hitFloor(Contact:FlxCore=null):Boolean { return this.hitSomething(Contact); }
        override public function hitCeiling(Contact:FlxCore=null):Boolean { return this.hitSomething(Contact); }
        
        public function hitSomething(Contact:FlxCore):Boolean {
            var didHit:Boolean = true;
            if (this.doPerfectCollide && Contact is FlxSprite) {
                didHit = this.perfectCollision(FlxSprite(Contact));
            }
            
            return didHit;
        }
    }

Here I have overriden the core FlxSprite methods that are responsible
for collision detection, those methods being overlaps and the hit family
of methods. Overlaps gets called when you explicitly issue a
sprite.overlaps(otherSprite); This is a simple override that adds
functionality to the super overlaps method, namely, calling the pixel
perfect detection method and returning its results. The hit family of
methods are called after calling the collide family of methods,
including collideArray and the like. The collide methods, when they have
detecting a bounding box collision, call the hit family of methods,
depending on the location of the collision, which return a boolean. If
the called hit method implemented by the sprite returns false, the
collide method aborts and reports that it didn't collide after all. This
is the behavior on which the above hit methods rely, and return false
when it detects that while a bounding box collision may have occurred,
the pixels in either sprite have not collided. A short usage class
follows.

.. code:: actionscript

    public class SomeSprite extends PPlxSprite {

        // Embed sprite image.
        
        public function SomeSprite(X:Number, Y:Number):void {
            super(X, Y);
            // Load sprite image, and other sprite stuff
        }

        override public function hitWall(Contact:FlxCore):Boolean {
            if (super.hitWall(Contact)) {
                this.hurt(1);
                return true;
            }
            return false;
        }
    }

Here, all we do is simply extend the PPlxSprite class from above, and do
what we normally do for sprites. We also decide to do something special
when a character hits a wall, namely, get hut. To do this we override
the hitWall method, call the super hitWall (which would be the
PPlxSprite hitWall) method, and depending on its return value, we either
get hurt or do nothing. We don't need to do anything special for calling
the overlaps method, as this will simply call PPlxSprite overlaps
method. So, hopefully this is helpful for someone looking to do this, or
at least someone can find the ideas listed here useful. Let me know if
you used it and if you find any bugs, improvements, or have any other
suggestions.

.. _BitmapData: http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/display/BitmapData.html
.. _hitTest: http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/display/BitmapData.html#hitTest()
