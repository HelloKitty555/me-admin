const productionTarget = 'http://123.207.121.160:3000' //生产环境后端地址
const devTarget = 'http://localhost:3000' //开发环境后端地址
const target = process.env.NODE_ENV === 'production' ? productionTarget : devTarget

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/admin'
  : '/',
  devServer: {
    port:8081,
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        ws: true,
      }
    }
  }
}