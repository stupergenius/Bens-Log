Title: iOS Weekly Minute - March 24, 2018
Date: 2018-03-24 10:40
Author: Ben Snider
Category: Open Source Swift
Tags: swift,linux,iOS

A bit of a day late and a dollar short on this one, but I'm mixing up the format and trying to streamline how I actually gather this content. Turns out it's not an insignificant amount of work, but it's work I was already doing (reading and consuming content), now I just need to curate and organize it a bit better.

# Big Announcements

## Watson CoreML Integration

The biggest news this week, to me, was the announcement of the [Watson CoreML integration](https://developer.apple.com/ibm/). I haven't had a chance to tinker with this yet, but it seems to address one of the bigger problems with CoreML: that there's no builtin/easy way to re-train and update a local model without shipping a new version of the app with a bundled model. The Watson solution allows the app to update the local model with a new version that has been re-trained in the Watson developer cloud. There doesn't seem to be builtin support to allow the app to provide feedback (about new samples and/or inference correctness), but perhaps that can be better accomplished out of band from the inference itself.

They've already published a decent amount of [docs](https://watson-developer-cloud.github.io/swift-sdk/swift-api/services/VisualRecognitionV3/index.html#visual-recognition) and [sample code](https://github.com/watson-developer-cloud/visual-recognition-coreml) already, and it looks like it's ready to rock.

# Articles Worth Sharing

## How do we tell truths that might hurt

In the timeless, brutal style that really only Dijkstra can pull of [comes a piece](https://www.cs.virginia.edu/~evans/cs655/readings/ewd498.html) that is quite prescient. A good old school truth telling can't hurt once in a while. Also... he seems to have no lost love for IBM and the class of business processing languages like COBOL and APL (nor indeed any "natural language" programming environment). I think my favorite quote (burn!) is:

> We can found no scientific discipline, nor a hearty profession on the technical mistakes of the Department of Defense and, mainly, one computer manufacturer.

But the following also rings very true:

> The tools we use have a profound (and devious!) influence on our thinking habits, and, therefore, on our thinking abilities.

## Swift Tip: Lazy Infinite Sequences

From the dogged Swift wizards at [objc.io](https://www.objc.io/) come a really magical [Swift Tip](https://www.objc.io/blog/2018/03/20/lazy-infinite-sequences/) describing how to use lazy sequences for great readability and expressivity without sacrificing performance. Bonus points also given because it's a really elegant looking bit of code:

```swift
let result = (1...)
   .lazy
   .map { $0 * $0 }
   .first(where: { $0 > 100})
```

The above code simply returns the first square larger than 100.

# Videos I'm Watching

Both of the videos this week come from the 2018 round of the always excellent try! Swift conference, held in Tokyo this year. The videos are being released at a decent pace through their [Youtube playlist](https://www.youtube.com/playlist?list=PLCl5NM4qD3u92PwamgwWr3e_j3GmKRVTs). I highly recommend subscribing to the playlist to be notified of all the excellent talks to come out of this conference.

## Super Resolution with CoreML

Developer [@kenmaz](https://twitter.com/kenmaz) in a [video from try! Swift 2018](https://youtu.be/E65lXzau_0Y) explains how he was able to use CoreML to perform the [Super Resolution](https://arxiv.org/abs/1501.00092) deep learning technique on manga images to reduce the size of images sent over the wire to mobile apps, without sacrificing on image quality. A really novel use of CoreML and one of the more interesting real world use cases I've seen. Top notch.

## Investing time into developer tools and experience

The venerable [@Krzysztof Zabłocki](https://twitter.com/merowing_) (of [Sourcery](https://github.com/krzysztofzablocki/Sourcery) fame) [gives a rousing talk](https://youtu.be/yAQQ0cIxSF8) on developer productivity and developer tooling. I'm reminded of the [Twitter Engineering Effectiveness article](http://www.gigamonkeys.com/flowers/) on the same topic. They come to the same conclusion: that developer experience is often left to the wayside, but when it becomes part of the focus of an organization, that a really striking amount of productivity and creativity can happen.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.