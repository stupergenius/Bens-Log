---
title: iOS Weekly Minute - April 13, 2018
date: 2018-04-13 19:00
author: Ben Snider
category: Open Source Swift
tags: swift,linux,iOS
---

## Big Announcements

The biggest news to hit the community are the [global app store metrics](https://blog.appfigures.com/ios-developers-ship-less-apps-for-first-time/) collected by [appfigures](https://appfigures.com/) that show the absolute number of apps on the iOS App Store has decreased for the first time since the App Store debuted almost 10 years ago.

On it's face, this is somewhat striking, but if we take into account Apple's continued measures to reduce the amount of template, duplicate, spam, and malware apps on the iOS App Store, then the figures are not all too surprising. Indeed, is there really a perceptible difference between the 3.6 million apps on the Play store and the 2.1 million apps on the iOS App Store? At any rate, I view this as less of a market trend and more of a correction in the types of apps that Apple is willing to host.

However, there's some other interesting figures in the report. There's some compelling data on the presence and trend of non-native apps in the two app stores. Notably, Cordova appears to be by far the most popular non-native toolkit (surpassing even Unity), and React Native appears still nascent at just under 2% of all non-native apps. And, in the two years where data is available, the amount of non-native apps decreased for both platforms, but most notably on Android.

## Articles I'm Reading

### Using Higher order functions: A practical example in Swift

[Using higher order function](https://medium.com/infancyit/using-higher-order-functions-a-practical-example-in-swift-6f1028c733b3) breaks down a principle of functional programming that seems somewhat mystical at first glance. However, in practice it's an easy technique to implement in Swift that can make code more durable to change. Jahid puts it nicely in the article:

> I used [a] switch to determine which function to call in the tryLogin() function. The problem is that, as the number of calling functions increases that switch gets larger too. Also that tracking [changes] gets very messy if you want to modify functions.

### Using the Builder Pattern in Swift

[John Sundell](https://twitter.com/johnsundell) is at it again this time with an article on [applying the builder pattern to Swift](https://www.swiftbysundell.com/posts/using-the-builder-pattern-in-swift). What sells me here is the reduction of mutable side effects along with the reduction of public API surface area, all without losing the ability to apply configuration.

Plus, you can end up with a very readable and fluent API, as in the below snippet from the article:

```swift
let view = ArticleViewBuilder()
    .withTitle(article.title)
    .withSubtitle(article.subtitle)
    .withImage(article.image)
    .build()
```

## Swift Tip: Definite Initialization in Swift 4.1

With all the [coverage](https://www.hackingwithswift.com/articles/50/whats-new-in-swift-4-1) on the bigger features that landed in Swift 4.1, we can sometimes lose sight of the little things that can reduce friction when working with the language. To that end, [Slava Pestov's article](https://medium.com/@slavapestov/behind-the-scenes-improvements-in-swift-4-1-269dd56e30c2) exhaustively compiles all the little thing that might have otherwise gone unnoticed.

What's especially interesting to me is the improvement to *definite initialization* behavior. Swift 4.1 now lets us declare a variable without a value so long as the compiler can statically reason that the value is initialized prior to its use.

Something like the below is now possible:

```swift
// Swift 4.1
let x: String // Yay non-optional let 🙌
if y < 0 {
  x = "hello"
} else {
  x = "goodbye"
}
print(x)
```

Whereas previously this would have been:

```swift
// Swift 4.0
var x: String? // Gross optional 😜
if y < 0 {
  x = "hello"
} else {
  x = "goodbye"
}
print(x!)
```

## Videos I'm Watching

### Storyboard VS Code SpeedRun

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/bd2KSWLXo3A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

The video this week comes from [Brian Voong](https://twitter.com/buildthatapp) of [Let's Build That App](https://www.youtube.com/channel/UCuP2vJ6kRutQBfRmdcI92mA).

Brian does a great [speedrun](https://en.wikipedia.org/wiki/Speedrun) comparison to determine which is faster: building a UI with storyboard or building the same UI in pure Swift (with some [Autolayout helpers](https://www.youtube.com/watch?v=iqpAP7s3b-8)). I won't spoil it, but there's some interesting tradeoffs involved with both approaches, and it's always entertaining and enlightening to watch Brain build out a UI super quickly.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.
