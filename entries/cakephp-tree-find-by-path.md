---
category: Development
date: 2008-07-24 13:11
tags: CakePHP
title: CakePHP Tree Find By Path
---

Wrote these little functions to help with finding tree nodes by
specifying a path of values. For example if we had a tree of categories
with similar names like TVs-&gt;Color and Movies-&gt;Color, we can't
find by the category name since its not unique, but we can search by
pathing like tvs/color or movies/color. So to this end is this model
code:

```php
function findPath($paths, $fieldName) {
    $root = $this->find('threaded');
    return $this->findPathHelper($root, $paths, $fieldName);
}

function findPathHelper($node, $paths, $fieldName) {
    // search for paths from the beginning of the list
    $path = array_shift($paths);
    $newNode = false;
    // looking for the current path in the specified field
    foreach ($node as $nodeNode) {
        if ($nodeNode[$this->name][$fieldName] == $path) {
            $newNode = $nodeNode;
            break;
        }
    }
    if (empty($paths) || $newNode === false) {
        // done processing the paths, or cannot find a matching node
        return $newNode;
    } else {
        // not done, find based on the found node's children
        return $this->findPathHelper($newNode['children'], $paths, $fieldName);
    }
}
```

And we can use it from our controller like:

```php
$category = $this->Category->findPath(array('tv', 'color'), 'name');
```

Probably not the most efficient code, but it sure is elegant. It also
will probably break if you have two rows on the same level with the same
name, but that would be pointless anyway.
