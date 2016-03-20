module.exports = {
  entry: './src/index',
  output: {
    filename: 'dist/react-data-components.min.js',
    library: 'ReactDataComponents',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-addons-pure-render-mixin': {
      root: 'PureRenderMixin',
      amd: 'react-addons-pure-render-mixin',
      commonjs: 'react-addons-pure-render-mixin',
      commonjs2: 'react-addons-pure-render-mixin'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx?harmony' }
    ]
  }
};
