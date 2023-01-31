#!/bin/sh
cd ~/src/shogi-player/shogi-player-web-components
# npm cache clean --force
# rm -fr dist
vue-cli-service build --target wc --name vue-app src/components/HelloWorld.vue

# --mode         specify env mode (default: production)
# --dest         specify output directory (default: dist)
# --no-module    build app without generating <script type="module"> chunks for modern browsers
# --target       app | lib | wc | wc-async (default: app)
# --inline-vue   include the Vue module in the final bundle of library or web component target
# --formats      list of output formats for library builds (default: commonjs,umd,umd-min)
# --name         name for lib or web-component mode (default: "name" in package.json or entry filename)
# --filename     file name for output, only usable for 'lib' target (default: value of --name)
# --no-clean     do not remove the dist directory contents before building the project
# --report       generate report.html to help analyze bundle content
# --report-json  generate report.json to help analyze bundle content
# --skip-plugins comma-separated list of plugin names to skip for this run
# --watch        watch for changes
# --stdin        close when stdin ends

cat <<'EOF' > ~/src/shogi-player/shogi-player-web-components/dist/demo2.html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>vue-app demo</title>
  <script src="https://unpkg.com/vue@2"></script>
  <script src="./vue-app.js"></script>
</head>
<body>
  <vue-app></vue-app>
</body>
</html>
EOF
open ~/src/shogi-player/shogi-player-web-components/dist/demo2.html
