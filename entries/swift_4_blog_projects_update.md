---
title: Swift 4 Blog Project Updates
date: 2017-08-06 13:33
author: Ben Snider
category: Open Source Swift
tags: swift,linux,development,cli
---

Hark! The time is upon us for the great Swift 4 migration. Woe are the developers still using Swift 3. So say we all!

And... with that out of the way, I've decided to take some time to update the Swift projects on this site to Swift 4 and the new package manager formats. In this post I'll go over the big changes, any gotchas, and the overall process of the migration. The Swift code in other blog posts will be magically updated to the new Swift 4 syntax in the process. **NB: See summary for a discussion about blog code snippets...**

I'll be using the latest Xcode 9 beta, which as of the time of writing is beta 4. I usually wait to do these sorts of things until the GM drops, but eh, I'm impatient. Plus, I don't expect the language to change in the meantime. I could be wrong, but I'm OK assuming that risk.

I'm doing this to not only improve my personal familiarity with Swift 4, but also because I really dislike seeing old code that doesn't compile on other sites. It's important to me for the Swift code that readers find on my site to work. I really don't want to turn people off Swift for that reason.

Also, I hope that readers will find the process useful, even if the minutia of the projects themselves aren't interesting. This is a process that most active projects will go through at some point, and since Swift is still churning a bit with syntax and package manager changes, this is a thing we should probably get good at as a community. 😎

## Process and Stategy

Since I can't really get anything done without first making a list and planning the strategy, the below is a culmination of my neuroses in prose form as it relates to Swift updates:

### Process

1. Discovery
	1. Projects
	1. Blogs with Swift snippets
1. Migration
	1. Project migration
	2. Swift Package migration
	3. Blog snippet migration
1. Testing and verifying
1. The following writeup under **Findings**

### Discovery Strategy

For #1.1, this is easy since I keep them all in a [folder under the blog repo](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects).

Also, #1.2 is somewhat easy since I use markdown to write these posts, and I think I should be able to grep through files looking for Swift formatted code blocks:

```bash
$ grep -lir "\`\`\`swift" entries/ | uniq
```

### Migration Strategy

