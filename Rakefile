require "table_format"
require "./package"

def system!(command)
  system "sh", "-vec", command, exception: true
end

task :default => :test

desc "setup"
task :setup do
  system! <<~EOT
  arm64 nodenv install -f 16.19.1
  npm i -g pnpm
  npm i -g npm-check-updates
  nodenv which node
  EOT
end

task :s => :server
desc "[s] server"
task :server do
  system! <<~EOT
  nuxt dev -p 4001 --open
  EOT
end

task :t => :test
desc "[t] test"
task :test do
  system! <<~EOT
  jest
  EOT
end

task :i => :inspect
desc "[i] inspect"
task :inspect do
  system! <<~EOT
  cd web_component
  vue inspect --mode development > vue.conifg.inspect.development.txt
  vue inspect --mode production  > vue.conifg.inspect.production.txt
  EOT
end

desc "dist/ に CDN 用の Web Components を生成する"
task :dist do
  system! <<~EOT
  cd web_component
  pnpm i
  SP_TARGET=wc  vue-cli-service build --mode production  --target wc  --dest ../dist/wc/production   --inline-vue --name shogi-player-wc src/components/ShogiPlayerWc.vue
  SP_TARGET=wc  vue-cli-service build --mode development --target wc  --dest ../dist/wc/development  --inline-vue --name shogi-player-wc src/components/ShogiPlayerWc.vue
  SP_TARGET=lib vue-cli-service build --mode production  --target lib --dest ../dist/lib/production  --name ShogiPlayer --filename shogi-player src/components/ShogiPlayerLib.vue
  SP_TARGET=lib vue-cli-service build --mode development --target lib --dest ../dist/lib/development --name ShogiPlayer --filename shogi-player src/components/ShogiPlayerLib.vue
  git add -A && git commit -m "[chore][skip ci] dist/* 生成" --allow-empty
  EOT
end

desc "clean"
task :clean do
  system! <<~EOT
  rm -fr coverage
  rm -fr docs
  rm -fr node_modules
  EOT
end

namespace :old_doc do
  desc "deploy"
  task :deploy => [:build, :push]

  desc "build"
  task :build do
    # web_component を退避させないと "shogi-player": "file:.." の参照が無限ループになって nuxt generate で死ぬ
    system! <<~EOT
    mv web_component /tmp
    mv shogi-player-nuxt-sample /tmp
    mv shogi-player-vue2-sample /tmp
    nuxt generate --dotenv .env.production
    mv /tmp/web_component .
    mv /tmp/shogi-player-nuxt-sample .
    mv /tmp/shogi-player-vue2-sample .
      EOT
  end

  desc "push"
  task :push do
    system! <<~EOT
    git add -A
    git commit -m '[docs][deploy][skip ci] nuxt generate --dotenv .env.production'
    git push
    open "https://akicho8.github.io/shogi-player/"
    EOT
  end
end

desc "release"
task :release do
  system! <<~EOT
  rake dist
  npm version patch
  rake example_cdn_version_replace
  pnpm publish
  git push --tags
  git push
  (cd ~/src/shogi-extend/nuxt_side && ncu shogi-player -u && pnpm i)
  rake old_doc:deploy
  rake open
  rake cdn
  EOT
end

desc "example_cdn_version_replace"
task :example_cdn_version_replace do
  system! <<~EOT
  r 'shogi-player@\\d+\\.\\d+\.\\d+' 'shogi-player@#{Package.version}' -x
  git add -A && git commit -m "[docs][ci skip] CDN の参照バージョンを #{Package.version} に変更する"
  EOT
end

desc "update"
task :update do
  system! <<~EOT
  ncu /router/ -u
  ncu /lodash/ -u
  ncu /buefy/ -u
  ncu /bulma/ -u
  # ncu pug -u
  # ncu nuxt -u
  ncu js-memory-record -u
  ncu chroma.js -u
  # npm install
  EOT
end

task :cp => :copy
desc "copy"
task :copy do
  system! <<~EOT
  rsync -avz --delete --exclude=".git" --exclude="node_modules" --exclude=".nuxt" ~/src/shogi-player/ ~/src/shogi-extend/nuxt_side/node_modules/shogi-player/
    EOT
end

task :n => "netlify:open"
namespace "netlify" do
  desc "[n] netlify open"
  task :open do
    system! <<~EOT
    npm docs
    open https://app.netlify.com/sites/shogi-player/overview
    EOT
  end
end

task :o => :open
desc "[o] open related sites"
task :open => ["netlify:open", "ga"] do
  system! <<~EOT
  open https://github.com/akicho8/shogi-player
  # CDN
  open "https://cdn.jsdelivr.net/npm/shogi-player/"
  open "https://unpkg.com/shogi-player/"
  EOT
