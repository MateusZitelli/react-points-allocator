'use strict';

module.exports = {
  entry: __dirname + "/src/PointsAllocator.jsx",
  output: {
    path: __dirname + '/dist',
    filename: 'react-points-allocator.js',
    library: 'PointsAllocator',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.es6']
  }
};
