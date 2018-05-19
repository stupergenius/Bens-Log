Title: iOS Weekly Minute - May 19, 2018
Date: 2018-05-19
Author: Ben Snider
Category: Open Source Swift
Tags: swift,linux,iOS

## Big Announcements

Being a few weeks out from WWDC means that Apple is hunkering down as it preps and polishes not only the keynotes and presentations, but also the software. As such, we're not likely to get much Apple news in the near future, aside from some leaks that might pop up. Which, this year we haven't had really any leaks that seem related to this year's WWDC. The things we have heard about, like the project previously known as Marzipan, turned out to likely be a 2019 release.

Otherwise, the iOS community isn't slowing down! The much awaited [App Architecture](https://www.objc.io/blog/2018/05/15/app-architecture-launch/) book by the wizards at objc.io has just been released. At $49, it seems like a great deal considering it comes with fully fledged source code and in-depth videos covering all things architecture. I really nerd out about architecture, so I definitely need to pick this up. 🤓

In the Mac developer sphere, a new [Developer Union](https://www.thedevelopersunion.org/) (no, not that kind of union) has sprung up to attempt to influence Apple into improving the crufty Mac Appstore. Their first step is asking for paid trials of apps, something that has been sorely lacking in Apple's first party store since it's inception. To me, the Mac Appstore is some low hanging fruit that Apple could really get developers excited about in this year's WWDC, if only to show that they haven't abandoned it. I'm excited to see what comes out of this and I offer my support in solidarity. ✊

## Articles I'm Reading

### Supporting React Native at Pinterest

Yet another excellent [case study](https://medium.com/@Pinterest_Engineering/supporting-react-native-at-pinterest-f8c2233f90e6) and technique for integrating React Native is delivered this week by Vivian Qu of the Pinterest engineering team. Pinterest took a very data heavy and performance metrics approach to evaluating the effect of features built with React Native vs identical features built using iOS and Android native tools. They eventually concluded that React Native features performed (from an analytics/engagement perspective) as well as the native modules. They now have React Native in their toolbox, and use it when it's most appropriate. Some tidbits:

> For us, the biggest potential benefit is the increase in developer velocity. React Native enables us to share code between platforms. Code sharing not only means implementation time can be saved, it also reduces the cognitive overhead of sharing context when you need multiple platform-specific engineers working on the same feature.
>
> A conversion into a fully React Native app was never the end goal. Instead, we focused on identifying specific use cases for feature teams and practical costs that would be incurred by adopting React Native.
>
> At the end of last year, we successfully completed our evaluation stage and now support React Native within our iOS and Android apps. The React Native version of the Topic Picker view is shipped to 100 percent.

👏

### Full Cycle Developers at Netflix — Operate What You Build

The Netflix engineering team wrote this week about how their teams [design, build, test, deploy, support, and operate](https://medium.com/netflix-techblog/full-cycle-developers-at-netflix-a08c31f83249) features. This is a very powerful idea if put into place and supported at all levels of the organization, including building and staffing an internal "tools" team. The most poignant piece in the article makes the point better than I could:

> "Operate what you build" puts the devops principles in action by having the team that develops a system also be responsible for operating and supporting that system. Distributing this responsibility to each development team, rather than externalizing it, creates direct feedback loops and aligns incentives. 

## Swift Tip: Design Patterns in Swift: State Pattern

In an [article](https://agostini.tech/2018/05/13/design-patterns-in-swift-state/) for Agostini tech, [Dejan Agostini](https://agostini.tech/author/dejan/) describes how to encode rules into a Swift type using the [state pattern](https://en.wikipedia.org/wiki/State_pattern). This is a powerful way to model rules about what states a type can be in, without making the code to maintain that state a tangled mess.

In the end, we end up with a very descriptive, but still correct, API. The example from the article demonstrates this with a simple test:

```swift
let vehicle = Vehicle()
vehicle.brake()
vehicle.accelerate()
vehicle.accelerate()
vehicle.brake()
vehicle.park() // prints: Can't park the vehicle while it's moving. You need to stop first
vehicle.brake()
vehicle.park()
```

Dejan concludes with:

> If you see a class with a lot of switch-case statements, it’s a good sign that you should consider implementing a state pattern.

## Tool of The Week

### Facebook's Account Kit

I wasn't aware that [Account Kit](https://developers.facebook.com/docs/accountkit/overview) existed before I saw it popup in a feed this week. Account Kit is a Facebook tool (JS/iOS/Android SDK) that enables passwordless authentication using Facebook's SMS and email infrastructure. It appears to be free until August of this year, at which point they'll bill for SMS messages over 100k/month.

The killer feature, for me, is that your users don't have to be Facebook users, since it's just sending out messages to verify the email/phone number that was entered belongs to the user and is valid.

## Videos I'm Watching

### ML Kit: Machine Learning SDK for mobile developers

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Z-dqGRSsaBs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

I'm really happy that Google's putting significant effort into making a great high-level machine learning library. The fact that it's cross platform and integrates with Firebase is just... icing on the cake. 🎂

### Designing for inclusion: Insights from John Maeda and Hannah Beachler

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/p0A_CYBLcYw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

In... yet another great I/O video, we get a great reminder of how important it is to design for accessibility and inclusion. Also... I'll watch anything with John Maeda and/or Black Panther in it. 😂

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.
