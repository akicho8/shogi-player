task :default => :test

desc "test"
task :test do
  system %(jest)
end

desc "generate"
task :generate do
  system %(ruby components/extract_options.rb)
  system %(ruby components/extract_props.rb)
end
task :g => :generate

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

desc "sample-sp-update"
task "sample-sp-update" do
  system %(cd shogi-player-nuxt-sample && ncu /shogi-player/ -u && yarn)
  system %(cd shogi-player-vue-cli-sample && ncu /shogi-player/ -u && npm i)
end

task "doc" => "doc:server"
namespace :doc do
  desc "[doc] server"
  task :server do
    system %(cd vp_doc && vuepress dev -p 3900 --open)
  end

  desc "build"
  task :build do
    system %(cd vp_doc && vuepress build)
  end
end

task :vps => "vuepress-site:dev"
namespace "vuepress-site" do
  desc "dev"
  task :dev do
    system %(cd test-of-create-vuepress-site/docs && vuepress dev -p 3899 --open src)
  end

  desc "build"
  task :build do
    system %(cd test-of-create-vuepress-site/docs && vuepress build src)
  end
end

task "w"    => "wc:build"
task "wc:s" => "wc:server"
task "wc:b" => "wc:build"
task "wc"   => "wc:build"
namespace "wc" do
  desc "[wc:s] server"
  task :server do
    system %(cd web_component && vue-cli-service serve --port 3995 --open)
  end

  desc "[wc:b][wc][w] build"
  task :build do
    p "ここはローカルで実行する"
    system %(cd web_component && vue-cli-service build --dest ../vp_doc/.vuepress/public/dist --inline-vue --target wc --name shogi-player-wc src/components/ShogiPlayerWcRoot.vue)
  end
end

desc "netlify (wc:build + doc:build)"
task :netlify => [
  # "wc:build",
  "doc:build",
]
