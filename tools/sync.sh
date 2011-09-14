#!/bin/bash
s3cmd sync --acl-public --delete-removed $1 s3://www.bensnider.com/
