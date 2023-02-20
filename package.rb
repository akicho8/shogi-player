require "json"
require "pathname"

module Package
  extend self

  def version
    info[:version]
  end

  def info
    @info ||= JSON.parse(Pathname("package.json").read, symbolize_names: true)
  end
end
