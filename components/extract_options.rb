#!/usr/bin/env ruby
require "pathname"
require "table_format"

rows = []
Pathname(".").glob("**/*.{vue,scss,sass}") do |file|
  next if file.basename.to_s.match?(/MainDoc|StyleEditor/)
  file.readlines.grep(/\+defvar/).each do |e|
    if md = e.match(/^\s*\+defvar\((\w+)\,\s*(.*)\)\s*\/\/\s*(.*)\s*/)
      key, val, comment = md.captures
      rows << {
        "変数"   => "`--#{key}`",
        "初期値" => val,
        "意味"   => comment,
      }
    end
  end
end

# rows = rows.sort_by { |e| e["変数"] }

s = rows.to_t(markdown: true)
Pathname("MainDoc/css_variable.md").write(s)
