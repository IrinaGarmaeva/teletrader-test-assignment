const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/bitfinex-symbols",
    createProxyMiddleware({
      target: "https://api.bitfinex.com",
      changeOrigin: true,
      ws: true, // proxy websockets
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
      ws: true, // proxy websockets
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


