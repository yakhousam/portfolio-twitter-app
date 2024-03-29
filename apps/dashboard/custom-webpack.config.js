// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    // overwrite values here
    output: {
      publicPath: '',
    },
    devServer: {
      host: '0.0.0.0',
    },
  });
};
