#!/bin/sh
arm64 nodenv install -f 20.0.0

npm i -g yarn
npm i -g npm-check-updates

nodenv which node
nodenv which yarn

