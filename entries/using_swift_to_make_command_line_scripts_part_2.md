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
$ ./btc.swift
335.45

$ ./btc.swift --interval hourly
338.27
```

## Command Line Arguments

To begin, let's start by defining how we'll be accepting user input. Using OptionKit, we can set this up quite easily. Using a modified version of our warmup script `options.swift`, I'll create a new file `btc.swift` with the following contents:

```swift
#!/usr/bin/swift -F Carthage/Build/Mac/

import OptionKit

func intervalFromArgs(args: Array<String>) -> String? {
    let intervalOpt = Option(trigger:.Mixed("i", "interval"), numberOfParameters: 1)
    let helpOpt = Option(trigger:.Mixed("h", "help"))
    let parser = OptionParser(definitions:[intervalOpt, helpOpt])
    
    func printHelp(parser: OptionParser) {
        print(parser.helpStringForCommandName("btc.swift"))
    }
    
    do {
        let (options, _) = try parser.parse(args)
    
        if options[helpOpt] != nil {
            printHelp(parser)
        } else {
            if let intervalOption = options[intervalOpt] {
                // Passing numberOfParameters to the interval option lets us
                // retrieve the interval parameter directly from the option.
                return intervalOption.joinWithSeparator(" ")
            } else {
                return "last"
            }
        }
    } catch let OptionKitError.InvalidOption(description: description) {
        // Catches any invalid arguments and prints the invalid parameter.
        print(description)
    } catch {
        print("Unspecified error parsing arguments")
    }
    
    return nil
}

if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    print("\(interval)")
}

```

As we can see, this is very similar to our previous `options.swift` script. The main differences are that we're capturing the `--interval` parameter when given, and returning it from an optional wrapped function. In this way we've encapsulated the argument parsing logic into its own unit, so we can focus on implementing our other features.

First though, let's take some time to convert the `interval` option string given to us from OptionKit and convert it into a Swift `enum` to make it a little easier to work with. We'll write some simple code here to accomplish this:

```swift
enum IntervalType: String, CustomStringConvertible {
    case LastIntervalType = "last"
    case HourlyIntervalType = "hourly"
    case VWAPIntervalType = "vwap"

    var description: String {
        get {
            return self.rawValue
        }
    }
}

// Building on the same code as before...
if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        // now we have a typed interval enum we can pass on
        // we can also print it since it implements CustomStringConvertible
        print(intervalType)
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}
```

## URL Loading

Now that we're finished parsing arguments, our next main task is to load the URL corresponding to the interval type the user has chosen. Using BitStamp, this is actually just two URLs with the same JSON response format. We'll wire up a little function that determines the correct URL and kicks off a network request using the handy `NSURLSession` class from the `Foundation` framework.

Let's lay some groundwork of calling the functions before actually implementing the URL loading, so we can think about what data we want to pass around.

```swift
func retrievePriceData(interval: IntervalType, completion: NSData? -> Void) -> Void {
    completion(NSData())
}

func parsePrice(data: NSData) -> Double? {
    return 5.0
}

if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        retrievePriceData(intervalType, completion: {data in
            if let
                priceData = data,
                price = parsePrice(priceData) {
                // Success!
                print(NSString(format: "%0.2f", price))
            } else {
                print("There was an error retrieving current price data.")
            }
        })
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}
```

Here we can see we're still building on our argument parsing function, while starting to call the actual methods to retrieve and parse the price data. I've chosen to implement the `retrievePriceData` function with a closure parameter. The closure will get called when the network request completes (by either succeeding or failing). The parameter passed to the closure, however, is an optional. This lets us communicate to the calling code that we can succeed or fail, and lets us handle both cases. It's also possible to fail parsing the price data out of the actual response, so `parsePrice` also returns an optional. This is wrapped nicely with a single `if let` block that prints out the price if everything goes well.

Let's start looking at how to implement the `retrievePriceData` method. We'll be using the trusty `NSURLSession` class directly from the `Foundation` framework to make the actual network request. If our network request succeeds, we'll pass the data - in the form of `NSData` - back to the caller using the provided closure, otherwise we'll just pass back *nil*.

```swift
func bitstampURL(interval: IntervalType) -> NSURL {
    if (interval == .LastIntervalType || interval == .VWAPIntervalType) {
        return NSURL(string: "https://www.bitstamp.net/api/ticker/")!
    } else {
        return NSURL(string: "https://www.bitstamp.net/api/ticker_hour/")!
    }
}

