---
category: Development
date: 2008-02-27 16:18
tags: Python
title: Dynamically Import and Instantiate Python Classes
---

Ran into this bit of genius code in the [python mailing
list](http://mail.python.org/pipermail/python-list/2003-March/192221.html).
Here's the code for now and I'll explain it later:

```python
def forname(modname, classname):
    ''' Returns a class of "classname" from module "modname". '''
    module = __import__(modname)
    classobj = getattr(module, classname)
    return classobj
```

Basically it returns a class object from modname matching classname.
Sound deceptively simple, and it is. If it doesn't find classname in
modname, or it doesn't find modname, it will simply throw an import
error. What's left to do is just instantiate an object of that class and
shazam, its magic. Here's an example to create a new Popen instance:

```python
p_class = forname("subprocess", "Popen")
p_inst = p_class(["ls", "-l"])
```

It's useful for getting input from a file or user and creating classes
based on that input. Of course, be certain to properly validate that
input, or it can get really nasty really quickly.
