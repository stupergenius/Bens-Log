---
title: Getting Started with OpenWhisk Server Side Swift
date: 2016-03-26 14:15
author: Ben Snider
category: Open Source Swift
tags: swift, development, cli
---

With the burgeoning server side Swift movement picking up steam, some larger players have started incorporating Swift into their cloud offerings. One such player is IBM, who has long been in the cloud business but is often not top of mind when it comes to cloud offerings, at least in the iOS development community where [AWS](https://aws.amazon.com) is king. [IBM](http://www.ibm.com), however, has quite a few cloud products through their [Bluemix platform](http://www.ibm.com/cloud-computing/bluemix/), which actually includes their [Watson cloud services](http://www.ibm.com/cloud-computing/bluemix/watson/) and the always useful [Swift Sandbox](https://swiftlang.ng.bluemix.net/#/repl).

Recently, IBM started offering the [OpenWhisk](https://developer.ibm.com/openwhisk/) service that seeks to completely virtualize code execution down to the individual function. OpenWhisk is actually [open source](https://github.com/openwhisk/openwhisk) so you can deploy your own OpenWhisk environment without relying on Bluemix for hosting (though interestingly you could also deploy your own private OpenWhisk service through a Bluemix hosted Docker container).

OpenWhisk is comparable to [AWS Lambda](http://aws.amazon.com/lambda/), whereby both platforms allow developers to upload single functions that can be called in a number of different ways, including HTTP requests and rule based triggers. The OpenWhisk platform supports running Swift code as stateless "actions" that are compiled using the open source Swift compiler on Linux. Stateless here is a key word, in that any state has to live elsewhere (connected to another cloud database or otherwise). As of writing, the OpenWhisk platform appears to be using the `2.2-SNAPSHOT-2016-01-11-a` version of Swift on Ubuntu 14.04 (as least according to the GitHub source).

What this means for Swift developers, however, is that we can simply upload a Swift function to OpenWhisk, and the Bluemix platform will handle *everything* else. This makes getting started with Swift on the server a very simple proposition. In this post I'll briefly go over getting OpenWhisk setup, how the service generally works, and how we can setup our own OpenWhisk Swift action that responds to an HTTP request.

# Set Up

The very first thing you'll want to do is to [sign up with Bluemix](https://new-console.ng.bluemix.net/registration/?Target=https%3A%2F%2Fnew-console.ng.bluemix.net%2Flogin) and enroll in the [OpenWhisk beta program](https://new-console.ng.bluemix.net/openwhisk/). Once you're accepted into the program, you'll get an invite to the email you used to sign up. This only took one day for me, so the invites are likely sent out daily. Not a bad wait.

## The OpenWhisk CLI

Currently, the only interface to setting up your account and managing actions is through the OpenWhisk CLI tool `wsk`. It's actually easy to use, and offers all the commands you need to get up and running. If you're at all familiar with the AWS CLI tools or even the Heroku toolbelt, you won't have any trouble using the `wsk` tool.

## Install

To get started, once you've accepted the beta program invite, visit the [CLI Configuration page](https://new-console.ng.bluemix.net/openwhisk/cli) for your account specific setup instructions.

Before you begin, make sure you have python 2.7 installed on your machine, along with pip. If you're on OS X and using the system python, you can follow [pip's own installation instructions](https://pip.readthedocs.org/en/stable/installing/#install-pip). To install pip on Ubuntu I ran the following command:

```bash
$ sudo apt-get install python-setuptools python-pip
```

To install the `wsk` tool, the OpenWhisk instructions will tell you to run the command:

```bash
$ sudo pip install --upgrade https://new-console.ng.bluemix.net/openwhisk/cli/download
```

However, this threw an error with my version of `pip`. It may be temporary, or it may not be. I found sucess, however, by just downloading the package and installing it with `pip` locally. The below commands allowed me to install the `wsk` tool successfully:

```bash
$ wget https://new-console.ng.bluemix.net/openwhisk/cli/download -o openwhisk.tar
$ sudo pip install openwhisk.tar # or use a virtualenv, whatevskies
$ rm openwhisk.tar # optional
$ wsk -h # make sure it actually installed
```

## Authenticate

Apply your specific auth and namespace from step 2 on the [CLI Configuration page](https://new-console.ng.bluemix.net/openwhisk/cli), so that subsequent commands made from the `wsk` tool are automatically applied to your account.

```bash
$ wsk property set --auth <your_token> --namespace <your_namespace>
ok: whisk auth set
ok: namespace set to <your_namespace>
```

We can see that the auth token and the namespace are actually just properties that we're setting. These properties are set system wide, and I'm not sure if the `wsk` tool can read from a property file or not. However they can be supplied (and likely overridden) by using the `--auth` and `--namespace` parameters for other commands. We can also read out properties easily, which we'll use later when we're calling the HTTP API:

```bash
$ wsk property get --auth
whisk auth      <your_token>
```

## Verify

To make sure that everything went well, we can run one of the sample actions:

```bash
$ wsk action invoke /whisk.system/samples/echo -p message hello --blocking --result
{
   "message": "hello"
}
```

You should now see some activity on your [OpenWhisk Dashboard](https://new-console.ng.bluemix.net/openwhisk/dashboard), which will list the actions you've run so far. If you invoke the `echo` message again, the Dashboard should update with the second invocation.

# Actions

Now that we have a working environment setup, we can begin to understand a little about what the OpenWhisk tool is doing for us. One, we've already authenticated using our particular auth token. And two, we just ran a pre-built system action.

What's an action though, and why did it say "hello"? From the [OpenWhisk docs](https://new-console.ng.bluemix.net/docs/openwhisk/index.html):

> Actions are stateless code snippets that run on the IBM® Bluemix® OpenWhisk platform. An action can be a JavaScript function, a Swift function, or a custom executable program packaged in a Docker container. For example, an action can be used to detect the faces in an image, aggregate a set of API calls, or post a Tweet.

Actions can optionally accept some inputs, which we can either specify using the `--param` option with the `wsk` tool, or as JSON objects through the HTTP API. Actions will also typically return a JSON response body. Actions can be run "blocking" whereby the caller will wait until the action completes, or it can be run asynchronously and polled for completion. To begin with, we'll take the simpler blocking HTTP route for our purposes.

Thus, if we take the `echo` action above as a template, it accepted a `message` parameter as input. It then output a JSON response body containing the `message` input parameter we gave it. The `wsk` tool waited for the action's output because we requested that it block by including the `--blocking` option. And also it reported only the result of invoking the action because we included the `--result` option. While this `echo` action is trivial, it did help elucidate some of the core concepts behind how OpenWhisk actions and action invocations work. Crucially it also doesn't rely on any inherent state: only the state we give it in its input parameters.

## Creating Actions

Now that we get the gist of what actions can do for us, let's see how we can make one of our own. The `wsk` tool syntax for creating actions is pretty straight forward:

```bash
$ wsk action create <action_name> <file.swift>
ok: created action <action_name>
```

Note that we don't have to tell it we're making a Swift action, it'll figure that out because we're giving it a file with a `.swift` extension. The Swift file we provide when creating the action simply has to implement a bare function `main` that accepts a dictionary of parameters and returns an output dictionary. The output dictionary will be automatically converted to a JSON object by OpenWhisk, so we can just return a Swift dictionary and be done. Below is the simple example provided by the OpenWhisk docs:

```swift
func main(args: [String:Any]) -> [String:Any] {
    if let name = args["name"] as? String {
        return [ "greeting" : "Hello \(name)!" ]
    } else {
        return [ "greeting" : "Hello stranger!" ]
    }
}
```

As we can see, the `main` function simply ingests the dictionary, and outputs another dictionary. This is the entirety of the file we need to provide to OpenWhisk: nothing else.

To create an action from this file we simply run:

```bash
$ wsk action create helloSwift hello.swift
```

## Invoking Actions

Now that we have created our own `helloSwift` action from the `hello.swift` file, we can immediately invoke it. There are two options for invoking our action: through the `wsk` CLI tool, or through the HTTP API.

### CLI Invocation

We've actually already invoked an action through the CLI already: the `echo` system action from the setup section. Invoking our own action will be very similar. The signature of the `invoke` command is below:

```bash
wsk action invoke --blocking --result <action_name> --param key value
```

Thus, since parameters are optional for our `helloSwift` action, we can call it simply:

```bash
$ wsk action invoke --blocking --result helloSwift
{
    "greeting": "Hello stranger!"
}
```

Or by providing a `name` parameter we can call it as:

```bash
$ wsk action invoke --blocking --result helloSwift --param name "human meatbag"
{
    "greeting": "Hello human meatbag!"
}
```

### HTTP Invocation

Somewhat more interesting for us is the [OpenWhisk HTTP API](https://new-console.ng.bluemix.net/apidocs/98#invokeactionPOST). It's a bit more cumbersome, but for the iOS platform there's a [mobile SDK](https://new-console.ng.bluemix.net/docs/openwhisk/openwhisk_mobile_sdk.html) to simplify interacting with the API. For our purposes we're just going to make some quick `curl` commands.

Since we're no longer using the `wsk` tool, we'll need to specify our namespace and auth token directly in the HTTP request. This is done using a combination of headers and URL parameters.

The basic way to invoke an existing action is to make a **POST** request to `https://openwhisk.ng.bluemix.net/api/v1/namespaces/NAMESPACE/actions/ACTION?blocking=true` where we'll fill in the NAMESPACE and ACTION placeholders with our own personal namespace and the name of the action we'd like to invoke. To specify paramters, we can include a JSON body. The output we'll get back is also JSON (though a little cluttered, as we'll see later).

Note that we're including a `?blocking=true` URL parameter, which is the same as including the `--blocking` option with the `wsk` tool: the HTTP request will block until the action invocation is complete and the response will include the invocation result.

Authentication is specified by providing an HTTP Basic auth header that contains a base64 representation of our auth token we configured with the `wsk` tool. To get the token from `wsk` in a format that we can use as an auth header, we'll do some `awk` magic and pipe it to `openssl` to base64 encode it. This basic idea (as well as a few other techniques in this post) is from [Takehiko Amano](https://amanoblog.wordpress.com/2016/03/03/ibm-bluemix-openwhisk-rest-api/):

```bash
$ wsk property get --auth | awk '{printf("%s", $3)}' | openssl base64 | tr -d "\n"
```

#### Making the Call

Rolling this all together, we'll just setup some shell variables to hold the auth header value, our namespace, and the action we want to invoke. Then make the actual `curl` request using those shell variables.

Thus to make an HTTP request to invoke our `helloSwift` action we would do:

```bash
$ AUTH=$(wsk property get --auth | awk '{printf("%s", $3)}' | openssl base64 | tr -d "\n")
$ NAMESPACE=<your_namespace>
$ ACTION=helloSwift
$ curl -s -H "Content-Type: application/json" \
-H "Authorization: Basic $AUTH" \
-X POST "https://openwhisk.ng.bluemix.net/api/v1/namespaces/${NAMESPACE}/actions/${ACTION}?blocking=true" \
-d '{"name": "human meatbags"}'
```

#### Prettying Up the Response

The bare response we'll get is fairly large and includes mostly data we don't really care about. To filter out this noise, I'll use the awesome [jq](https://stedolan.github.io/jq/) tool. This tool can be installed using your system's package manager (homebrew, apt, etc.) and makes parsing JSON on the command line fantastically easier.

We're just going to use a simple `jq` [filter rule](https://stedolan.github.io/jq/manual/#Basicfilters) to get the JSON snippet we actually care about, the response result:

```bash
$ curl -s -H "Content-Type: application/json" \
-H "Authorization: Basic $AUTH" \
-X POST "https://openwhisk.ng.bluemix.net/api/v1/namespaces/${NAMESPACE}/actions/${ACTION}?blocking=true" \
-d '{"name": "human meatbags"}' |
jq '.response.result'

{
  "greeting": "Hello human meatbags!"
}
```

# Telling Jokes

So let's bring this full circle. If you recall from one of my previous posts where we made a [Slack slash command integration](http://www.bensnider.com/making-a-slack-slash-command-integration-using-swift-on-heroku.html), we had a simple Swift package that we ran on Heroku.

What if we could run that same script on OpenWhisk? It seems to meet all our criteria: it can be condensed into a single function, it requires no state (internal or otherwise), and it should be accessible via an HTTP request.

Unlike the Heroku integration from the previous post, we don't need to worry about a lot of things with OpenWhisk. Running on Heroku, we had to pick and integrate a Swift web framework that ran on Linux: but with OpenWhisk we don't. We also had to think about URL routing and HTTP status codes: but with OpenWhisk we don't. We also don't have to worry about external packages (in fact, we can't currently), or JSON parsing or serialization. In short, all we're providing to OpenWhisk is a function to run, which reduces our complexity down to the actual logic that we want to implement for this exact request. Sweet!

Converting our [original web package](https://github.com/stupergenius/swift-heroku-slack-command) down to an OpenWhisk compatible function is simple:

```swift
import Glibc

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

  static func tell() -> Joke {
    let joke = Joke(Joke.builtinJokes.sample())
    return joke
  }
}

// The main function is called when invoking the action.
func main(args: [String:Any]) -> [String:Any] {
  // It appears rand is not seeded by OpenWhisk... simple enough though.
  let time = UInt32(NSDate().timeIntervalSinceReferenceDate)
  srand(time)

  let joke = Joke.tell()
  return [
    "response_type": "in_channel",
    "text": joke.content
  ]
}
```

We'll jam the above vanilla Swift code into a `jokes.swift` file and create an OpenWhisk action with it:

```bash
$ wsk action create joke joke.swift
```

And invoke it using the `wsk` tool:

```bash
$ wsk action invoke --blocking --result joke
Wanted: Swift developer with 5 years experience.
```

Neat huh?

The first thing you'll notice when invoking OpenWhisk actions currently is performance. It takes a good *6 seconds* to invoke our simple action. Let's address that passive aggressively by adding a new joke and updating the action:

```bash
$ wsk action update joke joke.swift
$ wsk action invoke --blocking --result joke
"Current OpenWhisk performance..."
```

Performance is a joke... get it? 😎

We can make an HTTP call like we did previously:

```bash
$ ACTION=joke // with $AUTH and $NAMESPACE as defined previously
$ curl -s -H "Authorization: Basic $AUTH" \
-X POST "https://openwhisk.ng.bluemix.net/api/v1/namespaces/${NAMESPACE}/actions/${ACTION}?blocking=true" \
-d '' |
jq ".response.result.text"

"Current OpenWhisk performance..."
```

# Putting On The Brakes

*However* we seem to have run into a little snag. Several actually.

**Response Time**

In order for this to work as a Slack command, the response has to complete within *3 seconds*, but right now it's taking more like 6 seconds to complete. I don't know how to make it faster, and it doesn't seem like IBM will even take my money for the OpenWhisk service at this point. So we're not looking good on the performance front.

**Authentication Header**

Additionally, we have to specify authentication information when invoking the action, which are basically secrets to our account acting as a proxy for username and password. We likely don't want to leak these, but if we don't care, there is a workaround. The authentication token can be specified as part of the URL instead of as a header:

```bash
$ HTTP_AUTH=$(wsk property get --auth | awk '{printf("%s", $3)}')
$ curl -s -X POST "https://${HTTP_AUTH}@openwhisk.ng.bluemix.net/api/v1/namespaces/${NAMESPACE}/actions/${ACTION}?blocking=true" \
-d '' |
jq ".response.result.text"
```

**Response Body**

But that still leaves us with the fact that the raw HTTP response body, without using `jq`, is not a raw response body. The Slack command expects a specific response format, not what OpenWhisk responds with by default. I don't know if it's possible to strip this out with a query parameter. The HTTP API docs don't specify one, and tinkering with some possible query parameters didn't work out for me.

So it seems like we at least can't use this service as-is for interacting with other systems that define a specific JSON response body. It's likely possible to place one of the other Bluemix tools in from of OpenWhisk as a proxy, so I'll investigate that for the future.

# Summary

Leaving aside the downer that is not being able to replace our Heroku app with a single OpenWhisk action, this seems like quite a powerful tool. Things I've left out that I'd like to investigate further would be:

- Placing an HTTP proxy in front to transform the OpenWhisk response format.
    - Or otherwise determining how to strip the response to only the result.
- Interacting with other cloud services: databases, APIs, etc.
- Using asynchronous actions to implement longer running commands.
- Using the rule based trigger feature that can automatically invoke certain actions.

So this seems like a useful tool to keep on the old toolbelt. I'll keep this in mind when I need a *super* simple web service and I don't want to muck with *any* of the extraneous administration. I'd also like to know if any of you all are using OpenWhisk with Swift, or even Lambda (I don't know if Lambda supports Swift though?). This kind of service seems quite appealing, especially with the downfall of Parse, but I feel like it needs to bake in the oven a little (or a lot...) before I'd recommend using it outside of hobby projects.
