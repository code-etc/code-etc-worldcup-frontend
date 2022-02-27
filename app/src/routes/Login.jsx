import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <a href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect/">
        로그인
      </a>
    </div>
  );
};

export default Login;
