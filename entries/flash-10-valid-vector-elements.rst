Flash 10 Valid Vector Elements
##############################
:date: 2009-08-19 20:29
:category: Development
:tags: Flash, Flex

Finally got around to learning about the new collection class available
in Flash 10. To be honest, I'm not terribly excited about many things in
Flash 10, hence my slowness to adapt. But, the vector class does
interest me somewhat. It promises faster iteration over a strongly typed
collection. Doesn't seem to add any other handy features however, like
Flex's robust ArrayCollection methods including removeItem. But alas. As
for it being faster, I have heard talk around the internets of the
vector class only being significantly faster with simple types, but I'm
way too lazy to any informal benchmarks of my own, so I'll just read
someone else's results. One specific question I had that I didn't see
answered anywhere, however, was the type of objects you could stick in a
vector once the template class had been set. It was my suspicion that
you could put any subclass of the template class in the vector, just
like C++ templated vetors, but I hadn't read it confirmed anywhere, so I
fired up my shiny new Flash CS4 and gave it a try. And indeed, my
suspicion was correct. The following simple code below validates my
hypothesis.

::

    var test:Vector.<Sprite> = new Vector.<Sprite>();
    test.push(new Sprite(), new MovieClip());

    // should output something like "[object Sprite],[object MovieClip]"
    trace(test);

