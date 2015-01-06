# -*- coding: utf-8 -*-
AUTHOR = u'Ben Snider'
SITENAME = u"Ben's Log"
SITEURL = 'http://www.bensnider.com'

GITHUB_URL = 'http://github.com/stupergenius'
DISQUS_SITENAME = "benslog"
PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = False
DEFAULT_PAGINATION = 5
WITH_PAGINATION = True
TIMEZONE = 'America/New_York'

FEED_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

LINKS = (
    ('Tyler Clemons', 'http://www.tylerclemons.com'),
    ('Central Ohio Python Users Group', "http://www.meetup.com/Central-Ohio-Python-Users-Group/"),
)

SOCIAL = (
    ('twitter', 'http://twitter.com/stupergenius'),
    ('lastfm', 'http://www.last.fm/user/bensnider'),
    ('github', 'http://github.com/stupergenius'),
)

# A list of files to copy from the source to the destination
FILES_TO_COPY = (('extra/robots.txt', 'robots.txt'),('extra/404.html', '404.html'),)
