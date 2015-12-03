Title: Swift Libraries That Are Open Source Swift Friendly
Date: 2015-12-02 18:08
Author: Ben Snider
Category: Open Source Swift
Tags: swift, development, libraries

On the road to open source Swift, some enterprising developers have jumped ahead and started writing libraries, scripts, and apps with an open source Swift in mind. Given a long head start from the Apple announcement to the (alleged) end of year release, these developers have put a significant amount of effort into projects they hope will be useful to the open source Swift community. In this post I'll highlight some of these projects, how they plan to support a non Apple environment, why they're useful, and how to make use of them today in your apps and scripts.

The libraries we'll be looking at today are:

- [Foundation](https://github.com/PureSwift/SwiftFoundation)
- [Swiftline](https://github.com/Swiftline/Swiftline)
- [SMHTTPClient](https://github.com/soutaro/SMHTTPClient)

## Foundation

The [Foundation](https://github.com/PureSwift/SwiftFoundation) library seeks to replace the entire `Foundation` library from Apple with a completely open source version. Its GitHub page describes it as:

 > Cross-Platform, Protocol-Oriented Programming base library to complement the Swift Standard Library. (Pure Swift, Supports Linux)

Indeed, the library makes extensive use of protocol-oriented programming. For example, the library implements its own protocol `FoundationConvertible` on each of the Foundation types that allows users to convert between platform specific types (i.e. Darwin) and the corresponding pure Swift types. From [Darwin](https://github.com/PureSwift/SwiftFoundation/blob/develop/Darwin%20Support/NSDate.swift), it does this by extending the pure Swift type to use the Apple Foundation types (for example [Date <-> NSDate](https://github.com/PureSwift/SwiftFoundation/blob/develop/Darwin%20Support/NSDate.swift)).

This library will make it easy to port and interface with libraries that use Apple Foundation types on platforms that may not directly support the Apple Foundation framework. It also seeks to be a replacement for the Foundation framework that developers can use directly, as an interface, without worrying about how the types are actually implemented on each platform.

Developers can use this today to write Swift that targets Darwin platforms. Using it is as simple as including it in your project using [Carthage](https://github.com/Carthage/Carthage), importing the module, and coding away. The project is committed to unit testing, so start looking at the unit tests to get some usage examples. Below we can see how to easy (and familiar) it is interface with the `Date` class:

```swift
let date = Date(timeIntervalSince1970: 12345.6)
```

## Swiftline

The [Swiftline](https://github.com/Swiftline/Swiftline) library is a set of tools used to create Swift command line scripts (as the name implies). Its GitHub page describes it as:

> Swiftline is a set of tools to help you create command line applications. Swiftline is inspired by highline

[Highline](https://github.com/JEG2/highline) mentioned in the description is an excellent Ruby library that makes writing Ruby command line scripts much easier. Swiftline follows in Highline's footsteps by providing Swift versions of the Highline features, with the goal of making it easier for developers to write great Swift command line scripts. It accomplishes this by providing a nice high level abstraction for common things command line scripts need (like grabbing user input and styling the output) over the low level ways this is usually implemented in Swift.

Swiftline uses Foundation types extensively, but otherwise doesn't appear to use many other Darwin specific APIs or functionality. The `ENV` module uses the standard `env` command and `setenv` system call to read and write environment variables, but this should also work on various other platforms.

Swiftline can also be used today to handle much of the command line nitty gritty. It's available as a pod, so just include it in your podfile to start using it. The examples on the GitHub page are fairly extensive, but to demonstrate how I would have implemented the option parsing in my post on [Swift Command Line Apps](http://www.bensnider.com/using-swift-to-make-command-line-scripts-part-1.html), I wrote the following example:

```swift
func intervalFromArgs() -> String? {
    if let longArg = Args.parsed.flags["interval"] {
        return Args.parsed.flags["interval"]
    } else {
        return Args.parsed.flags["i"]
    }
}
```

## SMHTTPClient

The [SMHTTPClient](https://github.com/soutaro/SMHTTPClient) library is a completely socket-based implementation of a Swift HTTP/1.1 client. Its GitHub page describes it as:

> SMHTTPClient is a HTTP/1.1 client based on socket API. Since it does not depend on NSURLSession, application transport security does not prohibit sending plain-text requests with this library.

The library uses GCD for threading, and some Foundation classes for data strucutres. It also directly uses the Darwin socket system calls. So, while this may not be directly open source Swift ready, it could be ported and built upon for use on platforms other than Apple's.

`SMHTTPClient` does lay the groundwork for pure-swift networking libraries that aren't tied to `NSURLSession` for platforms that might need more low level, or less secure means of communication.

Developers can use this library today in Swift projects that target Darwin platforms. Include the pod in your podfile and you're good to go. Its public interface is blocking, so it's actually right at home with Swift command line scripts. The example posted on the GitHub project page couldn't be simpler to use. Below I'll replace the code I wrote in my series on [Swift Command Line Apps](http://www.bensnider.com/using-swift-to-make-command-line-scripts-part-1.html) to download BTC prices with the `SMHTTPClient` library:

```swift
func retrievePriceData(interval: IntervalType) -> NSData? {
    let url = bitstampURL(interval)

    let resolver = NameResolver(hostname: url.host, port: 80)
    resolver.run()

    let addr = resolver.results.first!
    let request = HttpRequest(address: addr, path: url.path, method: .GET, header: [("Host": url.host)])
    request.run()

    switch request.status {
      case .Completed(let code, let header, let data):
        return data
      default:
        return nil
    }
}
```

## And So Many More

I'm also excited about [Swift-AI](https://github.com/collinhundley/Swift-AI), [SwiftMySQL](https://github.com/dsward2/SwiftMySQL), and so many more that deserve to be called out, but I have to cut if off somewhere. Perhaps in another month or so I'll round up another set of projects and do a similar post.

But, hopefully the above projects give you an insight into the existing state of the open source community around Swift as we're poised for an imminent official announcement from Apple. As you can see, the Swift developer community is certainly not resting on its laurels in the meantime, and I encourage everyone to take a look at these projects to see if you can lend a helping hand. This is also probably a good time to mention the [24 Pull Requests](http://24pullrequests.com) project to help motivate you! I know how hard it is to carve out the time, but it's really worth the investment, and the projects you contribute to certainly appreciate your involvement.

If you know of any additional libraries that are intended for open source Swift, can easily be leveraged with open source Swift, or even a library you would like to see created, please post them in the comments! I'm always eager to see the way Swift is used and am usually surprised at the creative ways developers leverage Swift.
