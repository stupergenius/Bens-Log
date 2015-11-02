FlashDevelop Setter and Getter Snippets
#######################################
:date: 2009-02-09 19:02
:category: Development
:tags: Actionscript, FlashDevelop, Flash

FlashDevelop, the Flash IDE I am using at the moment, has support for
saving snippets of code that is general and reusable, like setters and
getters. The default setter and getter snippets simply add the skeleton
code and require the developer to actually type in variable names, and
types. I found this amount of extra typing to be not worth using the
snippets for setters and getters at all. So I made my own snippets for
these two operations. Mine require that you simply name the method,
because the method name can't be the same as the variable name, and
because the snippet system cannot do string processing. The cursor is
placed where the function name belongs after the snippet is completed.
All that is required for this to work as intended is for the cursor to
be on the same line(anywhere on the line) of a variable definition. You
can then use the same Control-B combo to get the snippet box, and select
the appropriate snippet. The actual snippets follow. set:

.. code:: actionscript

    $(Boundary)$(CSLB)public function set $(EntryPoint)(value:$(MbrTypName)):void { $(MbrName) = value; }$(Boundary)

get:

.. code:: actionscript

    $(Boundary)$(CSLB)public function get $(EntryPoint)():$(MbrTypName) { return $(MbrName); }$(Boundary)

With these snippets you can make setters and getters quickly and
accurately. The actual code they generate will end up looking something
like the following:

.. code:: actionscript

    private var _points:uint = 0;
    public function get points():uint { return _points; }
    public function set points(value:uint):void { _points = value; }

