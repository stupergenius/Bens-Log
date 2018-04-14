# -*- coding: utf-8 -*-
AUTHOR = u'Ben Snider'
SITENAME = u"Ben Snider"
SITETITLE = SITENAME
SITESUBTITLE = 'Open Source Swift and iOS Development'
#SITEURL = '//localhost:8000'
SITEURL = 'https://www.bensnider.com'
SITELOGO = '//www.gravatar.com/avatar/94a30535d38606170f571898d96b6181?s=140'

GOOGLE_ANALYTICS = 'UA-70428973-1'
ROBOTS = 'index, follow'
COPYRIGHT_YEAR = 2016
CC_LICENSE = { 'name': 'Creative Commons Attribution-ShareAlike', 'version':'4.0', 'slug': 'by-sa' }

MAIN_MENU = True
MENUITEMS = (('Archives', '/archives.html'),
             ('Categories', '/categories.html'),
             ('Tags', '/tags/'))

PATH = 'entries'
THEME = '../pelican-themes/Flex'
GITHUB_URL = 'https://github.com/stupergenius'
DISQUS_SITENAME = "benslog"
PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = False
DEFAULT_PAGINATION = 10
WITH_PAGINATION = True
TIMEZONE = 'America/Denver'
DEFAULT_DATE = 'fs'
DEFAULT_LANG = u'en'
FAVICON = 'favicon.ico'
PYGMENTS_STYLE = 'xcode'

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
    ('github', 'https://github.com/stupergenius'),
    ('twitter', 'https://twitter.com/benatbensnider'),
    ('linkedin', 'https://www.linkedin.com/in/bensnider'),
    ('rss', '//www.bensnider.com/feeds/all.atom.xml'),
)

# A list of files to copy from the source to the destination
STATIC_PATHS = [
    'extra/robots.txt',
    'extra/favicon.ico',
    'extra/404.html',
]
ARTICLE_EXCLUDES = ['extra']
PAGE_EXCLUDES = ['extra']
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/favicon.ico': {'path': 'favicon.ico'},
    'extra/404.html': {'path': '404.html'},
}
