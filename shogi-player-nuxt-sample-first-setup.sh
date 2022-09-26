#!/bin/sh
# これは特定のバージョンで Nuxt.js 自体が起動するかの確認するだけ
export NODENV_VERSION=12.22.0
nodenv install --skip-existing $NODENV_VERSION
rm -fr ~/tmp/nuxt_js_app_sample
mkdir -p ~/tmp
cd ~/tmp
cat <<EOS
# |----------------------|----------------------|
# | 項目                 | 選択                 |
# |----------------------|----------------------|
# | Project name         | nuxt_js_app_sample   |
# | Programming language | JavaScript           |
# | Package manager      | npm                  |
# | UI framework         | Buefy                |
# | Nuxt.js modules      |                      |
# | Linting tools        |                      |
# | Testing framework    | None                 |
# | Rendering mode       | Single Page App      |
# | Deployment target    | Server               |
# |----------------------|----------------------|
EOS
npx create-nuxt-app nuxt_js_app_sample
cd ~/tmp/nuxt_js_app_sample
nodenv local $NODENV_VERSION
npm i --save-dev @nuxtjs/style-resources
npm i --save-dev shogi-player
npm run dev -- --open --port 3200
