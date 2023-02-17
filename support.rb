require "json"
require "pathname"

module Support
  def package_version
    JSON.parse(Pathname("package.json").read, symbolize_names: true)[:version]
  end
end

