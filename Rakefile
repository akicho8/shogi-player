require "rake"

task :default => [:generate]

task :generate do
  system %(cd components && ruby extract_options.rb)
  system %(cd components && ruby extract_props.rb)
end
