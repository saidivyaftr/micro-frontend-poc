const NextFederationPlugin = require('@module-federation/nextjs-mf');
// app2: 'app2@http://localhost:3002/remoteEntry.js',

module.exports = {
  webpack(config, options) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'home',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            components: 'components@http://localhost:3001/remoteEntry.js',
          },
          exposes: {
            './home': './pages/index.js',
          },
          shared: {},
        }),
      );

    return config;
  },
};
