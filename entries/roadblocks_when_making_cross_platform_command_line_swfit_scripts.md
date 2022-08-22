---
title: Roadblocks When Making Cross Platform Command Line Swift Scripts
date: 2016-01-17 11:35
author: Ben Snider
category: Open Source Swift
tags: swift, development, cli, linux
---

I set out with the intention of updating the [Using Swift To Make Command Line Scripts](http://www.bensnider.com/using-swift-to-make-command-line-scripts-part-1.html) post so that the script would run using the open source version of Swift 2.2 on both Linux and OS X. However, I encountered some roadblocks along the way, and in hopes that someone else can avoid them I'll detail my experiences here.

## ✅ Initial Setup

I decided to go with the [Swift Package Manager](https://github.com/apple/swift-package-manager)(SPM) to manage code dependencies when updating the script. I went with this instead of Carthage since it seems like the community is moving towards the SPM for projects and libraries that support open source and/or multi-platform Swift. So it's more often the case that libraries written to target open source Swift or Swift on Linux will support the SPM.

To get this setup is fairly straight forward, in that you basically just need to follow a little convention. Your first step is to create a `Package.swift` file that specifies your package name and declares any other packages your package depends on. The other convention is to contain all your source files inside a `Sources` folder inside the same folder as your `Package.swift` file. Finally, for our purposes, we just place all our actual code inside the `main.swift` file inside the `Sources` folder.

We'll end up with a directory structure like:

- Root
    - Package.swift
    - Sources
        - main.swift

Then in `main.swift` we'll import some different packages depending on what platform we're compiling on:

```swift
#if os(Linux)
import Glibc
#else
import Darwin
#endif

import Foundation
import <OTHER PACKAGES>
```

Once we have the basics working we'll start filling out the implementation from the previous post's `btc.swift` features. To recap, the script simply tells us the price of a bitcoin in USD. Our requirements are to:

- Accept command line arguments specifying what kind of price we want.
- Make an HTTP request to an API that will tell us the price.
- Parse the API's JSON response into something Swift can handle.
- Output the price directly to the console.

## ✅ Argument Parsing

I started off porting the bits of code that parses the arguments given in the command line invocation of the script. This actually turned out to be quite simple. I'm using the excellent [Commander](https://github.com/kylef/Commander) library contributed by [Kylef](https://github.com/kylef) and others. This is actually simpler than the [OptionKit](https://github.com/nomothetis/OptionKit) library I had used in the original post.

This works well and actually reduces the code I needed to write. I included the Commander library in my `Packages.swift` file and was off to the races:

```swift
import PackageDescription

let package = Package(
  name: "btc",
  dependencies: [
    .Package(url: "https://github.com/kylef/Commander.git", majorVersion: 0, minor: 4),
  ]
)
```

The final code to parse and use the command line arguments is as follows:

```swift
import Commander

let main = command(
    // single option "interval" with the default value of "last"
    Option("interval", IntervalType.LastIntervalType.rawValue)
) { interval in
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        // intervalType is now ready to use as before
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}

main.run()
```

## ❌ HTTP Requests

This is where things start to get a little rocky. I tried two approaches before deciding to write this post.

### NURLSession

I first tried the obvious and easiest approach: simply using the existing NSURLSession. This, however, is not implemented in Linux. You'll get the dreaded "fatal error: sharedSession() is not yet implemented" when you try to create a session. So this was a no-go from the very start. At least it failed quickly.

```swift
let session = NSURLSession.sharedSession()
```

Running the above will result in the below error. Even if you try to work around and create your own session, you'll eventually run into something that you need to continue forward that's not implemented.

```bash
fatal error: sharedSession() is not yet implemented
```

### NSData

The second approach was to see if I could use NSData's `contentsOfURL` constructor to bypass the un-implemented NSURLSession. Turns out this depends on NSURLSession so it's *also* not working in Linux (you'll get the same "not yet implemented" error at runtime). Another no-go:

```swift
let url = bitstampURL(interval),
    data = NSData(contentsOfURL: url)

completion(data)
```

### cURL NSTask

This was a last ditch effort that I thought would be *guaranteed* to work and I could come in later to improve upon. The idea was to use an NSTask to call out to the shell and have cURL make the HTTP request. I could then use a pipe to read the shell task's output and go along with parsing the JSON as before.

Buuut no, not quite. I **think** there's a bug - or I'm massively misunderstanding something - in the Linux implementation here that prevents the pipe from being able read the task's output. This strangely works fine in OS X but something goes awry in Linux.

For demonstration purposes this works in OS X:

```swift
import Foundation

let task = NSTask()
task.launchPath = "/bin/ls"
task.arguments = ["-hal", "."]

let pipe = NSPipe()
task.standardOutput = pipe
task.launch()
task.waitUntilExit()

if (task.terminationStatus != 0) {
    print("died")
} else {
    print("worked")
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    print(NSString(data: data, encoding: NSUTF8StringEncoding)!)
}
```

Running it in OS X gives us:

```bash
$ swift experiments/test_nstask.swift
worked
total 48
drwxr-xr-x  16 bsnider  775819049   544B Jan 13 19:11 .
...
```

But in Linux we get the below output and the script never terminates (it just hangs until you kill it):

```bash
$ swift experiments/test_nstask.swift
total 0
drwxr-xr-x 1 bsnider bsnider 272 Jan 17 16:46 .
...
worked
```

Note that we get the "worked" print **after** we get the results of running the script. This is what leads me to believe there's a bug lurking here somewhere. I'll see if I can create a defect if this isn't a known bug.

### Well 💩

So the lack of a working HTTP client in Linux leaves us with little options to get this script working from end to end. If anyone has any ideas or solutions they've found, I'd love to hear them! I'll also accept commiseration. 😎

This - in my opinion - is a very weak point in the open source Swift ecosystem and I'm surprised this hasn't yet been resolved. It's possible it might have been, but in searching I didn't find a real viable solution. There are some promising libraries but I didn't get a chance to check any of them out. Listed are some I came across but didn't investigate:

- [SwiftFoundation](https://github.com/PureSwift/SwiftFoundation)
    - I don't know that this re-implementation of Foundation includes HTTP requests (through NSURLSession) yet.
- [Zeal](https://github.com/Zewo/Zeal)
    - This is probably the most promising, but it required some external dependencies that defeats the purpose of doing a quick command line script.
- One more that I can never find the link to that doesn't appear to support Linux (it directly references the Darwin socket library).

## ❓ JSON Parsing

Still, we can see if parsing JSON works cross platform for when we get HTTP requests working.

We'll start with a simple command line script that parses some static JSON and see what we can see:

```swift
import Foundation

let jsonString = "{\"high\": \"434.00\", \"last\": \"433.00\", \"timestamp\": \"1452741801\", \"bid\": \"433.00\", \"vwap\": \"429.8\", \"volume\": \"7284.25412926\", \"low\": \"424.50\", \"ask\": \"433.05\", \"open\": 432.64}"

if let jsonData = jsonString.dataUsingEncoding(NSUTF8StringEncoding),
    parsed = try NSJSONSerialization.JSONObjectWithData(jsonData, options: []) as? Dictionary<String, Any> {

    print("last = \(parsed["last"]!)")
} else {
    print("parsing failed")
}
```

And this works actually, running the script we get:

```bash
$ swift experiments/test_json.swift
last = 433.00
```

So it seems parsing the JSON response will work cross platform, and the previous implementation (which also used NSJSONSerialization) will work without modification.

There are also a myriad of other Swift libraries that parse JSON. But for our purposes (getting a single key out of a small response), the native library works just fine. Perhaps in the future I'll look into more sophisticated JSON parsers and see if any of them work cross platform.

## ✅ Console Output

Console output is something I knew should work already. Testing it out, it works just fine in Linux:

```swift
import Foundation

print("Hello World!")
```

```bash
$ swift experiments/test_console.swift | tee out.txt
Hello World!
$ cat out.txt
Hello World!
```

## Thoughts

Given that we're dealing with an entirely different operating system here, I did expect there to be some changes to my original bitcoin script. Indeed, the changes that are required to supported cross platform Swift are minimal. The bulk of the work around porting is mainly moving to Commander and using the SPM.

What I didn't expect, however, was that there wouldn't be any way - that I could discover - to make a simple HTTP request in Linux. This is something we take for granted these days. HTTP APIs are so ingrained into the current development landscape - from mobile to desktop to web - that we take the ubiquity and utility of the standard HTTP client stacks for granted.

In addition, not being able to execute and get the output of a shell script in Linux is a setback. This greatly decreases Swift's usefulness as a scripting language, since a substantial portion of the scripts I write are simply glue around other command line utilities.

Hopefully I'm just missing something here, and there are ways to do these things. That said, if there aren't ways, I feel like the excellent open source Swift community will fill in those gaps.

I'll do my research, ask around, try some things, and report back on my findings. If any of y'all have any suggestions, ideas, or know of some solutions already, feel free to discuss in the comments!
