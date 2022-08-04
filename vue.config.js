// const PurgeCSSPlugin = require('purgecss-webpack-plugin');
// start 按需导入element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// end 按需导入element-plus
// const glob = require('glob')
const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const isProd = ['production'].includes(process.env.NODE_ENV)

// 获取匹配文件
// const purgeFiles = glob.sync(`${join(__dirname, 'public')}/**/*`, {
//   nodir: true
// })
// purgeFiles.push(resolve(__dirname, 'public/index.html'))

// 所有的webpack配置均可通过vue inspect > output.js命令来查看
// https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE
module.exports = defineConfig({
  transpileDependencies: true, // 如果设置为 true，node_modules 中的所有依赖项都将由 Babel 转译 // 参考：https://zhuanlan.zhihu.com/p/374101233
  lintOnSave: false, // 设置为true时保存代码会触发eslint
  css: {
    loaderOptions: {
      // 配置全局scss变量支持
      // 文档：https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
      scss: {
        additionalData: '@import "~@styles/scss/common.scss";',
      },
    },
  },
  // 配置对象写法
  configureWebpack: {
    output: {
      // 可以覆盖vue默认的output配置
      filename: 'js/[name].[contenthash:8].bundle.js', // 对打包后的bundle进行命名，[name]会取entry中的文件名
      chunkFilename: 'js/[name].[contenthash:8].chunk.js', // 对打包后的chunk进行命名，[name]会取webpackChunkName
    },
    // 生产环境需要考虑是否开启，开发环境推荐使用source-map或者eval-cheap-module-source-map
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    plugins: [
      // todo 与element-plus的自动导入有冲突，会导致打包后没有样式
      // 删除没有用到的css（需要安装glob包）
      // new PurgeCSSPlugin({
      //   paths: purgeFiles,
      // }),
      // start 按需导入element-plus
      AutoImport({
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
      }),
      // end 按需导入element-plus
    ],
    optimization: {
      /**
       * 场景：当我们为output.chunkFilename设置包含contenthash的名称时，假设A模块引用了B模块，此时A模块记录了B模块名称的
       * hash值，当修改B模块的内容重新打包后B模块的hash值变了，虽然A模块的内容没有修改，但是由于A模块引用了B模块，此时
       * A模块也会被重新打包生成，这显然是不可取的，因此需要解决，而解决方案就是runtimeChunk配置，runtimeChunk的作用就是
       * 通过将当前模块记录其它模块的hash单独打包成一个runtimeChunk文件，这个文件就会记录好之前在A模块中记录的B模块
       * 的hash值，再次修改B模块的内容时只会重新生成B模块和runtimeChunk文件，这样就能保障其他模块的缓存持久化不出问题。
       *
       * 通过将 optimization.runtimeChunk 设置为 object，对象中可以设置只有 name 属性，
       * 其中属性值可以是名称或者返回名称的函数，用于为 runtime chunks 命名。
       */
      runtimeChunk: {
        name: entrypoint => `runtimechunk~${entrypoint.name}`,
      },
    },
    /**
     * 解析模块的规则
     */
    resolve: {
      /**
       * 配置解析模块路径别名
       *
       * 优点：简写路径、减少递归解析
       * 缺点：没有代码提示（配合vscode插件+设置可以解决）、可能会导致tree-shaking失效
       *
       * 全面解释：http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-1%E7%BC%A9%E5%B0%8F%E6%96%87%E4%BB%B6%E6%90%9C%E7%B4%A2%E8%8C%83%E5%9B%B4.html
       */
      alias: {
        '@': resolve(__dirname, 'src'),
        '@img': resolve(__dirname, 'src/assets/images'),
        '@styles': resolve(__dirname, 'src/assets/styles'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@request': resolve(__dirname, 'src/request'),
        '@store': resolve(__dirname, 'src/store'),
        '@types': resolve(__dirname, 'src/types'),
        '@constant': resolve(__dirname, 'src/constant'),
        '@plugins': resolve(__dirname, 'src/plugins'),
      },
      /**
       * 配置省略文件名的后缀规则
       *
       * 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在，
       * 默认是extensions: ['.js', '.json']
       * 也就是说当遇到 require('./data') 这样的导入语句时，Webpack 会先去寻找 ./data.js 文件，
       * 如果该文件不存在就去寻找 ./data.json 文件，如果还是找不到就报错。
       *
       * 如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多，所以 resolve.extensions 的配置也会影响到构建的性能。
       * 在配置 resolve.extensions 时你需要遵守以下几点，以做到尽可能的优化构建性能：
       *
       * 1.后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表中。
       * 2.频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程。
       * 3.在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把
       * require('./data') 写成 require('./data.json')
       */
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    },
    /**
     * 防止将某些import的包打包到最终的bundle中，例如jquery
     *
     * 做法：
     * 1.在webpack配置中设置externals，配置规则为【忽略的库名: npm项目包名】
     * 2.将如jquery之类的包放在cdn，在index.html中通过script引入
     *
     * 这样在代码中import $ from 'jquery'时就不会再打包jquery，
     * 并且能够正常使用jquery
     */
    externals: {
      // jquery: 'jQuery', // 拒绝jQuery被打包
    },
  },
  // 链式写法
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons/svg')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  /**
   * 开发服务器devServer：用来自动化编译、自动刷新、自动打开浏览器等
   * 启动命令：webpack serve （webpack-cli推荐）
   * 特点：没有输出，只会在内存中编译
   */
  devServer: {
    // 代理url 请求/api时代理到http://localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
      },
      // 例如将'localhost:8080/img/xxx'代理到'https://cdn.xxx.cn/xxx'
      '/img': {
        target: 'https://cdn.xxx.cn', // 接口的域名
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/img': '' }, // pathRewrite 来重写地址，将前缀 '/img' 转为 '/'
      },
    },
    compress: true, // 启动gzip压缩
    host: 'localhost', // 主机地址
    port: 8080, // 端口号
    hot: true, // 热更新
  },
})

// 控制台输出当前构建信息
function consoleEnvInfo() {
  const arg = process.argv[2]
  // 配置信息，对应根目录下的.env.xxx文件配置
  const params = {
    title: process.env.VUE_APP_TITLE,
    path: process.env.VUE_APP_PATH,
    apiPath: process.env.VUE_APP_API_PATH,
    NODE_ENV: process.env.NODE_ENV,
    VUE_APP_ENV: process.env.VUE_APP_ENV,
  }
  // 只需将package.json中对应的命令加入配置即可
  const strategy = {
    serve() {
      global.console.log('开始运行' + process.env.VUE_APP_TITLE + '...')
    },
    dev() {
      global.console.log('开始运行' + process.env.VUE_APP_TITLE + '...')
    },
    lint() {
      global.console.log('开始检查代码规范...')
    },
    build() {
      global.console.log('开始构建' + process.env.VUE_APP_TITLE + '...')
    },
    run(arg) {
      // 不存在就不需要执行后面的代码了
      if (!this[arg]) return

      this[arg]()
      global.console.log('当前环境配置信息如下...')
      global.console.table(params)
    },
  }

  strategy.run(arg)
}

consoleEnvInfo()
