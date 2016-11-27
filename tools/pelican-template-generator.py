#!/usr/bin/env python

import argparse, sys
from datetime import datetime

def main():
    current_user_keyword = 'current'
    now_date_keyword = 'now'
    mtime_date_keyword = 'mtime'
    
    parser = argparse.ArgumentParser(description='Generates a Pelican blog template file.')
    parser.add_argument('title')
    parser.add_argument('-f', dest='outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
    parser.add_argument('--date', help='Supply a date to override the current date. If nothing or "' + now_date_keyword +'" is passed we will use the current date. If "' + mtime_date_keyword + '" is passed we will not generate a date and Pelican will use the file\'s mtime for the post\'s date.')
    parser.add_argument('--author', help='Passing "' + current_user_keyword + '" to this option will try to get the currently logged in user.')
    parser.add_argument('--category')
    parser.add_argument('--tags', help='Comma delimited list of tags.')
    parser.add_argument('--format', help='Specify either "md" for markdown (default) or "rst" for reStructuredText.', default='md')
    args = parser.parse_args()
    
    tmpl_date = None
    if (args.date and args.date != now_date_keyword and args.date != mtime_date_keyword):
        tmpl_date = strip(args.date)
    elif (args.date == None or args.date == now_date_keyword):
        # should look like 2011-09-08 02:08
        tmpl_date = datetime.now().replace(microsecond=0).strftime('%Y-%m-%d %H:%M')
    
    tmpl_author = None
    if (args.author and args.author != current_user_keyword):
        tmpl_author = args.author
    elif (args.author == current_user_keyword):
        try:
            import os, pwd
            tmpl_author = pwd.getpwuid(os.getuid()).pw_gecos.split(',')[0]
        except ImportError:
            import getpass
            tmpl_author = getpass.getuser()

    template = ''
    if (args.format == 'rst'):
        tmpl_lines = []
        tmpl_lines.append(args.title)
        tmpl_lines.append('=' * len(args.title))
        if (tmpl_date): tmpl_lines.append(':date: ' + tmpl_date)
        if (tmpl_author): tmpl_lines.append(':author: ' + tmpl_author)
        if (args.category): tmpl_lines.append(':category: ' + args.category)
        if (args.tags): tmpl_lines.append(':tags: ' + args.tags)
        tmpl_lines.append('')
        template = "\n".join(tmpl_lines)
    else:
        tmpl_lines = []
        tmpl_lines.append('Title: ' + args.title)
        if (tmpl_date): tmpl_lines.append('Date: ' + tmpl_date)
        if (tmpl_author): tmpl_lines.append('Author: ' + tmpl_author)
        if (args.category): tmpl_lines.append('Category: ' + args.category)
        if (args.tags): tmpl_lines.append('Tags: ' + args.tags)
        tmpl_lines.append('')
        template = "\n".join(tmpl_lines)
    
    args.outfile.write(template)

if (__name__ == '__main__'):
    main()
