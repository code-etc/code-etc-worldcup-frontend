import React from "react";
import queryString from "query-string";
// import { Buffer } from "buffer/";
import cookies from "react-cookies";

const LoginCallback = ({ location }) => {
  const userToken = queryString.parse(location.search);
  const accessTokenExpires = new Date();
  const refreshTokenExpires = new Date();
  accessTokenExpires.setHours(accessTokenExpires.getHours() + 2);
  refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 14);

  // 배포하면 + httpOnly: true
  cookies.save("access-token", userToken.Authorization.substr(7), { path: "/", tokenExpiredAt: accessTokenExpires });
  cookies.save("refresh-token", userToken.RefreshToken.substr(7), { path: "/", expires: refreshTokenExpires });

  window.location.href = "http://localhost:3000";
  return <div></div>;
};

export default LoginCallback;