func retrievePriceData(interval: IntervalType, completion: NSData? -> Void) -> Void {
    let
        url = bitstampURL(interval),
        request = NSURLRequest(URL: url),
        session = NSURLSession.sharedSession(),
        semaphore = dispatch_semaphore_create(0)

    let task = session.dataTaskWithRequest(request) {
         (data, response, error) -> Void in

        if error == nil {
            completion(data)
        } else {
            completion(nil)
        }
        dispatch_semaphore_signal(semaphore)
    }
    task.resume()

    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER)
}
```

The only real tricky part here is that - since this is a command line script - execution will end as soon as the last function call returns. However, since `NSURLSession` provides us with an asynchronous interface, the function will return *before* the network call can complete. To get around this, we block the main thread with a [semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming)) from [GCD](https://developer.apple.com/library/ios/documentation/Performance/Reference/GCD_libdispatch_Ref/) until the network request completes.

## JSON Parsing

The last task we have left is to parse the data returned from `retrievePriceData`, which we'll do by implementing the `parsePrice` function. The data we get from the BitStamp API is a JSON payload like the following:

```javascript
{
    high: "502.00",
    last: "446.02",
    timestamp: "1446693126",
    bid: "446.03",
    vwap: "445.3",
    volume: "108095.47008023",
    low: "368.11",
    ask: "446.60",
    open: 407.99
}
```

We're mainly interested in the `last` and `vwap` properties, but we'll parse the entire object into a dictionary and return the value we care about. To accomplish this, we'll use the `NSJSONSerialization` class from the `Foundation` framework along with some conditional unwraps:

```swift
func priceKey(interval: IntervalType) -> String {
    if (interval == .LastIntervalType || interval == .HourlyIntervalType) {
        return "last"
    } else {
        return "vwap"
    }
}

func parsePrice(interval: IntervalType, data: NSData) -> Double? {
    do {
        let json = try NSJSONSerialization.JSONObjectWithData(data, options: [])
        if let
            priceData = json as? Dictionary<String, AnyObject>,
            priceString = priceData[priceKey(interval)] as? String {
            // Using the failable initializer to convert to a Double?
            return Double(priceString)
        }
    } catch {
        // died parsing the JSON
    }
    return nil
}
```

## Running and Compiling

And there we have it! The [entire script](https://github.com/stupergenius/Bens-Log/blob/master/blog-projects/swift-command-line/btc.swift) is up on my GitHub page for your reference. It accomplishes everything we set out to do. To satisfy ourselves, let's give it a few runs:

```bash
$ ./btc.swift -i vwap
333.95

$ ./btc.swift --interval hourly
334.05
```

Using the above commands, we're actually running the program as a script: Swift is compiling it on the fly and executing it for us. What if we wanted to compile the `btc.swift` down to an exectuable and run it directly? 

As it turns out, after doing some research, I don't *think* its possible to dynmically link a 3rd party framework using `swiftc`. I can get the `btc.swift` script to compile, but it fails trying to reference the `OptionKit` framework when actually running it. I suspect that removing the `OptionKit` dependency would allow us to compile the script successfully, however. If anyone has any pointers on getting this to work, it would be much appreciated!

For the sake of showing what *doesn't* work, the following compiles the script but fails running:

```bash
# Compile using swiftc
$ xcrun -sdk macosx swiftc -F Carthage/Build/Mac/ btc.swift -o btc

# Attempt to run
$ ./btc
dyld: Library not loaded: @rpath/OptionKit.framework/Versions/0/OptionKit
```

:(

## Conclusion

Aside from compiling the script into an executable, we accomplished what we set out to do. We've solved the problems of loading 3rd party libraries, parsing command line arguments, loading remote JSON data, and parsing JSON data into Swift data structures that we can manipulate. To this end, we've made a functioning script to check BTC prices as reported by BitStamp. We've also seen a few neat Swift language features along the way.

So I hope you all enjoyed the *much anticipated* conclusion to this series, and I hope you all learned someting along the way. My personal hope is that this series serves as an example for future Swift scripting exploits, having solved some of the more common problems we face when writing command line scripts. Apple has given us a great language that is flexible enough to allow us to write both complex iOS application as well as simpler scripts like the one we wrote here. I look forward to seeing more Swift scripts in the wild and hope that the open source Swift announcement takes Swift scripting to the **Next Level** on Linux!
