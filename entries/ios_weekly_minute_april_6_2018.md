---
title: iOS Weekly Minute - April 6, 2018
date: 2018-04-06 18:48
author: Ben Snider
category: Open Source Swift
tags: swift,linux,iOS
---

## Big Announcements

The big news in the Swift community is the announcement of the [Swift for Tensorflow](https://www.tensorflow.org/community/swift) project. It's being spearheaded by none other than Chris Lattner himself, and in the spirit of Swift and an "in the open" design and development process, he's already opened a public [Google Group](https://groups.google.com/a/tensorflow.org/forum/#!topic/swift/xtXCEvtDe5Q) where people are encouraged to subscribe and start contributing. I really appreciate the open and collaborative spirit of this project, which has been brought from the highly successful Swift Evolution process.

If you're just now hearing about Tensorflow, it's a machine learning framework and toolkit that supports a variety of machine learning models (notably, large "deep learning" convolutional neural networks) and platforms. It was originally developed by Google and is now open source. Tensorflow is commonly used in the context of interpreted languages (python, Lua, etc), so it's nice to see a modern strongly typed language like Swift become available for developers in the machine learning space. [The video](https://www.youtube.com/watch?v=Yze693W4MaU) (also linked below) in which the project was announced goes into some detail about the features we can expect: notebook like Playgrounds support for running models and visualizing results, compiler checked correctness, and compiler checked auto differentiation, to name a few.

I think this is great news for Swift developers, as it opens yet another avenue (in addition to CoreML) for machine learning on Apple platforms and beyond.

## Articles I'm Reading

With this past Sunday being April Fool's day, developer's didn't miss their chance to post articles with some unbelievable claims. Since tech news is a bit unbelievable to begin with these days, I feel like we've had to step up our game this year. Some highlights below:

### ZeroVer: The 0-based Versioning System

The [ZeroVer version system](https://0ver.org/zerover_0_based_versioning.html) page is a parody of other versioning systems (a la [semver.org](https://semver.org)) that that proposes:

> Your software's major version should never exceed the first and most important number in computing: zero.

What puts the icing on the cake for me, though, is the list of projects that are still at version 0. Some projects have literally been around for decades still haven't made the leap to 1.0 (looking at you, MAME). 😂

However, for a more serious and nuanced take on software versioning, [Designing a Version](https://sedimental.org/designing_a_version.html) is a good resource, wherein [CalVer](http://calver.org/) is originally proposed.

### How to cut Swift compile times by half

The parody article about a [hidden cryptominer inside the Swift compiler](https://www.hackingwithswift.com/articles/64/how-to-cut-swift-compile-times-by-half) perfectly threads the line between the preposterous and the realm of possibility. On the one hand, it's only a matter of time until some compiler toolchain is hijacked with a cryptominer (through a nefarious distribution or otherwise), but on the other hand... this is Swift we're talking about here! Is nothing sacred!

The article includes some fake interviews with (fake) Swift compiler team members, notably one "Ed Kermenek":

> Hahahaha – and you really thought type inference could be that slow? I thought the plan would fail early when some folks realized compiling was slower than Objective-C

## Swift Tip: Automatic Equatable and Hashable Synthesis in Swift 4.1

The release of Swift 4.1 in Xcode 9.3 brings with it [many new features](https://www.hackingwithswift.com/articles/50/whats-new-in-swift-4-1), but the feature that first caught my eye was the automatic `Equatable` and `Hashable` synthesis that was added in [SE-0185](https://github.com/apple/swift-evolution/blob/master/proposals/0185-synthesize-equatable-hashable.md). The gist of the new feature being that, so long as a type's properties are all themselves `Equatable` or `Hashable`, then simply making the type conform to `Equatable` or `Hashable` will cause the compiler to synthesize the necessary equality operator or hash function.

The big benefit here comes in the form of "robustness", in the sense that previously 1) modifying a type's properties didn't throw any sort of warning or error if the equality operator or hash function wasn't updated to suit (meaning runtime unit tests are the only means of enforcing correctness) and 2) that writing a performant *and correct* hash function is not trivial and can fail subtly when collection sizes exceed developer expecations.

So, Swift types that need to be `Equable` are simplied from this (with Swift 4.0):

```swift
struct Address: Equatable {
  let street: String
  let city: String
  ...

  static func ==(lhs: Address, rhs: Address) -> Bool {
    return lhs.street == rhs.street &&
      ...
  }
}
```

To this (with Swift 4.1):

```swift
struct Address: Equatable {
  let street: String
  let city: String
  ...
}
```

This was previously a compelling use case for [Sourcery](https://github.com/krzysztofzablocki/Sourcery) (a Swift metaprogramming framework), so it's interesting that this is now part of the compiler toolchain itself. This also follows along in the footsteps of `Codable` that was added in Swift 4.0, which is also implemented using compiler generated code based on protocol conformance and type content.

So... a trend starts to emerge where features are added to the language that are traditionally implemented using reflection or other runtime features, but are instead implemented with compiler autogeneration. The huge benefit of this approach is that the compiler can guarantee correctness and robustness at compile time, rather than waiting to find issues during runtime using a reflection system. And indeed, this is the direction that the Tensorflow work is taking (where finding issues at runtime can be quite costly): the compiler can offer features that are typically runtime based (like auto differentiation) to help find and suggest solutions to problems earlier in the dev cycle.

## Videos I'm Watching

### Writing Blockchain Clients in Swift

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Y5X4MlgnJbY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[Tamar Nachmany](https://twitter.com/tamarshmallows) explains the basics of blockchains (specifically Ethereum), as well as how to develop client apps that interact with a blockchain network. The big takeaway that I get is the opportunity that exists in the mobile space to make a big impact in the way that developers work with blockchain systems. There's not any big framework or initiative in the mobile space, so it's a good chance to make a big impact while the technology matures and becomes more stable over time. What's also striking is that the tooling is far better and more widely supported in JavaScript than really anywhere else. So, who will write the next Alamofire or CocoaPods for blockchains?

### Lattner's Swift for Tensorflow Announcement

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Yze693W4MaU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

The official announcement presentation at the 2018 [TensorFlow Dev Summit](https://www.tensorflow.org/dev-summit/). The video feels like a WWDC talk: a bit staged and rehearsed, but still exciting with solid content and appeal. See the opening section of this post for more links and info.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.
