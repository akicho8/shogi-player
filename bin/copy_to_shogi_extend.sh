#!/bin/sh
rsync -avz --delete --exclude=".git" --exclude="node_modules" --exclude=".nuxt" ~/src/shogi-player/ ~/src/shogi-extend/nuxt_side/node_modules/shogi-player/
