---
category: Development
date: '2008-02-17 19:13'
tags: Python
title: Python Lies
---

This is probably a documented issue, but I think it deserves another
mention. Python lies, its the truth. Well, as much as an interpreter can
lie. Say we want to do some math in Python. Say we want to raise large
numbers to large numbers. Say those numbers are 324 and 324. Then we
would do something like:

``` {.sourceCode .python}
<<< 324**324
```

and see all the pretty numbers spew out from the interpreter. How do we
know if this is right or wrong though? Say we use long doubles in C++ to
determine the results of this same operation. Then we would do something
like:

``` {.sourceCode .python}
long double k = 324;
for (int i=0; i<324; ++i) {
    k *= k
}
std::cout << "324^324 = " << k << "n";
```

But alas, the output is "inf", so we check the largest long double our
compiler and machine can represent and find that it is roughly equal to
1.2e+4932. We then check in python if this number is greater than
324\^324 by doing something like:

``` {.sourceCode .python}
>>>> (12**4932) > (324**324)
True
```

However, this contradicts the fact that C++ could not represent
324\^324, so Python must be lying. Indeed we check the largest power of
324 we can represent in C++ long doubles, and it turns out to be 11.
Thus Python lies. What does this mean. Don't rely on Python for numeric
accuracy without checking its results. **Update**: This post is probably
wrong, but I don't like deleting things. So refer to Tyler's comment
below.
