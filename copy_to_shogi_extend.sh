#!/bin/sh
rsync -avzu --delete --exclude=".git" --exclude="node_modules" --exclude=".nuxt" . ~/src/shogi-extend/nuxt_side/node_modules/shogi-player/
