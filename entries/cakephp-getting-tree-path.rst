CakePHP Getting Tree Path
#########################
:date: 2008-07-25 12:06
:category: Development
:tags: CakePHP

In a reversal of yesterday's post is today's, getting a path to a node,
or nodes. Basically we just use the core getpath() function of the Tree
behavior and traverse that path.

::

    function setTreePath(&$data, $path='tree_path', $label='name') {
        if (!is_array($data) || !in_array('Tree', $this->actsAs)) {
            return $data;
        }
        if (is_array($data) && is_int(array_shift(array_keys($data)))) {
            foreach ($data as $i=>$item) {
                $this->_setTreePath($data[$i], $path, $label);
            }
        } else {
            $this->_setTreePath($data, $path, $label);
        }
    }

    function _setTreePath(&$data, $pathField, $label) {
        $cats = $this->getpath($data[$this->name][$this->primaryKey]);
        $path = array();
        foreach ($cats as $cat) {
            array_push($path, $cat[$this->name][$label]);
        }
        $data[$this->name][$pathField] = implode('/', $path);
    }

And we can use it simply like in the following test:

::

    function testSetTreePath() {
        $result = $this->Category->findById(3);
        $this->Category->setTreePath($result, 'tree_id');
        $this->assertEqual($result['Category']['tree_id'], 'My Categories/Fun/Sport');
    }

It's mostly useful when working with related models, so the whole path
is displayed instead of just the nodes, which may or may not be unique.
