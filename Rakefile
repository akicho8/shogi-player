require "table_format"
require "./package"

task :default => :test

task :s => :server
desc "[s] server"
task :server do
  system <<~EOT
  nuxt dev -p 5000 --open
  EOT
end

task :t => :test
desc "[t] test"
task :test do
  system <<~EOT
  jest
  EOT
end

desc "dist/ に CDN 用の Web Components を生成する"
task :dist do
  system <<~EOT
  cd web_component
  vue-cli-service build --mode production  --dest ../dist             --inline-vue --target wc --name shogi-player-wc src/components/ShogiPlayerWcRoot.vue
  vue-cli-service build --mode development --dest ../dist/development --inline-vue --target wc --name shogi-player-wc src/components/ShogiPlayerWcRoot.vue
  git add -A && git commit -m "[chore] dist/* 生成"
  EOT
end

task :g => :generate
desc "[g] generate"
task :generate do
  system <<~EOT
  ruby components/extract_css_variables.rb
  ruby components/extract_props.rb
  EOT
end

desc "clean"
task :clean do
  system <<~EOT
  rm -fr coverage
  rm -fr docs
  EOT
end

namespace :old_doc do
  desc "deploy"
  task :deploy => [:build, :push]

  desc "build"
  task :build do
    # web_component を退避させないと "shogi-player": "file:.." の参照が無限ループになって nuxt generate で死ぬ
    system <<~EOT
    mv web_component "/tmp"
    nuxt generate --dotenv ".env.production"
    mv /tmp/web_component '.'
    EOT
  end

  desc "push"
  task :push do
    system <<~EOT
    git add -A
    git commit -m '[docs][deploy] nuxt generate --dotenv .env.production'
    git push
    open "https://akicho8.github.io/shogi-player/"
    EOT
  end
end

desc "release"
task :release do
  system <<~EOT
  rake dist
  npm version patch
  rake example_cdn_version_replace
  npm publish
  git push --tags
  git push
  (cd ~/src/shogi-extend/nuxt_side && ncu /shogi-player/ -u && npm i)
  rake old_doc:deploy
  rake open
  rake cdn
  EOT
end

desc "example_cdn_version_replace"
task :example_cdn_version_replace do
  system <<~EOT
  r 'shogi-player@\\d+\\.\\d+\.\\d+' 'shogi-player@#{Package.version}' -x
  git add -A && git commit -m "[docs] vs_doc/* 内の cdn の新しいバージョン指定"
  EOT
end

desc "update"
task :update do
  system <<~EOT
  yarn global add npm-check-updates
  ncu /router/ -u
  ncu lodash -u
  ncu buefy -u
  ncu bulma -u
  ncu pug -u
  ncu nuxt -u
  ncu js-memory-record -u
  npm install
  EOT
end

task :cp => :copy
desc "copy"
task :copy do
  system <<~EOT
  rsync -avz --delete --exclude=".git" --exclude="node_modules" --exclude=".nuxt" ~/src/shogi-player/ ~/src/shogi-extend/nuxt_side/node_modules/shogi-player/
    EOT
end

task :n => "netlify:open"
namespace "netlify" do
  desc "[n] netlify open"
  task :open do
    system <<~EOT
    npm docs
    open https://app.netlify.com/sites/shogi-player/overview
    EOT
  end
end

task :o => :open
desc "[o] open related sites"
task :open => ["netlify:open", "ga"] do
  system <<~EOT
  open https://github.com/akicho8/shogi-player
  # CDN
  open "https://cdn.jsdelivr.net/npm/shogi-player/"
  open "https://unpkg.com/shogi-player/"
  EOT
end

desc "[ga] Google Analytics"
task :ga do
  system <<~EOT
  open "https://analytics.google.com/analytics/web/#/p353291851/reports/intelligenthome"
  # open https://tagassistant.google.com
  EOT
end

desc "CDN Validations"
task :cdn do
  tp :local => Package.version

  tp "JSDelivr"
  system <<~EOT
  curl -sI https://cdn.jsdelivr.net/npm/shogi-player/dist/shogi-player-wc.min.js | grep 'x-jsd-version:'
  curl -sI https://cdn.jsdelivr.net/npm/shogi-player@latest                      | grep 'x-jsd-version:'
  curl -sI https://cdn.jsdelivr.net/npm/shogi-player                             | grep 'x-jsd-version:'
  EOT

  tp "unpkg"
  system <<~EOT
  curl -sI https://unpkg.com/shogi-player/dist/shogi-player-wc.min.js | grep location
  curl -sI https://unpkg.com/shogi-player@latest                      | grep location
  curl -sI https://unpkg.com/shogi-player                             | grep location
  EOT
end

task "ws" => "wc:server"
namespace "wc" do
  desc "[ws] server"
  task :server do
    system <<~EOT
    cd web_component && rake s
    EOT
  end
end

desc "other-embed-apps-shogi-player-update"
task "other-embed-apps-shogi-player-update" do
  system <<~EOT
  (cd shogi-player-nuxt-sample    && ncu /shogi-player/ -u && yarn)
  (cd shogi-player-vue-cli-sample && ncu /shogi-player/ -u && npm i)
  EOT
end

namespace "test-of-create-vuepress-site" do
  desc "server"
  task :server do
    system <<~EOT
    cd test-of-create-vuepress-site/docs && vuepress dev -p 5010 --open src
    EOT
  end

  desc "build"
  task :build do
    system <<~EOT
    cd test-of-create-vuepress-site/docs && vuepress build src
    EOT
  end
end

task :a  => :about
desc "[a] about"
task :about do
  system <<~EOT
  ruby -v
  node -v
  npm root -g
  rg '"version"' package.json
  fd -l -g '*.min.js' dist
  (cd vp_doc && npm list)
  EOT
end

task :v => :version
desc "[v] version"
task :version do
  # system <<~EOT
  # npm version
  # EOT
  puts Package.version
end

task :e => "doc:examples"
task :d => "doc:server"
namespace :doc do
  desc "[d] server"
  task :server do
    system <<~EOT
    cd vp_doc && rake server
    EOT
  end

  desc "build"
  task :build do
    system <<~EOT
    cd vp_doc && rake build
    EOT
  end

  desc "[e] examples"
  task :examples do
    system <<~EOT
    fd -a -g "*.html" vp_doc/docs/.vuepress/public/examples -X open -a "Google Chrome" --new --args
    EOT
  end

  desc "jsdelivr_to_unpkg"
  task :jsdelivr_to_unpkg do
    system <<~EOT
    r -Qx '"https://cdn.jsdelivr.net/npm/' '"https://unpkg.com/'
    EOT
  end

  desc "unpkg_to_jsdelivr"
  task :unpkg_to_jsdelivr do
    system <<~EOT
    r -Qx '"https://unpkg.com/' '"https://cdn.jsdelivr.net/npm/'
    EOT
  end
end
