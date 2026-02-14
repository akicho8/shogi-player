Bundler.require(:default)

require "active_support/core_ext/string"

if true
  Minitest::Assertions.prepend Minitest::PowerAssert::Assertions
end

Pathname(__dir__).glob("support/**/*.rb").sort_by(&:to_s).each { require it }

if true
  Capybara.current_driver = :selenium_chrome_headless

  if ENV["BROWSER_DEBUG"]
    Capybara.current_driver = :selenium_chrome
  end

  Capybara.app_host = "http://0.0.0.0:3800"
end

# https://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  config.expect_with :minitest
  config.expect_with :rspec do |expectations|
    expectations.syntax = [:should, :expect]
  end

  config.include SpSystemTestMethods

  config.include Capybara::DSL

  config.after do
    Capybara.reset_sessions!
  end

  # `:focus` メタデータが付いたテストのみ実行するように設定します。
  # 何も `:focus` が付いていなければ、すべてのテストが実行されます。
  # また、`fit`, `fdescribe`, `fcontext` を使うことで
  # `it`, `describe`, `context` に `:focus` を自動的に追加できます。
  config.filter_run_when_matching :focus

  # `--only-failures` や `--next-failure` オプションをサポートするために、
  # 実行結果の状態を保持するファイルを設定します。
  # このファイルは Git などのバージョン管理システムで無視することを推奨します。
  config.example_status_persistence_file_path = "spec/examples.txt"

  # # 警告を有効にします。
  # # これは推奨されますが、依存ライブラリによってはノイズが多くなる場合があります。
  # config.warnings = true

  # 1つの spec ファイルのみを実行する場合に、詳細な出力を表示するように設定します。
  # ただし、コマンドラインオプションで別のフォーマッタが指定されている場合は適用されません。
  if config.files_to_run.one?
    config.default_formatter = "doc"
  end

  # # 実行が遅いテストやグループを特定するために、10個の最も遅いテストを表示します。
  # config.profile_examples = 10

  # # テストをランダムな順番で実行することで、順番依存の問題を浮き彫りにします。
  # # 順番依存の問題をデバッグする場合は、出力された `--seed` の値を使って
  # # 同じ順序で実行できます（例: `--seed 1234`）。
  # config.order = :random

  # # グローバルなランダム化のシード値を設定します。
  # # `--seed` オプションを指定すると、特定の順序で失敗を再現できます。
  # Kernel.srand config.seed
end
