#!/usr/bin/env ruby

require "pathname"
require "nokogiri"

NEW_RED = "rgb(239,69,74)" # 朱色 (https://www.color-sample.com/colors/257/)

Pathname(".").glob("*.svg") do |e|
  puts e
  str = e.read
  doc = Nokogiri::XML(str)
  element = doc.at("g")
  if e.basename.to_s.match?(/^..1/)
    element["fill"] = NEW_RED
  else
    element["fill"] = "black"
  end
  e.write(doc)
end
