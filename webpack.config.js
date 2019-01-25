const os = require('os');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function generateCustomIndex() {
  const pathname = path.join(__dirname, 'src/components');
  const EOL = os.EOL;
  let string = '';
  let imports = [];
  let exports = '';

  let r = fs.readdirSync(pathname, {
    withFileTypes: true,
  });

  r = r.filter(d => d.isDirectory());
  r = r.map(d => d.name);

  imports = r.map(d => `import ${d} from './${d}/${d}';${EOL}`);
  exports = r.map(d => `\t${d},${EOL}`);

  string = `${imports.join('')}${EOL}export {${EOL}${exports}};${EOL}`;

  fs.writeFileSync(path.join(pathname, 'index.jsx'), string);
}


module.exports = (_, { mode }) => {
  const isDevelopment = mode === 'development';
  generateCustomIndex();

  return {
    entry: './src/index.jsx',

    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin()],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: isDevelopment ? '/' : '/dist/',
    },

    resolve: {
      extensions: ['.jsx', '.js', 'less'],
    },

    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
        },
        {
          test: /\.less$/,
          loaders: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer],
              },
            },
            'less-loader',
          ],
        },
      ],
    },

    plugins: [
      new DefinePlugin({
        NODE_ENV: isDevelopment ? JSON.stringify('development') : JSON.stringify('production'),
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
      }),
      new HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
    ],

    devServer: {
      contentBase: isDevelopment ? __dirname : path.join(__dirname, 'dist'),
      port: 3000,
      hot: true,
      open: true,
    },
  };
};
