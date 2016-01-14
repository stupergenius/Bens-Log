Title: Making a Slack Slash Command Integration using Swift on Heroku
Date: 2015-12-16 21:38
Author: Ben Snider
Category: Open Source Swift
Tags: swift, development, heroku, github

A lot has changed in the open source Swift world in the past few weeks! The community has already provided some great coverage on the announcement, so I'll just get to the good stuff!

One of the key components to the release is the ability to run Swift code on Linux. Hmm what else do we know that runs Linux? Heroku! Is it possible to leverage one of the server side open source Swift projects to deploy some Swift code to Heroku? You bet! The fine folks (namely [Kyle Fuller](https://github.com/kylef)) behind the [Curassow](https://github.com/kylef/Curassow) framework have also provided a [Swift buildpack](https://github.com/kylef/heroku-buildpack-swift) that uses the [Swift Package Manager](https://github.com/apple/swift-package-manager) to build and deploy directly to Heroku.

Given this platform, I thought a nice little project would be to build a simple [Slack Slash Command](https://api.slack.com/slash-commands) integration that will tell a random joke (probably really bad jokes). Users will invoke the joke service with a simple `/joke` command.

## The Building Blocks

There's so many new things in the last two paragraphs that I feel like I should slow down a little. Let's look at the pieces we're putting together in a little more detail.

- Heroku
    - Cloud hosting, deploys web apps through git.
- Buildpack
    - A collection of scripts/binaries that run a Heroku app.
- Curassow
    - A pre-fork HTTP Server written in Swift that runs on Linux.
- Swift Package Manager
    - Swift's native dependency management solution.
    - Is able to pull other Swift libraries from git, build them, and build your code while linking the dependencies.
- Slack Slash Command
    - Allows users to interact with services directly through slack by using a `/command`.
    - Services are invoked through an HTTP request, and reply directly in the response.

Given what we know now, we see we'll need a web service that waits for requests from Slack that can then quickly spit out a joke. So first we'll need a Slack instance that we can configure to call our command integration web service. We'll then make a little Swift web service using Curassow. To handle the hosting, we'll deploy the service up to Heroku with some help from the Swift buildpack. All this will be built and linked together using the Swift Package Manager. Simple right? Let's get going...

## Getting Started

Let's see. Where to begin. First I'd say make sure you having a working Swift 2.2 environment so we can use the package manager. Follow the excellent instructions on [Swift.org](https://swift.org/download/#apple-platforms) to get up and running.

Next you'll want a Slack instance you administer. Slack is free for small teams, so just hit up [sign up](https://slack.com/create) page and off you go.

Next, we'll need a Heroku account so we can deploy our app. Heroku is also free for development purposes, so breeze through the [sign up](https://signup.heroku.com) process. Once you have a Heroku account, install the [Heroku toolbelt](https://toolbelt.heroku.com/) for your platform. Once installed, login with the toolbelt by running `heroku login` on your command line. The entire interaction looks like:

```bash
$ heroku login
Enter your Heroku credentials.
Email: your@email.com
Password (typing will be hidden):
Logged in as your@email.com
```

We also need a git repository (that can optionally be hosted by GitHub or whomever) to do our Heroku deployments. So if you host your code on GitHub or another provider, go ahead and setup a new repository now and clone it, otherwise stay tuned.

Whew, that's a lot of accounts. Side note: [1Password](https://agilebits.com/onepassword) is a great tool for handling all these new account credentials that we'd otherwise have to keep inside our tiny little brains.

## The Command Line, Finally

Now that we have our Swift development environment setup, our own slack instance, and a Heroku account, we can stack mangling stuff to together and making it work.

If you don't have a hosted repository setup already, you don't really need a remote to deploy to Heroku. To create a local git repo that we can use to deploy, run the following commands:

```bash
$ mkdir swift-slack-slash-command
$ cd swift-slack-slash-command
$ git init .
$ echo "swift-2.2-SNAPSHOT-2015-12-01-b" > .swift-version
$ git add .
$ git commit -am'First!'
```

You'll note we actually created a new file - `.swift-version` - above when initializing the repository. This tells the Swift buildpack which version of Swift we want to be deployed to Heroku. This is optional, but it's probably a good idea to pin the version of our app to a specific Swift version.

At which point, we can create a new Heroku app using the Swift buildpack by simplying running:

```bash
$ heroku create --buildpack https://github.com/kylef/heroku-buildpack-swift.git
```

When it's done, Heroku will tell you the URL where your newly created app is hosted. Take note of that URL as we'll be using it to setup our Slack integration.

## Creating the Slack Integration

Make sure you're logged into Slack, and go to your [Slack integrations page](https://slack.com/apps/build). From there click "Make a Custom Integration" and then chose "Slash Commands" from the list.

In the "Choose a Command" field, input the name of the command you want users to type to invoke your command. For this project, I just chose "/joke". Click "Add Integration", and in the form that loads, enter your Heroku app's URL into the URL field with "/joke" appended to it. My URL to my heroku app looks something like "https://fallen-oak-5678.herokuapp.com/joke". From there, the rest of the configuration is optional, so fill it out as much as you want and click "Save Integration" to complete the process.

## Show Us Teh Swift Codez

Somewhat depressingly, the actual Swift implementation is fairly minimal. [The entire project](https://github.com/stupergenius/swift-heroku-slack-command) is hosted on my GitHub profile. We leverage the Curassow web server to handle the HTTP negotiation, and the Swift Package Manager does all the building.

The meat of our Joke web service is the below Swift code in a [main.swift](https://github.com/stupergenius/swift-heroku-slack-command/blob/master/Sources/main.swift) file inside the `Sources` directory:

```swift
#if os(Linux)
import Glibc
#else
import Darwin
#endif
import Curassow
import Inquiline

serve { request in
  if request.path == "/joke" {
    let joke = Joke.tell()
    return Response(.Ok, contentType: "text/plain", body: joke.content)
  } else {
    return Response(.NotFound, contentType: "text/plain", body: "Not Found")
  }
}
```

We first setup our imports, either grabbing `Glibc` for Linux (which is what Heroku will use) or `Darwin` for... Darwin platforms. We then import the two modules that implement the Curassow web server. First, Curassow itself, and then the [Inquiline](https://github.com/nestproject/Inquiline) module which provides a standard implementation of the request and response types we're using above.

The actual web code is farily simple, we check the [Request](https://github.com/nestproject/Inquiline/blob/master/Sources/Request.swift) object's path to see if the request is coming from the `/joke` Slack command, otherwise we'll just return a 404. If we are handling a joke command, we'll load a joke using our `Joke` struct and respond with its content as `text/plain` back to Slack. The `Joke` struct is implemented under the same `Sources` directory in a [Jokes.swift](https://github.com/stupergenius/swift-heroku-slack-command/blob/master/Sources/Jokes.swift) file:

```swift
#if os(Linux)
import Glibc
#else
import Darwin
#endif

// Array sample from http://stackoverflow.com/a/24101606
extension Array {
    func sample() -> Element {
        let randomIndex = Int(rand()) % count
        return self[randomIndex]
    }
}

struct Joke {
  let content: String
  static let builtinJokes = [
    "Wanted: Swift developer with 5 years experience.",
    "Something... Taylor Swift? That's funny right?",
    "Swift: still not Lisp.",
  ]

  init(_ content: String) {
    self.content = content
  }

  // Tells one of our builtin jokes.
  static func tell() -> Joke {
    let joke = Joke(Joke.builtinJokes.sample())
    return joke
  }
}
```

## Enabling the Swift Package Manager

Putting these two source files together, along with the Curassow web server (and its dependencies, and so on), is the Swift Package Manager. To enable the package manager to do its magic, all we have to do is follow a little convention. First, we provide a [Package.swift](https://github.com/stupergenius/swift-heroku-slack-command/blob/master/Package.swift) file in the root repository folder that defines some things about our package, but also what other packages we depend on. Our `Package.swift` file looks like:

```swift
import PackageDescription

let package = Package(
  name: "SlackJokeCommand",
  dependencies: [
    .Package(url: "https://github.com/kylef/Curassow.git", majorVersion: 0, minor: 2),
  ]
)
```

Notice it's also Swift! How neat. We just provide a name for our package and declare that we depend on the 0.2 version of the Curassow package.

As I noted above, our two source files - `main.swift` and `Jokes.swift` - live under a `Sources` folder. This folder is a convention so that the package manager knows where to go to compile our Swift sources. The important thing to note here is that our executable will be built using the specially named `main.swift` file. We can also use the Swift code we write in the other source files without specifically importing them, such that we don't have to import the `Jokes` file to use the `Joke` struct in our `main.swift` file.

The entire directory structure should now look like:

- Root
    - Package.swift: Contains the package definition and dependencies.
    - Sources
        - main.swift: The source of our executable program.
        - Jokes.swift: The source for the `Joke` struct.

At this point, we can simply run the below command in the root repository directory to compile our web service:

```shell
swift build
```

Deceptively simple right? The package manager will go out and grab the depencies we need, compile them, and then compile our code and link it all together into an executable. Since we specified our package name as `SlackJokeCommand` in the `Package.swift` file, the exectuable the package manager will create will be named... `SlackJokeCommand`. By default the package manager will build with the debug configuration, and output its build results into a folder named `.build`. To run our web service locally before deploying (so we can quite easily test it), we just invoke the executable itself:

```objc
.build/debug/SlackJokeCommand
```

This will, by default, bind to the localhost on port 8000. So if we fire up a browser to "http://localhost:8000/joke" we should see our web service print out a terrible joke! If we load any other path on the web service, we should correctly get a 404 response.

## Hosting on Heroku

We've already created our Heroku account and the app, so this should go rather quickly.

Since we're hosting on Heroku, we'll need to provide a [Procfile](https://devcenter.heroku.com/articles/procfile) so that Heroku knows how to run our Curassow web server. This is entirely a requirement of Heroku, and doesn't have anything to do with the Swift Package Manager. This file lives in the root of our repository alongside the `Package.swift` file. [Our Procfile](https://github.com/stupergenius/swift-heroku-slack-command/blob/master/Procfile) can be fairly simple since we just have a single `web` job that binds to the default port, like so:

```ruby
web: SlackJokeCommand --workers 4 --bind 0.0.0.0:$PORT
```

We now just need to commit our work to the git repo (and optionally push it to remote master).

```shell
git add .
# Please don't emulate my commit message behavior...
git commit -am'All the things.'
git push origin master
```

And now the final magic line to deploy to Heroku is simply:

```shell
git push heroku master
```

This command will take some time, as Heroku is going out and getting the Swift installation package, installing it, building the package (including downloading and building Curassow), and then hooking up a proxy to our web service. If we make any changes to our package that we need to re-deploy, all we need to do is commit and push to heroku again.

## The Goods

Once all is said and done, our Slack command should be working! Revel in its glory:

![Swift Joke Command](http://media.bensnider.com/images/slack-joke-command-results.png)

That seems like a lot of work to get a simple command up and running, but mostly it's just legwork. It also proves the point quite well that we **can** run Swift on the server, and it's fairly easy to do so using something like Heroku.

None of this, however, is *quite* production ready yet. Curassow has some issues when restarting killed processes, and nobody really knows how performant Swift is - or can be - as a server side language. We're also not even at the level of [Sinatra](http://www.sinatrarb.com) yet (as far as I know) in terms of a Swift web framework that can be hosted on Linux servers. So we've definitely got a long way to go before we start writing mobile backends in Swift.

That said, it's definitely a fun adventure, and I encourage you all to think up projects you think would fit well as a Swift web service. Or if you've got the itch, go and performance test Curassow, or contribute to one of the packages that are bringing a more featureful web framework to Swift. Now that Swift is open, we have so many avenues to explore, and I'm thrilled how well Apple has handled the whole affair.
