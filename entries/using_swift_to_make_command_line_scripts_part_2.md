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

At the end, we'll have a script written that will by default print the last BTC price in USD, and will accept an optional parameter that allows us to specify the interval of the price calculation. For the optional `interval` paramter we can sepcify "last" (the default), "hourly", or "[vwap](https://en.wikipedia.org/wiki/Volume-weighted_average_price)". The generated OptionKit help message should also give us some feedback on how to call the script. We should be able to run it as follows:

```bash
./btc.swift
335.45

./btc.swift --interval hourly
338.27
```

## Command Line Arguments

To begin, let's start by defining how we'll be accepting user input. Using OptionKit, we can set this up quite easily. Using a modified version of our warmup script `options.swift`, I'll create a new file `btc.swift` with the following contents:

```swift
#!/usr/bin/swift -F Carthage/Build/Mac/

import OptionKit

func intervalFromArgs(args args: Array[String]) -> String? {
    let intervalOpt = Option(trigger:.Mixed("i", "interval"), numberOfParameters: 1)
    let helpOpt = Option(trigger:.Mixed("h", "help"))
    let parser = OptionParser(definitions:[intervalOpt, helpOpt])
    
    func printHelp(parser: OptionParser) {
        print(parser.helpStringForCommandName("btc.swift"))
    }
    
    do {
        let (options, rest) = try parser.parse(actualArguments)
    
        if options[helpOpt] != nil {
            printHelp(parser)
        } else {
            if options[intervalOpt] != nil {
                return rest.joinWithSeparator(" ")
            } else {
                return "last"
            }
        }
    } catch let OptionKitError.InvalidOption(description: description) {
        print(description)
    }
    
    return nil
}

if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    print("\(interval)")
}

```

As we can see, this is very similar to our previous `options.swift` script. The main differences are that we're capturing the `--interval` parameter when given, and returning it from an optional wrapped function. In this way we've encapsulated the argument parsing logic into its own unit, so we can focus on implementing our other features.

First though, let's take some time to conver the `interval` option string given to us from OptionKit and convert it into an `enum` to make it a little easier to work with. We'll write some simple code here to accomplish this:

```swift
enum IntervalType: String {
    LastIntervalType = "last",
    HourlyIntervalType = "hourly",
    VWAPIntervalType = "vwap",
}

// Building on the same code as before...
if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        // now we have a typed interval enum we can pass on
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}
```

## URL Loading

Our next main task is to load the URL corresponding to the interval type the user has chosen.



END
