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
