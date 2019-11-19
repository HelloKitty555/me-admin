module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/admin'
  : '/',
  devServer: {
    port:8081,
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        ws: true,
      }
    }
  }
}