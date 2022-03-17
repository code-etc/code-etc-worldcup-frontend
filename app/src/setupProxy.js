const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/games/strange-brother",
    createProxyMiddleware({
      //docker 이미지로 실행시
      // target: "http://host.docker.internal:8080",
      //local 에서 npm run start실행시
      target: "http://localhost:8080",
      changeOrigin: true,
    }),
  );
  app.use(
    "/auth/token",
    createProxyMiddleware({
      //docker 이미지로 실행시
      // target: "http://host.docker.internal:8080",
      //local 에서 npm run start실행시
      target: "http://localhost:8080",
      changeOrigin: true,
    }),
  );
};
