const express = require('express');
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");


console.log('Proxy server is starting...');

// Configure proxy middleware
app.use(
  '/bitfinex-symbols',
  createProxyMiddleware({
    // target: 'https://api.bitfinex.com/v1/symbols',
    target: 'https://api.bitfinex.com',
    changeOrigin: true,
    pathRewrite: {
      '^/bitfinex-symbols': '/v1/symbols', // rewrite path
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    },
    logger: console,
  })
);

app.use(
  "/bitfinex-pubticker/*",
  createProxyMiddleware({
    target: "https://api.bitfinex.com",
    changeOrigin: true,
    //ws: true, // proxy websockets
    pathRewrite: {
      '^/bitfinex-pubticker' : '/v1/pubticker', // rewrite path
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


/*
module.exports = function (app) {
  app.use(
    "/bitfinex-symbols",
    createProxyMiddleware({
      target: "https://api.bitfinex.com",
      changeOrigin: true,
      //ws: true, // proxy websockets
      pathRewrite: {
        '^/bitfinex-symbols' : '/v1/symbols', // rewrite path
      },
      onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Proxy Error");
      }
    })
  );

  app.use(
    "/bitfinex-pubticker/*",
    createProxyMiddleware({
      target: "https://api.bitfinex.com",
      changeOrigin: true,
      //ws: true, // proxy websockets
      pathRewrite: {
        '^/bitfinex-pubticker' : '/v1/pubticker', // rewrite path
      },
      onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Proxy Error");
      }
    })
  );
};
*/

// const http = require('http');
// const httpProxy = require('http-proxy');

// const proxy = httpProxy.createProxyServer({ target: 'wss://api.bitfinex.com', ws: true });

// const server = http.createServer((req, res) => {
//   proxy.web(req, res);
// });

// server.on('upgrade', (req, socket, head) => {
//   proxy.ws(req, socket, head);
// });

// server.listen(3000, () => {
//   console.log('WebSocket proxy server is running on port 3000');
// });
