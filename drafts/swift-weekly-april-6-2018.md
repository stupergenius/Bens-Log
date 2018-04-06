Title: Swift Weekly - April 6, 2018
Date: 2018-04-05 00:48
Author: Ben Snider
Category: Open Source Swift
Tags: swift, linux, iOS, Apple

## Big Announcements

Swift Tensorflow support.

* [Google Group](https://groups.google.com/a/tensorflow.org/forum/#!topic/swift/xtXCEvtDe5Q)
* [TensorFlow Community](https://www.tensorflow.org/community/swift)

## Articles I'm Reading

With this past Sunday being April Fool's day, developer's didn't miss their chance to post articles with some unbelievable claims. Since tech news is a bit unbelievable to begin with these days, I feel like we've had to step up our game this year. Some highlights below:

### ZeroVer: The 0-based Versioning System

The [ZeroVer version system](https://0ver.org/zerover_0_based_versioning.html) TODO.

For a more serious and nuanced take, [Designing a version](https://sedimental.org/designing_a_version.html) is a good resource, wherein [CalVer](http://calver.org/) is originally proposed.

### How to cut Swift compile times by half

The [titular article](https://www.hackingwithswift.com/articles/64/how-to-cut-swift-compile-times-by-half) perfectly threads the line between the preposterous and the realm of possibility. On the one hand, it's only a matter of time until some compiler toolchain is hijacked with a cryptominer (through a nefarious distribution or otherwise), but on the other hand... this is Swift we're talking about here! Is nothing sacred!

The article includes some fake interviews with (fake) Swift compiler team members, notably one "Ed Kermenek":

> Hahahaha – and you really thought type inference could be that slow? I thought the plan would fail early when some folks realized compiling was slower than Objective-C

## Swift Tip: Automatic Equatable and Hashable Synthesis in Swift 4.1

The release of Swift 4.1 in Xcode 9.3 brings with it [many new features](https://www.hackingwithswift.com/articles/50/whats-new-in-swift-4-1), but the feature that first caught my eye was the automatic `Equatable` and `Hashable` synthesis that was added in [SE-0185](https://github.com/apple/swift-evolution/blob/master/proposals/0185-synthesize-equatable-hashable.md). The gist of it being that, so long as a type's properties are all themselves `Equatable` or `Hashable`, then simply making the type conform to `Equatable` or `Hashable` will cause the compiler to synthesize the necessary equality operator or hash function.

The big benefit here comes in the form of "robustness", in the sense that previously 1) modifying a type's properties didn't throw any sort of warning or error if the equality operator or hash function wasn't updated to suit (meaning runtime unit tests are the only means of enforcing correctness) and 2) that writing a performant *and correct* hash function is not trivial and can fail subtly when collection sizes exceed developer expecations.

So Swift types that are `Equable` are simplied from this (Swift 4.0):

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

To this (Swift 4.1):

```swift
struct Address: Equatable {
  let street: String
  let city: String
  ...
}
```

This was previously a compelling use case for [Sourcery](https://github.com/krzysztofzablocki/Sourcery) (a Swift metaprogramming framework), so it's interesting that this is now part of the compiler toolchain itself.

## Videos I'm Watching

### Writing Blockchain Clients in Swift

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Y5X4MlgnJbY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[Tamar Nachmany](https://twitter.com/tamarshmallows)

* huge opportunity for mobile to dramatically change how iOS developers write blockchain apps
* oddly JS tooling is better than native tooling
* what is the alamofire or cocoapods of blockchain development
* lots of space to make a big impact
* good overview of ethereum and how a client is manifested in iOS

### Lattner's Swift for Tensorflow Announcement

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Yze693W4MaU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

The official announcement presentation at the 2018 [TensorFlow Dev Summit](https://www.tensorflow.org/dev-summit/). The video feels a bit like a WWDC talk: a bit staged and rigid but still exciting with good content. See the [Big Announcement section](#Big-Announcements) section for more info.


