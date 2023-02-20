require "pathname"
require "table_format"
require "json"

Dir.chdir(__dir__)

rows = []
Pathname(".").glob("**/*.{vue,js}") do |file|
  file.readlines.each do |e|
    if md = e.match(/^\s+(?<key>\w+):\s*{.*type:\s*(?<type>\w+).*default:\s*(?<default>.*?),.*\/\/\s*(?<desc>.*)\n/m)
      rows << {
        :name        => md["key"],
        :desc        => md["desc"].gsub(/\|/, "\\|"),
        :default     => md["default"],
        :type        => md["type"],
      }
    end
  end
end
# tp rows

s = rows.collect { |e|
  %(#{e[:name]}: { type: #{e[:type]}, default: #{e[:default]}, }, // #{e[:desc]})
}.join("\n")
puts s
exit

s = rows.collect { |e|
  o = []
  o << "## `#{e[:name]}`"
  o << ""
  o << "Type: `#{e[:type]}`"
  o << "Default: `#{e[:default]}`"
  o << ""
  o << e[:desc]
  o << ""
  if e[:type] == "Boolean"
  elsif e[:type] == "String"
    o << "| 値 | 意味   |"
    o << "|----+--------|"
    o << "| #{e[:name].sub(/sp_/, 'is_')}_off   | しない   |"
    o << "| #{e[:name].sub(/sp_/, 'is_')}_on   | する   |"
  else
    o << "| 値 | 意味   |"
    o << "|----+--------|"
    o << "| FIXME  | FIXME   |"
  end
  o.join("\n")
}.join("\n\n")
puts s

# s = rows.to_t(markdown: true)
# file = Pathname("MainDoc/component_options.md").expand_path
# file.write(s)
# puts file
#
# s = rows.collect { |e|
#   o = []
#   o << "## " + e["Name"].gsub("`", "")
#   o << ""
#   o << "Type: `string`"
#   o << "Default: `#{e['Default']}`"
#   o << ""
#   o << e["Description"]
#   o << ""
#   o << "| 値 | 意味   |"
#   o << "|----+--------|"
#   o << "|    | する   |"
#   o << "|    | しない |"
#   o.join("\n")
# }.join("\n\n")
# file = Pathname("MainDoc/component_options_for_vueprss.md").expand_path
# file.write(s)
# puts file
#
# s = rows.collect { |e|
#   o = []
#   o << "## " + e["Name"].gsub("`", "")
#   o << ""
#   o << "Type: `string`"
#   o << "Default: `#{e['Default']}`"
#   o << ""
#   o << e["Description"]
#   o << ""
#   o << "| 値 | 意味   |"
#   o << "|----+--------|"
#   o << "|    | する   |"
#   o << "|    | しない |"
#   o.join("\n")
# }.join("\n\n")
# file = Pathname("MainDoc/component_options_for_vueprss.md").expand_path
# file.write(s)
# puts file
