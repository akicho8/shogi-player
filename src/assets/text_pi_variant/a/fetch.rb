#!/usr/bin/env ruby
require "pathname"
require "open-uri"

{
  "K0" => "https://glyphwiki.org/wiki/u738b",
  "R0" => "https://glyphwiki.org/wiki/u98db",
  "B0" => "https://glyphwiki.org/wiki/u89d2",
  "G0" => "https://glyphwiki.org/wiki/u91d1",
  "S0" => "https://glyphwiki.org/wiki/u9280",
  "N0" => "https://glyphwiki.org/wiki/u6842",
  "L0" => "https://glyphwiki.org/wiki/u9999",
  "P0" => "https://glyphwiki.org/wiki/u6b69",
  "X0" => "https://glyphwiki.org/wiki/u7389",
  "R1" => "https://glyphwiki.org/wiki/u7adc",
  "B1" => "https://glyphwiki.org/wiki/u99ac",
  "S1" => "https://glyphwiki.org/wiki/u5168",
  "N1" => "https://glyphwiki.org/wiki/u572d",
  "L1" => "https://glyphwiki.org/wiki/u674f",
  "P1" => "https://studio.beatnix.co.jp/files/moji-svg/hiragana/minchyo/01/hira_min_to.svg",
}.each do |key, url|
  if url.include?("glyphwiki")
    code = url.split("/").last
    url = "https://glyphwiki.org/glyph/#{code}.svg"
  end
  file = Pathname("#{key}.svg")
  svg = URI(url).read
  file.write(svg)
  p [key, file.to_s, svg.size]
end
