require "table_format"

task :default => :test

task :s => :server
desc "[s] server"
task :server do
  system %(nuxt dev -p 5000 --open)
end

task :t => :test
desc "[t] test"
task :test do
  system %(jest)
end

desc "dist/ に CDN 用の Web Components を生成する"
task :dist do
  system %(cd web_component && vue-cli-service build --dest ../dist --inline-vue --target wc --name shogi-player-wc src/components/ShogiPlayerWcRoot.vue)
end

task :g => :generate
desc "[g] generate"
task :generate do
  system %(ruby components/extract_css_variables.rb)
  system %(ruby components/extract_props.rb)
end

desc "clean"
task :clean do
  system %(rm -fr coverage)
  system %(rm -fr docs)
end

desc "deploy"
task :deploy do
  system %(nuxt generate --dotenv .env.production)
  system %(git add -A)
  system %(git commit -m "[chore][deploy] nuxt generate --dotenv .env.production")
  system %(git push)
  system %(open https://akicho8.github.io/shogi-player/)
end

desc "release"
task :release do
  # Rake::Task["dist"].invoke
  system %(npm version patch)
  system %(npm publish)
  system %(git push --tags)
  system %(git push)
  system %((cd ~/src/shogi-extend/nuxt_side && ncu /shogi-player/ -u && npm i))
end

desc "update"
task :update do
  system %(yarn global add npm-check-updates)
  system %(ncu /router/ -u)
  system %(ncu lodash -u)
  system %(ncu buefy -u)
  system %(ncu bulma -u)
  system %(ncu pug -u)
  system %(ncu nuxt -u)
  system %(ncu js-memory-record -u)
  system %(npm install)
end

desc "copy"
task :copy do
  system %(rsync -avz --delete --exclude=".git" --exclude="node_modules" --exclude=".nuxt" ~/src/shogi-player/ ~/src/shogi-extend/nuxt_side/node_modules/shogi-player/)
end
task :cp => :copy

task :d => "doc:server"
namespace :doc do
  desc "[d] server"
  task :server do
    system %(cd vp_doc && rake server)
  end

  desc "build"
  task :build do
    system %(cd vp_doc && rake build)
  end
end

task :n => "netlify:open"
namespace "netlify" do
  desc "[n] netlify open"
  task :netlify do
    system %(open https://app.netlify.com/sites/shogi-player/overview)
  end
end

task :o => :open
desc "[o] open document"
task :open do
  system %(open https://shogi-player.netlify.app/)
end

desc "CDN Validations"
task :cdn do
  tp "JSDelivr"
  system %(curl -sI https://cdn.jsdelivr.net/npm/shogi-player/dist/shogi-player-wc.min.js | grep 'x-jsd-version:')
  system %(curl -sI https://cdn.jsdelivr.net/npm/shogi-player@latest                      | grep 'x-jsd-version:')
  system %(curl -sI https://cdn.jsdelivr.net/npm/shogi-player                             | grep 'x-jsd-version:')

  tp "unpkg"
  system %(curl -sI https://unpkg.com/shogi-player/dist/shogi-player-wc.min.js | grep location)
  system %(curl -sI https://unpkg.com/shogi-player@latest                      | grep location)
  system %(curl -sI https://unpkg.com/shogi-player                             | grep location)
end

task "ws" => "wc:server"
task "wb" => "wc:build"
namespace "wc" do
  desc "[ws] server"
  task :server do
    system %(cd web_component && vue-cli-service serve --port 5002 --open)
  end

  desc "[wb] build"
  task :build do
    system %(cd web_component && vue-cli-service build --dest ../vp_doc/.vuepress/public/dist --inline-vue --target wc --name shogi-player-wc src/components/ShogiPlayerWcRoot.vue)
  end
end

desc "other-embed-apps-shogi-player-update"
task "other-embed-apps-shogi-player-update" do
  system %(cd shogi-player-nuxt-sample    && ncu /shogi-player/ -u && yarn)
  system %(cd shogi-player-vue-cli-sample && ncu /shogi-player/ -u && npm i)
end

namespace "test-of-create-vuepress-site" do
  desc "server"
  task :server do
    system %(cd test-of-create-vuepress-site/docs && vuepress dev -p 5010 --open src)
  end

  desc "build"
  task :build do
    system %(cd test-of-create-vuepress-site/docs && vuepress build src)
  end
end
