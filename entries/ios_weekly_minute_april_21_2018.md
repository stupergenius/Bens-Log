Title: iOS Weekly Minute - April 21, 2018
Date: 2018-04-21
Author: Ben Snider
Category: Open Source Swift
Tags: swift,linux,iOS

## Big Announcements


All's quiet on the Cupertino Front these days as Apple is inevitably gearing up for WWDC. On that note, Apple is notifying [WWDC Scholarship applications](https://wwdc.github.io/2018/) on their acceptance status. Some of these are [rather](https://www.youtube.com/watch?v=mMFkfY6NURs&feature=youtu.be) [impressive](https://www.youtube.com/watch?v=ZvwVWEtRFsw&t=16s&ab_channel=ThijsvanderHeijden). The popular themes of this year's submissions (and acceptances) are ARKit and CoreML/Vision, which could be an indicator of the overall themes of this year's WWDC?

From the community comes the exciting announcement of a new [Flight School](https://gumroad.com/l/codable) book series from [Mattt](https://twitter.com/mattt), the creator of NSHipster and Swift contributor. The new series will be released in installments, with each installment focusing on a deep dive into the Swift ecosystem. The book is themed around aviation, with wonderful illustrations by [Lauren Mendez](https://twitter.com/littleloboart). I'll definitely be picking this up, if only for the fun artwork and playful setting!

## Articles I'm Reading

### Detecting Whiskey Brands with CoreML and IBM Watson Services

[In an exhaustive article](https://martinmitrevski.com/2018/04/14/detecting-whisky-brands-with-core-ml-and-ibm-watson-services/), [Martin Mitrevski](https://twitter.com/mitrevski) details all the steps required to get set up on IBM's new Watson Services for CoreML. The task put to CoreML in this example is an image classifier that's trained to detect whiskey bottles... because why not? It does seem to work quite well though and serves as a good example for other devs wanting to get up and running on this new platform. I've got a post on this topic brewing of my own, so stay tuned!

### Making a React Native Components Pod

More great React Native content from the Artsy shop courtesy [Orta Therox](https://twitter.com/orta), this time showing [how to embed a React Native component as a CocoaPod](https://artsy.github.io/blog/2018/04/17/making-a-components-pod/). In this example, the embedding application doesn't know that the pod is built using React Native. This presents several use cases for developers wanting to get started building with React Native but maybe are in a circumstance where porting or adopting is not a viable option.

This also takes advantage of the strengths of React by developing components in React Native, and simply consuming those components from an otherwise native iOS application. This allows developers to continue using Foundation and other native toolkits while gaining React's powerful reusable component system.

I really like this approach, and it's a great way to get React Native experience without going whole hog into it.

### Playground Driven Development in Swift

[Khoa Pham](https://twitter.com/onmyway133) details [how to enable playground driven development](https://medium.com/flawless-app-stories/playground-driven-development-in-swift-cf167489fe7b) when developing iOS applications. This is somewhat tricky to setup, and Khoa does a great job enumerating all the configuration that's necessary to get this approach running smoothly.

This approach [isn't new](https://www.youtube.com/watch?v=DrdxSNG-_DE), but it's a good way to prototype and build out applications piece by piece instead of trying to boil the ocean all at once. It can also greatly reduce the amount of time spent poking around an application trying to test out a piece of functionality that's deep within the navigation hierarchy, or that's otherwise hard to set up.

## Swift Tip: Conditional Logic With and Without Conditional Statements in Swift

[Reducing conditional logic](https://khawerkhaliq.com/blog/swift-conditional-logic-conditional-statements/) is the topic of [Khawer Khaliq](https://twitter.com/khawerkhaliq)'s Swift tip for this week. Khawer takes us step by step from an example that has complex nested conditional logic, to an example that is functionally equivalent but with logic encoded into a data structure using simple comparisons.

## Videos I'm Watching

### Be offensive: Proactively Assessing Your iOS Applications

From last year's [Mobile+Web Devcon](http://mobilewebdevconference.com/san-francisco-2017/), [Dave Lindner](https://twitter.com/golfhackerdave]) talks us through [how to proactively assess](https://academy.realm.io/posts/david-lindner-mobile-web-devcon-proactively-assessing-your-ios-applications/) application security, and how to address common threat models. The talk follows the [OWASP top 10](https://www.owasp.org/index.php/OWASP_Mobile_Security_Project#tab=Top_10_Mobile_Risks) security guidelines. I appreciate this because I'd bet many of us have committed at least one of these flaws, and it's always good to keep security top of mind.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, [get @me](https://twitter.com/benatbensnider) or let me know in the comments.
