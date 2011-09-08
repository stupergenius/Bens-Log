Flex MenuItem Actions
#####################
:date: 2009-01-30 15:08
:category: Development
:tags: Actionscript, Flex

So, gonna write this here because I will forget how to do it.
Essentially, this approach eliminates the need to conditionally branch
on menu item properties. Before we would do something like:

::

    private function menuHandler(event:MouseEvent):void {
        if (event.item.@label == 'Save') {
            f = File.destopDirectory;
            f.browseForSave('Save');
            f.addEventListener(Event.SELECT, this.selectSaveFolderHandler);
        } else if (event.item.@label == 'Open') {
            // etc
        }
    }

As you can see, this is an awfully coupled solution. Whenever we want to
change the name of a menu item, we also need to change the logic in the
handler. This can be somewhat alleviated by using an @id property
instead of the display text, but its still coupled. The better solution
is to allow the menu item itself designate what action it should trigger
when clicked. This is the method that Buttons use, but for menu items
it's a little different because the menu is simply XML data. What we
need then is a way to store a method name in the menu item XML
definition, have that parameter read by the menu handler method, and the
appropriate method called. For simplicity we limit the specified method
to whichever class contains the actual menu, and that the method has no
required arguments. The magic here is the use of the
`flash.utils.getDefinitionByName()`_ function to return a Function
definition rather than a Class, and using the `Function.call()`_ method
to actually call the returned Function. So our revised menu item XML
would look something like:

::

    <!-- menu items -->
    <mx:XMLList>
        <menuitem label="Save" action="saveMenuHandler"/>
        <menuitem label="Open" action="openMenuHandler"/>
    </mx:XMLList>

And our handler would look like:

::

    // AS handler
    private function menuHandler(event:MouseEvent):void {
        var method:String = String(event.item.@action);
        try {
            var methodRef:Function = Function(flash.utils.getDefinitionByName(method));
            methodRef.call(this);
        } catch (e:ReferenceError) {
            trace(e.message);
        }
    }

I haven't tested this idea so no idea if it works or not, so YMMV. But
it should work, and if I ever get around to refactoring some old code I
will certainly be including this.

.. _flash.utils.getDefinitionByName(): http://livedocs.adobe.com/flex/3/langref/flash/utils/package.html#getDefinitionByName()
.. _Function.call(): http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/Function.html#call()
