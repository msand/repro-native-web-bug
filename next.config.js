// Update these to match your package scope name.
const internalNodeModulesRegExp = /(?:react-native-tab-view)(?!.*node_modules)/;
const externalNodeModulesRegExp = /node_modules(?!\/(?:react-native-tab-view)(?!.*node_modules))/;

module.exports = {
  webpack: (config, { dev, isServer, defaultLoaders }) => {
    config.resolve.symlinks = false;
    config.externals = config.externals.map(external => {
      if (typeof external !== 'function') return external;
      return (ctx, req, cb) =>
        internalNodeModulesRegExp.test(req) ? cb() : external(ctx, req, cb);
    });
    config.module.rules.push({
      test: /\.+(js|jsx)$/,
      loader: defaultLoaders.babel,
      include: [internalNodeModulesRegExp],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = ['.web.js', '.js'];
    return config;
  },
  webpackDevMiddleware: config => {
    config.watchOptions.ignored = [
      ...config.watchOptions.ignored,
      externalNodeModulesRegExp,
    ];
    return config;
  },
};
