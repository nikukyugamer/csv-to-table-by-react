module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [ // not 'loaders'
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets:['es2015']
        }
      }
    ]
  },
  target: "node",
  mode: "production"
};
