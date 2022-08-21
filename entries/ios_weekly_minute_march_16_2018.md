---
title: iOS Weekly Minute - March 16, 2018
date: 2018-03-16 19:28
author: Ben Snider
category: Open Source Swift
tags: swift,linux,iOS
---

Lately, I've been running a little iOS centric get-together for a group of iOS developers, and for anyone else that might have a passing interest in iOS and mobile development in general. We typically discuss the goings on of the iOS, Apple, and mobile ecosystems, and then watch a video (usually a recorded conference video) and discuss how it applies to our work and our projects.

As an artifact of this get-together, I usually have "show notes" to walk through and keep us on track, for which I'll do some research and leg work (usually in my free time). However, instead of keeping those notes closed, I think its a worthwhile addition to the community to share them more widely.

This format likely will have not a small overlap with other weekly newsletters, but my intention here is to editorialize very little and keep the content bite sized. The content should be consumable within a minute and then explored further at the reader's leisure. I'll try to keep the emoji to a minimum, but I don't make guarantees. 😬

Thus, what follows is the very first "iOS Weekly Minute". We'll see how this goes and tweak the format and/or frequency if necessary.

# March 16, 2018

## WWDC 2018 Announced!

* [WWDC Landing Page](https://developer.apple.com/wwdc/)
* **Predictions**:
	* Maybe some more AR/VR tech?
	* Maybe a unification of Cocoa and Cocoa Touch?
	* Maybe both?
* Back in San Jose the 2nd week of June

## Stack Overflow Developer Survey Results

* [Survey Results](https://insights.stackoverflow.com/survey/2018/#most-loved-dreaded-and-wanted)
* **Highlights**:
	* People love Kotlin and Python.
	* Clojure developers get paid a lot.
	* People really hate Oracle/DB2 and VB.
* **N.B.** It's important to remember this isn't representative of the industry as a whole, but rather the segment that is likely to be on Stack Overflow and inclined to fill out a survey with no compensation.

## iOS Dev Directory

* [Directory Homepage](https://iosdevdirectory.com/) from [Dave Verwer](https://twitter.com/daveverwer) of [iOS Dev Weekly](https://iosdevweekly.com)
* A new directory of iOS specific blogs and sites.
* This site is on the list! (really the only reason I’m sharing this 🤷‍♂️)

## NativeScript

* [Project Honmepage](https://www.nativescript.org)
* Like React Native but seemingly less popular.
* Uses Angular/Vue frameworks instead of React and prefers Typescript.

## First Cryptocurrency Miner in a Mac App Store App

* [Article](https://objective-see.com/blog/blog_0x2B.html)
* The developer has since removed the miner due to a bug causing it to use 100% CPU instead of only 10-20% (as designed).
* Mines Monero coins in return for app functionality instead of paying for the features (i.e. you’re paying with CPU cycles and power instead of money).
* I'd be interested to know what the break even for a monthly subscription VS mining CPU power is. Dollars? Cents?
* Monero is a common cryptojacking currency because it's designed to be CPU friendly and AFAIK doesn't have any custom ASIC miners (but that may have change very recently).

## Huge List of Open Source iOS Apps

* [GitHub Repo](https://github.com/dkhamsing/open-source-ios-apps) from [dkhamsing](https://twitter.com/dkhamsing) and [many others](https://github.com/dkhamsing/open-source-ios-apps/graphs/contributors)
* Nice place to go to get ideas/inspiration/examples.
* Tons of apps on there, with links to the GitHub repo and the App Store (if released).

## Apple Watch Adoption Stats

* [Article](https://david-smith.org/blog/2018/03/14/apple-watch-series-3-adoption) from [David Smith](https://david-smith.org)
* Interestingly, Series 0 use is declining steadily while Series 3 is increasing rapidly.
* I have a Series 0, and it's almost unusable at this point for anything outside of the basics.

## Video: Buckets of Code

* [Video](https://www.dotconferences.com/2018/01/ben-scheirman-buckets-of-code) by Ben Scheirman
* Good talk about how to get away from massive view controllers with compelling options.

## Bonus Video: Swift Operators and Strong Opinions

* [Video](https://academy.realm.io/posts/slug-erica-sadun-operators-strong-opinions/) by Erica Sadun
* A great talk that's definitely worth watching about making operators in Swift.
* Take aways: Use operators sparingly, ideally in cases where a custom DSL is clear and simple, or with ubiquity across a project.
* I tend to map operators to resemble common algebraic operators when applicable.

---

And that's all folks! Thanks for making it this far, and stay tuned for next week! I appreciate feedback, so if ya'll got some thoughts, let me know in the comments.