end

desc "[ga] Google Analytics"
task :ga do
  system! <<~EOT
  open "https://analytics.google.com/analytics/web/#/p353291851/reports/intelligenthome"
  # open https://tagassistant.google.com
  EOT
end

desc "CDN Validations"
task :cdn do
  tp :local => Package.version

  tp "JSDelivr"
  system <<~EOT
  curl -sI https://cdn.jsdelivr.net/npm/shogi-player/dist/wc/production/shogi-player-wc.min.js | grep 'x-jsd-version:'
  curl -sI https://cdn.jsdelivr.net/npm/shogi-player@latest                      | grep 'x-jsd-version:'
  curl -sI https://cdn.jsdelivr.net/npm/shogi-player                             | grep 'x-jsd-version:'
  EOT

  tp "unpkg"
  system <<~EOT
  curl -sI https://unpkg.com/shogi-player/dist/wc/production/shogi-player-wc.min.js | grep location
  curl -sI https://unpkg.com/shogi-player@latest                      | grep location
  curl -sI https://unpkg.com/shogi-player                             | grep location
  EOT
end

task "ws" => "wc:server"
namespace "wc" do
  desc "[ws] server"
  task :server do
    system! <<~EOT
    cd web_component && rake s
    EOT
  end
end

desc "other-embed-apps-shogi-player-update"
task "other-embed-apps-shogi-player-update" do
  system! <<~EOT
  (cd shogi-player-nuxt-sample     && ncu /shogi-player/ -u && pnpm i)
  (cd shogi-player-vue2-sample     && ncu /shogi-player/ -u && pnpm i)
  (cd shogi-player-vue2-sample-umd && ncu /shogi-player/ -u && pnpm i)
  EOT
end

task :k => :embed_to_nuxt_and_vue2
desc "[k] embed_to_nuxt_and_vue2"
task :embed_to_nuxt_and_vue2 do
  system! <<~EOT
  r -Qx '"shogi-player": "file:.."' '"shogi-player": "^#{Package.version}"' shogi-player-vue2-sample/package.json shogi-player-nuxt-sample/package.json
  # r -x '"shogi-player": "^\d+\.\d+\.\d+"' '"shogi-player": "file:.."'  shogi-player-vue2-sample/package.json shogi-player-nuxt-sample/package.json

  tmux kill-window -t vue2
  tmux new-window -n vue2
  tmux send-keys -t vue2 'cd shogi-player-vue2-sample && pnpm i && vue-cli-service serve --port 4010 --open' C-m

  tmux kill-window -t nuxt
  tmux new-window -n nuxt
  tmux send-keys -t nuxt 'cd shogi-player-nuxt-sample && pnpm i && nuxt --port 4011 --open' C-m
  EOT
end

namespace "test-of-create-vuepress-site" do
  desc "server"
  task :server do
    system! <<~EOT
    cd test-of-create-vuepress-site/docs && vuepress dev -p 5010 --open src
    EOT
  end

  desc "build"
  task :build do
    system! <<~EOT
    cd test-of-create-vuepress-site/docs && vuepress build src
    EOT
  end
end

task :a  => :about
desc "[a] about"
task :about do
  system! "file $(nodenv which node)"
  system! <<~EOT
  uname -m
  ruby -v
  node -v
  npm root -g
  rg '"version"' package.json
  fd -l -g '*.min.js' dist
  (cd main_doc && pnpm list)
  EOT
end

task :v => :version
desc "[v] version"
task :version do
  puts Package.version
end

task :e => "doc:examples"
task :d => "doc:server"
namespace :doc do
  desc "[d] server"
  task :server do
    system! <<~EOT
    cd main_doc && rake server
    EOT
  end

  desc "build"
  task :build do
    system! <<~EOT
    cd main_doc && rake build
    EOT
  end

  desc "[e] examples"
  task :examples do
    system! <<~EOT
    fd -a -g "*.html" main_doc/docs/.vuepress/public/examples -X open -a "Google Chrome" --new --args
    EOT
  end

  desc "jsdelivr_to_unpkg"
  task :jsdelivr_to_unpkg do
    system! <<~EOT
    r -Qx '"https://cdn.jsdelivr.net/npm/' '"https://unpkg.com/'
    EOT
  end

  desc "unpkg_to_jsdelivr"
  task :unpkg_to_jsdelivr do
    system! <<~EOT
    r -Qx '"https://unpkg.com/' '"https://cdn.jsdelivr.net/npm/'
    EOT
  end
end
