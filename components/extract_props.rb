require "pathname"
require "table_format"
require "json"

Dir.chdir(__dir__)

rows = []
Pathname(".").glob("**/*.{vue,js}") do |file|
  file.readlines.each do |e|
    if md = e.match(/^\s+(?<key>\w+):\s*{.*type:.*default:\s*(?<default>.*?),.*\/\/\s*(?<desc>.*)\n/m)
      rows << {
        "Name"        => "`#{md["key"]}`",
        "Description" => md["desc"].gsub(/\|/, "\\|"),
        "Default"     => md["default"],
      }
    end
  end
end

s = rows.to_t(markdown: true)
file = Pathname("MainDoc/props.md").expand_path
file.write(s)
puts file
