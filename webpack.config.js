// 一个常见的`webpack`配置文件
const path = require('path');//node的内置模块path，处理文件路径
const webpack = require('webpack');//第三方模块
const HtmlWebpackPlugin = require('html-webpack-plugin');//在html文件中自动引用相关的 assets 文件(如 css, js)

module.exports = {
    entry: './src/main.js',//入口（指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始）
    output: {//出口（告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件）
        path: path.resolve(__dirname, './dist'),//打包后的文件目录(path.resolve：转换为绝对路径)
        // publicPath: './',//用于在生产模式下更新内嵌到css、html文件里的url值
        filename: 'bundle-[hash].js'//打包后的文件名称
    },
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}//别名配置，配置之后，可以在别的js文件中直接使用require('vue')
    },
    module: {
    loaders: [//loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块
        {//vue加载器
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {//js加载器
            test: /\.js$/,//匹配规则
            loader: 'babel-loader',//加载器
            exclude: /node_modules///排除项
        },
        {//css加载器
              test: /\.css$/,
              loader: "style-loader!css-loader"
        },
        {//字体加载器
            test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
            loader: "file-loader"
        },
        {//图片加载器
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'//文件命名规则
            }
        }
    ]
    },
    devServer: {//webpack-dev-server配置
        contentBase: "./", //本地服务器所加载的页面所在的目录
        port: 7777,//端口号
        host: 'localhost',//域名
        historyApiFallback: true,//不跳转
        noInfo: true,//启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        inline: true,//实时刷新
        hot:true,//启用 webpack 的模块热替换特性
        open:true,//是否打开浏览器
        proxy: {//如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
            "/api": "http://localhost:3000"
        },
        lazy:false,//只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”。
    },
    devtool: '#eval-source-map',//通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            title: 'vue-ready'
        }),
    ]
};

/*开发环境与生产环境不同配置*/
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
