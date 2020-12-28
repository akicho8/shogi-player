#!/bin/sh
bioshogi convert -f kif -o . *.KI2
r -Q -x "*棋戦詳細：" "棋戦詳細：" *.kif
