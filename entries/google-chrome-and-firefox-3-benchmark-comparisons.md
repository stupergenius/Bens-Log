---
category: Tech
date: 2008-09-02 16:40
tags: 'Firefox, Chrome, Javascript'
title: Google Chrome and Firefox 3 Benchmark Comparisons
---

Google released the beta for their new browser called Google Chrome and
one of the features they talked about was the new Javascript virtual
machine. So to test their claims of speed I ran Sun's SunSpider
Javascript benchmark on both. The results of the tests follow:

[Firefox
3](http://17.254.17.57/perf/sunspider-0.9/sunspider-results.html?%7B%223d-cube%22:%5B223,232,230,440,236%5D,%223d-morph%22:%5B185,204,191,189,194%5D,%223d-raytrace%22:%5B198,188,205,199,196%5D,%22access-binary-trees%22:%5B191,202,197,200,198%5D,%22access-fannkuch%22:%5B372,371,378,614,377%5D,%22access-nbody%22:%5B194,211,197,368,207%5D,%22access-nsieve%22:%5B148,143,139,149,141%5D,%22bitops-3bit-bits-in-byte%22:%5B172,182,177,198,175%5D,%22bitops-bits-in-byte%22:%5B223,225,238,226,226%5D,%22bitops-bitwise-and%22:%5B163,183,168,168,164%5D,%22bitops-nsieve-bits%22:%5B225,226,227,226,232%5D,%22controlflow-recursive%22:%5B162,166,165,269,172%5D,%22crypto-aes%22:%5B159,158,244,251,162%5D,%22crypto-md5%22:%5B147,172,152,148,150%5D,%22crypto-sha1%22:%5B144,148,152,148,151%5D,%22date-format-tofte%22:%5B7698,8148,10761,9761,10298%5D,%22date-format-xparb%22:%5B408,178,177,177,185%5D,%22math-cordic%22:%5B293,290,300,290,302%5D,%22math-partial-sums%22:%5B186,184,356,176,212%5D,%22math-spectral-norm%22:%5B169,169,175,168,172%5D,%22regexp-dna%22:%5B299,332,532,308,296%5D,%22string-base64%22:%5B163,159,164,160,165%5D,%22string-fasta%22:%5B343,341,340,349,356%5D,%22string-tagcloud%22:%5B3249,1584,2178,1573,1605%5D,%22string-unpack-code%22:%5B451,425,542,441,414%5D,%22string-validate-input%22:%5B193,198,324,194,196%5D%7D)

[Google
Chrome](http://17.254.17.57/perf/sunspider-0.9/sunspider-results.html?%7B%223d-cube%22:%5B43,47,53,47,45%5D,%223d-morph%22:%5B78,84,79,88,86%5D,%223d-raytrace%22:%5B81,57,61,60,63%5D,%22access-binary-trees%22:%5B9,8,8,9,8%5D,%22access-fannkuch%22:%5B45,48,45,50,44%5D,%22access-nbody%22:%5B48,45,51,45,46%5D,%22access-nsieve%22:%5B31,31,31,40,36%5D,%22bitops-3bit-bits-in-byte%22:%5B9,6,6,6,6%5D,%22bitops-bits-in-byte%22:%5B11,10,12,12,12%5D,%22bitops-bitwise-and%22:%5B30,35,37,33,36%5D,%22bitops-nsieve-bits%22:%5B46,38,48,43,37%5D,%22controlflow-recursive%22:%5B3,3,3,4,4%5D,%22crypto-aes%22:%5B26,33,34,37,33%5D,%22crypto-md5%22:%5B23,23,23,30,28%5D,%22crypto-sha1%22:%5B21,21,20,22,22%5D,%22date-format-tofte%22:%5B320,355,325,356,328%5D,%22date-format-xparb%22:%5B338,370,410,371,348%5D,%22math-cordic%22:%5B91,95,107,90,92%5D,%22math-partial-sums%22:%5B77,60,63,58,56%5D,%22math-spectral-norm%22:%5B20,28,22,19,24%5D,%22regexp-dna%22:%5B593,596,615,590,603%5D,%22string-base64%22:%5B146,99,86,102,101%5D,%22string-fasta%22:%5B89,86,100,83,83%5D,%22string-tagcloud%22:%5B243,242,229,244,231%5D,%22string-unpack-code%22:%5B301,304,310,319,312%5D,%22string-validate-input%22:%5B120,125,125,121,129%5D%7D)

As you can see, Google chrome is much faster than FF3 by nearly a factor
of 6. To see the comparison, load the Chrome score then copy the Firefox
link into the second box, push enter, and be amazed. While Chrome
falters on some of the tests, namely regex, it blows FF3 out of the
water for the most part, especially in the bitopts section. But with
Firefox 3.1 coming out in the near future sporting a new Javascript
tracing engine, which will be faster?
