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
file = Pathname("MainDoc/component_options.md").expand_path
file.write(s)
puts file

s = rows.collect { |e|
  o = []
  o << "## " + e["Name"].gsub("`", "")
  o << ""
  o << "Type: `string`"
  o << "Default: `#{e['Default']}`"
  o << ""
  o << e["Description"]
  o << ""
  o << "| 値 | 意味   |"
  o << "|----+--------|"
  o << "|    | する   |"
  o << "|    | しない |"
  o.join("\n")
}.join("\n\n")
file = Pathname("MainDoc/component_options_for_vueprss.md").expand_path
file.write(s)
puts file
