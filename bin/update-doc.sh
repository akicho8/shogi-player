#!/bin/sh
cd $(dirname $0)/..
cd components
ruby extract_options.rb
ruby extract_props.rb
