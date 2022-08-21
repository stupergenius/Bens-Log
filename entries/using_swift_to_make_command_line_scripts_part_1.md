---
title: Using Swift To Make Command Line Scripts - Part 1
date: 2015-11-04 20:01
author: Ben Snider
category: Open Source Swift
tags: swift, development, cli
---

Since we have [no open source Swift yet](//www.bensnider.com/no-open-source-swift-yet.html) to play with, I figure we have some time familiarize ourselves with what we currently have in Swift as distributed on OS X with Xcode. To that end, I think a good use of our time is learning to use Swift as a scripting language that can be used to write simple (ish) command line tools.

This is the first part of a two part series on writing Swift command line scripts. In this first part we'll investigate how to execute Swift scripts on the command line, parsing command line arguments, and importing libraries.

In this two part series we'll be writing a simple script to report back either the last [Bitcoin](https://bitcoin.org/en/) price, or the hourly average of the Bitcoin price. The script will use the [Bitstamp API](https://www.bitstamp.net/api/) to get the data. In these blog posts, I'll be focusing on Swift 2 (since presumably the open source offering will be Swift 2?), so to run the examples you'll need Xcode 7 with the command line tools installed.

## Hello World!

To get started, let's talk about our options when building a Swift script. It's actually quite easy to invoke a Swift script on the command line, and at first appears very python or ruby-esque. The Swift Hello World script is in its entirely below: simply creating a `hello_world.swift` file with the below content and giving it execute permissions is all that is required.

```swift
#!/usr/bin/swift

print("Hello World!")
```

To run the script, we run it like any bash or ruby script that's executable:

```bash
$ ./hello_world.swift
Hello World!
```

## Argument Parsing and Carthage

In order to get some nice command line argument parsing utilies, and also to demonstrate how to include libraries with command line scripts, I'll be using the handy [OptionKit](https://github.com/nomothetis/OptionKit) library. This library can be built with [Carthage](https://github.com/Carthage/Carthage), so that's what we'll do. Before continuing, make sure you install Carthage (with [Homebrew](http://brew.sh/) this is as easy as `brew install carthage`). Assuming you've got Carthage installed, we'll run the following commands to setup a folder for our script to live in, initialize our Cartfile, and kick off the Carthage build:

```bash
mkdir swift_btc_script
cd swift_btc_script
echo 'github "nomothetis/OptionKit" ~> 1.0' > Cartfile
carthage update
```

At this point, Carthage will clone OptionKit and build it as a framework under the `Carthage/Build/Mac` folder in our `swift_btc_script` folder.

Great! Now we have a built library that we can import with our swift script. I'll make a `options.swift` file with the below contents to make sure we've got everything lined up correctly. I'll also give this file execute permissions so we can call it directly from the command line.

```swift
#!/usr/bin/swift -F Carthage/Build/Mac/

// The above line is a modification of our previous "Hello World" script to tell
// Swift where to find our newly compiled OptionKit framework.

// Now that the compiler knows where to find the framework, we just import it as usual.
import OptionKit

// OptionKit lets us define long and short params, here we define two:
// one for help and one for say.
let sayOpt = Option(trigger:.Mixed("s", "say"))
let helpOpt = Option(trigger:.Mixed("h", "help"))
let parser = OptionParser(definitions:[sayOpt, helpOpt])
let actualArguments = Array(Process.arguments[1..<Process.arguments.count])

// Simple function to print the "help" message.
func printHelp(parser: OptionParser) {
    print(parser.helpStringForCommandName("btc.swift"))
}

do {
    // The magic of OptionKit here parses the arguments into the options variable.
    // It also puts any additional un-parsed arguments into the rest variable.
    let (options, rest) = try parser.parse(actualArguments)

    // If the help option was specified, print the help message.
    if options[helpOpt] != nil {
        printHelp(parser)
    } else {
        // Otherwise, if the say option was specified, print the rest of the
        // arguments back out to the user.
        if options[sayOpt] != nil {
            let toSay = rest.joinWithSeparator(" ")
            print(toSay)
        // And lastly if no arguments were given, print the help message.
        } else {
            printHelp(parser)
        }
    }
} catch let OptionKitError.InvalidOption(description: description) {
    // Catches any invalid arguments and prints the invalid parameter.
    print(description)
}
```

## Running with Arguments

Executing this file with the `-s` or `--say` parameters will echo back what we give it, and passing it either `-h` or `--help` or no arguments will echo its help message. For example, the below output comes directly from our script:

```bash
$ ./btc.swift --not-a-command
Invalid option: --not-a-command

$ ./options.swift -h
usage: btc.swift [-s|--say] [-h|--help]

$ ./options.swift --say Well hello there pilgrim.
Well hello there pilgrim.
```

## Stay Tuned

Now that we have a little command line framework setup for ourselves, implementing the actual Bitcoin pricing should be a breeze. In part 2, we'll see how we can use the `Foundation` classes we know and love from the iOS and Mac OS worlds in a command line Swift script to help us get the Bitcoin prices.

As a bonus, you can [find all the source code](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/swift-command-line) from this post on my blog's GitHub page.
