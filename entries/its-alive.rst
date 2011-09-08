It's Alive!
###########
:date: 2011-08-07 02:08
:category: Development
:tags: Python, Hosting, Linux

*Finally* got the new blog up and running. But I feel like I've learned
a lot about modern python development (github, pip, virtualenv, etc.),
which was the main impetus behind doing this conversion.

This blog is now a static site that's generated using Pelican_, stored
on my `GitHub repository`_ and served up through my Amazon S3 bucket that
I just point my domain at. Ideally I will automate this to the point
that a git commit will trigger a Pelican build and then a s3cmd.rb_
script that syncs up the generated files. Not sure if I want to make
that one or two steps though.

But, expect more to come of this!

.. _Pelican: http://blog.notmyidea.org/pelican-a-simple-static-blog-generator-in-python.html
.. _GitHub repository: http://github.com/stupergenius
.. _s3cmd.rb: http://s3.amazonaws.com/ServEdge_pub/s3sync/README.txt
