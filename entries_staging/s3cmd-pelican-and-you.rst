s3cmd, Pelican, and You
=======================
:date: 2011-09-11 21:55
:category: Development
:tags: pelican, s3

Turns out uploading this blog to `Amazon S3`_ using s3cmd_ is ridiculously
simple. All I have to do to sync the Pelican generated directory to my S3 bucket
is the follwing:

.. code:: bash

    s3cmd sync --acl-public --delete-removed output/ s3://www.bensnider.com/

The `sync command`_ basically works like rsync; it uses the hashing and diffing
features in S3 to upload only the contents that have changed. I also specify the
``--acl-public`` option to have the files uploaded be HTTP readable by everyone.

If you don't feel like jumping in with both feet yet, you can use the
rsync-alike ``--dry-run`` option until you are satisfied with the operations.

Handy!

.. _Amazon S3: http://aws.amazon.com/s3/
.. _s3cmd: http://s3tools.org/s3cmd
.. _sync command: http://s3tools.org/s3cmd-sync

