# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Claude Code Instructions
- 回答はすべて日本語で行ってください。
- 技術的な解説も日本語で行なってください。

## 概要

将棋盤の Vue.js 2 コンポーネントライブラリ。棋譜の再生・編集・対局機能を持つ。Nuxt.js 2 をデモ/ドキュメントサイトのフレームワークとして使用し、Vue CLI で Web Components をビルドする。

## よく使うコマンド

```bash
# 開発サーバー起動 (ポート 4001)
nuxt dev -p 4001 --open
# または
rake server   # rake s でも可

# JavaScript テストを実行 (Jest)
jest
# または
rake test     # rake t でも可

# 単一のテストファイルを実行
jest test/xcontainer.spec.js

# Web Components の dist/ ビルド (web_component/ ディレクトリで実行)
rake dist

# ドキュメントサイトのビルド (main_doc/ に静的ファイルを生成)
rake doc:build
```

## アーキテクチャ

### コンポーネント階層

`ShogiPlayer.vue` がルートコンポーネント。`provide("TheSP", this)` で自身を子コンポーネントへ配布する。子コンポーネントは `components/support.js` の `export const support = { inject: ["TheSP"] }` をミックスインして `this.TheSP` 経由でルートコンポーネントにアクセスする。

### ミックスイン構成 (`components/mod_*.js`)

`ShogiPlayer.vue` の機能は多数の Vue ミックスインに分割されている:
- `mod_navi.js` — 手数ナビゲーション(←→キー、スライダー)
- `mod_interaction.js` — 盤面編集モード
- `mod_play_mode.js` — 対局モード
- `mod_shortcut.js` — キーボードショートカット
- `mod_viewpoint.js` — 視点(先後)切り替え
- `mod_picked_piece.js` — 持ち駒の持ち上げ状態管理
- `mod_api_functions.js` — 外部から呼び出し可能なAPIメソッド
- その他多数

### モデル層 (`components/models/`)

Vue に依存しない純粋な JavaScript クラス群:
- **`Xcontainer`** — 中心的な状態管理クラス。棋譜データ・現在手数・盤面を保持する。`ClassHelper.class_include()` で複数のメソッドクラスをミックスインする Ruby 風パターンを使用。
- **`Board`** — 9×9 盤面のロジック(`components/models/board/` 以下に分割)
- **`AnyParser`** — SFEN/KIF 形式を自動判別してパースする
- **`SfenParser`** / **`KifParser`** — 各フォーマットのパーサー
- **`Place`** — 盤上の座標
- **`Location`** — 先手/後手
- **`GX`** — `beetleshine` ライブラリのエイリアス(グローバルユーティリティ)

### 重要な規約

- **`turn` は常に 0 始まりのオフセット** で扱う。指し手がない初期状態が 0。`turn_offset_min` は常に 0。
- **すべての props は `sp_` プレフィックス**で始まる(例: `sp_mode`, `sp_body`, `sp_turn`)。
- **テンプレートは Pug**(`lang="pug"`)、スタイルは SASS。
- **`@dblclick` は使用禁止**。`@click` と同時使用するとクリック判定が著しく遅延するため、ダブルタップは自前で実装する。
- **`ClassHelper.class_include(TargetClass, SourceClass)`** — Ruby の `include` に相当するクラスへのミックスインユーティリティ。

### ビルド成果物

- `dist/wc/` — CDN 配布用 Web Components (`shogi-player-wc.min.js`)
- `dist/lib/` — npm ライブラリ用 UMD ビルド (`shogi-player.umd.min.js`)
- `docs/` — GitHub Pages 用の静的サイト(Nuxt の `generate` ターゲット)

### テスト

テストファイルは `test/*.spec.js`。Jest で実行。`test/setup.js` にセットアップコードがある。
