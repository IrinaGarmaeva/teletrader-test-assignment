const express = require('express');
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");


console.log('Proxy server is starting...');


app.use(
  '/cryptoPairNames',
  createProxyMiddleware({
    target: 'https://api.bitfinex.com',
    changeOrigin: true,
    pathRewrite: {
      '^/cryptoPairNames': '/v1/symbols',
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    },
    logger: console,
  })
);

app.use(
  // "/ticker-by/*",
  "/tickers",
  createProxyMiddleware({
    target: "https://api-pub.bitfinex.com",
    changeOrigin: true,
    //ws: true,
    pathRewrite: {
      // '^/ticker-by' : '/v2/tickers',
      '^/tickers' : '/v2/tickers?symbols=ALL',
    },
    onError: (err, req, res) => {
      console.error("Proxy Error:", err);
      res.status(500).send("Proxy Error");
    }
  })
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


