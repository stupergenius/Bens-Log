Flexunit Asyncrhonous Setups
############################
:date: 2009-02-12 20:56
:category: Development
:tags: Flex, Actionscript, Testing

If you ever need to load some external data before running a test, or
need to wait for a component's creation complete event, then you know
the inadequacies of the Flexunit framework when it comes to asynchronous
operations. One approach you might think of is to load the XML data, for
example, in the setUp() method and attach a handler to the loader to
wait for the complete event which would then call runMiddle() so the
actual test body runs. You would need to override the runMiddle() method
in your test case, and call super.runMiddle() in your complete handler.
However, while this will cause the tests to run properly after the data
has become available, Flexunit will not hang around long enough to catch
the passed/failed asserts in your test body. You will instead get a
runtime error box telling you which asserts failed, and a green bar from
the Flexunit UI. This is not desirable. What we need then is to somehow
write a test case that begins loading the data, and somehow specifies
which method to run that contains the actual asserts for the test
method. Essentially if you wanted to do really simply you would just
load the data with a Loader object, attach a complete handler to the
loader wrapped with the addAsync method of the TestCase to delay test
execution, and write the complete handler so that it accepts the
complete event and does what it will with the event.currentTarget. I
would rather have a general asynchronous setup method that takes as
parameters the URL of the data to load, the test handler with all the
asserts, and the class of the data that should be loaded. Instead of a
jumble of words explaining this it would probably help more to just
paste the code at this point.

::

    package {
        import flash.events.Event;
        import flash.net.URLLoader;
        import flash.net.URLRequest;
        
        import flexunit.framework.TestCase;
        
        public class AsyncSetupTestCase extends TestCase {
            
            public var data:*;
            public var returnType:Class;
            
            public function setupAsync(target:String, test:Function, returnType:Class):void {
                this.returnType = returnType;
                var helper:Function = this.addAsync(this.completeHandler, 1000, test);
                var loader:URLLoader = new URLLoader();
                loader.addEventListener(Event.COMPLETE, helper);
                loader.load(new URLRequest(target));
            }
            
            private function completeHandler(event:Event, test:Function):void {
                trace('async load complete');
                this.data = event.currentTarget.data as this.returnType;
                test.call(this);
            }
            
        }
    }

As the previous code demonstrates, I have simply extended Flexunit's
TestCase class and added a few methods to help with asynchronous setups.
Essentially all a test case that needs to load external data must do
then is to call the setupAsync method with the desired information, and
AsyncSetupTestCase will handle running the test once the load is
complete. All the designated handler in the test needs to do differently
from other tests is to a) not be prefixed with test and b) use the data
property to access the loaded data from the setup. An example test case
demonstrating this follows:

::

    public function testMethod():void {
        this.setupAsync('something.xml', this.doTestMethod, XML);
    }
    public function doTestMethod():void {
        // do what we will with this.data, it shall be an XML instance
        assertTrue(this.data is XML);
    }

