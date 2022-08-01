#!/usr/bin/env ruby

require "pathname"
require "nokogiri"

NEW_RED  = "rgb(239,69,74)" # 朱色 (https://www.color-sample.com/colors/257/)
NEW_EDGE = 0

BLACK_DEFAULT = "rgb(48,48,48)"

Pathname(".").glob("*.svg") do |e|
  puts e
  str = e.read
  doc = Nokogiri::XML(str)

  element = doc.at("path[stroke-width]")
  element["stroke-width"] = NEW_EDGE

  if e.basename.to_s.match?(/^..1/)
    doc.search("path[stroke=none]").each do |e|
      if e["fill"] == BLACK_DEFAULT
        e["fill"] = NEW_RED
      end
    end
  end

  e.write(doc.to_s)
end
