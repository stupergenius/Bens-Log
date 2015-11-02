CakePHP Lightbox Helper
#######################
:date: 2008-07-22 13:24
:category: Development
:tags: CakePHP

Made a helper to output lightbox compatible links, since the core HTML
helper was not working. Stick the following code in
app/view/helpers/lightbox.php:

.. code:: php

    class LightboxHelper extends AppHelper {

        var $helpers = array('Html');

        function img($thumb, $full, $imgAttributes = array(), $linkAttributes = array()) {
            $defaultLinkAttributes = array('rel'=>'lightbox');
            $linkAttributes = array_merge($defaultLinkAttributes, $linkAttributes);

            $thumb = $this->Html->image($thumb, $imgAttributes);
            if (strpos($full, '://') === false) {
                $full = $this->Html->webroot(IMAGES_URL . $full);
            }
            return $this->Html->output(sprintf($this->Html->tags['link'], $full, $this->Html->_parseAttributes($linkAttributes), $thumb));
        }
    }

Then you can use it from your views, after including it in your
controller's $helpers array, like the following:

.. code:: php

    echo $lightbox->img('somethumb.jpg', 'somefullimage.jpg');

