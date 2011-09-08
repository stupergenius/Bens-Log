Google Chrome and Firefox 3 Benchmark Comparisons
#################################################
:date: 2008-09-02 16:40
:category: Tech
:tags: Firefox, Chrome, Javascript

Google released the beta for their new browser called Google Chrome and
one of the features they talked about was the new Javascript virtual
machine. So to test their claims of speed I ran Sun's SunSpider
Javascript benchmark on both. The results of the tests follow:

`Firefox 3`_

`Google Chrome`_

As you can see, Google chrome is much faster than
FF3 by nearly a factor of 6. To see the comparison, load the Chrome
score then copy the Firefox link into the second box, push enter, and be
amazed. While Chrome falters on some of the tests, namely regex, it
blows FF3 out of the water for the most part, especially in the bitopts
section. But with Firefox 3.1 coming out in the near future sporting a
new Javascript tracing engine, which will be faster?

.. _Firefox 3: http://17.254.17.57/perf/sunspider-0.9/sunspider-results.html?%7B%223d-cube%22:[223,232,230,440,236],%223d-morph%22:[185,204,191,189,194],%223d-raytrace%22:[198,188,205,199,196],%22access-binary-trees%22:[191,202,197,200,198],%22access-fannkuch%22:[372,371,378,614,377],%22access-nbody%22:[194,211,197,368,207],%22access-nsieve%22:[148,143,139,149,141],%22bitops-3bit-bits-in-byte%22:[172,182,177,198,175],%22bitops-bits-in-byte%22:[223,225,238,226,226],%22bitops-bitwise-and%22:[163,183,168,168,164],%22bitops-nsieve-bits%22:[225,226,227,226,232],%22controlflow-recursive%22:[162,166,165,269,172],%22crypto-aes%22:[159,158,244,251,162],%22crypto-md5%22:[147,172,152,148,150],%22crypto-sha1%22:[144,148,152,148,151],%22date-format-tofte%22:[7698,8148,10761,9761,10298],%22date-format-xparb%22:[408,178,177,177,185],%22math-cordic%22:[293,290,300,290,302],%22math-partial-sums%22:[186,184,356,176,212],%22math-spectral-norm%22:[169,169,175,168,172],%22regexp-dna%22:[299,332,532,308,296],%22string-base64%22:[163,159,164,160,165],%22string-fasta%22:[343,341,340,349,356],%22string-tagcloud%22:[3249,1584,2178,1573,1605],%22string-unpack-code%22:[451,425,542,441,414],%22string-validate-input%22:[193,198,324,194,196]%7D
.. _Google Chrome: http://17.254.17.57/perf/sunspider-0.9/sunspider-results.html?%7B%223d-cube%22:[43,47,53,47,45],%223d-morph%22:[78,84,79,88,86],%223d-raytrace%22:[81,57,61,60,63],%22access-binary-trees%22:[9,8,8,9,8],%22access-fannkuch%22:[45,48,45,50,44],%22access-nbody%22:[48,45,51,45,46],%22access-nsieve%22:[31,31,31,40,36],%22bitops-3bit-bits-in-byte%22:[9,6,6,6,6],%22bitops-bits-in-byte%22:[11,10,12,12,12],%22bitops-bitwise-and%22:[30,35,37,33,36],%22bitops-nsieve-bits%22:[46,38,48,43,37],%22controlflow-recursive%22:[3,3,3,4,4],%22crypto-aes%22:[26,33,34,37,33],%22crypto-md5%22:[23,23,23,30,28],%22crypto-sha1%22:[21,21,20,22,22],%22date-format-tofte%22:[320,355,325,356,328],%22date-format-xparb%22:[338,370,410,371,348],%22math-cordic%22:[91,95,107,90,92],%22math-partial-sums%22:[77,60,63,58,56],%22math-spectral-norm%22:[20,28,22,19,24],%22regexp-dna%22:[593,596,615,590,603],%22string-base64%22:[146,99,86,102,101],%22string-fasta%22:[89,86,100,83,83],%22string-tagcloud%22:[243,242,229,244,231],%22string-unpack-code%22:[301,304,310,319,312],%22string-validate-input%22:[120,125,125,121,129]%7D
