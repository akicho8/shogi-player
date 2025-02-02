require "pathname"
require "open-uri"
require "nokogiri"

COLOR_RED   = "rgb(239,69,74)" # 朱色 (https://www.color-sample.com/colors/257/)
COLOR_BLACK = "black"

{
  "BK0" => "https://glyphwiki.org/wiki/u7389",
  "WK0" => "https://glyphwiki.org/wiki/u738b",
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
  svg = URI(url).read

  # 裏の場合は赤色にする
  doc = Nokogiri::XML(svg)
  element = doc.at("g")
  if key.end_with?("1")
    element["fill"] = COLOR_RED
  else
    element["fill"] = COLOR_BLACK
  end

  Pathname("#{key}.svg").write(doc)
end
