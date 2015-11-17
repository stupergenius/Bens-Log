Title: Using Swift To Make Command Line Scripts - Part 2
Date: 2015-11-17 16:11
Author: Ben Snider
Category: Open Source Swift
Tags: swift, development, cli

Welcome back! In [part one](http://www.bensnider.com/using-swift-to-make-command-line-scripts-part-1.html) of this two part series, we got started using Swift along with [OptionKit](https://github.com/nomothetis/OptionKit) to build simple command line script. In this second and final part, we'll pull all the pieces of the puzzle together and use the foundation we've built along with some classes from Apple's Foundation to implement our BTC command line price checker.

As a recap from the first part, we learned how to:

- Call Swift scripts directly from the command line
- Use [Carthage](https://github.com/Carthage/Carthage) managed libraries with Swift scripts
- Use OptionKit to parse command line paramters

In this post we'll learn how to leverage all the above to make a Swift script to check BTC prices. So we'll learn how to make a URL request to fetch data from the [BitStamp API](https://www.bitstamp.net/api/), parse the JSON data it provides, and print out some meaningful information to the user. As a bonus we'll also see how we can compile our Swift script - once we're happy with it - into an exectuable binary to save some execution time.



