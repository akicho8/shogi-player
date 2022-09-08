require "bundler/inline"

gemfile do
  source "https://rubygems.org"
  gem "webdrivers"
  gem "capybara", require: "capybara/dsl"
end

require "pathname"

class App
  def run
    Dir.chdir(Pathname("~/src/shogi-player/shogi-player-vue-cli-sample").expand_path)
    screen_shot
    readme_output
    system "git add -A"
    system "git commit -m '[chore] Update shogi-player-vue-cli-sample/*'"
    system "git push"
  end

  def screen_shot
    Capybara.current_driver = :selenium_chrome
    Capybara.visit("http://0.0.0.0:3100/")
    Capybara.current_window.resize_to(800, 900)
    Capybara.save_screenshot("application.png")
  end

  def readme_output
    Pathname("README.md").write(<<~EOT)
# shogi-player-vue-cli-sample

<p><a href="https://akicho8.github.io/shogi-player/"><img src="https://raw.githubusercontent.com/akicho8/shogi-player/shogi-player-vue-cli-sample/main/shogi-player/application.png" height="640" /></a></p>

これは [shogi-player](https://akicho8.github.io/shogi-player/) を vue cli で使うサンプルです

この半自動生成スクリプト [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) で生成しました

## このサンプルの実行方法
```
yarn
yarn serve --open --port 3100
```
    EOT
  end

  new.run
end
