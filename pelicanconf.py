# -*- coding: utf-8 -*-
AUTHOR = u'Ben Snider'
SITENAME = u"Ben's Open Source Swift Log"
SITEURL = 'http://bensnider.com'

PATH = 'entries'
THEME = '../pelican-themes/blue-penguin'
GITHUB_URL = 'http://github.com/stupergenius'
DISQUS_SITENAME = "benslog"
PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = False
DEFAULT_PAGINATION = 10
WITH_PAGINATION = True
TIMEZONE = 'America/Denver'
DEFAULT_DATE = 'fs'
DEFAULT_LANG = u'en'

FEED_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

# LINKS = (
    # ('Tyler Clemons', 'http://www.tylerclemons.com'),
    # ('Central Ohio Python Users Group', "http://www.meetup.com/Central-Ohio-Python-Users-Group/"),
# )

TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'
TAGS_URL = 'tags/'
TAGS_SAVE_AS = 'tags/index.html'

AUTHOR_URL = 'author/{slug}/'
AUTHOR_SAVE_AS = 'author/{slug}/index.html'
AUTHORS_URL = 'authors/'
AUTHORS_SAVE_AS = 'authors/index.html'

CATEGORY_URL = 'category/{slug}/'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
CATEGORYS_URL = 'categories/'
CATEGORYS_SAVE_AS = 'categories/index.html'

PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

SOCIAL = (
    ('twitter', 'https://twitter.com/benatbensnider'),
    ('coderwall', 'https://coderwall.com/bensnider'),
    ('github', 'https://github.com/stupergenius'),
)

# A list of files to copy from the source to the destination
STATIC_PATHS = [
    'extra/robots.txt',
    'extra/404.html',
]
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/404.html': {'path': '404.html'},
}
