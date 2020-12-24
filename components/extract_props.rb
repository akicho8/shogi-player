#!/usr/bin/env ruby
require "pathname"
require "table_format"
require "json"

rows = []
Pathname(".").glob("**/ShogiPlayer.{vue,js}") do |file|
  file.readlines.each do |e|
    if md = e.match(/^\s+(?<key>\w+):\s*{.*type:.*default:\s*(?<default>.*?),.*\/\/\s*(?<desc>.*)\n/m)
      rows << {
        "props"   => md["key"],
        "default" => md["default"],
        "desc"    => md["desc"],
      }
    end
  end
end

s = rows.to_t(markdown: true)
puts s
Pathname("MainDoc/props.md").write(s)
# >> | props                       | default                | desc                 |
# >> |-----------------------------|------------------------|----------------------|
# >> | sp_board_dimension_w        |                      9 | 盤のセル数           |
# >> | board_piece_back_user_style | place => { return {} } | FIXME: add to README |
