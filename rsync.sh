#!/bin/sh
rsync -avzu --delete --exclude=".git" --exclude="node_modules" . ~/src/shogi-extend/front_app/node_modules/shogi-player/
