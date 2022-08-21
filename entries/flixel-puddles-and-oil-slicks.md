---
category: Development
date: 2010-01-18 17:46
tags: 'Actionscript, Flash, Flex'
title: Flixel Puddles and Oil Slicks
---

I've been using the super cool
[Flixel](http://wiki.github.com/AdamAtomic/flixel/) framework to make a
game and it's quite handy for most things. The game I'm working on is
basically a top down...ehh, well let's just say it's top down. :) I can
post more details when the game is actually released. As a category, top
down and platformer games in general usually have some type of movement
modification obstacles. These obstacles allow the player to pass through
them, so they don't stop the player from moving, but they somehow alter
the player's course by speeding up, slowing down, or sending the player
in a different direction. In my case, these obstacles are oil slicks and
water puddles, which speed up and slow down the player in whatever
direction they are traveling. Here I will cover how I solved speeding up
and slowing down the player when he crosses over such an obstacle. Below
is a skeleton of my main player class:

```actionscript
package sprites {
   import org.flixel.FlxG;
   import org.flixel.FlxSprite;

   public class Player extends FlxSprite {

       [Embed(source="player.png")] private var Img:Class;

       protected var _runSpeed:Number = 100;

       public var velocityFactor:Number = 1;

       public function Girl(X:int=0, Y:int=0) {
           super(Img, X, Y, true, false, 58, 58);

           drag.x = this._runSpeed * 8;
           drag.y = this._runSpeed * 8;

           maxVelocity.x = this._runSpeed;
           maxVelocity.y = this._runSpeed;

           ...
       }

       override public function update():void {
           // MOVEMENT
           acceleration.x = acceleration.y = 0;
           this.maxVelocity.x = this._runSpeed * this.velocityFactor;
           this.maxVelocity.y = this._runSpeed * this.velocityFactor;
           if (FlxG.keys.UP) {
               acceleration.y -= drag.y;
           }
           // And similarly for all 4 key directions
           ...

           super.update();
       }
   }
```

> }

Using this player class, we can see that by modifying the velocityFactor
instance variable, we can effectively control how fast the player can
move around the screen. By setting velocityFactor equal to a value less
than one, we decrease the player speed, and by setting it equal to a
value greater than one we increase the player speed. So what we need now
is a way to modify this value externally in response to player
interaction with the world, namely, the player stepping onto a puddle or
an oil slick. We also need sprites that define how they should change
the player movement when they are stepped over. Below is a skeleton of
one of my obstacle classes:

```actionscript
package sprites.obstacles {
    import org.flixel.FlxG;
    import org.flixel.FlxSprite;

    public class SpawnerObstacle extends FlxSprite {

        public function get playerVelocityFactor():Number { return 2; }

        [Embed(source="spawner.png")] private var SpawnerImg:Class;

        public function SpawnerObstacle(X:int=0, Y:int=0) {
            super(SpawnerImg, X, Y, true, false, 24, 24);

            this.fixed = true;
        }

    }
}
```

Here is just a simple implementation of a FlxSprite class where we
define that this sprite, when stepped over, speeds up the player by a
factor of 2. Below are the relevant parts of the update() method in my
main PlayState class.

```actionscript
this._player.velocityFactor = 1;
for each (sprite in this._obstacles) {
    if (this._player.overlaps(sprite)) {
        trace('modifying player velocity');
        this._player.velocityFactor = obstacle.playerVelocityFactor;
        break;
    }
}
```

Here we loop over the obstacle sprites in the \_obstacles array. This
array would be created whenever you initialize the obstacles for the
game. The obstacles themselves, in this case, are instances like the
above SpawnerObstacle class, which have a playerVelocityFactor getter
attached. In the beginning, we make sure that we set the player's
velocityFactor to 1 so that the player moves at the default speed in the
case that they are not on top of an obstacle sprite. We also break out
of the loop when we collide with a single obstacle sprite to avoid any
extra complexity. We could make it so that we average the velocity
factors when multiple obstacle sprites are encountered, but I don't have
this use case so it would be unnecessary. When all these parts are in
place and working in conjunction, we have a game that satisfies our
original goal. When the player collides with one of our obstacles
sprites, he is either sped up or slowed down, depending on the velocity
factor defined by the colliding sprite. If I get any less lazy (highly
unlikely) I'll post an example swf with source code.
