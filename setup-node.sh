#!/bin/sh
arm64 nodenv install -f 20.0.0
npm i -g yarn
nodenv which node
nodenv which yarn
