#!/bin/sh
rsync -avzu --delete --exclude=".git" --exclude="node_modules" --exclude=".nuxt" . ~/src/shogi-extend/front_app/node_modules/shogi-player/
