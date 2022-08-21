---
title: "ABI Compatibility: Whoopdty Do, What Does It All Mean?"
date: 2016-05-19 22:48
author: Ben Snider
category: Open Source Swift
tags: swift, development, cli
---

News of Swift 3.0 [not having ABI compatibility](http://thread.gmane.org/gmane.comp.lang.swift.evolution/17276) in the upcoming release is *rampant* throughout the [Twitter](https://twitter.com/sandofsky/status/732246903530758144) and [blog](http://ericasadun.com/2016/05/17/more-about-the-swift-abi-postponement-the-laws-of-abi-changes/) spheres. I personally feel like the impact of not having ABI compatibility is much less severe than perceived, for a few reasons we'll consider here.

We'll also try go gain an understanding of what we mean when we say "ABI compatibility" in the first place and how it impacts developers at varying levels.

We currently *do not* have ABI compatibility, and it seems we won't in the near future until at least Swift 3.1 but perhaps 4.0. The Swift team is, however, placing ABI compatibility at the top of their priority list for Swift 4.0, so this particular feature (hopefully) isn't always on the "1 year away" track. Lattner writes in the [evolution list](http://thread.gmane.org/gmane.comp.lang.swift.evolution/17276):

> ABI stability goals will roll into a future release of Swift, where I expect them to be the highest priority features to get done.

[and similarly](http://thread.gmane.org/gmane.comp.lang.swift.evolution/17276/focus=17334)

> We’ll start discussing post-3.0 releases in August.  Until Swift 3 is really wound down, it is almost impossible to make forward looking plans.

## ABI Compatibility

[ABI compatibility](https://en.wikipedia.org/wiki/Application_binary_interface) (application binary interface compatibility), for our purposes, refers to the ability to link pre-built (binary) libraries with arbitrary versions of a compiler. In this case we're talking concretely about Swift, such that a developer wanting to distribute binary libraries that were compiled with Swift 4.0 (for example) could compile the library *once* with 4.0. Then, client developers wanting to integrate said library do not need to care about which version of the Swift compiler the library was compiled with. The client developers can link the library with the version of the Swift compiler they're using to compile their other source files, like the Swift 4.2 compiler or even the Swift 5.0 compiler.

You can think of this like the very similarly named API compatibility, whereby, instead of defining a "programming interface" we're defining a "binary interface". Continuing the metaphor, consider an API (web service, class library, etc) that simply creates users. This API has has versions v1 and v2, where v2 has some breaking changes to the interface, in that v2 requires middle name in addition to first and last name when creating users. We can thus say that this API v2 is *not compatible* with the API v1, and thus we do not have API compatibility between versions since clients written against v1 will break when calling v2. This is the current situation we're in with all versions of Swift, including 3.0. If I built a binary library with Swift 2.0 and attempted to link it with Swift 3.0, it would fail, much the same way that calling our fictional API v2 like we used to call the old v1 API would fail.

The main point being that, past a certain Swift version (e.g. Swift 4.0), developers distributing binary libraries can do so without needing to provide compiler version specific builds. Therein lies the advantage of ABI compatibility: once ABI compatibility is enabled, binary builds should be good to go for the foreseeable future of the compiler.

### Example

Let's take a fairly simple example to illustrate what happens when we compile a library with an older version of Swift and try to then link that library with a newer version of Swift.

[This example](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/abi_compat) uses our familiar "jokes" module to print out a *hilarious* Swift joke to stdout. Using the Makefile derived from [David Owens Swift Makefile](http://owensd.io/blog/swift-makefiles---take-2/), we can see we're compiling the `joke.swift` file using an older Swift 2.2 snapshot, and compiling the `main.swift` file using the 2.2.1 release Swift compiler.

Simplified, the Makefile performs these steps:

```bash
# compiles joke.swift into joke.o
$ swift-2.2-SNAPSHOT -frontend -c -primary-file joke.swift -o joke.o # plus some compiler options

# compiles main.swift into main.o
$ swift -frontend -c -primary-file main.swift -o main.o # plus some compiler options

# links the two modules into a main executable
$ swiftc joke.o main.o -o main
```

During the link phase, we'll get an error along the lines of:

```
joke.o: In function `_TZFV4main4Joke4tellfT_S0_':
joke.o:(.text+0x1a5): undefined reference to `_TTSg5SS___TFSalo9subscriptFSix'
```

And therein lies the rub. Since the different versions of the Swift compiler aren't ABI compatible, we'll get a error when trying to link pre-built libraries from other Swift compiler versions.

## Is This Really a Big Deal™?

Lattner actually [makes this point rather well](http://thread.gmane.org/gmane.comp.lang.swift.evolution/17276/focus=17334):

> ABI stability starts to matter when you’re interested in combining precompiled libraries built by different parties, which are only distributed in binary form.

What's left unsaid here is libraries that are *not* distributed in binary form - namely, source distributed libraries - will still continue to compile and link as they have in the past. So long as these source distributed libraries are source compatible with the version of Swift that the client developer is using, everything Just Works™. This applies to many thousands of libraries that are distributed via the Swift Package Manager, Carthage, CocoaPods, etc.

A point worth making, however, is that Swift is still not source stable between versions, and every release thus far has had breaking language changes that developers must resolve, largely manually, before using the new compiler. Xcode does provide a migration assistant (which works to varying degrees depending on the project), but no such tooling to my knowledge exists for Linux projects. This is also mitigated somewhat by the openness of the Swift evolution community and the multiple pre-release builds the Swift team makes available. This allows developers to start making source compatibility changes long before the new Swift toolchain lands in Xcode.

In short, we currently don't have ABI compatibility and it doesn't seem to cause developers much undue pain since most libraries are distributed in source form. Most undue pain is caused by churn in the language itself. So I personally class this a Minor Deal.

## Why Is ABI Compatibility Being Pushed Off?

As to why ABI compatibility has been pushed off, there are several hypotheses. None of these can we really validate since the Swift team hasn't made any real public confessions (other than the evolution discussions), so the below is purely conjecture.

ABI compatibility was on the 3.0 roadmap before the Swift team even finalized Swift 2.2, so it might just be a case of inaccurate estimation. Software estimation is [hard](https://www.quora.com/Why-are-software-development-task-estimations-regularly-off-by-a-factor-of-2-3/answer/Michael-Wolfe?srid=xD3h), so it might be as simple as a missed estimate. In any case, it's fun to speculate for a bit.

### Community Involvement

First, that the community involvement with the evolution process - which has been nothing short of stellar - is causing more work than the Swift team anticipated when originally mapping out Swift releases.

The extra work comes not only in implementing the community's requests and evolution proposals, but also in reviewing community submitted code and reviewing the community submitted evolution proposals themselves. As developers that review code for other developers well know, it can be a real struggle to keep up with one's own responsibilities in addition to being able to validate other developer's changes and give meaningful feedback. Compound this with needing to vet evolution proposals on several criteria: compliance with proposal standards and requirements, it hasn't already been implemented, it hasn't already been accepted *or denied*, and that it in general fits within Swift's philosophy.

Indeed, keeping up with a community as voracious as Swift's is no small task, and I do not doubt that the Swift team hadn't expected this level of involvement. I think they're happy with this though, and the community definitely feels involved with the evolution of the language, so it's not all bad really that some deadlines slip.

### Higher Priority Features

Another conjecture is that some higher priority features gobbled up time from the ABI compatibility feature. Things like making the Swift compiler faster, improvements around tail call optimization, and Linux support for Foundation might have bumped off ABI compatibility from the 3.0 radar.

This speaks to the complexity of juggling multiple high priority features slated for a release. That is, the difficulty (and some could argue folly) in releasing software increments with a) fixed scope, b) fixed time, and c) relatively fixed team velocity. Agile software practices teach us that you can pick two and vary one, and in this case we actually ended up varying scope, since we're pushing out features to the next increment.

### Additional Planned Source Changes

And lastly, the most likely reason is that the Swift team is just not where they'd like to be on even stabilizing the language features from a source perspective. Features like generics and certain foundational compiler features *must* be complete and stable before we can even consider having ABI compatibility between releases. The Swift team has alluded to such reasons, and not being a compiler engineer I'll take them at their word 😃. Lattner's quote from [Winding down the Swift 3 release](http://thread.gmane.org/gmane.comp.lang.swift.evolution/17276) sums it up nicely:

> That said, it is also clear at this point that some of the loftier goals that we started out with aren’t going to fit into the release – including some of the most important generics features needed in order to lock down the ABI of the standard library.

## Summary

So while ABI compatibility might seem like a big deal to have been pushed off, it very likely doesn't affect the day to day of most Swift developers.

The most compelling arguments thus far have been around the fact that some developers would *like* to distribute libraries in binary form so as to protect intellectual property, license agreements, etc. Not having ABI compatibility is actually a legitimate concern for developers wishing to distribute binary libraries, but I don't really feel like that's a very large number of developers. Enterprises wishing to make private libraries internally available are still able to provide private Carthage repositories and/or private CocoaPods specs to host the libraries in source form, and rely on the build process to compile everything together at once. Additionally, it is currently possible to ship binary libraries, the libraries just need to be recompiled and distributed for each new breaking compiler version.

Which leads to the second major concern: that Swift compile times are a) slow, b) unlikely to get *much* faster and c) will only get slower as projects increase in size and complexity. Having some libraries built as binary libraries that are simply linked with additional Swift sources would likely result in much faster build and test cycles. Tools like the Swift Package Manager or Carthage could be configured to compile their dependencies and distribute the binary library instead of the source files, and assuming we have ABI compatibility, these binary libraries would be compatible with any Swift version down the road.

Thus, now that we know what ABI compatibility even means, and that we have a grasp on how it affects developers, we can see that while it might be *really nice* to have ABI compatibility, it's not likely to cause Swift to lose traction or to somehow falter in its mission.
