Using Radio Buttons with CakePHP
################################
:date: 2008-06-17 20:40
:category: Development
:tags: CakePHP

There's sparse documentation on this topic so here I give some example
usages. Say we have a Posts model like in most of the cake documents.
Basically what we do is make an options array available to the template
that contains the keys and values for the radio button. In the $options
array, the keys are the values sent back to the controller, and the
values are the text displayed on the page. Building the controller to
output a list of radio buttons looks like this:

::

    ...
    function radioPosts() {
        if (empty($this->data)) {
            $posts = $this->Post->findAll();
            $options = array();
            foreach($posts as $post) {
                $options[$post['Post']['id']] = $post['Post']['title'];
            }
            $this->set(compact('posts', 'options'));
        } else {
            $this->Session->setFlash('You chose a post with id='.$this->data['Post']['id']);
            $this->redirect(array('action'=>'radioPosts'));
        }
    }

Then the view for this controller would look something like:

::

    echo $form->create('Post', array('action'=>'radioPosts'));
    echo $form->radio('id', $options);
    echo $form->end('Submit!');

