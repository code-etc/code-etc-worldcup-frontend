const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/accounts",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    }),
  );
  app.use(
    "/accounts",
    createProxyMiddleware({
      target: "http://host.docker.internal:8080",
      changeOrigin: true,
    }),
  );
};
