Title: Refactoring an MVVM App To Swift 3
Date: 2016-11-13 13:45
Author: Ben Snider
Category: iOS Development 
Tags: swift, development, iOS

[Previously](http://www.bensnider.com/making-swift-code-more-swifty-and-an-mvvm-aside.html), as an exercise in converting an existing app to use a [MVVM style architecture](https://en.wikipedia.org/wiki/Model–view–viewmodel), and to make the code more Swifty, I refactored [an example](https://github.com/DenverSwiftHeads/SubstringHashSwift) app provided by [Vui Nguyen](https://sunfishempire.wordpress.com/). This time, we'll explore what it takes to refactor this app to Swift 3, while also taking a look at separating out our view model layer even more. We'll also investigate how to make this code more idiomatic Swift 3 and even a little light [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection).

Since the [news](http://ericasadun.com/2016/11/10/xcode-8-2-deprecates-swift-2-3/) that Xcode 8.2 will be the last version to support Swift 2.3, I decided to jump on the bandwagon of Swift 3 refactors. Hopefully this post gives some insights as to process, and not solely syntax differences. This post also contains some extra considerations around decoupling and changes to our [MVVM example app](https://github.com/DenverSwiftHeads/SubstringHashSwift).

For reference, here are some commits along the way, and the pull request that combines them:

* [Pre Refactor State](https://github.com/DenverSwiftHeads/SubstringHashSwift/tree/6229580f6d2778ddaec2521c641b1c9688e69454)
* [Post Swift 3 Refactor](https://github.com/DenverSwiftHeads/SubstringHashSwift/commit/13a435a42441774e0385427bd92ee978ec961384)
* [Final Refactored State](https://github.com/DenverSwiftHeads/SubstringHashSwift/commit/27f2f3dd7544621a345b5d2c3661d00d47ad3305)
* [Overall Pull Request](https://github.com/DenverSwiftHeads/SubstringHashSwift/pull/2)

## Plan of Attack

Eventually we'll make use of the Swift 3 migration assistant to help migrate our code from 2.2 to 3, but first we'll try our hand at manually converting Swift code to get the hang of things. Then we'll unleash the migration assistant and see what kind of damage we can do. We'll then evaluate the changes the migration assistant made and adjust to our taste from there.

## Getting Started

Before we even get started, we first need to tell Xcode to start using the non-legacy Swift compiler (aka Swift 3.0). To do that we'll just change the build setting "Use Legacy Swift Language Version" to `NO`. We'll also take this chance to upgrade to the new recommended Xcode settings which basically at this point add better compiler warnings and optimizations.

Once we do that and try to build the app, we'll see Xcode give us some new errors. Fun!

## Manual Refactoring of a Swift Class

Let's take a look at the `ReverseHashViewModel` class first, since it produces some compiler errors:

```
ReverseHashViewModel.swift:35:48: Missing argument label 'wordLength:' in call
ReverseHashViewModel.swift:52:76: Cannot call value of non-function type 'UIColor'
ReverseHashViewModel.swift:60:88: Cannot call value of non-function type 'UIColor'
```

### Function Signature Changes

This first error for the `wordLength` call is due to the fact that we are currently calling the `reverseHashGen` method as such:

```swift
// Swift 2
hashReverser = HashUtils.reverseHashGen(model.wordLength, hashKey: model.hashKey)
```

However, that method is currently defined as such:


```swift
// Swift 2
static func reverseHashGen(wordLength: Int, hashKey: String) -> (Int64) -> String
```

Indeed, the compiler here is telling us that we need to either prefix the `wordLength` argument with a `wordLength:` label when calling `reverseHashGen`, or to specify a blank public label in the `reverseHashGen` method signature. We'll opt for the latter and rewrite the `reverseHashGen` method as such, fixing the compiler error in the process:

```swift
// Swift 3
static func reverseHashGen(_ wordLength: Int, hashKey: String) -> (Int64) -> String
```

This addresses the call site as well, so our Swift 3 version of the call site is identical to Swift 2:

```swift
// Swift 3
hashReverser = HashUtils.reverseHashGen(model.wordLength, hashKey: model.hashKey)
```

### UIKit Renaming

Now we'll look at the next two errors, which are the same "Cannot call value of non-function type 'UIColor'" error. As part of the Swift 3 migration, we'll start to see several of these types of errors. These are caused by how UIKit types are imported into Swift 3, whereby the imports from these libraries - and many of the standard iOS frameworks - are updated to be more Swifty.

In this particular case, we currently get a reference to a standard color like:

```swift
// Swift 2
let color = UIColor.greenColor()
```

However, what does this mean from a caller's perspective? Are we calling a static method on `UIColor`? Are we actually creating a new `UIColor` instance? Why do we have the type of the return value encoded into the method invocation?

Swift 3, in this case, will prefer that this is a static variable getter, dropping the method invocation syntax, and dropping the type specifier from the method name. This is a general pattern we'll see when using UIKit types with Swift 3, and in general is one of the [Swift API design guidelines](https://swift.org/documentation/api-design-guidelines/). Now, in Swift 3, our call to get a color is simply:

```swift
// Swift 3
let color = UIColor.green
```

We could continue to manually refactor these classes using the compiler as a feedback mechanism, or we can jump into using the migration assistant. I try to do as many of these unique migration errors manually until they start to get repetitive, and at that point reverting to the migration assistant. This should allow me to get exposed to as many unique errors and required changes as possible while still being useful to the learning process.

## Swift Migration Assitant

Now, as soon we feel like we have a good understanding of the Swift 3 changes, we can use the [migration assistant](https://swift.org/migration-guide/) to convert the remained of the project to Swift 3 syntax. For a small project like this, we probably don't have much to worry about in terms of the migration assistant failing catastrophically, so hopefully this is the easy part. 😬

To invoke the migration assistant we just open up a Swift file, click the *Edit* menu item from the top bar, and then select *Convert -> To Current Swift Syntax...* Xcode will then automatically convert your existing Swift 2 code to Swift 3 code. It will give you a handy preview before you commit to the changes it's about to make, but we'll trust Xcode for now to do the right thing. 🙃

Once the migration assistant (hopefully) does it's magic, we can review the changes it's made. For reference, here's a [commit from the project](https://github.com/DenverSwiftHeads/SubstringHashSwift/commit/13a435a42441774e0385427bd92ee978ec961384) after doing some manual changes and then invoking the migration assistant.

As we can see, this is fairly boilerplate changes at this point. We see some method invocation changes similar to the above manual change, and some UIKit changes. Nothing major here, and ideally the changes are a repetition of the things we've already done manually.

Also it's interesting to note that the [Constants.swift file](https://github.com/DenverSwiftHeads/SubstringHashSwift/blob/13a435a42441774e0385427bd92ee978ec961384/TrelloJobApplication/TrelloJobApplication/Constants.swift) and the [HashConfigurationModel.swift file](https://github.com/DenverSwiftHeads/SubstringHashSwift/blob/13a435a42441774e0385427bd92ee978ec961384/TrelloJobApplication/TrelloJobApplication/HashConfigurationModel.swift) are completely unchanged. These two files are simple enough, and apparently Swifty enough, to not require any source changes to be Swift 3 compatible, which is pretty neat. 👍

At this point our app compiles and works as expected.

## Further Improvements

Now that our code is Swift 3 source compatible and functional again, let's make it even more Swifty and further decouple the layers of our MVVM stack. 😈

Here we'll take the output of the migration assistant, clean it up a bit, decouple some more, and perhaps take a look at some light dependency injection.

### Clean Up

Turns out... the migration assistant did a pretty good job at this. The code as-is is fairly Swifty, and there's not a lot of it so it's still not all that complex. But that doesn't mean we can't [gold plate](https://en.wikipedia.org/wiki/Gold_plating_(software_engineering)) this to our heart's desire! ❤

### Decoupling and API Improvements

**Closed Classes**

One of better changes we can make here, and one change that's more aligned with Swift 3 ideals, is to make our types closed to subclassing, and to make as many methods and properties as possible `private`. Types are closed to subclassing by default in Swift 3, so we can simply drop the `open` specifier on our classes:


```swift
// Post Migration
open class ReverseHashViewModel {}

// Swiftier
class ReverseHashViewModel {}
```

This way, it is literally impossible for us (or any of our consumers) to subclass the ViewModel. This partially satisfies a constraint of the [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design), namely of the [open/closed principle](https://en.wikipedia.org/wiki/Open/closed_principle). The open/closed principle states that types should be open for extension but closed for modification. Disallowing subclassing here means that we can ensure that the functionality encapsulated within the class cannot be modified, while still allowing consumers to add (extend) functionality by composing protocols onto them.

For instance, we can no longer do:

```swift
// Open Class
class SlightlyDifferentHashViewModel: ReverseHashViewModel {
    func aNewMethod() { print("a new method") }
}
```

And instead Swift would prefer us to do:

```swift
protocol NewMethodable {
    func aNewMethod()
}
extension NewMethodable {
    func aNewMethod() { print("a new method") }
}

extension ReverseHashViewModel: NewMethodable {}
```

**Moving Integer Parsing out of the View Controller**

One of the things the view controller previously did was to parse out `Ints` from the `Strings` entered into the UI:

```swift
// Pre-refactor view controller
let wordLength = Int(stringLengthField.text!) ?? Constants.DefaultWordLength
viewModel.wordLengthUpdated(wordLength)
```

However, this includes some logic in the view controller that we'd rather have contained within the view model. We want the view model to be able to determine defaults, and handle errors, rather than having the view controller handle them. This lets our view controller be a simple pass through to the view model, and means it can be laser focused on dealing only with rendering the UI, reacting to UI events, reacting to the view model events, and notifying the view model as appropriate.

To improve on this we now have the view controller:

```swift
// Post-refactor view controller
// Now the view model handles the optional `text?` property as well!
viewModel.wordLengthUpdated(stringLengthField.text)
```

And the view model now contains all the inherent logic here:

```swift
func wordLengthUpdated(_ wordLength: String?) -> Void {
    var length = Constants.DefaultWordLength
    // unwrap the String? optional, and unwrap the optional returned by Int.init?
    if let wordLength = wordLength, let parsedLength = Int(wordLength) {
        length = parsedLength
    }
    // create a new model state
    model = HashConfigurationModel(hashNumber: model.hashNumber, wordLength: length)
}
```

**Code Organization**

A bit boring here so I won't go into detail, but moving out the model types into their own Swift files and group structure really makes it easy to reason about all the model types and their relation to each other, and to the use case in general.

**Enum Improvement**

Previously the `enum` used to represent the hash result, `ReverseHashResult` encoded the associated color of the result as an associated value on the `case`:

```swift
public enum ReverseHashResult {
    case NoResult(String, UIColor)
    case Error(String, UIColor)
    case Success(String, UIColor)
}
```

To improve this, we'll remove the `UIColor` associated value and move into a simple getter. This allows us to standardize on the color used for each case without requiring callers to define it themselves. This prevents us from using one color for `.success` in one area of the app and another color in a different area of the app. Now we simply have:

```swift
public enum ReverseHashResult {
    case noResult(String)
    case error(String)
    case success(String)
    
    var color: UIColor {
        get {
            switch self {
            case .noResult:
                return UIColor.clear
            case .error:
                return UIColor.red
            case .success:
                return UIColor.green
            }
        }
    }
}
```

Notice that we've also renamed the cases to be lower-camel cased to fit with the new Swift 3 guidelines. Now, to get a color from a result case we simply do:

```swift
let result: ReverseHashResult = .success
print(result.color)
```

**Protocol Extraction and Injection**

And now, for my last trick 🎩, we'll extract out protocols for both the view model and the hash generator, and ensure that our consumers only ever deal with those protocols and not the concrete types themselves. We'll do this with some rudimentary injection of these dependencies through each type's initializer (or in the view controller's case, an implicitly unwrapped optional 😱).

First, we'll gather up all the view model's public methods into a single protocol that we define as such:

```swift
protocol ReverseHashViewModelProtocol {
    /** Called to notify the view model that the hash number updated. */
    func hashNumberUpdated(_ hashNumber: String?)
    
    // ... etc.
}
```

We'll do the same for the hash generator:

```swift
protocol HashGenerator {
    /** Get a hash generator given the word length and a hash key. */
    func reverseHashGen(_ wordLength: Int, hashKey: String) -> (Int64) -> String
}
```

Now that we have a `HashGenerator` protocol, and so that we're not required to refer to the `SolutionHashGenerator` concrete type directly, we'll make the `SolutionHashGenerator` type conform to the `HashGenerator` protocol:

```swift
struct SolutionHashGenerator: HashGenerator {
    // etc.
}
```

Similarly we'll apply the view model's protocol to the concrete type. And in this case we'll also store a `hashGenerator` property that is typed to the `HashGenerator` protocol. We'll then go one step further and put a `hashGenerator` argument into the initializer with a default value of the concrete `SolutionHashGenerator` type:

```swift
class ReverseHashViewModel: ReverseHashViewModelProtocol {
    private let hashGenerator: HashGenerator
    // etc.

    init(hashGenerator: HashGenerator = SolutionHashGenerator()) {
        self.hashGenerator = hashGenerator
        // etc.
    }
}
```

The final change is to reference the `ReverseHashViewModelProtocol` from the view controller using a property whose value is assigned from the app delegate:

```swift
class ReverseHashViewController: UIViewController, UITextFieldDelegate {
    // etc.
    var viewModel: ReverseHashViewModelProtocol!
    // etc.
}

class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Setup our root view controller by injecting the view model dependency.
        if let rootController = window?.rootViewController,
           let hashController = rootController as? ReverseHashViewController {
            // Here we could easily inject a different hash generator via the initializer,
            // but we'll just take the default.
            hashController.viewModel = ReverseHashViewModel()
        }
        
        return true
    }
}
```

*Warning: Optional Tangent*

You might be wondering about that implicitly unwrapped optional and thinking "what have you done 😟"? This is mainly a personal design choice, in that I'd rather get a crash here at runtime, and a quick one at that, instead of doing something like this:

```swift
var viewModel: ReverseHashViewModelProtocol?

@IBAction func hashNumberChanged(_ sender: AnyObject) {
    viewModel?.hashNumberUpdated(hashNumberField.text)
}
```

What's the behavior here when we don't have a view model? We simply do nothing, and in this case we're silently failing and not emitting an error for an invalid program state. You might say then, why not guard and crash with an error message, like:

```swift
var viewModel: ReverseHashViewModelProtocol?

@IBAction func hashNumberChanged(_ sender: AnyObject) {
    guard let viewModel = viewModel else { preconditionFailure("expected to have a viewModel") }
    viewModel.hashNumberUpdated(hashNumberField.text)
}
```

And I might say that yeah, I agree with that scenario. And then we'd be done talking 😃. It's a personal design choice, and the two approaches effectively do the same thing (runtime crash on a nil `viewModel`). In larger production apps I'd very much prefer the latter `guard` syntax, but here I just want a quick crash and hopefully the app is simple enough to be able to quickly debug it.

*Optional Tangent Complete*

But, to conclude our redesign, we've effectively decoupled our layers of `View Controller` -> `View Model` -> [`Model`, `Hash Generator`]. The `View Controller` layer receives an instance of the view model through the app delegate, and the `View Model` (optionally) receives an instance of the hash generator implementation.

**Testing**

In this way, we can see how we could easily test each layer of this MVVM architecture by injecting the mocked dependency that the layer under test depends upon.

For instance, we could test our view model by doing something like:

```swift
struct MockHashGenerator: HashGenerator {
    func reverseHashGen(_ wordLength: Int, hashKey: String) -> (Int64) -> String {
        // return some mocked function, store function arguments, flip a state variable, etc.
    }
}

let mockGen = MockHashGenerator()
let viewModel = ReverseHashViewModel(mockGen)
// act on viewModel
// assert some things about how it calls methods on mockGen
```

## Summary

Well, that ended up being a fairly meandering journey through the waters of Swift 3 refactoring and decoupling the layers of our example MVVM app.

Hopefully here we at least exposed some process around refactoring towards Swift 3, if not also elucidating some design concepts and API guidelines for Swift 3. Ideally we also saw how Swift's protocols and type system makes it easy to decouple layers of an architecture by applying some of the SOLID principles.

In general I feel like the Swift 3 version of the example app is now very comprehensible, and provides a good demonstration of separation of concerns through the use of MVVM and protocols, without going full-on reactive or VIPER. The example app maintains that it is possible to use simple language constructs to make layers of applications decoupled, meaning that they're testable, maintainable, and easily changed in the future. It accomplishes all this without requiring any heavy handed architecture techniques, fancy tooling, or large dependency injection libraries.

I hope this helps the community, and in any case let me know what you think through the comments below and/or the [Twitters](https://twitter.com/benatbensnider)!
