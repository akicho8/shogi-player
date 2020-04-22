#!/bin/sh
npm run release
npm run deploy
(~/src/shogi_web && ./package-update.sh)
