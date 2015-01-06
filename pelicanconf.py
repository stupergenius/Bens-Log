# -*- coding: utf-8 -*-
AUTHOR = u'Ben Snider'
SITENAME = u"Ben's Log"
SITEURL = 'http://bensnider.com'

PATH = 'entries'
THEME = '../../pelican-themes/blue-penguin'
GITHUB_URL = 'http://github.com/stupergenius'
DISQUS_SITENAME = "benslog"
PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = False
DEFAULT_PAGINATION = 5
WITH_PAGINATION = True
TIMEZONE = 'America/New_York'
DEFAULT_DATE = 'fs'
DEFAULT_LANG = u'en'

FEED_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

# LINKS = (
    # ('Tyler Clemons', 'http://www.tylerclemons.com'),
    # ('Central Ohio Python Users Group', "http://www.meetup.com/Central-Ohio-Python-Users-Group/"),
# )

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
