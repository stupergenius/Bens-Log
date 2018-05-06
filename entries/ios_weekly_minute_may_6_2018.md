Title: iOS Weekly Minute - May 6, 2018
Date: 2018-05-06
Author: Ben Snider
Category: Open Source Swift
Tags: swift,linux,iOS

## Big Announcements

New this week is [an article](https://daringfireball.net/2018/04/scuttlebutt_regarding_ui_project) from Gruber outlining how Marzipan was never the name for the rumored cross-platform revamp for iOS and MacOS, and that instead of a new unified UI platform, what we'll likely get is a declarative framework that abstracts both AppKit and UIKit. After living with the Marzipan rumors so long, I think I'm mostly settled on the idea that MacOS and iOS do belong in their own lanes with their own UI/UX paradigms. Microsoft tried that with Windows on phones, tablets, and desktop, and eventually scaled it way back after a backlash from users, so Apple maybe is learning from competitors here.

However, the idea of a more declarative UI framework that abstracts the underlying platform is very interesting. Indeed, the web industry is going that way (or rather, is already at full bore), and it would be very nice for Apple to provide a better developer experience when developing native desktop and mobile software. Indeed, the revitalization may quell the need for such frameworks like Electron if building desktop apps gets easier by reducing friction through a declarative toolkit that many developers are familiar with and prefer. I'll also say that personally, going back and forth between React and native UIKit dev shows just how behind the times these native toolkits are, no matter how awesome Swift is.

So, instead of a unified OS and/or UI, what we'll get might actually make it easier to build apps on the platforms we know, instead of yet another platform to build for and support.

And, in some lighter news, it appears we've [uncovered the meaning](https://twitter.com/realbadiostips/status/974132679158390785) of this year's WWDC splash page. 😂

## Articles I'm Reading

### How to implement singletons in Swift the smart way

[Writing for Hacking With Swift](https://www.hackingwithswift.com/articles/88/how-to-implement-singletons-in-swift-the-smart-way), [Paul Hudson](https://twitter.com/twostraws) describes how to hide a singleton behind a Swift protocol. This reduces coupling and makes the consuming code a bit nicer to read and write. This technique decreases coupling, but it's still not foolproof to test since we'll still need to mock out the singleton itself in tests. So, I'd use this pattern when I've maybe got a vendor provided singleton and I don't want to pollute any other code with it. But, if you find yourself writing a singleton to provide shared use, then refactor to an implementation that's easier to test.

Also, this technique is fairly similar to the [cake pattern](https://www.hackingwithswift.com/articles/88/how-to-implement-singletons-in-swift-the-smart-way) technique that's common in Scala for dependency injection, so perhaps it could be adapted to make it easier to swap out implementations for testing.

### So Swift, So Clean Architecture for iOS

In a four-part series on [Clean Architecture for iOS](http://basememara.com/swift-clean-architecture/), [Basem Emara](https://twitter.com/basememara) provides quite an exhaustive tome on the topic. Within the series, topics covered include VIPER, routing, pluggable `AppDelegate`s, dependency injection, and cross-platform frameworks. Definitely worth a read if you're needing an architecture that will support a large, complex app and a large team. Otherwise, do yourself a favor and choose a more lightweight architecture. 😜

## Swift Tip: Strongly typed access to Info.plist file using Swift

It's fairly common to need to pull out config values from the `Info.plist` file, and each time I do it, it's like a choose your own adventure of traversing a dictionary of `[String: Any?]`. Avoiding this adventure is the topic of [Daniele Margutti](https://twitter.com/danielemargutti)'s article on using `Codable` to [access strongly typed Info.plist values](http://danielemargutti.com/2018/04/28/strongly-typed-access-to-info-plist-file-using-swift/).

Using Daniele's technique we can do something like:

```swift
struct ConfigPlist: Codable {
    public struct Config: Codable {
    	public let env: String
    	public let baseURL: URL
    	public let apiKey: String
    }
    
    public let config: Config
}

let plist = try! PlistFile<ConfigPlist>()
print("\(plist.data.config.env) URL is: \(plist.data.config.baseURL)")
```

## Videos I'm Watching

### Should Coders Design?

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/1f7sFJvJYqk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

We expect designers to be able to code, or to at least be fluent when talking with developers, but the inverse is never expressed. [Sash Zats](https://twitter.com/zats) flips the tables on developers, and explains the collaboration that is made possible when developers have more design experience.

I personally completed a short design training, and the things I came out of it with were 1) the knowledge that designers are at least as specialized as developers, 2) that knowing the lingua franca helps immensely when collaborating with designers, and 3) that having even a little credibility as a designer helps reduce friction when asking for edits or adjustments to visual specifications.

So, I'm 100% for developers learning more design concepts. 👩‍🎨

### Complete Guide to Flutter: How to Build a Real World App

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/S59b-XFsyY8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

I've seen various tutorials and videos on building apps with [Flutter](https://flutter.io), but most of them fall prey to the common trap in tutorials of building trivial "To Do" or single screen apps. However, [Brian Voong](https://twitter.com/buildthatapp) does what he does best, and builds a real world app!

Flutter looks like exciting tech, but it seems still a bit early in its lifecycle (just recently out of alpha) to put any more effort into than a quick POC or throwaway app. To me, the success of Flutter depends heavily on Google's move towards a platform other than the existing Android SDK to build apps, and that knowledge is likely not going to leave the Googleplex until Google's good and ready.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.
