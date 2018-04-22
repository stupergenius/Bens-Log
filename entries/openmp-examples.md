---
category: Development
date: '2008-08-07 20:31'
tags: 'C++, OpenMP'
title: OpenMP Examples
---

Here are some usage examples for the C++ library available in the GNU
C++ compiler versions 4.2 and up, and probably others. This first
example shows how to use the *parallel for* construct to iterate over a
set of neurons. Each thread here gets an equal share of the current
layer's neurons. How big of a portion each thread gets is determined by
how many threads OpenMP has been configured to create. Each thread then
iterates over all the parent layer's neurons. This is made possible by
declaring a private loop index variable. This shows how to construct an
OpenMP work sharing for loop with a nested for loop where each thread
iterates over its own copy of the parent layer's neurons. If *j* was not
explicitly declared private, it would implicitly be shared among all the
threads OpenMP creates, which would cause the inner loop to behave
erratically as each thread completes iterations over the parent layer.
Likewise with the neuronValue variable. It also shows how to
conditionally fork multiple threads. In this example we only create
multiple threads if the current layer has more than 500 neurons. If the
current layer has only 500 neurons, then the for loop will execute in a
single threaded environment, otherwise it will execute in parallel. This
is useful, for example, if the current layer 200 neurons, then the
overhead associated with creating more threads might actually degrade
performance.

``` {.sourceCode .cpp}
int j(0); double neuronValue(0);
#pragma omp parallel for private(j, neuronValue) if(layer.numNeurons > 500)
for (int i=0; i<layer.numNeurons; ++i) {
    neuronValue = 0;
    for (j=0; j<layer.parentlayer->numNeurons; ++j) {
        neuronValue += layer.parentLayer->neurons.at(j).value * layer.parentLayer->weights.at(j).at(i);
    }
}
```

Likewise we can use these two declarations independently as in the
following two examples with expected results.

``` {.sourceCode .cpp}
#pragma parallel for if(x > 100)
for (int i=0; i<1000; ++i) {
    // something
}
```

``` {.sourceCode .cpp}
int j(0);
#pragma parallel for private(j)
for (int i=0; i<1000; ++i) {
    for (j=0; j<1000; ++j) {
        // something
    }
}
```

These are the fundamentals to creating OpenMP threads. Maybe sometime in
the future I will add some more examples.
