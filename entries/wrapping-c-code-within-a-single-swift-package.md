Title: Wrapping C Code Within a Single Swift Package
Date: 2016-11-26 17:14
Author: Ben Snider
Category: Open Source Swift
Tags: swift, development, cli, c, swift package manager

Working with C code from Swift always seemed to me to be one of those [dark arts](https://www.pottermore.com/collection-episodic/harry-potters-villains-by-jkr) that us *well to do* developers shouldn't need to dabble in. However, it's actually a fairly simple proposition, and the Swift compiler and Swift Package Manager lend a big helping hand when importing C code into Swift packages. The C language excels at certain tasks, and as such is a very good tool in the Swift programmer's toolbelt. Indeed, C is not something we should shy away from on the basis that it seems too complicated to integrate, and instead we can rely on the efforts of the Swift toolchain to help.

To this end, I'll outline a simple method that enables us - *in a single Swift package* - to embed C code along with a wrapper Swift library module. This allows us to craft C code for [tasks C is good at](https://www.gnu.org/software/gnuastro/manual/html_node/Why-C.html), with the benefits of being able to easily integrate the C code with other Swift modules by writing a pure Swift (and Swifty) thin wrapper on top. All of this can be accomplished within a single Swift package, and as such is even more convenient to package, distribute, and consume. This method uses official Swift Package Manager functionality to create an SPM `Target` that depends upon an auto-generated C language target.

This method is targeted at integrating C code that is written for the purposes of a Swift package, and not necessarily for C library code that may exist on a Linux system, for example. There are other supported means for doing so, and are [well documented](https://github.com/apple/swift-package-manager/blob/master/Documentation/Usage.md#require-system-libraries).

This method is accomplished with some standard SPM [Target configuration](https://github.com/apple/swift-package-manager/blob/master/Documentation/Reference.md#targets) along with a [C Language feature proposal](https://github.com/apple/swift-package-manager/blob/master/Documentation/Reference.md) that was implemented in the Swift 3.0 release.

## Solution Overview and Motivations

The main points of the solution, as noted above, revolve around the package manager's feature for supporting C language targets. In supporting C language targets, the SPM allows other Swift targets within the same package to depend on, and use, the C language target. This allows us to write a Swift library module that depends on the C module, abstracting some of the C specificity to be more Swifty.

However, I'll note that the Swift compiler is actually already fairly good at importing C code in a Swifty manner, so we'll mostly be hiding some implementation from other consuming libraries. This layering, however, is generally a good practice in that by doing so we're adding a layer of abstraction on top of a lower layer, such that the other layers that depend on the Swift layer aren't concerned about the implementation details of the layers below it. Put more clearly, we would like that consumers of our Swift package to be unaware of its internal implementation in C, and that we would like to only expose our Swift interface.

The sample below doesn't actually achieve this level of abstraction, since as a demo it leaks quite a bit to show how things work. But, given the same technique, this is quite possible and a supported configuration of the package manager.

Through the next few sections we'll see how to:

1. Create a new Swift Package
1. Add the necessary structure around the C code we want to wrap
1. Wrap the imported C code with a Swift library target
1. Write some tests to see how to leverage this new Swift wrapper

We'll accomplish the above by creating a demo package named `Clibadder` that defines an `add` method in a C target, and a Swift wrapper of the C target. The C target we'll configure to be named "libadder" and the Swift target will simply be named "Clibadder". The finished package is available on my [GitHub repo](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/spm-c-lib-wrapper).

## Creating and Configuring a Package

The first basic bit of setup is to simply create the package:

```bash
$ mkdir spm-c-lib-wrapper
$ cd spm-c-lib-wrapper
$ swift package init --type library
```

This will setup the main skeleton of the package itself. It will conventionally create for us the *Sources* directory into which we'll be placing both our C code and the Swift wrapper. This is a great feature of the package manager, in that it simplifies the creation of a standard directory structure that we can just plug our code and extra configuration into.

Next, we'll update the `Package.swift` file, updating the *name* as well as adding our fancy `Target` configuration:

```swift
import PackageDescription

let package = Package(
    name: "Clibadder",
    targets: [
        Target(name: "Clibadder", dependencies: ["libadder"])
    ]
)
```

Here, we've done two things: set the package name to `Clibadder`, and added the `Target` configuration. The target configuration here is a standard form, wherein we explicitly name the package target, and we explicitly name that target's dependencies. The main package name itself can be anything, it doesn't necessarily follow any conventions.

The special sauce, however, is that we configure the `Clibadder` target to depend on the `libadder` target. This `libadder` target will be auto-generated for us by the package manager based on conventions we'll take advantage of in the next section. Essentially, if we create a directory structure under the *Sources* directory such that we have:

```
Sources/libadder/include/libadder.h
Sources/libadder/misc_c_files.c
```

Then the package manager will automatically create a module map for us with all the definitions in the `libadder.h` header exported into a Swift module (and target) similarly named `libadder`. This is the structure we'll create in the next section, and indeed the configuration in the package manifest above depends on this auto-generated target.

More generally, the package manager will auto-generate a C language target for *foobar* if we create a directory structure like *Sources/foobar/include/foobar.h*. There are a couple other convention based forms for which this automatic mapping occurs, and it's also possible (I believe) to manually map the headers. Read [the docs](https://github.com/apple/swift-package-manager/blob/master/Documentation/Reference.md#c-language-targets) for more specifics, but for our purposes this works nicely.

## Adding The C Code

Now that we have the package manifest updated, we can begin adding the conventional structure the package manager expects. As noted above, we'll end up with a directory structure under *Sources* that contains a *libadder* directory containing our C implementation files in addition to an *include* directory that contains our public headers we want to expose to Swift.

We'll start by adding the header file *libadder.h* under *Sources/libadder/include/*. This file will contain our public definitions that will be exposed to Swift. As such, it should be fairly light and only contain the public interface of our C target.

The use case we're supporting here is a basic C module that adds two `long`s together, returning another `long`. As such, our header file will contain a basic method definition. Similarly, to demonstrate how well the Swift compiler imports C definitions into Swift, we'll create a C `struct` that we'll use to pass around adder results. We'll use this struct both by value (as Swift would), as well as with a C pointer. Swift handles both cases fairly Swiftily, as we'll see later.

Thus, our header file `Sources/libadder/include/libadder.h` contains:

```c
// our struct to hold values
typedef struct {
    long x;
    long y;
    long result;
} add_operation;

// simple add method
long add(long x, long y);
// struct by value
add_operation added(add_operation op);
// pointer to struct
void adding(add_operation *op);
```

Yeah... I don't write much C code 😬. Be gentle!

After that, the implementation is pretty boring. We'll place our implementation under *Sources/libadder/libadder.c*, notably not in the same *include* directory, but at the same level as it. The only convention the package manager expects is in the placement of the header file (as far as I know), so we're free to organize under the *libadder* directory as we see fit. Our *libadder.c* file contains:

```c
#import "include/libadder.h"

long add(long x, long y) {
    return x + y;
}

add_operation added(add_operation op) {
    add_operation result = {op.x, op.y, add(op.x, op.y)};
    return result;
}

void adding(add_operation *op) {
    op->result = add(op->x, op->y);
}
```

Here we're implementing the three forms of the amazing **add** function. The first is the simple direct use of the `long` type. Second is the immutable by-value usage of the `add_operation` struct. And third we mutate the `add_operation` struct by passing it to the function as a pointer. Notably, we get some nice syntax — like being able to name the pointer type without specifying it's a struct — since we `typedef`'ed it in the header file. I learned this on [Wikipedia](https://en.wikipedia.org/wiki/Struct_(C_programming_language)#typedef)! 🙈

In the [sample repo](https://github.com/stupergenius/Bens-Log/tree/master/blog-projects/spm-c-lib-wrapper/Sources/libadder) I also added a Makefile that compiles everything together and links a main exectuable. This makes it handy to write, tune, and test your C code from `gcc` without needing to drop into Swift to use it. It mainly shortens the cycle of developing in C, and makes context switching ([the human kind](http://www.joelonsoftware.com/articles/fog0000000022.html)) happen less frequently than it might otherwise.

And that's really it for the C side. In the next section, we'll see how we can pickup this C module in Swift and wrap it.

## Wrapping with a Swift Module

### Imported C Module

Within our Swift `Clibadder` module at *Sources/Clibadder/Clibadder.swift*, we'll start by importing the `libadder` C language module as such:

```swift
import libadder
```

The first line here is key, so instead of skipping it, let's investigate what's happening. This `import libadder` statement is importing the auto-generated C language module that we defined by creating the conventional directory structure as noted in the above section. The types this `libadder` module contains is dependant upon the definitions in our C *libadder.h* header file. In our case, it contains definitions for the `add_operation` struct and the three forms of our **add** function.

The compiler won't actually create any intermediate Swift files or modules, and instead it will simply create a `.dylib` (or a `.so`) based on the compiled `.o` files. However, we can see what the module defines by opening up the module in Xcode (using the *oh so handy* `swift package generate-xcodeproj` command). A little digging will lead us to the imported module definition:

```swift
public struct add_operation {
    public var x: Int
    public var y: Int
    public var result: Int

    public init()
    public init(x: Int, y: Int, result: Int)
}

public func add\(_ x: Int, _ y: Int) -> Int
public func added\(_ op: add_operation) -> add_operation
public func adding\(_ op: UnsafeMutablePointer<add_operation>!)
```

As we can see, this is **very** similar to our C header, with some Swift specific `UnsafeMutablePointer` bits in there (that we're conveniently ignoring for now). This is actually also fairly Swifty. Swift has imported the struct faithfully, and even provided us with default and memberwise initializers. Note however that the struct is not immutable. We could choose to fix that with our wrapper if we wanted to expose a similar struct type, but in our case we don't really care.

The compiler has actually also carried along the function parameter names, and all the proper struct property names, as well as mapping correctly to `Int`s from `longs`. That... is really the bulk of the work done for us by the Swift compiler. No scary looking Swift here! Excellent work by the Swift team. 💯

### Swift Wrapper

As noted, it turns out the Swift compiler is pretty good at importing our simple C types automatically. As such, we're just going to create a single Swift file in our main `Clibadder` module at *Sources/Clibadder/Clibadder.swift* with the contents:

```swift
import libadder

protocol Addable {
    func add(_ x: Int, _ y: Int) -> Int
}

public struct SimpleAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        return libadder.add(x, y)
    }
}

public struct StructAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        let op = add_operation(x: x, y: y, result: 0)
        let result = libadder.added(op)
        return result.result;
    }
}

public struct PointerAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        var op = add_operation(x: x, y: y, result: 0)
        libadder.adding(&op)
        return op.result;
    }
}
```

Since the compiler did much of the hard work for us, our actual Swift module `Clibadder` pretty thin. We can choose to make it as thick or thin as we like, but for our purposes we'll just define an `Addable` protocol (why not?) and make three structs to wrap the three C **add** functions we created.

Overall it looks like pretty standard Swift code. The only real special bits are the handling of the mutable pointer implementation in the `PointerAdd` struct. As we saw above, this is imported into Swift as an `UnsafeMutablePointer`, but we don't really have to deal with that. Instead, we can just pass an instance of the `add_operation` struct as an `inout` parameter, as in: `libadder.adding(&op)`.

## Wrapping up with Tests

Now that we have a Swift module, let's wire up some tests to see if we have everything connected properly. We'll just use the template test file that the package manager created for us, and paste in some test cases:

```swift
// Test Helpers

func addPositive(_ adder: Addable) {
    let added = adder.add(5, 6)
    XCTAssertEqual(added, 11)
}

// etc...

// Test Methods

func testSimpleAdd() {
    let adder = SimpleAdd()
    addPositive(adder)
}

func testStructAdd() {
    let adder = StructAdd()
    addPositive(adder)
}

func testPointerAdd() {
    let adder = PointerAdd()
    addPositive(adder)
}
```

So, making the `Addable` protocol actually did help us somewhat! Here we test to see, among other scenarios, that `5 + 6` does indeed equal 11. This lets us test all the way from our Swift wrapper module to the C code and ensure that we wired up everything correctly, but also that we actually coded the C library correctly.

Running `swift test` should greet us with all greens:

```bash
$ swift test
Compile libadder libadder.c
Compile libadder adder.c
Linking libadder
Compile Swift Module 'Clibadder' (1 sources)
Compile Swift Module 'ClibadderTests' (1 sources)
Linking ./.build/debug/ClibadderPackageTests.xctest/Contents/MacOS/ClibadderPackageTests
Test Suite 'All tests' started at 2016-11-26 21:16:13.673
...
Test Suite 'All tests' passed at 2016-11-26 21:16:13.674.
     Executed 3 tests, with 0 failures (0 unexpected) in 0.000 (0.001) seconds
```

## Summary

We did it 🙌. Hopefully this provides an insight as to how to leverage C code within a Swift module, with the added convenience of the C code co-existing alongside the Swift code that leverages it. This Swift code can either just be a simple layer to exercise the C code, or it can be a module that presents an abstract interface to the C code. In either case, the Swift Package manager allows the configuration and auto-generation of C language targets, and the Swift compiler does much of the heavy lifting of translating the C definitions into a usable Swift module. This leaves us, Jane and Joe programmers of the world, free to write C code with very little cognitive and configuration overhead. So write some C code and see what kind of trouble you can get into! 😈

## Further Reading

* Chris Eidhof's [Swift and C Functions](http://chris.eidhof.nl/post/swift-c-interop/) is a great read for a deeper dive into the more complex interactions we can have between Swift and C code.
* Likewise the [Using Legacy C APIs with Swift](https://www.sitepoint.com/using-legacy-c-apis-swift/) article on SitePoint is another treatment of similar topics, specifically dealing effectively with `UnsafeMutablePointer`s and other memory structures.
