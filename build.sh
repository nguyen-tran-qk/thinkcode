#!/bin/bash

# install npm dependencies
npm install

# install gulp workflow dependencies
node_modules/.bin/npm-install-from --path lib/gulp

# install bower dependencies
bower install --allow-root

# build themes
gulp build:d --theme html
gulp build:d --theme angular

# build choose module
gulp build:choose --theme choose

# build docs
cd lib/docs/
mkdocs build