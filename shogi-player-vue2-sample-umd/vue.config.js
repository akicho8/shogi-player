module.exports = {
  devServer: {
    client: {
      overlay: {
        // https://github.com/webpack/webpack-dev-server/issues/4804
        // https://github.com/webpack/webpack-dev-server/issues/4771
        runtimeErrors: false,
      },
    },
  },
}
