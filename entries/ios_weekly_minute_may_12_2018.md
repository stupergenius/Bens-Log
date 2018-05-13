Title: iOS Weekly Minute - May 12, 2018
Date: 2018-05-12
Author: Ben Snider
Category: Open Source Swift
Tags: swift,linux,iOS

## Big Announcements

Well, it's not huge news, but Apple's about to start [requiring apps to be built with the iOS 11 SDK](https://developer.apple.com/news/?id=05072018a). They do this every year, reasonably close to WWDC, but different this year is the requirement that "all iOS app updates submitted to the App Store must ... **must support the Super Retina display of iPhone X**." This is big news if it means that apps now need to support the edge to edge display of the iPhone X. If you haven't already, now seems like a *great* time to start [updating your apps to support the iPhone X](https://developer.apple.com/ios/update-apps-for-iphone-x/). Maybe this finally means we'll get versions of Google's apps that support the iPhone X. 😂

In other non-Apple but fully awesome news, both Microsoft and Google hosted their respective developer conferences this past week. Not much came out of Build that seemed interesting to me, so if ya'll got some juicy bits, let me know!

Among the Google I/O announcements I'm looking forward to are trying out [Jetpack](https://developer.android.com/jetpack/), kicking the tires on the newly announced [MLKit](https://developers.googleblog.com/2018/05/introducing-ml-kit.html) with Firebase integration, maybe dabbling with the newly fused [ARCore for Android & iOS](https://arstechnica.com/gadgets/2018/05/google-arcore-1-2-enables-shared-ar-experiences-across-android-and-ios/), the updates to the [Material Design Components for iOS](https://material.io/develop/ios/), and digesting the new Flutter videos. As a user I'm pretty jazzed about the new [Linux support coming to Chromebooks](https://www.androidauthority.com/chromebook-linux-apps-863253/) (which will eventually [include Android Studio](https://developer.android.com/topic/arc/studio) 😲), seeing how well Google's [gesture controls](https://www.androidauthority.com/android-p-gesture-controls-i-o-2018-863105/) work in comparison to the iPhone X, the amazing new [Lens app](https://www.androidauthority.com/google-lens-camera-app-863117/), and clearly I'll have to try [Duplex](https://www.youtube.com/watch?v=bd1mEm2Fy08)...

## Articles I'm Reading

### Swinjecting a Large Project

[Derek Clarkson](https://twitter.com/d4rkf1br3) writes about [how to use Swinject in a large app](http://drekka.ghost.io/swinjecting-a-large-project/), with some good tips and tricks along the way. I use Swinject, but not in this way, and I didn't actually know about the storyboard support for view controllers. I'll definitely be using this article as a reference if I need to update my existing Swinject implementations, or any new larger projects I start.

### Dealing With Dates

Every now and again, I think all iOS developers need reintroduced into [handling dates](http://martiancraft.com/blog/2018/05/dealing-with-dates/), and the vagaries therein. Writing for [Martiancraft's Syndicate](http://martiancraft.com/blog.html), [Richard Turton](https://twitter.com/richturton) takes us back down memory lane (or... imprints new memories) and reminds us that:

> [A Date] only holds one piece of data - a number of seconds. ... A Date does not contain any information about months, days, years, hours, minutes, or time zones.

🤔

## Swift Tip: Unwrapping Solutions

Erica's [poll on Optional unwrapping solutions](https://ericasadun.com/2018/05/10/straw-poll-unwrapping-solutions/) wasn't intended to purvey a Swift tip, but I took one away anyway! Unwrapping an optional is something that Swift developers do on a very frequent basis. But, sometimes you really need a value to be present for that optional, and if there isn't a value present, you really can't continue on with the program execution.

Typically, in various Swift codebases, you'll see something like:

```swift
// Bad
let viewModel = Container.resolve(MyViewModel.Self)!

// Better
guard let viewModel = Container.resolve(MyViewModel.Self) else {
	fatalError("Yeah... gonna need a view model here, mmk, thanks.")
}
...	
```

In the above, we declare that we require the view model to resolve to continue execution. However, in the "bad" version we're not really declaring why we 1) need this thing and 2) how or if we can guarantee that the view model will always resolve. This gets a little better in the "better" version, but it's all too easy to slip in the former "bad" version. It's also quite verbose and having this pattern repeat can lead to a littering of `guard let` expressions everywhere.

But! The [bang bang operator proposal](https://github.com/erica/swift-evolution/blob/44988809868eaf39dac2f35c09fb741e77f95aba/proposals/XXXX-bangbang.md) is here to save us.

If the `!!` operator is accepted, we'll be able to turn the above example into something like:

```swift
// Optional's Best Life
let viewModel = Container.resolve(MyViewModel.Self) !!
	"Dude... where's my view model..."
```

This is 1) more concise, 2) follows the same pattern as the existing force unwrap, and 3) still does it what we need it to: convey meaning while enforcing program correctness. 👩‍🔬

## Tool of The Week

### quicktype

Yes... it took a [Kotlin article](https://blog.quicktype.io/kotlin/) for me to find out about the amazing [quicktype](https://quicktype.io/#hello) tool for generating model and (de)serializer implementations from just pure JSON. The tool supports a variety of languages, including both Swift and Kotlin. The Swift version generates some very nicely structured `Codable` implementations, along with some optional client implementations (`URLSession` and `AlamoFire`). And, you actually don't need to download anything since they host a really nice [playground editor](https://app.quicktype.io/?share=jzdVcZp14dk1RPT9Ouca) for generating implementations. But, they do also have a handy dandy [Xcode plugin](https://github.com/quicktype/quicktype-xcode) at the ready. 🛠

## Videos I'm Watching

### Google I/O 2018 Keynote in 10 minutes

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/NeF0zpT4gNE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Google compressed this week's I/O keynote into a very digestible [10 minute clip](https://www.youtube.com/watch?v=NeF0zpT4gNE). I love this because it's so easy to miss all the exciting announcements in the full-length version. This way, you get all the excitement without all the drudgery.

### Code beautiful UI with Flutter and Material Design

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/hA0hrpR-o8U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

I suppose I'll keep on this Flutter train I got going, and share Google's I/O [Flutter with Material Design](https://www.youtube.com/watch?v=hA0hrpR-o8U) video. It is quite compelling to see an app come together with some material Flutter components along with the magic of Flutter's hot reload. Very nice 👌.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.