For **projects**, I think this is pretty straight forward. I'll just open the projects in Xcode, and use the builtin migrator. The migrator is allegedly [pretty good](https://swift.org/migration-guide-swift4/) this time around (and it's [open source!](https://github.com/apple/swift/tree/master/lib/Migrator)). For projects that don't have an Xcode project but do use the Swift package manager, I'll use the SPM to generate a project for me, and use the migrator as above. I don't think I have any non-Xcode non-SPM projects, but if I do I'll just create an adhoc Xcode project or a Swift Playground.

Once the Xcode migrator has had a go, I'll do any touchups where it might have gotten things wrong, or just turned out superficially unclean.

For **Swift Packages**, I'll make sure the packages conform to the new [Swift 4 package manager specification](https://github.com/apple/swift-package-manager/blob/master/Documentation/PackageDescriptionV4.md).

For **blog code**, that is, Swift snippets embedded into blog posts, I'll likely create an Xcode playground and just tinker until it compiles. I'll then copy the updated code back into its respective blog post.

I'll then do a final once-over on the project and code as a whole, and ensure it's using Swift 4 idiomatically with the most modern syntax style.

### Testing and Verification

Since this isn't production code or anything, I'm mostly going to just make sure things compile and pass a quick smoke test. If the project has unit tests, I'll run those as part of the smoke test. One of the benefits of Swift is that if it compiles, a program is only likely to have logic errors. And, since I'm doing a straight migration, I don't *think* I'll create many of those...

I'll be more focused on making the code 1) Swift 4 source compliant and 2) idiomatic.

## Findings

Using the above strategies, the below are **projects** with outdated Swift syntax:

* [abi_compat](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/abi_compat)
* [openwhisk-swift](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/openwhisk-swift)
* [spm-c-lib-wrapper](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/spm-c-lib-wrapper)
* [swift-command-line](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/swift-command-line)
* [swift-command-line-oss](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/swift-command-line-oss)
* [Heroku Slack Slash Command](https://github.com/stupergenius/swift-heroku-slack-command)
* [Substring Hash App](https://github.com/DenverSwiftHeads/SubstringHashSwift)

Which is to say... all the projects. 🤦‍♂️

The **blog posts** with embedded Swift code, as discovered by the above `grep` command, are:

```
getting_started_with_openwhisk_server_side_swift.md
making-a-slack-slash-command-integration-using-swift-on-heroku.md
making-swift-code-more-swifty-and-an-mvvm-aside.md
refactoring-an-mvvm-app-to-swift-3.md
roadblocks_when_making_cross_platform_command_line_swfit_scripts.md
swift-libraries-that-are-open-source-swift-friendly.md
using_swift_to_make_command_line_scripts_part_1.md
using_swift_to_make_command_line_scripts_part_2.md
wrapping-c-code-within-a-single-swift-package.md
```

Not bad. Many of these are actually about the above projects, so I should be able to grab the updated snippets from the project and paste them into the corresponding blog post. 🙌

Soundtrack: [Let's Get Crackin`](https://www.youtube.com/watch?v=IERWeWdxSeM)

But seriously: [Station Nova - Waveshaper](https://www.youtube.com/watch?v=mBRnh0tkQtU)

### Big Changes

For the [Swift Command Line](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/swift-command-line) project, I needed to update the version of OptionKit so that it supports Swift 4. I ended up making [my own PR](https://github.com/nomothetis/OptionKit/pull/11) to the project to do this, and depending on my fork. It seems like this project *might* be abandoned, but no worries, it works well for my purposes.

Some of my projects were in Swift 2.x... Oops! 😅 The biggest changes were from the [Great Renaming](https://github.com/apple/swift-evolution/blob/master/proposals/0005-objective-c-name-translation.md) between 2.x and 3.x.

**Package manager** changes are small but fairly involved. Overall, the targets and packages in each project are now required to be fully specified. Not much is automatically detected anymore, except for the directory structure of the target itself.

The process I settled on for the package manager projects is to first set the new `tools-version`, clean any pre-built artifacts, update the `Package.swift` manifest, regenerate the Xcode project, run the migrator, and perform any touch ups.

Roughly the process is as follows:

```bash
$ swift package tools-version --set-current
$ swift package clean
$ rm -fr .build
```

Now manually update the `Package.swift` manifest to the [new v4 specification](https://github.com/apple/swift-package-manager/blob/master/Documentation/PackageDescriptionV4.md). Then re-generate the Xcode project:

```bash
$ swift package generate-xcodeproj
```

Run the migrator: `Edit -> Convert -> To current Swift syntax`. And then do any manual touchups as needed or desired.

Rinse and repeat .Overall fairly straight forward.

### Feelings and Subjective Observations

Overall it feels like very little has changed. I don't actually think there was more than one or two lines in my Swift 3.x projects that needed a source change. I also wasn't doing anything particularly sophisticated with types or unicode or anything, so my changes ended up being mainly package manager configurations.

I also had a few straggling Swift 2.x projects that required a 2.x to 3.x migration, which was not trivial. Oops! 🤷‍♂️ But once the 3.x migration was complete, the 3.x to 4.0 didn't require any changes.

The package manager changes are actually quite nice. Now that I understand the new v4 specification, I like the way the configuration is very explicit. It does reduce some of the "magic" of the v3 specification, but for a package manifest that's designed to fully specify a software package, I like the reduced magicalness.

The Xcode migrator did a good job this time around, likely because it didn't really have much to do. As [this pull request](https://github.com/DenverSwiftHeads/SubstringHashSwift/pull/3) shows, it's mainly build settings that get updated and changed around.

As a reference, here's the [whole PR](https://github.com/stupergenius/Bens-Log/pull/1) for the migration.

### Gotchas

Some of my projects run on Linux... and there's no published official Swift 4 docker image, so I grabbed one from [norionomura](https://hub.docker.com/r/norionomura/swift/). This helpful person has kept up to date with snapshots for quite a while now and I appreciate it greatly.

There's also the [Slack Command](https://github.com/stupergenius/swift-heroku-slack-command) I built using a Heroku buildpack that I gave up migrating. The source is actually migrated and everything runs locally, but the Heroku buildpack doesn't yet support Swift 4. I gave up on that particular rabbit hole and will put that on my list of things to figure out. Ideally I'll just contribute an update to that buildpack since it's pretty neat.

Otherwise, nothing major. I wasn't really expecting the SPM specification changes as noted above, but the new specification is well documented and functions perfectly.

## Summary

As I went through this exercise, I eventually decided not to update the blog posts. I did update the [projects themselves](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects), but the blog posts code excerpts I think I like being kept for antiquity. Most of them reference a specific Swift version, so I'm not terribly worried in people getting the wrong idea about recency. Plus, it's very close to telling a lie: given the publishing date of most of these articles, I would have to be a time traveler for the Swift versions to make sense. Rather than figuring out time travel, I'll just keep the projects updated, and perhaps slate some time to updating the individual posts that have gotten the most traction with some new treatment as a whole new post or series. I already have the list of posts with Swift snippets in them, so discovering the posts themselves is already done.

And a huge *tip o' the hat* 🎩 to the Swift team this time around for a great migration path from Swift 3 to Swift 4. The migrator did find and fix the syntax differences, but even those were very minimal. As noted, it might be my more simplistic projects, but the code changes I needed to make were *very* minimal and overall Things Just Worked™. My thanks!

As such, I can't recommend enough upgrading as soon as possible. Given your particular situations, you might want to wait until the Xcode GM seed to do any big migrations, but my experience so far has been positive. For those projects using Xcode or the Swift Package manager, the Swift 4 toolchain even features a [source-compatibility mode](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Compatibility.html), so updating your Xcode and compiler toolchain is super duper easy and ya'll don't really have any excuses (judges, however, will accept "laziness"). And, if your project breaks, the Swift team [maintains a set of projects](https://swift.org/source-compatibility/) as a test suite for source compatibility, so they take regressions quite seriously.

Looking forward, Swift 4 hopefully marks a more stable period in Swift's evolution. This release feels very much like refinement, polish, and includes some nice backwards compatible features. This release seemingly paves the way for source stability, and may even get us pretty far down the road of [ABI stability](https://github.com/apple/swift/blob/master/docs/ABIStabilityManifesto.md). Here's hoping! 🙏

