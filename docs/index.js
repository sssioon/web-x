const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 设置 CORS 代理规则
app.use('/proxy', createProxyMiddleware({
  target: '',  // 此处需要你动态传递目标URL
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '',  // 将 /proxy 前缀去掉，直接代理
  },
  onProxyReq: (proxyReq, req, res) => {
    // 你可以在这里自定义请求头，解决一些目标网站的反爬虫问题
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
  }
}));

app.listen(3000, () => {
  console.log('CORS 代理服务启动，访问 http://localhost:3000/proxy');
});
