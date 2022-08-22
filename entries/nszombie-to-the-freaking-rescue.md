---
category: Development
date: 2010-05-05 11:21
tags: 'iOS, iPad, iPhone, Objective-C'
title: NSZombie to the Freaking Rescue
---

So I've been beating my head against a wall the past few days trying to
cram as much Objective-C knowledge as possible and I think it's all
starting to click.

Today I stumbled over the [NSZombieEnabled
argument](http://howtomakeiphoneapps.com/2009/02/nszombie-and-xcode-oh-my/)
and HOLY CRAP WHY ISN'T THIS DEFAULT BEHAVIOR. After enabling the
argument I found where my app crashed in about 1 minute. Turns out you
**should not** do:

```objc
- (void)viewDidUnload {
    self.foo = nil;
    [super viewDidUnload];
}
```

but rather

```objc
- (void)viewDidUnload {
    foo = nil;
    [super viewDidUnload];
}
```

A fairly subtle difference I'll grant myself but, apparently, an
important one. In this particular case I am using the self.foo property
as a typed copy of the UIViewController's view property. In the wrong
case setting self.foo to nil releases the property where the framework
assumes it still exists, resulting in an app crash. Simply setting the
foo instance variable to null, however, works great.
