module.exports = {
  entry: './src/app.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
  ]
};