#!/bin/sh
rm -fr _lib
babel components/models/sfen_parser.js -d _lib --source-maps --no-comments
babel components -d _lib --source-maps --no-comments
