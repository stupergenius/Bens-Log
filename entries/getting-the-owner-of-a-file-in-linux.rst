Getting the Owner of a File in Linux
####################################
:date: 2008-02-25 17:40
:category: Development
:tags: Shell Scripting, Bash

Ran across this problem where I needed root to execute a script as
whoever owns it. The solution is simple and should work most everywhere.
Basically it just uses the standard "stat" program and uses the print
formatting option to only output the name of the owner. Here I use bash
to get the owner:

::

    #!/bin/bash
    username=`stat ${1} --printf %U`
    echo "The owner of ${1} is ${username}";
    exit 0;

And a sample run looks like:

::

    $ ./whoOwnsIt.sh testfile.txt
    The owner of testfile.txt is ben.

Making root run it as the user's owner is then trivially done with:

::

    su ${username} ${cmd}

