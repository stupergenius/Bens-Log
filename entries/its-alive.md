---
category: Development
date: '2011-09-08 02:08'
tags: 'Python, Hosting, Linux'
title: 'It''s Alive!'
---

*Finally* got the new blog up and running. But I feel like I've learned
a lot about modern python development (github, pip, virtualenv, etc.),
which was the main impetus behind doing this conversion.

This blog is now a static site that's generated using
[Pelican](http://blog.notmyidea.org/pelican-a-simple-static-blog-generator-in-python.html),
stored on my [GitHub repository](http://github.com/stupergenius) and
served up through my Amazon S3 bucket that I just point my domain at.
Ideally I will automate this to the point that a git commit will trigger
a Pelican build and then a
[s3cmd.rb](http://s3.amazonaws.com/ServEdge_pub/s3sync/README.txt)
script that syncs up the generated files. Not sure if I want to make
that one or two steps though.

But, expect more to come of this!
