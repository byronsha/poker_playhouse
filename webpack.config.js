module.exports = {
  entry: __dirname + '/src',
  output: {
    path: '/'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
