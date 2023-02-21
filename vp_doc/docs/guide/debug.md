# デバッグ

## `sp_layer` を有効にする

<<< @/docs/.vuepress/public/examples/sp_layer.html{2}
<LinkToExample name="sp_layer" />

レイヤー毎の境界がわかりやすくなる

## `sp_event_log` を有効にする

<<< @/docs/.vuepress/public/examples/sp_event_log.html{2}
<LinkToExample name="sp_event_log" />

発生したイベントと引数を JavaScript コンソールに表示する

## development 版を使う

<<< @/docs/.vuepress/public/examples/development.html{1}
<LinkToExample name="development" />

development 版を使うとデバッグ情報を多めに表示する

* development 版の特徴
  * `sp_event_log` を常時有効化している
  * 盤操作時の挙動を JavaScript コンソールに表示しまくる
  * `NODE_ENV=development` でビルドしている
  * クラス名等が難読状態になっていない
  * production 版に比べると気持ち程度遅い

## `sp_debug` を有効にする

<<< @/docs/.vuepress/public/examples/sp_debug.html{2}
<LinkToExample name="sp_debug" />

内部の情報を下に表示する

## 設定を起動する

`Shift` `Option` `Command` を押しながらマウスの右クリックで設定モーダルが起動する
