module.exports = {
  entry: './src/index',
  devtool: 'eval-source-map',
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: { presets: ['react','es2015','stage-0'] }
      },
      {
        test: /\.scss?$/,
        loaders: ['style','css?modules','postcss','sass'],
        exclude: /node_modules/
      }
    ]
  },
  postcss: () => {
    return [ require('autoprefixer') ];
  }
};
