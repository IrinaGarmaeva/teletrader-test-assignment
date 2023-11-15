const express = require('express');
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

console.log('Proxy server is starting...');

app.use(
  '/symbols',
  createProxyMiddleware({
    target: 'https://api.bitfinex.com',
    changeOrigin: true,
    pathRewrite: {
      '^/symbols': '/v1/symbols',
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    },
    logger: console,
  })
);

app.use(
  "/tickers",
  createProxyMiddleware({
    target: "https://api-pub.bitfinex.com",
    changeOrigin: true,
    pathRewrite: {
      '^/tickers' : '/v2/tickers?symbols=ALL',
    },
    onError: (err, req, res) => {
      console.error("Proxy Error:", err);
      res.status(500).send("Proxy Error");
    }
  })
);

app.use(
  "/pubticker/*",
  createProxyMiddleware({
    target: "https://api.bitfinex.com",
    changeOrigin: true,
    pathRewrite: {
      '/pubticker' : '/v1/pubticker'
    },
    logger: console,
  })
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

