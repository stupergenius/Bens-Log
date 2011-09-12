Simple Pelican Blog Post Template Generator
===========================================
:date: 2011-09-11 20:55
:category: Development
:tags: python, pelican

I just finished a simple script that helps generate Pelican_ blog posts by
printing out some reStructuredText, in the format Pelican expects, based on the
given input parameters. You can use it simple as in the following listing:

.. code-block:: bash

   ./tools/pelican-template-generator.py "My New Post"

And it will generate the reStructuredText header file that Pelican expects and
dump it to stdout, where you are free to copy+paste into your desired editor. It
includes options for writing to an output file, attempting to get the current
author's name from the environment, generating dates, and support for categories
and tags. The command I used to generate this post's template was:

.. code-block:: bash

   ./pelican-template-generator.py "Simple Pelican Blog Post Template Generator" --category Development --tags "python, pelican" -f simple-pelican-blog-post-template-generator.rst

`Get the script`_ on my GitHub.

.. _Pelican: http://blog.notmyidea.org/pelican-a-simple-static-blog-generator-in-python.html
.. _Get the script: https://github.com/stupergenius/Bens-Log/blob/master/tools/pelican-template-generator.py
