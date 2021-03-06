const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app){
  app.use("/auth", createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: false
  }))

  app.use("/timetrain", createProxyMiddleware({
    target: "http://localhost:8081",
    changeOrigin: true
  }))
}
