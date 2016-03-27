Title: Using swiftenv To Install and Manage Swift Versions
Date: 2016-03-09 19:26
Author: Ben Snider
Category: Open Source Swift
Tags: swift, development, cli

With the proliferation of Swift snapshot builds, and Apple's relatively high release cadence, managing Swift versions has come to be a bit of a pain. This is especially felt on Linux since Swift doesn't just get bundled with each Xcode release. Linux users must go out and manually download a snapshot, unzip it, add it your path, etc.

With that in mind, I wondered if a tool like the über [Ruby Version Manager](https://rvm.io/)(RVM) existed for Swift. RVM allows Ruby developers to have multiple Ruby versions installed at the same time (even down to the patch level), without each Ruby version conflicting with the other. RVM actually goes one step further and supports "gemsets" that allow developers to setup separate partitions within each Ruby version whereby the gems (Ruby libraries) installed in one gemset do not affect the gems installed in another gemset. I don't believe Swift has this problem though, since each Swift library is typically local to the project referencing it (especially with the Swift Package Manager), built alongside the project, and linked directly with the target.

## A Tale of Two Version Managers

As it happens, there are at least two version manager tools for Swift, both created by active members of the community. The first is [chswift](https://github.com/neonichu/chswift) created by [Boris Bügling](https://github.com/neonichu) aka [NeoNacho](https://twitter.com/NeoNacho). The second, that we'll be looking at today, is [swiftenv](https://github.com/kylef/swiftenv) created by [Kyle Fuller](https://github.com/kylef). Ya'll might remember me writing about another of Kyle's projects: the [Curassow](https://github.com/kylef/Curassow) Swift web framework which we used in the [Making a Slack Slash Command Integration using Swift on Heroku](http://www.bensnider.com/making-a-slack-slash-command-integration-using-swift-on-heroku.html) post.

The swiftenv tool appears to be modeled after the Java tool [jenv](http://www.jenv.be/), while the chswift tool is explicitly modeled after [chruby](https://github.com/postmodern/chruby). I see these tools being modeled after other well-known tools as a good thing. I - and many other developers - are already familiar with their installation and usage, and how they manage different compiler/runtime versions. It also likely reduces the development effort for these new Swift tools since there's a known open source reference implementation out there that has ironed out a lot of the user interface and project structure. It's possible there's an entire lineage of these "env" tools that I'm just not aware of, which would be interesting to know if other languages have this sort of tool available.

## One Version Manager to Bring Them All

Installing swift env is fairly straight-forward. The [installation instructions](https://github.com/kylef/swiftenv#installation) cover all you need to know. I was able to install it on my Linux machine without any troubles. At the end, after reloading your shell, running the below command should work and output your currently installed Swift version (likely it will be set to "system" since we haven't yet installed a new Swift version).

```bash
$ swiftenv version
system (set by /home/bsnider/.swiftenv/version)
```

Installing a new version of Swift is likewise simple:

```bash
$ swiftenv install 2.2-SNAPSHOT-2016-03-01-a
Downloading https://swift.org/builds/swift-2.2-branch/ubuntu1404/swift-2.2-SNAPSHOT-2016-03-01-a/swift-2.2-SNAPSHOT-2016-03-01-a-ubuntu14.04.tar.gz
2.2-SNAPSHOT-2016-03-01-a has been installed.
$ swiftenv version
2.2-SNAPSHOT-2016-03-01-a (set by /home/bsnider/.swiftenv/version)
$ swift
Welcome to Swift version 2.2-dev
```

And that's really the main use case for this tool. Locating the correct version of the snapshot to install can be sussed from the [download links](https://swift.org/download/#latest-development-snapshots) provided by Apple. Mostly you'll just need to determine the `major-minor` version to install (2.2 above) and the snapshot date (2016-03-01 above).

Once you have one Swift version installed, this becomes the `global` and current `local` Swift versions. Installing a different version is as easy as giving a different version specifier to the install command. Once installed, the new Swift version lives happily alongside the old version and immediately becomes the active global version:

```bash
$ swiftenv install 2.2-SNAPSHOT-2016-01-11-a
Downloading https://swift.org/builds/swift-2.2-branch/ubuntu1404/swift-2.2-SNAPSHOT-2016-01-11-a/swift-2.2-SNAPSHOT-2016-01-11-a-ubuntu14.04.tar.gz
2.2-SNAPSHOT-2016-01-11-a has been installed.
$ swiftenv versions
* 2.2-SNAPSHOT-2016-01-11-a (set by /home/bsnider/.swiftenv/version)
  2.2-SNAPSHOT-2016-03-01-a
```

## And In The Shell Bind Them

Once you have multiple Swift versions installed, the versions can be managed using the `global` and `local` swiftenv commands. The swiftenv tool allows you to specify a `global` version that is the default in directories and/or shell sessions where the current `local` version hasn't been overridden. Put differently, when running `swift` in a new shell session, you'll get the `global` version. Changing the local version, however, only changes the version in that particular directory. It does this by writing a special `.swift-version` file to the current directory, and the swiftenv tool looks for that special file when you change directories. When swiftenv detects a `.swift-version` file, it changes the current Swift version to match the version specified in the file.

Let's look at some commands to see how this version juggling works in practice.

Currently, our Swift version matches the version that was last installed. In our case that's the `2.2-SNAPSHOT-2016-01-11-a` version as reported below:

```bash

$ swiftenv versions
* 2.2-SNAPSHOT-2016-01-11-a (set by /home/bsnider/.swiftenv/version)
  2.2-SNAPSHOT-2016-03-01-a
```

If we want to change the global version we'd do something like:

```bash
$ swiftenv global 2.2-SNAPSHOT-2016-03-01-a
$ swiftenv version
2.2-SNAPSHOT-2016-03-01-a (set by /home/bsnider/.swiftenv/version)
$ cd some_dir
$ swiftenv version # Same as above, this is now the global version for all shell sessions
2.2-SNAPSHOT-2016-03-01-a (set by /home/bsnider/.swiftenv/version)
```

Changing the local version, however, is directory specific:

```bash
$ mkdir swiftenv_test && cd swiftenv_test # Setup a test directory
$ swiftenv local 2.2-SNAPSHOT-2016-01-11-a # Set the current directory's Swift version
$ swiftenv version
2.2-SNAPSHOT-2016-01-11-a (set by /home/bsnider/swift/swiftenv_test/.swift-version)
$ cat .swift-version
2.2-SNAPSHOT-2016-01-11-a
$ cd .. # Change to a different directory
$ swiftenv version # Now we should get the global version
2.2-SNAPSHOT-2016-03-01-a (set by /home/bsnider/.swiftenv/version)
```

So in concrete terms, this allows us to have a specific, pinned Swift version per project directory. For example, if we had Project A that required some features in the newest version of Swift, but Project B relied on some behavior in the older version of Swift, we can simply set the local version for each project directory independently using the `swiftenv local` command. This is actually quite powerful, and the more you work with the Swift snapshots, the more you really need something like this.

## In Summary

As we've seen, the swiftenv tool makes managing Swift versions vastly simpler than just changing your path to the version of Swift you'd like to run. The fact that the tool can also go and directly download and install any available Swift version is incredibly helpful. We also have the capability to pin Swift versions in specific directories so that we a) don't have to remember what version of Swift is required for a given project and b) have the correct Swift version automagically loaded. For these reasons, this tools makes a powerful combination with the Swift Package Manager.

I personally find swiftenv incredibly valuable, not only in ease of installation and configuration, but it also eases some cognitive load around Swift versions. It's also nice to have a familiar interface to offload even more cognitive load. So thanks to the creators of swiftenv, and hopefully we see better adoption and some enhancements in the future!

