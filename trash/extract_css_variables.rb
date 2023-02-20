require "pathname"
require "table_format"

Dir.chdir(__dir__)

rows = []
Pathname(".").glob("**/*.{vue,scss,sass}") do |file|
  next if file.basename.to_s.match?(/MainDoc|StyleEditor/)
  file.readlines.grep(/\+defvar/).each do |e|
    if md = e.match(/^\s*\+defvar\((\w+)\,\s*(.*)\)\s*\/\/\s*(.*)\s*/)
      name, default, desc = md.captures
      rows << {
        :name    => "--#{name}",
        :default => default,
        :desc    => desc,
      }
    end
  end
end

s = rows.collect { |e|
  o = []
  o << "## `#{e[:name]}`"
  o << ""
  # o << "Type: `#{e[:type]}`"
  o << "Default: `#{e[:default]}`"
  o << ""
  o << e[:desc]
  o << ""
  # if e[:type] == "Boolean"
  # elsif e[:type] == "String"
  #   o << "| 値 | 意味   |"
  #   o << "|----+--------|"
  #   o << "| #{e[:name].sub(/sp_/, 'is_')}_off   | しない   |"
  #   o << "| #{e[:name].sub(/sp_/, 'is_')}_on   | する   |"
  # else
  #   o << "| 値 | 意味   |"
  #   o << "|----+--------|"
  #   o << "| FIXME  | FIXME   |"
  # end
  o.join("\n")
}.join("\n\n")
puts s
exit






# rows = rows.sort_by { |e| e["変数"] }

s = rows.to_t(markdown: true)
file = Pathname("MainDoc/css_variable.md").expand_path
file.write(s)
puts file
