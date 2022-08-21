---
title: iOS Weekly Minute - March 30, 2018
date: 2018-03-30 18:40
author: Ben Snider
category: Open Source Swift
tags: swift,linux,iOS
---

Back on track this week with some small refinements. Enjoy!

# Big Announcements

## Apple Education Event

[Apple' Spring Event](https://www.apple.com/apple-events/march-2018/) was held in a Chicago school this week, with a focus on all things education. Nothing much groundbreaking, really. A new, cheaper, and upgraded [9.7" iPad](https://www.apple.com/ipad-9.7/) with support for the Apple Pencil, a new and cheaper [Crayon pencil from Logitech](https://www.logitech.com/en-us/product/crayon), some software updates to the [iWork suite](https://www.theverge.com/2018/3/27/17156316/apple-iwork-smart-annotation-pages), and the [Schoolwork app](https://www.apple.com/education/teaching-tools/) for teachers. Sadly, the Crayon appears to only be available to the education market, and will not be available for general retail.

Apple also announced [ClassKit](https://developer.apple.com/classkit/), which will be released in Xcode 9.4 supporting iOS 11.4. From the small amount of information available about ClassKit, it appears to allow app integration with the newly announced Schoolwork app.

# Articles I'm Reading

## Google v. Oracle Ruling

In somewhat related but rather depressing news is that Oracle has [won its appeal over Google](https://www.bloomberg.com/news/articles/2018-03-27/oracle-wins-revival-of-billion-dollar-case-against-google) in the landmark case concerning Oracle's rights over the Java API. Google's push for Kotlin is perhaps more important than ever now, and Microsoft's strategy to abandon Java for C# long ago has paid off quite nicely. The crux of the case revolves around [copyrights on interfaces](https://techcrunch.com/2015/11/03/copyright-captures-apis-a-new-caution-for-developers/) (or APIs), and whether or not an implementation of an interface constitutes "fair use" or not.

## Show and Tell

After the perceived letdown of the Apple education event this week, [Dim Sum Thinking](https://dimsumthinking.com/) writes a quite elegant and persuasive essay titled [Show and Tell](https://dimsumthinking.com/Blog/2018/03/28-ShowAndTell.html). The essay's about the power of shipping software, and the power that is releasing a personal creation into the real world, no matter how trivial or how mundane it is.

# Swift Tip: Generic Typealiases and Using Tuples as Lightweight Types

I don't know how [John Sundell](https://twitter.com/johnsundell) produces so much quality output, but I hope he keeps doing it! This week's tip is a powerful little trick that uses [tuples as lightweight types](https://www.swiftbysundell.com/posts/using-tuples-as-lightweight-types-in-swift) along with a [generic typealias](https://twitter.com/johnsundell/status/979059265238388739).

```swift
typealias Pair<T> = (T, T)

func unionize(workers: Pair<Workers>) -> Union { ... }
func pair(programmers: Pair<Programmer>) { ... }
```

John's post goes into much more detail around tuples, and it gets pretty mind-bending, but in general it's nice to be reminded of a very useful language feature.

# Videos I'm Watching

## Kotlin For Swift Developers

Continuing on the [try! Swift](https://www.youtube.com/playlist?list=PLCl5NM4qD3u92PwamgwWr3e_j3GmKRVTs) bandwagon this week is [Ellen Shapiro's](https://twitter.com/designatednerd) talk on [Kotlin For Swift Developers](https://www.youtube.com/watch?v=JK2s6n80Sl8). Kotlin is becoming more front and center in the Android world (see the above Oracle case for possible reasons), just like Swift has become for Apple software. This video is a great overview of Kotlin from a Swift perspective, compares and contrasts the languages, and in general helps Swift developers get more familiar with Kotlin so we can have better discourse with our Android counterparts. I rather like Kotlin, and there's certainly some things Swift could learn from it.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.