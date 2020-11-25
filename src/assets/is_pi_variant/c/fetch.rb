#!/usr/bin/env ruby
require "pathname"
require "open-uri"

{
  "BK0" => "https://glyphwiki.org/wiki/u738b",
  "BR0" => "https://glyphwiki.org/wiki/u98db",
  "BB0" => "https://glyphwiki.org/wiki/u89d2",
  "BG0" => "https://glyphwiki.org/wiki/u91d1",
  "BS0" => "https://glyphwiki.org/wiki/u9280",
  "BN0" => "https://glyphwiki.org/wiki/u6842",
  "BL0" => "https://glyphwiki.org/wiki/u9999",
  "BP0" => "https://glyphwiki.org/wiki/u6b69",
  "BX0" => "https://glyphwiki.org/wiki/u7389",
  "BR1" => "https://glyphwiki.org/wiki/u7adc",
  "BB1" => "https://glyphwiki.org/wiki/u99ac",
  "BS1" => "https://glyphwiki.org/wiki/u5168",
  "BN1" => "https://glyphwiki.org/wiki/u572d",
  "BL1" => "https://glyphwiki.org/wiki/u674f",
  "BP1" => "https://studio.beatnix.co.jp/files/moji-svg/hiragana/minchyo/01/hira_min_to.svg",
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
