#!/bin/bash

s3cmd sync --acl-public --delete-removed out/* s3://www.bensnider.com/
