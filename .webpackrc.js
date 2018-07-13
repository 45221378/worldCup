const adaptive = require('postcss-adaptive');
let path = '';
if (process.env.API_ENV == 'dev') {
  path = '/';
} else {
  path = '/zhouzhuanking/';
}
export default {
  entry: 'src/index.js',
  browserslist: ['> 1%', 'last 2 versions'],
  publicPath: path,
  extraPostCSSPlugins: [
    adaptive({
      hairlineClass: 'hairlines',
      remUnit: 37.5,
      autoRem: true,
    }),
  ],
  extraBabelPlugins: [
    ['import', { libraryName: 'antd-mobile', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  disableCSSModules: true,
  theme: './src/theme.js',
  define: {
    'process.env': {},
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.API_ENV': process.env.API_ENV,
  },
  html: {
    template: './src/index.ejs',
    inject: true, // 自动注入
    minify: {
      removeComments: true, //去注释
      collapseWhitespace: true, //压缩空格
      removeAttributeQuotes: true, //去除属性引用
    },
  },
  hash: true,
};
