# デバッグ

## Dev Tools を起動する

<<< @/docs/.vuepress/public/examples/debug/sp_dev_tools.html{2}
<LinkToExample name="debug/sp_dev_tools" />

`Shift` `Option` `Command` を押しながら天王山を右クリックでも起動する

## `sp_debug` を有効にする

<<< @/docs/.vuepress/public/examples/debug/sp_debug.html{2}
<LinkToExample name="debug/sp_debug" />

JavaScript コンソールが騷がしくなる

## `sp_event_log` を有効にする

<<< @/docs/.vuepress/public/examples/debug/sp_event_log.html{2}
<LinkToExample name="debug/sp_event_log" />

発生したイベントと引数を JavaScript コンソールに表示する

## `sp_layer` を有効にする

<<< @/docs/.vuepress/public/examples/debug/sp_layer.html{2}
<LinkToExample name="debug/sp_layer" />

レイヤー毎の境界がわかりやすくなる

## development 版を使う

<<< @/docs/.vuepress/public/examples/debug/development.html{1}
<LinkToExample name="debug/development" />

development 版を使うとデバッグ情報を多めに表示する

* development 版の特徴
  * `sp_debug` と `sp_event_log` が常時有効な状態になる
  * `NODE_ENV=development` でビルドしている
  * クラス名等が難読状態になっていない
  * production 版に比べると気持ち程度遅い
